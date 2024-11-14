'use client';

import { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

import NavBar from '../components/Navbar';
import Link from 'next/link';
import InputField from "../components/InputField";
import SearchResults from "../components/SearchResults";
import PaperItem from '../components/PaperItem';
import Header from '../components/Header';

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
    
    // Insert item if it doesn't exist
    await supabase.rpc('insert_item_if_not_exists', {
      item_title: title,
      item_volume: volume,
      item_authors: authors,
      item_year: year,
      item_pages: pages,
      item_link: link
    });

    // Toggle like using the new RPC function
    let { data:isLiked, error } = await supabase.rpc('toggle_like', {
      user_id: user.id,
      item_title: title
    });
  
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <Header />
      <div className="flex items-center max-w-lg w-full mt-10 space-x-2">
        <input
          className="w-full p-3 rounded-l-lg bg-black text-white placeholder-gray-400 border border-gray-700 focus:outline-none"
          type="text"
          placeholder="e.g., Black Holes"
          value={query}
          onChange={handleChange}
        />
        <button
          className="p-3 bg-white text-black rounded-r-lg flex items-center justify-center"
          onClick={handleSearch}
        >
          <svg fill="#000000" width="20px" height="28px" viewBox="0 -0.24 28.423 28.423" id="_02_-_Search_Button" data-name="02 - Search Button" xmlns="http://www.w3.org/2000/svg">
  <path id="Path_215" data-name="Path 215" d="M14.953,2.547A12.643,12.643,0,1,0,27.6,15.19,12.649,12.649,0,0,0,14.953,2.547Zm0,2A10.643,10.643,0,1,1,4.31,15.19,10.648,10.648,0,0,1,14.953,4.547Z" transform="translate(-2.31 -2.547)" fill-rule="evenodd"/>   <path id="Path_216" data-name="Path 216" d="M30.441,28.789l-6.276-6.276a1,1,0,1,0-1.414,1.414L29.027,30.2a1,1,0,1,0,1.414-1.414Z" transform="translate(-2.31 -2.547)" fill-rule="evenodd"/>
 </svg>
        </button>
      </div>

      <div className="w-full px-4 mt-8">
        <ul>
        {searchResults.map((result) => (
        <PaperItem
          key={result.id}
          title={result.title}
          authors={result.authors}
          volume={result.volume}
          year={result.year}
          pages={result.pages}
          link={result.link}
          isLiked={likedPapers.includes(result.title)}
          onLikeToggle={() => handleLike(result.title, result.volume, result.authors, result.year, result.pages, result.link)}
        />
      ))}
        </ul>
      </div>
    </div>
  );
};

