import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const ComponentsMetricsChart = () => {
  const [metricsData, setMetricsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/metrics`);
        if (!response.ok) {
          throw new Error('Failed to fetch metrics');
        }
        const data = await response.json();
        setMetricsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const chartData = {
    labels: metricsData.map((metric) => metric.timestamp),
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: metricsData.map((metric) => metric.cpuUsage),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Memory Usage (%)',
        data: metricsData.map((metric) => metric.memoryUsage),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      {loading ? (
        <p>Loading metrics...</p>
      ) : (
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      )}
    </div>
  );
};

export default ComponentsMetricsChart;