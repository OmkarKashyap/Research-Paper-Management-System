'use client'

import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import supabase from '../../lib/supabaseClient';
import Header from '../components/Header';

interface Paper {
  title: string;
  authors: string;
  year: number;
  like_count: number;
  popularity_score : number;
}

export default function PaperSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPopularPapers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('popularity_score', { ascending: false })
        .limit(10);
      if (error) throw error;
      setPapers(data || []);
    } catch (err) {
      console.error('Error fetching popular papers:', err);
      setError('Failed to load popular papers');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      
        const { data, error } = await supabase.rpc('get_paper_likes', {
          search_term: searchTerm,
        });
        if (error) throw error;
        setPapers(data || []);
      
    } catch (err) {
      console.error('Error searching papers:', err);
      setError('Failed to search papers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      fetchPopularPapers();
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 mt-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Search Papers</h1>
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter paper title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </span>
              )}
            </button>
          </form>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          {papers.length > 0 ? (
            <div className="space-y-4">
              {papers.map((paper) => (
                <div
                  key={paper.title}
                  className="p-4 bg-gray-700 border border-gray-600 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{paper.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{paper.authors}</p>
                      <p className="text-xs text-gray-500 mt-1">Published in {paper.year}</p>
                    </div>
                    <div className="bg-gray-800 mx-2 px-5 py-2 rounded-md">
                      <span className="text-sm text-white font-medium">{paper.popularity_score} likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-6">
              {searchTerm ? 'No papers found matching your search.' : 'No popular papers to display.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
