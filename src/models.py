from src.database import Base
from sqlalchemy import Column, Integer, DateTime, String, ForeignKey
from sqlalchemy.orm import relationship

class Users(Base):
     __tablename__ = "users"

     id = Column(Integer, primary_key=True, index=True)
     email = Column(String, index=True)
     password = Column(String, index=True)
     created_at = Column(DateTime, index=True)