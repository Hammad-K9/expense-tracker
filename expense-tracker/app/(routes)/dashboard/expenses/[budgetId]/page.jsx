'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { format } from 'date-fns';

import appService from '@/services/appService';
import BudgetItem from '@/components/BudgetItem';
import AddExpense from '@/components/AddExpense';
import ExpenseList from '@/components/ExpenseList';

const ExpensesPage = ({ params }) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
    try {
      const response = await appService.getBudgetInfo(
        '/api/budgetInfo',
        params.budgetId
      );
      setBudgetInfo(response);
      getExpenseList();
    } catch (error) {
      toast('Error getting budget info');
      console.log(error);
    }
  };

  const getExpenseList = async () => {
    try {
      const response = await appService.getAll(
        `/api/expenses/${params.budgetId}`
      );
      const formattedExpenses = response.map((exp) => ({
        ...exp,
        createdAt: format(new Date(parseInt(exp.createdAt, 10)), 'MM/dd/yyyy')
      }));
      setExpenseList(formattedExpenses);
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
            budgetId={params.budgetId}
            refresh={() => getBudgetInfo()}
          />
        </div>
        <div>
          <h2>Expenses</h2>
          <ExpenseList
            expenseList={expenseList}
            refresh={() => getBudgetInfo()}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
