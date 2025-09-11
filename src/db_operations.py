from sqlalchemy.orm import Session
from sqlalchemy import func
import datetime
from src.models import PaymentSessions, Transactions, TransactionList


def create_payment_session_db(db: Session, stripe_session_id: str, user_id: int, price: str) -> PaymentSessions:
    payment_session = PaymentSessions(
        stripe_session_id=stripe_session_id,
        user_id=user_id,
        price_id=price,
        status="pending"
    )
    db.add(payment_session)
    db.commit()
    db.refresh(payment_session)
    return payment_session


def get_payment_session_by_stripe_session_id(db: Session, stripe_session_id: str, user_id: int) -> PaymentSessions:
    return db.query(PaymentSessions).filter(
        PaymentSessions.stripe_session_id == stripe_session_id,
        PaymentSessions.user_id == user_id
    ).first()


def update_payment_session_status(db: Session, payment_session: PaymentSessions, status: str) -> PaymentSessions:
    payment_session.status = status
    if status == "completed":
        payment_session.completed_at = datetime.datetime.now(datetime.UTC)
    db.commit()
    db.refresh(payment_session)
    return payment_session


def add_credits_to_user(db: Session, user_id: int) -> Transactions:
    credits_to_add = 10
    new_transaction = Transactions(
        current_transaction=TransactionList.top_up,
        amount=credits_to_add,
        user_id=user_id
    )
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction

def get_user_credits(db: Session, user_id: int) -> int:
    return db.query(func.sum(Transactions.amount)).filter(
        Transactions.user_id == user_id,
    ).scalar() or 0