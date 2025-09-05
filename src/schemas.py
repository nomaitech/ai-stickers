from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    password: str

    class Config:
        from_attributes = True


class UserOut(BaseModel):
    email: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

