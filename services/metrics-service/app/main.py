from fastapi import FastAPI, HTTPException
from .database import Base, engine
from .routes import router
import psutil
import asyncpg
import os
import pika
import json
import asyncio  # Import asyncio for periodic tasks

app = FastAPI()

# PostgreSQL connection pool
db_pool = None

# RabbitMQ connection
rabbitmq_channel = None

# Create database tables
Base.metadata.create_all(bind=engine)

# Register API routes
app.include_router(router)

@app.get("/")
def root():
    return {"message": "Metrics Service is running!"}

@app.get("/health")
async def health_check():
    return {"status": "UP"}

@app.on_event("startup")
async def startup():
    global db_pool, rabbitmq_channel

    # Initialize PostgreSQL connection pool
    db_url = os.getenv("POSTGRES_URL", "postgresql://user:password@localhost:5432/metricsdb")
    db_pool = await asyncpg.create_pool(dsn=db_url)

    # Initialize RabbitMQ connection
    rabbitmq_url = os.getenv("RABBITMQ_URL", "amqp://guest:guest@localhost:5672/")
    connection = pika.BlockingConnection(pika.URLParameters(rabbitmq_url))
    rabbitmq_channel = connection.channel()
    rabbitmq_channel.exchange_declare(exchange="metrics-exchange", exchange_type="fanout")

    # Start the periodic metrics collection task
    asyncio.create_task(collect_metrics())

@app.on_event("shutdown")
async def shutdown():
    global db_pool, rabbitmq_channel
    await db_pool.close()
    if rabbitmq_channel:
        rabbitmq_channel.close()

async def collect_metrics():
    global db_pool, rabbitmq_channel

    while True:
        # Collect system metrics
        cpu_usage = psutil.cpu_percent(interval=1)
        memory_usage = psutil.virtual_memory().percent
        disk_usage = psutil.disk_usage('/').percent
        net_io = psutil.net_io_counters()
        network_sent = net_io.bytes_sent / (1024 * 1024)  # Convert to MB
        network_received = net_io.bytes_recv / (1024 * 1024)  # Convert to MB

        metric = {
            "timestamp": str(psutil.time.time()),
            "cpu_usage": cpu_usage,
            "memory_usage": memory_usage,
            "disk_usage": disk_usage,
            "network_sent": network_sent,
            "network_received": network_received
        }

        # Store metrics in PostgreSQL
        try:
            await db_pool.execute("""
                INSERT INTO metrics (cpu_usage, memory_usage, disk_usage, network_sent, network_received)
                VALUES ($1, $2, $3, $4, $5)
            """, cpu_usage, memory_usage, disk_usage, network_sent, network_received)
        except Exception as e:
            print(f"Failed to store metrics in PostgreSQL: {str(e)}")

        # Publish metrics to RabbitMQ
        try:
            rabbitmq_channel.basic_publish(
                exchange="metrics-exchange",
                routing_key="",
                body=json.dumps(metric)
            )
        except Exception as e:
            print(f"Failed to publish metrics to RabbitMQ: {str(e)}")

        # Wait for 10 seconds before collecting metrics again
        await asyncio.sleep(10)