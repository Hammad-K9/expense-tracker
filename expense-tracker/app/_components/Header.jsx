import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const Header = async () => {
  const user = await currentUser();

  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <Image 
        src={'/icon.png'} 
        alt='logo'
        width={75}
        height={75}
      />
      {user ? <UserButton /> : 
      <Link href="/sign-in">
        <Button 
          className="block rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring active:bg-customGreen-400 w-auto"
          >
            Sign In
        </Button>
      </Link>
      }
    </div>
  );
};

export default Header;
