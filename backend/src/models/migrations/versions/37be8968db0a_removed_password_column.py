"""removed password column

Revision ID: 37be8968db0a
Revises: 5192a09649d0
Create Date: 2022-09-16 17:37:37.419342

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '37be8968db0a'
down_revision = '5192a09649d0'
branch_labels = None
depends_on = None


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()





def upgrade_():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade_():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(length=60), nullable=False))

    # ### end Alembic commands ###
