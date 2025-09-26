"""Create payment sessions table

Revision ID: 961e166462cd
Revises: 2229649d48c0
Create Date: 2025-09-11 20:43:16.621660

"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "961e166462cd"
down_revision: Union[str, Sequence[str], None] = "2229649d48c0"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.execute("""
        CREATE TABLE IF NOT EXISTS payment_sessions (
            id SERIAL PRIMARY KEY,
            stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
            user_id INTEGER NOT NULL REFERENCES users (id),
            price_id VARCHAR(255) NOT NULL,
            status VARCHAR(50) DEFAULT 'pending',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            completed_at TIMESTAMP WITH TIME ZONE
        );
        
        CREATE INDEX IF NOT EXISTS idx_payment_sessions_stripe_session_id ON payment_sessions (stripe_session_id);
        CREATE INDEX IF NOT EXISTS idx_payment_sessions_user_id ON payment_sessions (user_id);
        CREATE INDEX IF NOT EXISTS idx_payment_sessions_status ON payment_sessions (status);
        CREATE INDEX IF NOT EXISTS idx_payment_sessions_created_at ON payment_sessions (created_at);
        CREATE INDEX IF NOT EXISTS idx_payment_sessions_completed_at ON payment_sessions (completed_at);
    """)


def downgrade():
    op.execute("""
        DROP TABLE IF EXISTS payment_sessions CASCADE;
    """)
