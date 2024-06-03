'use client';

import React from 'react';

import { Trash } from 'lucide-react';

const ExpenseList = ({ expenseList, deleteExpense }) => (
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

export default ExpenseList;
