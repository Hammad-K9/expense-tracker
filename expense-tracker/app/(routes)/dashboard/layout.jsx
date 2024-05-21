import React from 'react';

import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="fixed md:w-64 hidden md:block">
        <Sidebar />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </>
  )
};