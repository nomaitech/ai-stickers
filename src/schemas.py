from pydantic import BaseModel, Field, computed_field, EmailStr
from typing import Optional
from datetime import datetime
from src import telegram_bot

class UserSchema(BaseModel):
    email: EmailStr = Field(description="User email address")
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


class RegisterResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

    class Config:
        json_schema_extra = {
            "examples": [
                {
                    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    "token_type": "bearer",
                    "user": {"email": "test@example.com", "credits": 10},
                }
            ]
        }

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
    generation_time: Optional[float] = Field(description="Image generation time")
    class Config:
        from_attributes = True
        json_schema_extra = {
            "examples": [{"original_img_url": "https://example.com/original.png", "generated_img_url": "https://example.com/generated.png"}]
        }

class UpdateSticker(BaseModel):
    emoji: Optional[str] = None
    sticker_pack_id: Optional[int] = None


class StickerPackSchema(BaseModel):
    id: int = Field(description="Sticker pack ID")
    name: str = Field(description="Sticker pack title", alias="title")
    user_id: int = Field(description="User ID")
    created_at: datetime = Field(description="Sticker pack creation timestamp")

    @property
    def sticker_pack_name(self) -> str:
        return f"{self.name.replace(' ', '_')}_by_{telegram_bot.BOT_USERNAME}"


    @computed_field
    @property
    def telegram_url(self) -> str:
        return f"https://t.me/addstickers/{self.sticker_pack_name}"

    class Config:
        from_attributes = True
        validate_by_name=True
        validate_by_alias=True

class StickerPackCreate(BaseModel):
    name: str = Field(description="Sticker pack name")
    stickers: Optional[list[int]] = Field(description="List of sticker IDs")
    
    class Config:
        from_attributes = True
        json_schema_extra = {"examples": [{"name": "My Awesome Stickers"}]}


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

