"""Set id's to null when deleting a user

Revision ID: 5afc8c466927
Revises: 3219f86237e0
Create Date: 2025-11-05 11:22:57.786748

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5afc8c466927'
down_revision: Union[str, Sequence[str], None] = '3219f86237e0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("""
    ALTER TABLE images
    DROP CONSTRAINT images_user_id_fkey;
    ALTER TABLE images
    ADD CONSTRAINT images_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;
    """)

    op.execute("""
    ALTER TABLE images
    DROP CONSTRAINT images_transaction_id_fkey;
    ALTER TABLE images
    ADD CONSTRAINT images_transaction_id_fkey
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE SET NULL;
    """)

    op.execute("""
    ALTER TABLE sticker_packs
    DROP CONSTRAINT sticker_packs_user_id_fkey;
    ALTER TABLE sticker_packs
    ADD CONSTRAINT sticker_packs_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;
    """)

    op.execute("""
    ALTER TABLE transactions
    DROP CONSTRAINT transactions_user_id_fkey;
    ALTER TABLE transactions
    ADD CONSTRAINT transactions_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    """)

    op.execute("""
    ALTER TABLE payment_sessions
    DROP CONSTRAINT payment_sessions_user_id_fkey;
    ALTER TABLE payment_sessions
    ADD CONSTRAINT payment_sessions_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    """)


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("""
    ALTER TABLE images
    DROP CONSTRAINT images_user_id_fkey;
    ALTER TABLE images
    ADD CONSTRAINT images_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id);
    """)

    op.execute("""
    ALTER TABLE images
    DROP CONSTRAINT images_transaction_id_fkey;
    ALTER TABLE images
    ADD CONSTRAINT images_transaction_id_fkey
    FOREIGN KEY (transaction_id) REFERENCES transactions(id);
    """)

    op.execute("""
    ALTER TABLE sticker_packs
    DROP CONSTRAINT sticker_packs_user_id_fkey;
    ALTER TABLE sticker_packs
    ADD CONSTRAINT sticker_packs_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id);
    """)

    op.execute("""
    ALTER TABLE transactions
    DROP CONSTRAINT transactions_user_id_fkey;
    ALTER TABLE transactions
    ADD CONSTRAINT transactions_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id);
    """)

    op.execute("""
    ALTER TABLE payment_sessions
    DROP CONSTRAINT payment_sessions_user_id_fkey;
    ALTER TABLE payment_sessions
    ADD CONSTRAINT payment_sessions_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id);
    """)