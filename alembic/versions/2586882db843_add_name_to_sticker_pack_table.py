"""Add name to sticker-pack table

Revision ID: 2586882db843
Revises: c52c6b9d9f9a
Create Date: 2025-10-29 12:33:00.655054

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from src import telegram_bot
import asyncio

# revision identifiers, used by Alembic.
revision: str = "2586882db843"
down_revision: Union[str, Sequence[str], None] = "c52c6b9d9f9a"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    loop = asyncio.get_event_loop()
    bot_username = loop.run_until_complete(telegram_bot.fetch_username())

    op.add_column("sticker_packs", sa.Column("name", sa.Text(), nullable=True))

    op.execute(f"""
    UPDATE sticker_packs
    SET name = REPLACE(title, ' ', '_') || '_by_{bot_username}'
    WHERE name IS NULL;
    """)

    op.alter_column("sticker_packs", "name", nullable=False)


def downgrade() -> None:
    op.drop_column("sticker_packs", "name")
