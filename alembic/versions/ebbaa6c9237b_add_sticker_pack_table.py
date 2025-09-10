"""Add sticker-pack table

Revision ID: ebbaa6c9237b
Revises: 557d8f6c5016
Create Date: 2025-09-13 10:06:38.170223

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ebbaa6c9237b'
down_revision: Union[str, Sequence[str], None] = '557d8f6c5016'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE IF NOT EXISTS sticker_packs (
            id SERIAL PRIMARY KEY,
            name TEXT,
            user_id integer REFERENCES users (id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    """)

def downgrade() -> None:
    op.execute("""
        DROP TABLE IF EXISTS sticker_packs CASCADE;
    """)
