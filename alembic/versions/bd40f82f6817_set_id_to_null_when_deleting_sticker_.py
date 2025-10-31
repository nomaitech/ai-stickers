"""Set id to NULL when deleting sticker packs

Revision ID: bd40f82f6817
Revises: 662d1d142383
Create Date: 2025-09-15 11:51:11.803752

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "bd40f82f6817"
down_revision: Union[str, Sequence[str], None] = "662d1d142383"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
    ALTER TABLE images
    DROP CONSTRAINT images_sticker_pack_id_fkey;
    ALTER TABLE images
    ADD CONSTRAINT images_sticker_pack_id_fkey
    FOREIGN KEY (sticker_pack_id) REFERENCES sticker_packs(id) ON DELETE SET NULL;
    """)


def downgrade() -> None:
    op.execute("""
    ALTER TABLE images
    DROP CONSTRAINT images_sticker_pack_id_fkey;
    ALTER TABLE images
    ADD CONSTRAINT images_sticker_pack_id_fkey
    FOREIGN KEY (sticker_pack_id) REFERENCES sticker_packs(id);
    """)
