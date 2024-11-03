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
        .from('likes')
        .select('item_id')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching user likes:', error);
      } else {
        // Extract item_ids from the result
        const likedItems = data.map((like) => like.item_id);
        setLikedPapers(likedItems);
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

  const handleLike = async (title: string, volume: string, authors: string, year: number, pages: string, link: string) => {
    if (!user) return;
  
    let error;
  
    // Step 1: Check if the paper exists in the 'items' table by title
    const { data: existingItem, error: itemCheckError } = await supabase
      .from('items')
      .select('title')
      .eq('title', title)
      .single();
  
    if (itemCheckError && itemCheckError.code !== 'PGRST116') {
      console.error('Error checking item in items table:', itemCheckError);
      return;
    }
  
    // Step 2: Insert item into 'items' table if it doesn't exist
    if (!existingItem) {
      const { error: insertItemError } = await supabase
        .from('items')
        .insert({
          title,
          volume,
          authors,
          year,
          pages,
          link
        });
  
      if (insertItemError) {
        console.error('Error inserting item into items table:', insertItemError);
        return;
      }
    }
  
    // Step 3: Toggle like in the 'likes' table
    const liked = likedPapers.includes(title);
    if (liked) {
      // Remove like
      const { error: deleteError } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', user.id)
        .eq('items_title', title);
  
      error = deleteError;
      if (!error) {
        setLikedPapers(likedPapers.filter(t => t !== title));
      }
    } else {
      // Add like
      const { error: insertLikeError } = await supabase
        .from('likes')
        .insert({ user_id: user.id, items_title: title });
  
      error = insertLikeError;
      if (!error) {
        setLikedPapers([...likedPapers, title]);
      }
    }
  
    if (error) {
      console.error('Error updating likes:', error);
    } else {
      console.log('Likes updated successfully:', likedPapers);
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
        <p>{likedPapers.join(', ')}</p>
        <div className="search-results">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result) => (
                <li key={result.id} className="paper-item">
                  <h3>{result.title}</h3>
                  <p>{result.authors}</p>
                  <button
                    onClick={() => handleLike(result.title, result.volume, result.authors, result.year, result.pages, result.link)}
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
