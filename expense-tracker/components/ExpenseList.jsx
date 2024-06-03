'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';

import { Trash } from 'lucide-react';
import CreateBudget from '@/components/CreateBudget';
import appService from '@/services/appService';
import BudgetItem from '@/components/BudgetItem';

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
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expenseList.map((exp) => (
        <div key={exp.id} className="grid grid-cols-4 p-2">
          <h2>{exp.name}</h2>
          <h2>{exp.amount}</h2>
          <h2>{exp.createdAt}</h2>
          <h2 className="justify-self-center">
            <Trash
              className="text-red-600 cursor-pointer"
              onClick={() => deleteExpense(exp)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
