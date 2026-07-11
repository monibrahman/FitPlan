from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__="users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable = False)
    full_name =Column(String, nullable=True)
    profile = relationship("Profile", back_populates="user")

class Profile(Base):
    __tablename__="profiles"

    id = Column(Integer, primary_key=True, index=True)
    age = Column(Integer, nullable=True)
    weight = Column(Float, nullable=True )
    height = Column(Float, nullable=True)
    goal = Column(String, nullable=True)
    activity_level = Column(String, nullable=True)
    dietary_preference = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable = False)
    user = relationship("User", back_populates="profile")
