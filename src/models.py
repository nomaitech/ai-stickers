__all__ = ["Session", "IntegrityError"]

from sqlalchemy import (
    Column,
    Integer,
    Float,
    DateTime,
    String,
    Enum,
    ForeignKey,
    create_engine,
    func,
    Boolean,
)
from sqlalchemy.orm import Session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import IntegrityError
import os
import enum
from src import telegram_bot

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
    created_at = Column(DateTime, index=True, server_default=func.current_timestamp())

    transactions = relationship("Transactions", back_populates="user")
    payment_sessions = relationship("PaymentSessions", back_populates="user")
    images = relationship("Images", back_populates="user")
    sticker_packs = relationship("StickerPacks", back_populates="user")


class TransactionList(enum.Enum):
    top_up = "top-up"
    image_generation = "image-generation"
    gift = "gift"


class Transactions(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    current_transaction = Column(Enum(TransactionList), index=True)
    amount = Column(Integer, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    created_at = Column(DateTime, index=True, server_default=func.current_timestamp())
    payment_session_id = Column(Integer, ForeignKey("payment_sessions.id"), index=True)

    user = relationship("Users", back_populates="transactions")
    images = relationship("Images", back_populates="transaction")
    payment_session = relationship("PaymentSessions", back_populates="transactions")


class PaymentSessions(Base):
    __tablename__ = "payment_sessions"

    id = Column(Integer, primary_key=True, index=True)
    stripe_session_id = Column(String, unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), index=True, nullable=False)
    price_id = Column(String, index=True, nullable=False)
    status = Column(String, index=True, default="pending")  # pending, completed, failed
    created_at = Column(DateTime, index=True, server_default=func.current_timestamp())
    completed_at = Column(DateTime, index=True, nullable=True)

    user = relationship("Users", back_populates="payment_sessions")
    transactions = relationship("Transactions", back_populates="payment_session")


class Images(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)
    original_img_url = Column(String, nullable=False, index=True)
    generated_img_url = Column(String, nullable=False, index=True)
    transaction_id = Column(Integer, ForeignKey("transactions.id"), index=True)
    created_at = Column(DateTime, index=True, server_default=func.current_timestamp())
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    emoji = Column(String, nullable=False, index=True)
    prompt = Column(String, nullable=True, index=True)
    sticker_pack_id = Column(Integer, ForeignKey("sticker_packs.id"), index=True)
    generation_time = Column(Float, nullable=True)
    telegram_file_unique_id = Column(String, nullable=True)
    is_public = Column(Boolean, nullable=False, default=True)
    
    transaction = relationship("Transactions", back_populates="images")
    user = relationship("Users", back_populates="images")
    sticker_pack = relationship("StickerPacks", back_populates="images")

    def to_tg_inputsticker(self) -> telegram_bot.InputSticker:
        return telegram_bot.InputSticker(
            sticker=self.generated_img_url,
            emoji_list=[self.emoji],
            format=telegram_bot.StickerFormat.STATIC,
        )


class StickerPacks(Base):
    __tablename__ = "sticker_packs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    created_at = Column(DateTime, index=True, server_default=func.current_timestamp())
    name = Column(String, nullable=False, unique=True, index=True)

    user = relationship("Users", back_populates="sticker_packs")
    images = relationship("Images", back_populates="sticker_pack")
