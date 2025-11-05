import os
import uuid
from typing import Optional
from google.cloud import storage
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
        content_type: str = "image/png",
    ) -> str:
        try:
            if not filename:
                file_extension = self._get_extension_from_content_type(content_type)
                filename = f"{uuid.uuid4()}{file_extension}"

            blob = self.bucket.blob(filename)

            blob.upload_from_string(image_data, content_type=content_type)

            blob.make_public()

            return blob.public_url

        except Exception as e:
            logger.error(f"Failed to upload image to GCS: {str(e)}")
            raise

    def _get_extension_from_content_type(self, content_type: str) -> str:
        """Get file extension from content type"""
        extensions = {
            "image/png": ".png",
            "image/jpeg": ".jpg",
            "image/jpg": ".jpg",
            "image/gif": ".gif",
            "image/webp": ".webp",
        }
        return extensions.get(content_type, ".png")


storage_client = None


def get_storage_client() -> GCSStorage:
    global storage_client
    if storage_client is None:
        storage_client = GCSStorage()
    return storage_client


def upload_image_to_gcs(image_data: bytes, dest: str) -> str:
    client = get_storage_client()
    filename = f"{dest}/{uuid.uuid4()}.png"
    return client.upload_image(image_data, filename, "image/png")
