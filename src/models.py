__all__ = ['Session']

from sqlalchemy import Column, Integer, DateTime, String, ForeignKey, create_engine
from sqlalchemy.orm import Session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
import os

engine = create_engine(os.getenv("DATABASE_URL"))

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
class Users(Base):
     __tablename__ = "users"

     id = Column(Integer, primary_key=True, index=True)
     email = Column(String, index=True)
     password = Column(String, index=True)
     created_at = Column(DateTime, index=True)