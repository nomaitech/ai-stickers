"""Add is_public column to stickers

Revision ID: fca1ff7fac97
Revises: b3de73ffa997
Create Date: 2025-10-24 19:44:17.915008

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fca1ff7fac97'
down_revision: Union[str, Sequence[str], None] = 'b3de73ffa997'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column("images", sa.Column("is_public", sa.Boolean(), nullable=False, default=True, server_default=sa.true()))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("images", "is_public")
