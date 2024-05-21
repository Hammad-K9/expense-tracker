"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Layout, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


const Sidebar = () => {
  const sidebarItems = [
    {
      id: 0,
      name: 'Dashboard',
      icon: Layout,
      path: '/dashboard',
    },
    {
      id: 1,
      name: 'Budgets',
      icon: PiggyBank,
      path: '/dashboard/budgets',
    },
    {
      id: 2,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses',
    },
    {
      id: 3,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade',
    }
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path)
  }, [path]);
  
  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image 
        src={'/icon.png'} 
        alt='logo'
        width={75}
        height={75}
      />
      <div className="mt-5">
        {sidebarItems.map((menu,index) => (
          <Link href={menu.path}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:bg-customGreen-100 mb-2 
              ${path === menu.path && 'bg-customGreen-100'}`}
            >
              <menu.icon/>
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed items-center bottom-10 p-5 flex gap-2">
        <UserButton />
        Profile
      </div>
    </div>
  )
}

export default Sidebar;