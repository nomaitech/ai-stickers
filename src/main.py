import asyncio
import os
from pathlib import Path
from src.sticker_factory import generate_sticker
from fastapi import FastAPI, UploadFile, Response, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from src.schemas import UserBase
from src.models import Users, get_db, Session
from src.hashed_pwd import hash_password

app = FastAPI()

db_dependency = Annotated[Session, Depends(get_db)]

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="https:\/\/([a-z0-9]+--)?ai-stickers\.netlify\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the path to ref.png relative to the app root
REF_IMAGE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ref.png")


@app.post("/generate-sticker")
async def create_sticker(file: UploadFile):
    image_data = await file.read()
    loop = asyncio.get_running_loop()
    sticker_data = await loop.run_in_executor(
        None, generate_sticker, image_data, REF_IMAGE_PATH
    )

    return Response(content=sticker_data, media_type="image/png")


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/register", status_code=status.HTTP_201_CREATED, tags=["users"])
async def register_new_user(user: UserBase, db: db_dependency):
    new_user = Users(email=user.email, password=hash_password(user.password))
    db.add(new_user)
    db.commit()
    new_user_response = UserBase.model_validate(new_user)
    return new_user_response
