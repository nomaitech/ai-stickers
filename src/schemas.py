from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    password: str

    class Config:
        from_attributes = True