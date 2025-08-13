import asyncio
import os
from pathlib import Path
from src.sticker_factory import generate_sticker
from fastapi import FastAPI, UploadFile, Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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
    sticker_data = await loop.run_in_executor(None, generate_sticker, image_data, REF_IMAGE_PATH)

    return Response(content=sticker_data, media_type="image/png")
    
@app.get("/health")
async def health():
    return {"status": "ok"}