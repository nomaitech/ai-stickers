from src.sticker_factory import generate_sticker
from fastapi import FastAPI, UploadFile, Response


app = FastAPI()

@app.post("/generate-sticker")
async def create_sticker(file: UploadFile):
    image_data = await file.read()
    
    sticker_data = generate_sticker(image_data, "ref.png")

    return Response(content=sticker_data, media_type="image/png")
    