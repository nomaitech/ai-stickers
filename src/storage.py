import os
import uuid
from typing import Optional
from io import BytesIO
from PIL import Image
from google.cloud import storage
from google.cloud.exceptions import NotFound
import logging

logger = logging.getLogger(__name__)

class GCSStorage:
    def __init__(self):
        self.bucket_name = os.getenv("GCS_BUCKET_NAME")
        if not self.bucket_name:
            raise ValueError("GCS_BUCKET_NAME environment variable is required")
        
        self.client = storage.Client()
        self.bucket = self.client.bucket(self.bucket_name)
        
    def upload_image(
        self, 
        image_data: bytes, 
        filename: Optional[str] = None,
        content_type: str = "image/png"
    ) -> str:

        try:
            if not filename:
                file_extension = self._get_extension_from_content_type(content_type)
                filename = f"{uuid.uuid4()}{file_extension}"
            
            blob = self.bucket.blob(filename)
            
            blob.upload_from_string(
                image_data,
                content_type=content_type
            )
            
            blob.make_public()
            
            return blob.public_url
            
        except Exception as e:
            logger.error(f"Failed to upload image to GCS: {str(e)}")
            raise
    
    def upload_pil_image(
        self, 
        pil_image: Image.Image, 
        filename: Optional[str] = None,
        format: str = "PNG"
    ) -> str:

        try:
            image_buffer = BytesIO()
            pil_image.save(image_buffer, format=format)
            image_data = image_buffer.getvalue()
            
            content_type = f"image/{format.lower()}"
            if format.upper() == "JPEG":
                content_type = "image/jpeg"
            
            if not filename:
                extension = ".png" if format.upper() == "PNG" else f".{format.lower()}"
                filename = f"{uuid.uuid4()}{extension}"
            
            return self.upload_image(image_data, filename, content_type)
            
        except Exception as e:
            logger.error(f"Failed to upload PIL image to GCS: {str(e)}")
            raise
    
    def _get_extension_from_content_type(self, content_type: str) -> str:
        """Get file extension from content type"""
        extensions = {
            "image/png": ".png",
            "image/jpeg": ".jpg",
            "image/jpg": ".jpg",
            "image/gif": ".gif",
            "image/webp": ".webp"
        }
        return extensions.get(content_type, ".png")
    
storage_client = None

def get_storage_client() -> GCSStorage:
    global storage_client
    if storage_client is None:
        storage_client = GCSStorage()
    return storage_client

def upload_original_image(image_data: bytes) -> str:
    client = get_storage_client()
    filename = f"original/{uuid.uuid4()}.png"
    return client.upload_image(image_data, filename, "image/png")

def upload_generated_image(pil_image: Image.Image) -> str:
    client = get_storage_client()
    filename = f"generated/{uuid.uuid4()}.png"
    return client.upload_pil_image(pil_image, filename, "PNG")
