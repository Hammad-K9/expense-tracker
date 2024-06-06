import React from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export const DashboardBarChart = ({ budgetList }) => (
  <div className="border rounded-lg p-5">
    <h2 className="font-bold text-lg">Activity</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={budgetList}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="spent" fill="#b9f6ca" />
        <Bar dataKey="allocatedAmount" fill="#00e99f" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default DashboardBarChart;
