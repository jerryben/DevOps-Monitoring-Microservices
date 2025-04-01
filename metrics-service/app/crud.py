from sqlalchemy.orm import Session
from . import models, schemas

def create_metric(db: Session, metric: schemas.MetricCreate):
    db_metric = models.Metric(name=metric.name, value=metric.value)
    db.add(db_metric)
    db.commit()
    db.refresh(db_metric)
    return db_metric

def get_metrics(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Metric).offset(skip).limit(limit).all()
