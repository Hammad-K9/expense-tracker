'use client';

import React, { useEffect, useState } from 'react';

import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { format } from 'date-fns';

import { useRouter } from 'next/navigation';
import CardInfo from '@/components/CardInfo';
import appService from '@/services/appService';
import DashboardBarChart from '@/components/DashboardBarChart';
import BudgetItem from '@/components/BudgetItem';
import ExpenseList from '@/components/ExpenseList';

const Dashboard = () => {
  const [budgetList, setBudgetList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const { user } = useUser();
  const route = useRouter();

  if (!user) {
    route.replace('/sign-in');
  }

  useEffect(() => {
    getAllBudgets();
  }, []);

  const getAllBudgets = async () => {
    try {
      const budgets = await appService.getAll('/api/budgets');
      setBudgetList(budgets);
      getAllExpenses();
    } catch (error) {
      toast('Error getting budgets');
      console.log(error);
    }
  };

  const getAllExpenses = async () => {
    try {
      const expenses = await appService.getAll('/api/expenses');
      const formattedExpenses = expenses.map((exp) => ({
        ...exp,
        createdAt: format(new Date(+exp.createdAt), 'MM/dd/yyyy')
      }));
      setExpenseList(formattedExpenses);
    } catch (error) {
      toast('Error getting all expenses');
      console.log(error);
    }
  };

  return (
    user && (
      <div className="w-full p-1 md:p-10 pb-20">
        <h2 className="text-3xl font-bold">Hi, {user?.firstName}</h2>
        <p className="text-gray-500">Let's $track your Expenses!</p>
        <CardInfo budgetList={budgetList} />
        <div className="grid grid-cols-1 md:grid-cols-3 mt-7 gap-5">
          <div className="md:col-span-2">
            <DashboardBarChart budgetList={budgetList} />
            <ExpenseList expenseList={expenseList} refresh={getAllBudgets} />
          </div>
          <div className="grid gap-5">
            <h2 className="font-bold text-lg">Recent Budgets</h2>
            {budgetList.map((b, i) => (
              <BudgetItem key={i} budget={b} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
