'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';

import CreateBudget from '@/components/CreateBudget';
import appService from '@/services/appService';
import BudgetItem from '@/components/BudgetItem';

const BudgetList = () => {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [budgetListLoading, setBudgetListLoading] = useState(true);

  useEffect(() => {
    setBudgetListLoading(true);
    user && getAllBudgets();
  }, [user]);

  const getAllBudgets = async () => {
    try {
      const budgets = await appService.getAll('/api/budgets');
      setBudgetList(budgets);
      setBudgetListLoading(false);
    } catch (error) {
      toast('Error getting budgets');
      console.log(error);
    }
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refresh={() => getAllBudgets()} />
        {budgetList.length > 0
          ? budgetList.map((b) => <BudgetItem key={b.id} budget={b} />)
          : budgetListLoading &&
            [1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => (
              <div
                key={i}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              />
            ))}
      </div>
    </div>
  );
};

export default BudgetList;
