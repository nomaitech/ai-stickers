"""Add payment_session_id to transaction table

Revision ID: 79dedccc6231
Revises: 645c16e9e845
Create Date: 2025-09-15 16:58:28.713183

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '79dedccc6231'
down_revision: Union[str, Sequence[str], None] = '645c16e9e845'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('transactions', sa.Column('payment_session_id', sa.Integer(), nullable=True))
    
    op.create_foreign_key(
        'fk_transactions_payment_session_id',
        'transactions', 'payment_sessions',
        ['payment_session_id'], ['id']
    )
    
    op.create_index('idx_transactions_payment_session_id', 'transactions', ['payment_session_id'])


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index('idx_transactions_payment_session_id', table_name='transactions')
    
    op.drop_constraint('fk_transactions_payment_session_id', 'transactions', type_='foreignkey')
    
    op.drop_column('transactions', 'payment_session_id')
