"""Rename telegram_file_id for telegram_file_unique_id

Revision ID: 820f695da917
Revises: 2586882db843
Create Date: 2025-10-29 14:56:19.217169

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '820f695da917'
down_revision: Union[str, Sequence[str], None] = '2586882db843'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("""
    ALTER TABLE images
    RENAME COLUMN telegram_file_id TO telegram_file_unique_id;
    """)


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("""
    ALTER TABLE images
    RENAME COLUMN telegram_file_unique_id TO telegram_file_id;
    """)
