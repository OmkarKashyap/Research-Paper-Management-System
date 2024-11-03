'use client';

import { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

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
      // Step 1: Get all titles the user has liked from 'likes' table
      const { data: likedTitles, error: likesError } = await supabase
        .from('likes')
        .select('items_title')
        .eq('user_id', userId);

      if (likesError) {
        console.error('Error fetching liked titles:', likesError);
        return;
      }

      // Extract the list of titles the user liked
      const titles = likedTitles?.map((like) => like.items_title);

      // Step 2: Fetch paper details from 'items' table using the titles
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

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <main className="profile-container">
        <h1>{user.email}'s Liked Papers</h1>
        {likedPapers.length > 0 ? (
          <ul>
            {likedPapers.map((paper) => (
              <li key={paper.title}>
                <h3>{paper.title}</h3>
                <p>{paper.authors}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not liked any papers yet.</p>
        )}
        <div className="navigation-links">
          <Link href="/dashboard" className="nav-link">Back to Dashboard</Link>
        </div>
      </main>

      <footer className="footer">
        <p>© 2024 Research Paper Management System</p>
      </footer>
    </div>
  );
}
