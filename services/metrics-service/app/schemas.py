from pydantic import BaseModel
from datetime import datetime

class MetricBase(BaseModel):
    cpu_usage: float
    memory_usage: float
    disk_usage: float
    network_sent: float
    network_received: float

class MetricCreate(MetricBase):
    pass

class Metric(MetricBase):
    id: int
    timestamp: datetime

    class Config:
        orm_mode = True
