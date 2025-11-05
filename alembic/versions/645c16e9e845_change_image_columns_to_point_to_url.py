"""Change image columns to point to url

Revision ID: 645c16e9e845
Revises: 961e166462cd
Create Date: 2025-09-12 17:23:35.150091

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "645c16e9e845"
down_revision: Union[str, Sequence[str], None] = "961e166462cd"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column("images", "original_img")
    op.drop_column("images", "generated_img")

    op.add_column("images", sa.Column("original_img_url", sa.String(), nullable=False))
    op.add_column("images", sa.Column("generated_img_url", sa.String(), nullable=False))

    op.create_index(
        op.f("ix_images_original_img_url"), "images", ["original_img_url"], unique=False
    )
    op.create_index(
        op.f("ix_images_generated_img_url"),
        "images",
        ["generated_img_url"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_images_generated_img_url"), table_name="images")
    op.drop_index(op.f("ix_images_original_img_url"), table_name="images")
    op.drop_column("images", "generated_img_url")
    op.drop_column("images", "original_img_url")

    op.add_column(
        "images",
        sa.Column(
            "generated_img", sa.LargeBinary(), autoincrement=False, nullable=False
        ),
    )
    op.add_column(
        "images",
        sa.Column(
            "original_img", sa.LargeBinary(), autoincrement=False, nullable=False
        ),
    )
