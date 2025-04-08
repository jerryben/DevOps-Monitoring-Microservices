from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Metrics Service is running!"}

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "UP"}

def test_create_metric():
    payload = {
        "cpu_usage": 50.5,
        "memory_usage": 60.2,
        "disk_usage": 70.1,
        "network_sent": 10.5,
        "network_received": 15.3
    }
    response = client.post("/metrics", json=payload)
    assert response.status_code == 200
    assert response.json()["cpu_usage"] == payload["cpu_usage"]
    assert response.json()["memory_usage"] == payload["memory_usage"]
    assert response.json()["disk_usage"] == payload["disk_usage"]
    assert response.json()["network_sent"] == payload["network_sent"]
    assert response.json()["network_received"] == payload["network_received"]

def test_read_metrics():
    response = client.get("/metrics")
    assert response.status_code == 200
    assert isinstance(response.json(), list)