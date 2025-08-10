import base64
from openai import OpenAI
from PIL import Image
import io

client = OpenAI()

def encode_image(file_path):
    with open(file_path, "rb") as f:
        base64_image = base64.b64encode(f.read()).decode("utf-8")
    return base64_image

def resize_image(image_data):
    
    img = Image.open(io.BytesIO(image_data))
    img = img.resize((512, 512), Image.LANCZOS)

    resized_image = io.BytesIO()
    img.save(resized_image, format="png")
    
    return resized_image.getvalue()

def generate_sticker(image_data, ref_path):
    
    prompt = """Using the style of the first image provided as reference for the art style, generate a Telegram-style sticker of the second image provided. Make sure the background is transparent and focus on the main subjects of the image.
    """

    base64_image1 = encode_image(ref_path)
    base64_image2 = base64.b64encode(image_data).decode("utf-8")

    response = client.responses.create(
        model="gpt-4.1",
        input=[
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": prompt},
                    {
                        "type": "input_image",
                        "image_url": f"data:image/jpeg;base64,{base64_image1}",
                    },
                    {
                        "type": "input_image",
                        "image_url": f"data:image/jpeg;base64,{base64_image2}",
                    },
                ],
            }
        ],
        tools=[{
            "type": "image_generation", "size": "1024x1024", "background": "transparent"}],
    )

    image_generation_calls = [
        output
        for output in response.output
        if output.type == "image_generation_call"
    ]

    image_data = [output.result for output in image_generation_calls]

    if image_data:
        image_base64 = image_data[0]
        decoded_image_data = base64.b64decode(image_base64)
        return resize_image(decoded_image_data)
    raise