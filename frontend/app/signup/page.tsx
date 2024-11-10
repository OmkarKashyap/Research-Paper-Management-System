'use client';

import { useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        setError(signupError.message);
        return;
      }

      const user = data?.user;
      console.log(data)
      if (user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            created_at: new Date().toISOString() 
          });

        if (insertError) {
          setError(insertError.message);
          return;
        }

      router.push('/login');
    }
  };

  return (
    // <div className="auth-container">
      
    //   <h1>Signup</h1>
    //   <form onSubmit={handleSignup}>
    //     {error && <p style={{ color: 'red' }}>{error}</p>}
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Signup</button>
    //   </form>
    // </div>
    <section className="flex justify-center items-center min-h-screen bg-slate-950">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Create an Account
        </h1>
        <form className="space-y-4" onSubmit={handleSignup}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-500 dark:text-gray-300">
              I accept the{" "}
              <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Create Account
          </button>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
            
          </p>
        </form>
      </div>
    </section>
  );
}
