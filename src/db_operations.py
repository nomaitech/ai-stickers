from sqlalchemy.orm import Session
import datetime
from src.models import PaymentSessions, Transactions, TransactionList
from src.schemas import PaymentStatusResponse


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


def get_payment_status_response(db: Session, session_id: str) -> PaymentStatusResponse:
    payment_session = get_payment_session_by_stripe_session_id(db, session_id)
    
    if not payment_session:
        return None
    
    return PaymentStatusResponse(
        session_id=payment_session.stripe_session_id,
        status=payment_session.status,
        price_id=payment_session.price_id,
        created_at=payment_session.created_at,
        completed_at=payment_session.completed_at
    ) 