from main import generate_sticker
from fastapi import FastAPI

generate_sticker("itz-code.jpg", "ref.png", "output.png")

app = FastAPI()

@app.post("/generate-sticker")

