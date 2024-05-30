import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import Header from '@/components/Header';
import Hero from '@/components/Hero';

const Home = () => {
  const { userId } = auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
};

export default Home;
