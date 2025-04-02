const request = require('supertest');
const app = require('../src/app');  // Import the Express app
const alertService = require('../src/services/alertService'); 

// Mock alertService to avoid actual database calls
jest.mock('../src/services/alertService');

describe('Alert Routes', () => {
  
  // Test GET /
  it('should return 200 and service status message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Alerting Service is Running...');
  });

  // Test GET /api/alerts
  it('should return a list of alerts', async () => {
    const mockAlerts = [{ id: 1, message: 'High CPU usage', level: 'critical' }];
    alertService.getAllAlerts.mockResolvedValue(mockAlerts);

    const res = await request(app).get('/api/alerts');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockAlerts);
  });

  // Test POST /api/alerts
  it('should create a new alert', async () => {
    const newAlert = { message: 'Low disk space', level: 'warning' };
    alertService.createAlert.mockResolvedValue({ id: 2, ...newAlert });

    const res = await request(app).post('/api/alerts').send(newAlert);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 2, ...newAlert });
  });

});

