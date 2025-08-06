import os
from pathlib import Path
from src.sticker_factory import generate_sticker
from fastapi import FastAPI, UploadFile, Response


app = FastAPI()

# Get the path to ref.png relative to the app root
REF_IMAGE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ref.png")

@app.post("/generate-sticker")
async def create_sticker(file: UploadFile):
    image_data = await file.read()
    
    sticker_data = generate_sticker(image_data, REF_IMAGE_PATH)

    return Response(content=sticker_data, media_type="image/png")
    
@app.get("/health")
async def health():
    return {"status": "ok"}