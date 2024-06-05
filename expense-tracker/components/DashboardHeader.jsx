import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import useWindowSize from '@/hooks/useWindowSize';

const DashboardHeader = () => {
  const { width } = useWindowSize();
  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center justify-between">
        <div className={`${width >= 768 ? 'w-64' : 'pr-5'}`}>
          <Image src="/icon.png" alt="logo" width={75} height={75} />
        </div>
      </div>
      <div className="flex items-center">
        <UserButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
