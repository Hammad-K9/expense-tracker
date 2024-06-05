'use client';

import React, { useEffect, useState } from 'react';

import { redirect } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

import CardInfo from '@/components/CardInfo';
import appService from '@/services/appService';
import DashboardBarChart from '@/components/DashboardBarChart';

const Dashboard = () => {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  if (!user) {
    redirect('/sign-in');
  }

  useEffect(() => {
    user && getAllBudgets();
  }, [user]);

  const getAllBudgets = async () => {
    try {
      const budgets = await appService.getAll('/api/budgets');
      setBudgetList(budgets);
    } catch (error) {
      toast('Error getting budgets');
      console.log(error);
    }
  };

  return (
    <div className="w-full p-20 pt-10 md:p-10">
      <h2 className="text-3xl font-bold">Hi, {user?.firstName}</h2>
      <p className="text-gray-500">Let's $track your Expenses!</p>
      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-7">
        <div className="md:col-span-2">
          <DashboardBarChart budgetList={budgetList} />
        </div>
        <div>Other Content</div>
      </div>
    </div>
  );
};

export default Dashboard;
