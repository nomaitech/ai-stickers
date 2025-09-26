from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class UserSchema(BaseModel):
    email: str = Field(description="User email address")
    password: str = Field(description="User password")

    class Config:
        from_attributes = True
        json_schema_extra = {
            "examples": [{"email": "test@example.com", "password": "password123"}]
        }

   
class UserOut(BaseModel):
    email: str = Field(description="User email address")
    credits: Optional[int] = Field(description="User credits")

    class Config:
        from_attributes = True
        json_schema_extra = {"examples": [{"email": "test@example.com", "credits": 10}]}


class Token(BaseModel):
    access_token: str = Field(description="JWT access token")
    token_type: str = Field(default="bearer", description="Token type")

    class Config:
        from_attributes = True
        json_schema_extra = {
            "examples": [
                {
                    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    "token_type": "bearer",
                }
            ]
        }

class StickersResponse(BaseModel):
    id: int = Field(description="Image ID")
    transaction_id: int = Field(description="Transaction ID")
    created_at: datetime = Field(description="Image creation timestamp")
    original_img_url: str = Field(description="Original image URL")
    generated_img_url: str = Field(description="Generated image URL")
    user_id: int = Field(description="User ID")
    emoji: str = Field(description="Emoji")
    prompt: Optional[str] = Field(description="Prompt")
    sticker_pack_id: Optional[int] = Field(description="Sticker pack ID")
    class Config:
        orm_mode = True
        from_attributes = True
        json_schema_extra = {
            "examples": [{"original_img_url": "https://example.com/original.png", "generated_img_url": "https://example.com/generated.png"}]
        }

class UpdateSticker(BaseModel):
    emoji: Optional[str] = None
    sticker_pack_id: Optional[int] = None


class StickerPackSchema(BaseModel):
    id: int = Field(description="Sticker pack ID")
    name: str = Field(description="Sticker pack name")
    user_id: int = Field(description="User ID")
    created_at: datetime = Field(description="Sticker pack creation timestamp")

class PaymentSessionCreate(BaseModel):
    price: str = Field(description="Stripe price ID")

    class Config:
        from_attributes = True
        json_schema_extra = {"examples": [{"price": "price_1RtrY9AttlqijaIVwcdBO5M5"}]}


class PaymentStatusResponse(BaseModel):
    session_id: str = Field(description="Stripe session ID")
    status: str = Field(description="Payment session status")
    created_at: datetime = Field(description="Session creation timestamp")
    completed_at: Optional[datetime] = Field(description="Payment completion timestamp")

    class Config:
        from_attributes = True
        json_schema_extra = {
            "examples": [
                {
                    "session_id": "cs_test_1234567890",
                    "status": "complete",
                    "created_at": "2024-01-15T10:30:00Z",
                    "completed_at": "2024-01-15T10:35:00Z",
                }
            ]
        }

