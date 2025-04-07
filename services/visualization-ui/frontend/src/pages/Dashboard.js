import React from "react";
import MetricsChart from "../components/MetricsChart";
import LogsTable from "../components/LogsTable";

const Dashboard = () => {
  return (
    <div>
      <h1>Monitoring Dashboard</h1>
      <MetricsChart />
      <LogsTable />
    </div>
  );
};

export default Dashboard;
