"use client";

import React from 'react';

import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/DashboardHeader';
import useWindowSize from '@/hooks/useWindowSize';

export default function DashboardLayout({ children }) {
  const { width } = useWindowSize();

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="flex">
        <div className={`${width >= 768 ? "w-64" : ""}`}>
          <Navbar />
        </div>
        {children}
      </div>
    </div>
  );
};