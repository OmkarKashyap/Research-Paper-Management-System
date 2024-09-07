'use client';

import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Link from 'next/link';
import supabase from '../lib/supabaseClient';

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    const { data, error } = await supabase
      .from('papers')
      .select('*')
      .ilike('abstract', `%${query}%`);

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setSearchResults(data);
    }
  };

  return (
    <main className="home-container">
      <h1>Welcome to the Research Paper Search System</h1>
      <p>Use our system to search for research papers, manage your profile, and more!</p>

      <SearchBar onSearch={handleSearch} />

      <div className="search-results">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <h3>{result.title}</h3>
                <p>{result.abstract}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results yet. Try searching for papers!</p>
        )}
      </div>

      <div className="auth-links">
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </div>

      <footer className="footer">
        <p>© 2024 Research Paper Management System</p>
      </footer>
    </main>
  );
}