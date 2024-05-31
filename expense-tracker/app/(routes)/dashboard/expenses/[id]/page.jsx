'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

import appService from '@/services/appService';
import BudgetItem from '@/components/BudgetItem';
import AddExpense from '@/components/AddExpense';

const ExpensesPage = ({ params }) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState(null);

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
    try {
      const response = await appService.getBudgetInfo(
        `/api/budgetInfo/${params.id}`
      );
      setBudgetInfo(response);
    } catch (error) {
      toast('Error getting budget info');
      console.log(error);
    }
  };

  return (
    <div className="w-full p-20 pt-10 md:p-10">
      <h2 className="text-3xl font-bold">My Expenses</h2>
      <div className="mt-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {budgetInfo ? (
            <BudgetItem budget={budgetInfo} />
          ) : (
            <div className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse" />
          )}
          <AddExpense
            user={user}
            budgetId={params.id}
            refresh={() => getBudgetInfo()}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
