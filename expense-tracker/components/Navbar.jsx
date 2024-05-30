'use client';

import React from 'react';
import { Layout, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import useWindowSize from '@/hooks/useWindowSize';

const Navbar = () => {
  const { width } = useWindowSize();
  const navbarItems = [
    {
      id: 0,
      name: 'Dashboard',
      icon: Layout,
      path: '/dashboard'
    },
    {
      id: 1,
      name: 'Budgets',
      icon: PiggyBank,
      path: '/dashboard/budgets'
    },
    {
      id: 2,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses'
    },
    {
      id: 3,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade'
    }
  ];

  const path = usePathname();

  return width >= 768 ? (
    <div className="flex flex-1 hidden md:block">
      <div className="mb-5">
        {navbarItems.map((menu) => (
          <Link key={menu.id} href={menu.path}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:bg-customGreen-100 mb-2 
              ${path === menu.path ? 'bg-customGreen-100' : ''}`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="fixed bottom-0 left-0 right-0 md:hidden">
      <div className="flex justify-around bg-slate-100 w-screen">
        {navbarItems.map((menu) => (
          <Link key={menu.id} href={menu.path}>
            <h2
              className={`flex flex-row justify-around gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:bg-customGreen-100 
              ${path === menu.path && 'bg-customGreen-100'}`}
            >
              <menu.icon />
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
