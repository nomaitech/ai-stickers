from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: str = Field(description="User email address")
    password: str = Field(description="User password")

    class Config:
        from_attributes = True
        json_schema_extra = {
            "examples": [
                {
                    "email": "test@example.com",
                    "password": "password123"
                }
            ]
        }


class UserOut(BaseModel):
    email: str = Field(description="User email address")
    credits: Optional[int] = Field(description="User credits", default=0)

    class Config:
        from_attributes = True
        json_schema_extra = {
            "examples": [
                {
                    "email": "test@example.com",
                    "credits": 10
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
                    "token_type": "bearer"
                }
            ]
        }


class PaymentSessionCreate(BaseModel):
    price: str = Field(description="Stripe price ID")

    class Config:
        from_attributes = True
        json_schema_extra = {
            "examples": [
                {
                    "price": "price_1RtrY9AttlqijaIVwcdBO5M5"
                }
            ]
        }


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
                    "completed_at": "2024-01-15T10:35:00Z"
                }
            ]
        }

