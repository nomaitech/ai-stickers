"""Add telegram_file_unique_id to stickers table

Revision ID: 5ada8df33d63
Revises: b3de73ffa997
Create Date: 2025-10-27 17:53:21.817074

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5ada8df33d63'
down_revision: Union[str, Sequence[str], None] = 'b3de73ffa997'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('images', sa.Column('telegram_file_id', sa.String(), nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("images", "telegram_file_id")
