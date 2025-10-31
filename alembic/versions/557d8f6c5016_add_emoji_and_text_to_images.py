"""Add emoji and text to images

Revision ID: 557d8f6c5016
Revises: c3afac8a5896
Create Date: 2025-09-11 08:27:39.516424

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "557d8f6c5016"
down_revision: Union[str, Sequence[str], None] = "c3afac8a5896"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
    ALTER TABLE images
    ADD COLUMN emoji TEXT,
    ADD COLUMN prompt TEXT;
    """)


def downgrade() -> None:
    op.drop_column("images", "emoji")
    op.drop_column("images", "prompt")
