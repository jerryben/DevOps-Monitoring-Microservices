from sqlalchemy.orm import Session
from . import models, schemas

def create_metric(db: Session, metric: schemas.MetricCreate):
    db_metric = models.Metric(
        cpu_usage=metric.cpu_usage,
        memory_usage=metric.memory_usage,
        disk_usage=metric.disk_usage,
        network_sent=metric.network_sent,
        network_received=metric.network_received,
    )
    db.add(db_metric)
    db.commit()
    db.refresh(db_metric)
    return db_metric

def get_metrics(db: Session, limit: int = 100):
    return db.query(models.Metric).order_by(models.Metric.timestamp.desc()).limit(limit).all()
