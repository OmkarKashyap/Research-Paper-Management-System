'use client';

import { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

import NavBar from '../components/Navbar';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [likedPapers, setLikedPapers] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        await fetchUserLikes(user.id); 
      } else {
        router.push('/login');
      }
    };

    const fetchUserLikes = async (userId: string) => {
      const { data, error } = await supabase
        .from('users')
        .select('likes')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user likes:', error);
      } else {
        setLikedPapers(data.likes || []);
      }
    };

    fetchUser();
  }, [router]);

  if (!user) return <div>Loading...</div>;

  const handleSearch = async () => {
    console.log('Searching for:', query);
    const { data, error } = await supabase
      .from('trial')
      .select('*')
      .textSearch('title', query, {
        config: 'english',
        type: 'plain'
      });

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      console.log('Data fetched successfully:', data);
      setSearchResults(data);
    }
  };

  const handleLike = async (paperId: string) => {
    if (!user) return;

    const updatedLikes = likedPapers.includes(paperId)
      ? likedPapers.filter(id => id !== paperId) // Remove if already liked
      : [...likedPapers, paperId]; // Add if not liked

    const { error } = await supabase
      .from('users')
      .update({ likes: updatedLikes })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating likes:', error);
    } else {
      setLikedPapers(updatedLikes);
      console.log('Likes updated successfully:', updatedLikes);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <div>
      <main className="home-container">
        <h1>Welcome {user.email} to the Research Paper Search System</h1>
        <p>Use our system to search for research papers, manage your profile, and more!</p>
        <p>{query}</p>
        <div className="search-bar">
          <div>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Type to search..."
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>

        <div className="search-results">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result) => (
                <li key={result.id} className="paper-item">
                  <h3>{result.title}</h3>
                  <p>{result.authors}</p>
                  <button
                    onClick={() => handleLike(result.id)}
                    className={likedPapers.includes(result.id) ? 'liked' : 'unliked'}
                  >
                    {likedPapers.includes(result.id) ? '❤️' : '♡'}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No similar papers found. Try a different search term!</p>
          )}
        </div>
        <div className="auth-links">
          <Link href="/login" className="auth-link">Login</Link>
          <Link href="/signup" className="auth-link">Signup</Link>
        </div>
      </main>

      <footer className="footer">
        <p>© 2024 Research Paper Management System</p>
      </footer>
    </div>
  );
}
