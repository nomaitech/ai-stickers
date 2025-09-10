import sys
from pathlib import Path

project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

from src.models import Users, Transactions, TransactionList, get_db, Session  # noqa: E402


def add_credit(db: Session, email):
    user = db.query(Users).filter(Users.email == email).first()
    if not user:
        print(f"User with email {email} not found")
        return None

    new_transaction = Transactions(
        current_transaction=TransactionList.top_up, amount=10, user_id=user.id
    )
    db.add(new_transaction)
    db.commit()
    print(f"Added 10 credits to user {email}")
    return new_transaction


def main():
    db_generator = get_db()
    db = next(db_generator)

    try:
        add_credit(db, "test")
    finally:
        db.close()


if __name__ == "__main__":
    main()
