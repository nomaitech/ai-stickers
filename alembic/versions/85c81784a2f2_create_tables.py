"""create tables

Revision ID: 85c81784a2f2
Revises:
Create Date: 2025-08-08 16:18:15.622785

"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "85c81784a2f2"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(100) UNIQUE,
            password VARCHAR(50),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TYPE transaction AS ENUM ('top_up', 'image_generation', 'gift');

        CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            current_transaction TRANSACTION,
            amount integer,
            user_id integer REFERENCES users (id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS images (
            id SERIAL PRIMARY KEY,
            original_img TEXT,
            generated_img TEXT,
            transaction_id integer REFERENCES transactions (id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    """)


def downgrade():
    op.execute("""
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS transactions CASCADE;
        DROP TABLE IF EXISTS images CASCADE;
        DROP TYPE transaction;
    """)
