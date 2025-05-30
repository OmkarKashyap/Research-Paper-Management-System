'use client';

import Head from 'next/head';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <div className="text-black">
      <NextSeo
        title="Home: nine4"
        description="Welcome to the nine4 homepage."
        canonical="https://nine4-2.vercel.app/"
        openGraph={{
          url: 'https://nine4-2.vercel.app/',
        }}
      />
      <Head>
        <title>nine4</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}




// 'use client';

// import { useState } from 'react';
// import SearchBar from './components/SearchBar';
// import Link from 'next/link';
// import supabase from '../lib/supabaseClient';

// export default function HomePage() {
//   const [searchResults, setSearchResults] = useState<any[]>([]);

//   const handleSearch = async (query: string) => {
//     const { data, error } = await supabase
//       .from('papers')
//       .select('*')
//       .ilike('abstract', `%${query}%`);

//     if (error) {
//       console.error('Error fetching data:', error);
//     } else {
//       setSearchResults(data);
//     }
//   };

//   return (
//     <main className="home-container">
//       <h1>Welcome to the Research Paper Search System</h1>
//       <p>Use our system to search for research papers, manage your profile, and more!</p>

//       <SearchBar onSearch={handleSearch} />

//       <div className="search-results">
//         {searchResults.length > 0 ? (
//           <ul>
//             {searchResults.map((result) => (
//               <li key={result.id}>
//                 <h3>{result.title}</h3>
//                 <p>{result.abstract}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No results yet. Try searching for papers!</p>
//         )}
//       </div>

//       <div className="auth-links">
//         <Link href="/login">Login</Link>
//         <Link href="/signup">Signup</Link>
//       </div>

//       <footer className="footer">
//         <p>© 2024 Research Paper Management System</p>
//       </footer>
//     </main>
//   );
// }