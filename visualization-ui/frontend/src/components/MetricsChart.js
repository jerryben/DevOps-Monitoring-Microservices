import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const MetricsChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/api/visualization/metrics").then((res) => {
      const data = res.data;
      setChartData({
        labels: data.map((item) => item.name),
        datasets: [
          {
            label: "Metrics Data",
            data: data.map((item) => item.value),
            borderColor: "rgba(75,192,192,1)",
            fill: false,
          },
        ],
      });
    });
  }, []);

  return (
    <div>
      <h2>Metrics Overview</h2>
      <Line data={chartData} />
    </div>
  );
};

export default MetricsChart;
