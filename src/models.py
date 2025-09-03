__all__ = ["Session", "IntegrityError"]

from sqlalchemy import Column, Integer, DateTime, String, Enum, LargeBinary, ForeignKey, create_engine
from sqlalchemy.orm import Session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import IntegrityError
import os
import enum

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
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True)
    created_at = Column(DateTime, index=True)

    transactions = relationship("Transactions", back_populates="user")

class TransactionList(enum.Enum):
    top_up = "top-up"
    img_generation = "image-generation"
    gift = "gift"

class Transactions(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    current_transaction = Column(Enum(TransactionList), index=True)
    amount = Column(Integer, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    created_at = Column(DateTime, index=True)

    user = relationship("Users", back_populates="transactions")
    images = relationship("Images", back_populates="transaction")

class Images(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)
    original_img = Column(LargeBinary, nullable=False, index=True)
    generated_img = Column(LargeBinary, nullable=False, index=True)
    transaction_id = Column(Integer, ForeignKey("transactions.id"), index=True)
    created_at = Column(DateTime, index=True)

    transaction = relationship("Transactions", back_populates="images")