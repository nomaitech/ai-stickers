"""Change sticker_pack_name for sticker_pack_tilte

Revision ID: c52c6b9d9f9a
Revises: 5ada8df33d63
Create Date: 2025-10-28 15:59:08.558870

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c52c6b9d9f9a'
down_revision: Union[str, Sequence[str], None] = '5ada8df33d63'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
    ALTER TABLE sticker_packs
    RENAME COLUMN name TO title;
    """)


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("""
    ALTER TABLE sticker_packs
    RENAME COLUMN title TO name;
    """)
