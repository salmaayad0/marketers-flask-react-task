from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
import datetime

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

    @classmethod
    def getUser(cls, id):
        return cls.query.get_or_404(id)


class Project(db.Model):
    __tablename__= 'Projects'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(250))
    start = db.Column(db.Integer(), default=0)
    end = db.Column(db.Integer(), default=0)
    user_id = db.Column(db.Integer(), db.ForeignKey('Users.id'))
    
