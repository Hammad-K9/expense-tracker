'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import ExpenseList from '@/components/ExpenseList';
import appService from '@/services/appService';

export const Expenses = () => {
  const [expenseList, setExpenseList] = useState([]);
  const { user } = useUser();
  const route = useRouter();

  if (!user) {
    route.replace('/sign-in');
  }

  useEffect(() => {
    getAllExpenses();
  }, []);

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
        <ExpenseList expenseList={expenseList} refresh={getAllExpenses} />
      </div>
    )
  );
};

export default Expenses;
