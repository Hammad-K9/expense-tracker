import React from 'react';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import useWindowSize from '@/hooks/useWindowSize';

export const DashboardBarChart = ({ budgetList }) => {
  const { width } = useWindowSize();
  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Activity</h2>
      <BarChart width={0.4 * width} height={300} data={budgetList}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="spent" stackId="a" fill="#b9f6ca" />
        <Bar dataKey="allocatedAmount" stackId="a" fill="#00e99f" />
      </BarChart>
    </div>
  );
};

export default DashboardBarChart;
