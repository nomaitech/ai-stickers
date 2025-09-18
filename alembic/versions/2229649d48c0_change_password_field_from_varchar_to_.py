"""Change password field from VARCHAR to TEXT, so we can store hashed passwords

Revision ID: 2229649d48c0
Revises: 85c81784a2f2
Create Date: 2025-08-20 15:04:58.937869

"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "2229649d48c0"
down_revision: Union[str, Sequence[str], None] = "85c81784a2f2"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
    ALTER TABLE users
    ALTER COLUMN password SET DATA TYPE TEXT;
    """)


def downgrade() -> None:
    op.execute("""
    ALTER TABLE users
    ALTER COLUMN password SET DATA TYPE VARCHAR(50);
    """)
