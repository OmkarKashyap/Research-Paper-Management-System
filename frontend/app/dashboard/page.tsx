'use client';

import { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
// Import or define User type
import { User } from '@supabase/supabase-js'; 

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null); // Update state type
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}!</p>
      {/* Add more dashboard content here */}
    </div>
  );
}
