"""Change img storage from TEXT to LargeBinary

Revision ID: a6f195fe346b
Revises: 2229649d48c0
Create Date: 2025-09-04 10:14:45.134231

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a6f195fe346b'
down_revision: Union[str, Sequence[str], None] = '2229649d48c0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
    ALTER TABLE images
    ALTER COLUMN original_img TYPE BYTEA USING original_img::bytea,
    ALTER COLUMN generated_img TYPE BYTEA USING generated_img::bytea;
    """)


def downgrade() -> None:
    op.execute("""
    ALTER TABLE images
    ALTER COLUMN original_img TYPE TEXT,
    ALTER COLUMN generated_img TYPE TEXT;
    """)
