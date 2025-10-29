"""Add name to sticker-pack table

Revision ID: 2586882db843
Revises: c52c6b9d9f9a
Create Date: 2025-10-29 12:33:00.655054

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2586882db843'
down_revision: Union[str, Sequence[str], None] = 'c52c6b9d9f9a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
    ALTER TABLE sticker_packs
    ADD COLUMN name TEXT;
    """)


def downgrade() -> None:
    op.drop_column("sticker_packs", "name")