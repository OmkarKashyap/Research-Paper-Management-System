// import { useState } from 'react';
// import supabase from '../../lib/supabaseClient';

// export default function Search() {
//   const [papers, setPapers] = useState<any[]>([]);
//   const [query, setQuery] = useState('');

//   const handleSearch = async () => {
//     const { data, error } = await supabase
//       .from('papers')
//       .select('*')
//       .ilike('abstract', `%${query}%`);

//     if (error) {
//       console.error(error.message);
//     } else {
//       setPapers(data || []);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search Papers"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       <ul>
//         {papers.map((paper) => (
//           <li key={paper.id}>{paper.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React, { useState } from "react";
import InputField from "../components/InputField";
import SearchResults from "../components/SearchResults";

type Paper = {
    title: string;
    authors: string;
    tags: string[];
    arxiv_id: string;
    abstract: string;
};

type APIResponse = {
    papers: Paper[];
};

const sampleAPIResponse: APIResponse = {
    papers: [
        {
            title: "",
            authors: "",
            tags: [],
            arxiv_id: "",
            abstract: ""
        }
    ]
};

export default function Page() {
    const [topic, setTopic] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [apiResponse, setAPIResponse] = useState<APIResponse>(sampleAPIResponse);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const searchPapers = async () => {
        const query = {
            topic: topic,
            tags: tags.split(",").map(tag => tag.trim())
        };

        alert(JSON.stringify(query, null, 4));

        try {
            const response = await fetch("http://localhost:8000/search_papers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(query)
            });

            const data: APIResponse = await response.json();
            console.log("Response Data:", data);
            setAPIResponse(data);
            setSubmitted(true);
        } catch (error) {
            console.error("Error fetching papers:", error);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" }}>
            <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Research Paper Finder</h1>
            
            <InputField
                label="Enter a Topic"
                placeholder="e.g., Black Holes"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />

            <InputField
                label="Enter Tags (comma-separated)"
                placeholder="e.g., astronomy, physics, space"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />

            <button
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    color: "white",
                    background: "linear-gradient(to right, #FF7F50, #32CD32)",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
                onClick={searchPapers}
            >
                Search
            </button>

            {submitted && <SearchResults apiResponse={apiResponse} />}
        </div>
    );
}
