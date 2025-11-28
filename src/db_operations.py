from sqlalchemy.orm import Session
from sqlalchemy import func
import datetime
from src.models import PaymentSessions, Transactions, TransactionList, Images


def create_payment_session_db(
    db: Session, stripe_session_id: str, user_id: int, price: str
) -> PaymentSessions:
    payment_session = PaymentSessions(
        stripe_session_id=stripe_session_id,
        user_id=user_id,
        price_id=price,
        status="pending",
    )
    db.add(payment_session)
    db.commit()
    db.refresh(payment_session)
    return payment_session


def get_payment_session_by_stripe_session_id(
    db: Session, stripe_session_id: str, user_id: int
) -> PaymentSessions:
    return (
        db.query(PaymentSessions)
        .filter(
            PaymentSessions.stripe_session_id == stripe_session_id,
            PaymentSessions.user_id == user_id,
        )
        .first()
    )


def update_payment_session_status(
    db: Session, payment_session: PaymentSessions, status: str
) -> PaymentSessions:
    payment_session.status = status
    if status == "completed":
        payment_session.completed_at = datetime.datetime.now(datetime.UTC)
    db.commit()
    db.refresh(payment_session)
    return payment_session


def add_credits_to_user(
    db: Session, user_id: int, payment_session_id: int
) -> Transactions:
    # Mapping of Stripe price IDs to credit amounts
    PRICE_TO_CREDITS = {
        "price_1SY6E5KnbMZqixzhdXQ2l1Qu": 15,   # $5 Basic
        "price_1SY6E5KnbMZqixzhhBPfcnfo": 40,   # $10 Standard
        "price_1SY6E5KnbMZqixzhsQu87ilP": 100,  # $15 Premium
    }

    # Get the payment session to retrieve the price_id
    payment_session = db.query(PaymentSessions).filter(
        PaymentSessions.id == payment_session_id
    ).first()

    if not payment_session:
        raise ValueError(f"Payment session {payment_session_id} not found")

    # Get credits based on price_id
    credits_to_add = PRICE_TO_CREDITS.get(payment_session.price_id)

    if credits_to_add is None:
        raise ValueError(f"Unknown price_id: {payment_session.price_id}")

    new_transaction = Transactions(
        current_transaction=TransactionList.top_up,
        amount=credits_to_add,
        user_id=user_id,
        payment_session_id=payment_session_id,
    )
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction


def get_user_credits(db: Session, user_id: int) -> int:
    return (
        db.query(func.sum(Transactions.amount))
        .filter(
            Transactions.user_id == user_id,
        )
        .scalar()
        or 0
    )


def get_sticker_by_id(db: Session, sticker_id: int, user_id: int) -> Images:
    return (
        db.query(Images)
        .filter(Images.id == sticker_id, Images.user_id == user_id)
        .first()
    )
