from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .database import get_db
from . import schemas, crud

router = APIRouter()

@router.post("/metrics/", response_model=schemas.MetricResponse)
def create_metric(metric: schemas.MetricCreate, db: Session = Depends(get_db)):
    return crud.create_metric(db=db, metric=metric)

@router.get("/metrics/", response_model=list[schemas.MetricResponse])
def read_metrics(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_metrics(db=db, skip=skip, limit=limit)
