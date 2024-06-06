'use client';

import React from 'react';
import { toast } from 'sonner';

import { Trash } from 'lucide-react';
import appService from '@/services/appService';

const ExpenseList = ({ expenseList, refresh }) => {
  const deleteExpense = async (exp) => {
    try {
      await appService.deleteItem('/api/expenses', exp.id);
      refresh();
      toast('Expense has been deleted');
    } catch (error) {
      toast('Error deleting expense');
      console.log(error);
    }
  };
  return (
    <div className="mt-3 min-w-[360px]">
      <h2 className="font-bold text-lg">Recent Expenses</h2>
      <div className="grid grid-cols-4 bg-slate-200 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expenseList?.length > 0
        ? expenseList.map((exp) => (
            <div key={exp.id} className="grid grid-cols-4 p-2">
              <h2 className="break-words">{exp.name}</h2>
              <h2 className="break-words">${exp.amount}</h2>
              <h2>{exp.createdAt}</h2>
              <h2 className="justify-self-center">
                <Trash
                  className="text-red-600 cursor-pointer"
                  onClick={() => deleteExpense(exp)}
                />
              </h2>
            </div>
          ))
        : [1, 2, 3, 4].map((n, i) => (
            <div key={i} className="grid grid-cols-4 p-2 gap-2">
              <div className="bg-slate-200 rounded-lg animate-pulse h-[40px]" />
              <div className="bg-slate-200 rounded-lg animate-pulse h-[40px]" />
              <div className="bg-slate-200 rounded-lg animate-pulse h-[40px]" />
              <div className="bg-slate-200 rounded-lg animate-pulse h-[40px]" />
            </div>
          ))}
    </div>
  );
};
export default ExpenseList;
