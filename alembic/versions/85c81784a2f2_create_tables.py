"""create tables

Revision ID: 85c81784a2f2
Revises: 
Create Date: 2025-08-08 16:18:15.622785

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '85c81784a2f2'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.execute("""
        CREATE TABLE test (
            id UUID PRIMARY KEY,
            name TEXT NOT NULL
        );
    """)

def downgrade():
    op.execute("""
        DROP TABLE test;
    """)