"""Add user_id to images table

Revision ID: c3afac8a5896
Revises: a6f195fe346b
Create Date: 2025-09-10 09:28:42.448061

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c3afac8a5896'
down_revision: Union[str, Sequence[str], None] = 'a6f195fe346b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
   op.execute("""
    ALTER TABLE images
    ADD COLUMN user_id integer REFERENCES users (id);
    """)


def downgrade() -> None:
    op.drop_column("images", "new_column")
