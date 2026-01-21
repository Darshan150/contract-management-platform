from sqlalchemy import Column, Integer, String, JSON, DateTime
from database import Base
from datetime import datetime

class Blueprint(Base):
    __tablename__ = "blueprints"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    fields = Column(JSON, nullable=False)

class Contract(Base):
    __tablename__ = "contracts"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    blueprint_id = Column(Integer)
    fields = Column(JSON)
    status = Column(String, default="Created")
    created_at = Column(DateTime, default=datetime.utcnow)

