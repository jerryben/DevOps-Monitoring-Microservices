from fastapi import FastAPI
from .database import Base, engine
from .routes import router

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Register API routes
app.include_router(router)

@app.get("/")
def root():
    return {"message": "Metrics Service is running!"}
