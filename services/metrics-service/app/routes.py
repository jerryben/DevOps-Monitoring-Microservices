from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from . import crud, schemas
from .database import get_db

router = APIRouter()

@router.get("/metrics", response_model=list[schemas.Metric])
def read_metrics(limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_metrics(db, limit=limit)

@router.post("/metrics", response_model=schemas.Metric)
def create_metric(metric: schemas.MetricCreate, db: Session = Depends(get_db)):
    return crud.create_metric(db, metric)
