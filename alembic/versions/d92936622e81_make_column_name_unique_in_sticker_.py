"""Make column name unique in sticker_packs table

Revision ID: d92936622e81
Revises: 820f695da917
Create Date: 2025-10-29 15:51:51.230720

"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "d92936622e81"
down_revision: Union[str, Sequence[str], None] = "820f695da917"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("""
    ALTER TABLE sticker_packs
    ADD CONSTRAINT unique_name UNIQUE (name);
    """)


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("""
    ALTER TABLE sticker_packs
    DROP CONSTRAINT unique_name;
    """)
