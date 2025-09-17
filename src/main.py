import asyncio
import os
from pathlib import Path
from fastapi import FastAPI
from src.custom_swagger import override_openapi_schema
from src.sticker_factory import generate_sticker
from fastapi import FastAPI, UploadFile, Response, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from src.schemas import UserBase, UserOut, Token
from src.models import Users, get_db, Session, IntegrityError, Images, Transactions, TransactionList
from src.hashed_pwd import hash_password, verify_password
from fastapi.security import OAuth2PasswordBearer
from src.auth import create_access_token, verify_token
from src.security import LoginRequestForm
import logging
from sqlalchemy import func


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


@app.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED, tags=["users"])
async def register_new_user(user: UserBase, db: db_dependency):
    try:
        new_user = Users(email=user.email, password=hash_password(user.password))
        db.add(new_user)
        db.commit()
        new_user_response = UserBase.model_validate(new_user)
    except IntegrityError:
        # Error might be related to something other than email already registered
        raise HTTPException(status_code=400, detail="Email already registered")
    return new_user_response


@app.post("/login", response_model=Token)
async def login(db: db_dependency, form_data: LoginRequestForm = Depends()):
    user = db.query(Users).filter(Users.email == form_data.email).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}

async def get_current_user(db: db_dependency, token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_id = payload.get("sub")
    user = db.query(Users).get(user_id)
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user


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

