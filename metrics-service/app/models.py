from sqlalchemy import Column, Integer, String, Float, DateTime, func
from .database import Base

class Metric(Base):
    __tablename__ = "metrics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    value = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=func.now())
