import base64
from openai import OpenAI
from PIL import Image

client = OpenAI()

def generate_sticker(image_path, ref_path, output_path):
    
    def encode_image(file_path):
        with open(file_path, "rb") as f:
            base64_image = base64.b64encode(f.read()).decode("utf-8")
        return base64_image

    def resize_image(file_path):
        img = Image.open(file_path)
        img = img.resize((512, 512), Image.LANCZOS)
        img.save(file_path)


    prompt = """Using the style of the first image provided as reference for the art style, generate a Telegram-style sticker of the second image provided.
    """

    base64_image1 = encode_image(ref_path)
    base64_image2 = encode_image(image_path)

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
            "type": "image_generation", "background": "transparent"}],
    )

    image_generation_calls = [
        output
        for output in response.output
        if output.type == "image_generation_call"
    ]

    image_data = [output.result for output in image_generation_calls]

    if image_data:
        image_base64 = image_data[0]
        with open(output_path, "wb") as f:
            f.write(base64.b64decode(image_base64))
        resize_image(output_path)
    else:
        print(response.output.content)

    return output_path