'use client';

import { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import Header from '../components/Header';
export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [likedPapers, setLikedPapers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        await fetchLikedPapers(user.id);
      } else {
        router.push('/login');
      }
    };

    const fetchLikedPapers = async (userId: string) => {
      const { data: likedTitles, error: likesError } = await supabase
        .from('likes')
        .select('items_title')
        .eq('user_id', userId);

      if (likesError) {
        console.error('Error fetching liked titles:', likesError);
        return;
      }

      const titles = likedTitles?.map((like) => like.items_title);

      if (titles && titles.length > 0) {
        const { data: papers, error: papersError } = await supabase
          .from('items')
          .select('title, authors')
          .in('title', titles);

        if (papersError) {
          console.error('Error fetching liked papers:', papersError);
        } else {
          setLikedPapers(papers);
        }
      }
    };

    fetchUser();
  }, [router]);

  const handleDislike = async (title: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', user.id)
      .eq('items_title', title);

    if (error) {
      console.error('Error disliking paper:', error);
      return;
    }

    setLikedPapers((prevPapers) =>
      prevPapers.filter((paper) => paper.title !== title)
    );
  };

  if (!user) return <div>Loading...</div>;

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-900">
      <Header />
      <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center">
          {user.email}'s Liked Papers
        </h1>
        {likedPapers.length > 0 ? (
          <ul className="space-y-4 mt-6">
            {likedPapers.map((paper) => (
              <li key={paper.title} className="p-4 bg-gray-700 border border-gray-600 rounded-lg shadow-md hover:shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{paper.title}</h3>
                    <p className="text-sm text-gray-400">
                        {paper.authors}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDislike(paper.title)}
                    className="px-3 py-1 bg-customTeal text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition duration-150"
                  >
                    Dislike
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400 mt-6">
            You have not liked any papers yet.
          </p>
        )}
        <div className="flex justify-center mt-8">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-150"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

