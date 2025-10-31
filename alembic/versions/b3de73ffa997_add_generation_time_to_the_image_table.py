"""Add generation_time to the image table

Revision ID: b3de73ffa997
Revises: bd40f82f6817
Create Date: 2025-10-21 16:25:35.021993

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "b3de73ffa997"
down_revision: Union[str, Sequence[str], None] = "bd40f82f6817"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
    ALTER TABLE images
    ADD COLUMN generation_time FLOAT
    """)


def downgrade() -> None:
    op.drop_column("images", "generation_time")
