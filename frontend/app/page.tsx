"use client"; 
import { useState } from 'react';
import './styles/global.css'
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';

interface SearchResult {
  id: number;
  title: string;
}

export default function Home() {

  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (query: string) => {
    const response = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      const data: SearchResult[] = await response.json();
      setResults(data);
    } else {
      console.error('Search failed');
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Search Research Papers</h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((result) => (
              <li key={result.id}>{result.title}</li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
