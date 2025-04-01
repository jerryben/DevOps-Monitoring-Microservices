from pydantic import BaseModel
from datetime import datetime

class MetricBase(BaseModel):
    name: str
    value: float

class MetricCreate(MetricBase):
    pass

class MetricResponse(MetricBase):
    id: int
    timestamp: datetime

    class Config:
        orm_mode = True
