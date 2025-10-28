import asyncio
import os
import logging
import datetime
import time
from typing import Annotated
from fastapi import (
    FastAPI,
    UploadFile,
    Response,
    HTTPException,
    status,
    Depends,
    Request,
    Form,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import JSONResponse
from sqlalchemy import func
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR
from src.custom_swagger import override_openapi_schema
from src.db_operations import (
    create_payment_session_db,
    get_payment_session_by_stripe_session_id,
    add_credits_to_user,
    get_user_credits,
    get_sticker_by_id as get_sticker_by_id_db,
)
from src import telegram_bot
from src.auth import create_access_token, verify_token
from src.hashed_pwd import hash_password, verify_password
from src.models import (
    Users,
    get_db,
    Session,
    IntegrityError,
    Images,
    StickerPacks,
    Transactions,
    TransactionList,
)
from src.schemas import (
    UserSchema,
    UserOut,
    RegisterResponse,
    Token,
    PaymentSessionCreate,
    PaymentStatusResponse,
    StickersResponse,
    UpdateSticker,
    StickerPackSchema,
    StickerPackCreate,
)
from src.sticker_factory import generate_sticker
from src import billing
from src.storage import upload_image_to_gcs
from contextlib import asynccontextmanager
import httpx
from io import BytesIO
class EndpointFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        return "/health" not in record.getMessage()


logging.getLogger("uvicorn.access").addFilter(EndpointFilter())

@asynccontextmanager
async def lifespan(app: FastAPI):
    await telegram_bot.fetch_username()
    yield


app = FastAPI(lifespan=lifespan)

app.openapi = override_openapi_schema(app)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

db_dependency = Annotated[Session, Depends(get_db)]

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https:\/\/([a-z0-9]+--)?ai-stickers\.netlify\.app|https:\/\/createstickersonline\.com",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the path to ref.png relative to the app root
REF_IMAGE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ref.png")


@app.get("/health")
async def health():
    return {"status": "ok"}


async def get_current_user(db: db_dependency, token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_id = payload.get("sub")
    user = db.query(Users).get(user_id)
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user


@app.get("/user-info", response_model=UserOut, tags=["Users"])
async def get_user_details(db: db_dependency, user: Users = Depends(get_current_user)):
    credits = get_user_credits(db, user.id)
    return UserOut(email=user.email, credits=credits)


@app.post(
    "/auth/register",
    response_model=RegisterResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Users"],
)
async def register_new_user(db: db_dependency, user: UserSchema):
    try:
        new_user = Users(email=user.email, password=hash_password(user.password))
        db.add(new_user)
        db.flush()

        new_transaction = Transactions(current_transaction=TransactionList.gift, amount=2, user_id=new_user.id)
        db.add(new_transaction)
        db.commit()

        new_user.credits = get_user_credits(db, new_user.id)
        new_user_response = UserOut.model_validate(new_user)

        token = create_access_token({"sub": str(new_user.id)})

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": new_user_response,
        }
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Email already registered")
    


@app.post("/auth/login", response_model=Token, tags=["Users"])
async def login(db: db_dependency, form_data: UserSchema):
    user = db.query(Users).filter(Users.email == form_data.email).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}


@app.post("/stickers", response_model=StickersResponse, tags=["Stickers"])
async def create_sticker(file: UploadFile, db: db_dependency, emoji: str = Form("🙂"), prompt: str = Form(None), user: Users = Depends(get_current_user)):
    balance = (
        db.query(func.sum(Transactions.amount))
        .filter(Transactions.user_id == user.id)
        .scalar()
    ) or 0
    if balance == 0:
        raise HTTPException(status_code=402, detail="Insuficient balance")

    image_data = await file.read()
    loop = asyncio.get_running_loop()

    start_time = time.time()
    sticker_data = await loop.run_in_executor(
        None, generate_sticker, image_data, file.filename, REF_IMAGE_PATH, prompt
    )
    end_time = time.time()
    generation_time = round(end_time - start_time, 2)

    new_transaction = Transactions(
        current_transaction=TransactionList.image_generation, amount=-1, user_id=user.id
    )
    db.add(new_transaction)
    db.flush()

    new_img = Images(
        original_img_url=upload_image_to_gcs(image_data, dest="original"),
        generated_img_url=upload_image_to_gcs(sticker_data, dest="generated"),
        transaction_id=new_transaction.id,
        user_id=user.id, 
        emoji=emoji, 
        prompt=prompt,
        generation_time=generation_time,
    )
    db.add(new_img)
    db.commit()

    return new_img


@app.get("/stickers", response_model=list[StickersResponse], tags=["Stickers"])
async def list_stickers(db: db_dependency, user: Users = Depends(get_current_user)):
    sticker_list = db.query(Images).filter(Images.user_id == user.id).order_by(Images.created_at.desc()).all()
    if not sticker_list:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No stickers found for this user")
    return sticker_list


@app.get("/stickers/{id}", response_model=StickersResponse, tags=["Stickers"])
async def get_sticker_by_id(db: db_dependency, id: int, user: Users = Depends(get_current_user)):
    sticker = db.query(Images).filter(Images.user_id == user.id, Images.id == id).first()
    if not sticker:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No stickers found for this user")

    return sticker



@app.put("/stickers/{id}", response_model=StickersResponse, tags=["Stickers"])
async def update_sticker(db: db_dependency, id: int, body: UpdateSticker, user: Users = Depends(get_current_user)):
    sticker = db.query(Images).filter(Images.user_id == user.id, Images.id == id).first()
    if not sticker:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No stickers found for this user")

    sticker.emoji = body.emoji
    sticker.sticker_pack_id = body.sticker_pack_id

    db.commit()
    db.refresh(sticker)

    return sticker


@app.delete("/stickers/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Stickers"])
async def update_sticker(db: db_dependency, id: int, user: Users = Depends(get_current_user)):
    sticker = db.query(Images).filter(Images.user_id == user.id, Images.id == id).first()
    if not sticker:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No stickers found for this user")

    db.delete(sticker)
    db.commit()
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@app.get("/sticker-packs", response_model=list[StickerPackSchema], tags=["Sticker Packs"])
async def list_sticker_packs(db: db_dependency, user: Users = Depends(get_current_user)):
    sticker_pack_list = db.query(StickerPacks).filter(StickerPacks.user_id == user.id).order_by(StickerPacks.created_at.desc()).all()
    if not sticker_pack_list:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No sticker packs found for this user")
    return sticker_pack_list
    

@app.post("/sticker-packs", response_model=StickerPackSchema, tags=["Sticker Packs"])
async def create_sticker_pack(
    sticker_pack_data: StickerPackCreate, 
    db: db_dependency, 
    user: Users = Depends(get_current_user)
):
    new_sticker_pack = StickerPacks(title=sticker_pack_data.title, user_id=user.id)
    db.add(new_sticker_pack)
    db.flush()

    input_stickers_list = []
    for sticker_id in sticker_pack_data.stickers:
        sticker = get_sticker_by_id_db(db, sticker_id, user.id)
        if not sticker:
            raise HTTPException(status_code=400, detail=f"Sticker {sticker_id} not found")
        if sticker.sticker_pack_id:
            raise HTTPException(status_code=400, detail=f"Sticker {sticker_id} already in a sticker pack")

        sticker.sticker_pack_id = new_sticker_pack.id
        db.add(sticker)
        
        async with httpx.AsyncClient() as client:
            response = await client.get(sticker.generated_img_url)
            response.raise_for_status()
            sticker_bytes = BytesIO(response.content)
            telegram_file = await telegram_bot.upload_sticker_file(sticker_bytes)

        sticker.telegram_file_unique_id = telegram_file.file_id

        input_stickers_list.append(
            telegram_bot.InputSticker(
                sticker=telegram_file.file_id,
                emoji_list=[sticker.emoji], 
                format=telegram_bot.StickerFormat.STATIC
            )
        )

    sticker_pack_schema = StickerPackSchema.model_validate(new_sticker_pack)
    res = await telegram_bot.create_sticker_pack(sticker_pack_schema.sticker_pack_name, sticker_pack_schema.title, input_stickers_list)
    if not res:
        raise HTTPException(status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create sticker pack")

    db.commit()
    db.refresh(new_sticker_pack)
    return new_sticker_pack


@app.get("/sticker-packs/{id}", response_model=StickerPackSchema, tags=["Sticker Packs"])
async def get_sticker_pack_by_id(db: db_dependency, id: int, user: Users = Depends(get_current_user)):
    sticker_pack = db.query(StickerPacks).filter(StickerPacks.user_id == user.id, StickerPacks.id == id).first()
    if not sticker_pack:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No sticker packs found for this user")
    return sticker_pack


@app.patch("/sticker-packs/{id}", response_model=StickerPackSchema, tags=["Sticker Packs"])
async def get_sticker_pack_by_id(db: db_dependency, id: int, new_title: str, user: Users = Depends(get_current_user)):
    sticker_pack = db.query(StickerPacks).filter(StickerPacks.user_id == user.id, StickerPacks.id == id).first()
    if not sticker_pack:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No sticker packs found for this user")

    sticker_pack_schema = StickerPackSchema.model_validate(sticker_pack)
    old_pack_name = sticker_pack_schema.sticker_pack_name
    
    sticker_pack.title = new_title
    db.flush()

    res = await telegram_bot.update_sticker_set_title(old_pack_name, new_title)
    if not res:
        raise HTTPException(status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update sticker set title")

    db.commit()
    db.refresh(sticker_pack)
        
    return sticker_pack


@app.delete("/sticker-packs/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Sticker Packs"])
async def get_sticker_pack_by_id(db: db_dependency, id: int, user: Users = Depends(get_current_user)):
    sticker_pack = db.query(StickerPacks).filter(StickerPacks.user_id == user.id, StickerPacks.id == id).first()
    if not sticker_pack:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No sticker packs found for this user")
    sticker_pack_schema = StickerPackSchema.model_validate(sticker_pack)
    await telegram_bot.delete_sticker_pack(sticker_pack_schema.sticker_pack_name)
    db.delete(sticker_pack)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@app.get("/sticker-packs/{id}/stickers", response_model=list[StickersResponse], tags=["Sticker Packs"])
async def get_stickers_in_pack(db: db_dependency, id: int, user: Users = Depends(get_current_user)):
    list_stickers_in_pack = db.query(Images).filter(Images.user_id == user.id, Images.sticker_pack_id == id).all()
    if not list_stickers_in_pack:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No sticker packs found for this user")
    return list_stickers_in_pack



@app.exception_handler(billing.stripe.error.StripeError)
async def stripe_error_handler(request: Request, exc: billing.stripe.error.StripeError):
    return JSONResponse(
        status_code=500, content={"detail": f"Payment processing failed: {str(exc)}"}
    )


@app.post("/payments", tags=["Payments"])
async def create_payment_session(
    payment_data: PaymentSessionCreate,
    db: db_dependency,
    user: Users = Depends(get_current_user),
):
    checkout_session = await billing.create_payment_session(payment_data, user.id)
    create_payment_session_db(db, checkout_session.id, user.id, payment_data.price)

    return {"checkout_url": checkout_session.url}


@app.get(
    "/payment-status/{session_id}",
    response_model=PaymentStatusResponse,
    tags=["Payments"],
)
async def check_payment_status(
    session_id: str, db: db_dependency, user: Users = Depends(get_current_user)
):
    payment_session = get_payment_session_by_stripe_session_id(db, session_id, user.id)

    if not payment_session:
        raise HTTPException(status_code=404, detail="Payment session not found")

    return PaymentStatusResponse(
        session_id=payment_session.stripe_session_id,
        status=payment_session.status,
        price_id=payment_session.price_id,
        created_at=payment_session.created_at,
        completed_at=payment_session.completed_at,
    )


@app.post("/payments/webhook", tags=["Payments"])
async def stripe_webhook(request: Request, db: db_dependency):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = billing.construct_event(payload, sig_header)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except billing.stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        session_id = session["id"]

        user_id = session["metadata"]["user_id"]

        payment_session = get_payment_session_by_stripe_session_id(
            db, session_id, user_id
        )
        if not payment_session:
            raise HTTPException(status_code=404, detail="Payment session not found")

        if payment_session.status == "pending":
            payment_session.status = "completed"
            payment_session.completed_at = datetime.datetime.now(datetime.UTC)
            add_credits_to_user(db, payment_session.user_id, payment_session.id)
            return {"status": "success"}
        else:
            raise HTTPException(
                status_code=200, detail="Payment session already completed"
            )
    else:
        raise HTTPException(status_code=400, detail="Invalid event type")
