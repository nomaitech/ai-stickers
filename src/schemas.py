from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    email: str
    password: str

    class Config:
        from_attributes = True