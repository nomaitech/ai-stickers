"""Change title to varchar

Revision ID: 3219f86237e0
Revises: d92936622e81
Create Date: 2025-10-31 20:55:01.885742

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3219f86237e0'
down_revision: Union[str, Sequence[str], None] = 'd92936622e81'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column("sticker_packs", "title", type_=sa.VARCHAR(64))


def downgrade() -> None:
    """Downgrade schema."""
    op.alter_column("sticker_packs", "title", type_=sa.TEXT)
