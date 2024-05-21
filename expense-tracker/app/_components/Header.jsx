import React from 'react';

import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <Image 
        src={'/icon.png'} 
        alt='logo'
        width={75}
        height={75}
      />
        <Button>
          Get Started
        </Button>
    </div>
  );
};

export default Header;