import React from 'react';

import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export const Dashboard = () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
