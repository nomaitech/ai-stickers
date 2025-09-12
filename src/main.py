import asyncio
import os
import logging
import datetime
from typing import Annotated
from fastapi import FastAPI, UploadFile, Response, HTTPException, status, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import JSONResponse
from sqlalchemy import func
from src.custom_swagger import override_openapi_schema
from src.db_operations import create_payment_session_db, get_payment_session_by_stripe_session_id, add_credits_to_user, get_user_credits
from src.auth import create_access_token, verify_token
from src.hashed_pwd import hash_password, verify_password
from src.models import Users, get_db, Session, IntegrityError, Images, Transactions, TransactionList
from src.schemas import UserBase, UserOut, Token, PaymentSessionCreate, PaymentStatusResponse
from src.sticker_factory import generate_sticker
from src import billing

class EndpointFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        return "/health" not in record.getMessage()

logging.getLogger("uvicorn.access").addFilter(EndpointFilter())


app = FastAPI()

app.openapi = override_openapi_schema(app)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

db_dependency = Annotated[Session, Depends(get_db)]

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https:\/\/([a-z0-9]+--)?ai-stickers\.netlify\.app",
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


@app.get("/user-info", response_model=UserOut, tags=["users"])
async def get_user_details(db: db_dependency, user: Users = Depends(get_current_user)):
    credits = get_user_credits(db, user.id)
    return UserOut(email=user.email, credits=credits)



@app.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED, tags=["users"])
async def register_new_user(db: db_dependency, user: UserBase):
    try:
        new_user = Users(email=user.email, password=hash_password(user.password))
        db.add(new_user)
        db.commit()
        new_user_response = UserBase.model_validate(new_user)
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Email already registered")
    return new_user_response


@app.post("/login", response_model=Token, tags=["users"])
async def login(db: db_dependency, form_data: UserBase):
    user = db.query(Users).filter(Users.email == form_data.email).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}


@app.post("/generate-sticker")
async def create_sticker(file: UploadFile, db: db_dependency, user: Users = Depends(get_current_user)):
    balance = (
        db.query(func.sum(Transactions.amount))
        .filter(Transactions.user_id == user.id)
        .scalar()
    ) or 0
    if balance == 0:
        raise HTTPException(status_code=402, detail="Insuficient balance")
   
    image_data = await file.read()
    loop = asyncio.get_running_loop()
    sticker_data = await loop.run_in_executor(
        None, generate_sticker, image_data, file.filename, REF_IMAGE_PATH
    )

    new_transaction = Transactions(current_transaction=TransactionList.image_generation, amount=-1, user_id=user.id)
    db.add(new_transaction)
    db.flush()
   
    new_img = Images(original_img=image_data, generated_img=sticker_data, transaction_id=new_transaction.id)
    db.add(new_img)
    db.commit()
    
    return Response(content=sticker_data, media_type="image/png")


@app.exception_handler(billing.stripe.error.StripeError)
async def stripe_error_handler(request: Request, exc: billing.stripe.error.StripeError):
    return JSONResponse(
        status_code=500,
        content={"detail": f"Payment processing failed: {str(exc)}"}
    )

@app.post("/payments", tags=["payments"])
async def create_payment_session(
    payment_data: PaymentSessionCreate, 
    db: db_dependency, 
    user: Users = Depends(get_current_user)
):
    checkout_session = await billing.create_payment_session(payment_data, user.id)
    create_payment_session_db(db, checkout_session.id, user.id, payment_data.price)

    return {
        "checkout_url": checkout_session.url
    }
        
@app.get("/payment-status/{session_id}", response_model=PaymentStatusResponse, tags=["payments"])
async def check_payment_status(session_id: str, db: db_dependency, user: Users = Depends(get_current_user)):
    payment_session = get_payment_session_by_stripe_session_id(db, session_id, user.id)
    
    if not payment_session:
        raise HTTPException(status_code=404, detail="Payment session not found")
    
    return PaymentStatusResponse(
        session_id=payment_session.stripe_session_id,
        status=payment_session.status,
        price_id=payment_session.price_id,
        created_at=payment_session.created_at,
        completed_at=payment_session.completed_at
    )


@app.post("/payments/webhook", tags=["payments"])
async def stripe_webhook(request: Request, db: db_dependency):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')

    try:
        event = billing.construct_event(payload, sig_header)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except billing.stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        session_id = session['id']

        user_id = session['metadata']['user_id']

        payment_session = get_payment_session_by_stripe_session_id(db, session_id, user_id)
        if not payment_session:
            raise HTTPException(status_code=404, detail="Payment session not found")
        
        if payment_session.status == "pending":
            payment_session.status = "completed"
            payment_session.completed_at = datetime.datetime.now(datetime.UTC)
            add_credits_to_user(db, payment_session.user_id)
            return {"status": "success"}
        else:
            raise HTTPException(status_code=400, detail="Payment session already completed")
    else:
        raise HTTPException(status_code=400, detail="Invalid event type")
