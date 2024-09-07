import { useState } from 'react';
import supabase from '../../lib/supabaseClient';

export default function Search() {
  const [papers, setPapers] = useState<any[]>([]);
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from('papers')
      .select('*')
      .ilike('abstract', `%${query}%`);

    if (error) {
      console.error(error.message);
    } else {
      setPapers(data || []);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Papers"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {papers.map((paper) => (
          <li key={paper.id}>{paper.title}</li>
        ))}
      </ul>
    </div>
  );
}
