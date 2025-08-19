from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    email: str
    password: str
    created_at: datetime

    class Config:
        from_attributes = True