'use client';

import React from 'react';

import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/DashboardHeader';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="flex">
        <div className="md:w-40">
          <Navbar />
        </div>
        {children}
      </div>
    </div>
  );
}
