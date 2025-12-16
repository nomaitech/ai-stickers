import base64
from openai import OpenAI
from PIL import Image
import io

client = OpenAI()


def resize_image(image_data):
    img = Image.open(io.BytesIO(image_data))
    img = img.resize((512, 512), Image.LANCZOS)

    resized_image = io.BytesIO()
    img.save(resized_image, format="png")

    return resized_image.getvalue()


def generate_sticker(image_data, filename, ref_path, user_prompt):
    prompt = """Using the style of the first image provided as reference for the art style, generate a Telegram-style sticker of the second image provided. Make sure the background is transparent and focus on the main subjects of the image.
    """
    if user_prompt:
        prompt += f" Additionally, follow these instructions: {user_prompt}"

    image_data = io.BytesIO(image_data)
    image_data.name = filename

    result = client.images.edit(
        model="gpt-image-1.5-2025-12-16",
        image=[open(ref_path, "rb"), image_data],
        prompt=prompt,
        background="transparent",
        size="1024x1024",
    )
    image_base64 = result.data[0].b64_json
    decoded_image_data = base64.b64decode(image_base64)
    return resize_image(decoded_image_data)
