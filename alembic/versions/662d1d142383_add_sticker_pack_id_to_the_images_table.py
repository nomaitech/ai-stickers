"""Add sticker_pack_id to the images table

Revision ID: 662d1d142383
Revises: ebbaa6c9237b
Create Date: 2025-09-13 10:37:15.113903

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "662d1d142383"
down_revision: Union[str, Sequence[str], None] = "ebbaa6c9237b"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
    ALTER TABLE images
    ADD COLUMN sticker_pack_id integer REFERENCES sticker_packs (id);
    """)


def downgrade() -> None:
    op.drop_column("images", "new_column")
