'use client';
import Link from 'next/link';
import '../styles/navbar.css';
import { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { User } from '@supabase/supabase-js';

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="bg-white text-black">
      <div className="logo">
        <Link href="/">Research</Link>
      </div>
      <ul className="nav-links">
        
        {user ? (
          <>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">Signup</Link>  
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
