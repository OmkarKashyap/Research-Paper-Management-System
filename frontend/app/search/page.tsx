// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import InputField from "../components/InputField";
// import SearchResults from "../components/SearchResults";

// type Paper = {
//   title: string;
//   authors: string;
//   tags: string[];
//   arxiv_id: string;
//   abstract: string;
// };

// type APIResponse = {
//   papers: Paper[];
// };

// const sampleAPIResponse: APIResponse = {
//   papers: [],
// };

// export default function SearchPage() {
//   const router = useRouter();
//   const [topic, setTopic] = useState<string>("");
//   const [tags, setTags] = useState<string>("");
//   const [apiResponse, setAPIResponse] = useState<APIResponse>(sampleAPIResponse);
//   const [submitted, setSubmitted] = useState<boolean>(false);
//   const [shouldSearch, setShouldSearch] = useState<boolean>(false); // New state to control search

//   // Get query parameters from the URL
//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const topicParam = searchParams.get("topic") || "";
//     const tagsParam = searchParams.get("tags") || "";
//     setTopic(topicParam);
//     setTags(tagsParam);

//     // Don't automatically search when the component mounts
//     setSubmitted(false);
//   }, []);

//   const searchPapers = async () => {
//     const query = {
//       topic: topic,
//       tags: tags.split(",").map(tag => tag.trim()),
//     };

//     try {
//       const response = await fetch("http://localhost:8000/search_papers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(query),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data: APIResponse = await response.json();
//       setAPIResponse(data);
//       setSubmitted(true);
//     } catch (error) {
//       console.error("Error fetching papers:", error);
//       alert("An error occurred while fetching papers.");
//     }
//   };

//   // Only search when shouldSearch is true and then reset it
//   useEffect(() => {
//     if (shouldSearch) {
//       searchPapers();
//       setShouldSearch(false);
//     }
//   }, [shouldSearch]);

//   const handleSearchClick = () => {
//     setShouldSearch(true);
//     setSubmitted(false); // Reset submitted state before searching
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" }}>
//       <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Research Paper Finder</h1>

//       <InputField
//         label="Enter a Topic"
//         placeholder="e.g., Black Holes"
//         value={topic}
//         onChange={(e) => setTopic(e.target.value)}
//       />

//       <InputField
//         label="Enter Tags (comma-separated)"
//         placeholder="e.g., astronomy, physics, space"
//         value={tags}
//         onChange={(e) => setTags(e.target.value)}
//       />

//       <button
//         style={{
//           padding: "10px 20px",
//           fontSize: "16px",
//           color: "white",
//           background: "linear-gradient(to right, #FF7F50, #32CD32)",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//         onClick={handleSearchClick} // Only trigger search on button click
//       >
//         Search
//       </button>

//       {submitted && <SearchResults apiResponse={apiResponse} topic={topic}/>}
//     </div>
//   );
// }


// 'use client'

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import InputField from "../components/InputField";
// import SearchResults from "../components/SearchResults";
// import SearchButton from "../images/search-button-svgrepo-com.svg"

// // Define the types
// type Paper = {
//   title: string;
//   authors: string;
//   tags: string[];
//   arxiv_id: string;
//   abstract: string;
// };

// type APIResponse = {
//   papers: Paper[];
// };

// // Initialize with a sample API response
// const sampleAPIResponse: APIResponse = {
//   papers: [],
// };

// // Define the SearchPage component
// const SearchPage: React.FC = () => {
//   const router = useRouter();
//   const [topic, setTopic] = useState<string>("");
//   const [tags, setTags] = useState<string>("");
//   const [apiResponse, setAPIResponse] = useState<APIResponse>(sampleAPIResponse);
//   const [submitted, setSubmitted] = useState<boolean>(false);
//   const [shouldSearch, setShouldSearch] = useState<boolean>(false);

//   // Load query parameters from URL on initial mount
//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const topicParam = searchParams.get("topic") || "";
//     const tagsParam = searchParams.get("tags") || "";
//     setTopic(topicParam);
//     setTags(tagsParam);

//     // Trigger a search if parameters are present
//     if (topicParam || tagsParam) {
//       setShouldSearch(true);
//     }
//   }, []);

//   const searchPapers = async () => {
//     const query = {
//       topic,
//       tags: tags.split(",").map(tag => tag.trim()),
//     };

//     try {
//       const response = await fetch("http://localhost:8000/search_papers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(query),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data: APIResponse = await response.json();
//       setAPIResponse(data);
//       setSubmitted(true);
//     } catch (error) {
//       console.error("Error fetching papers:", error);
//       alert("An error occurred while fetching papers.");
//     }
//   };

//   // Execute search when shouldSearch is set to true
//   useEffect(() => {
//     if (shouldSearch) {
//       searchPapers();
//       setShouldSearch(false);
//     }
//   }, [shouldSearch]);

//   const handleSearchClick = () => {
//     router.push(`/search?topic=${encodeURIComponent(topic)}&tags=${encodeURIComponent(tags)}`);
//     setShouldSearch(true);
//     setSubmitted(false);
//   };

//   return (
//     <div style={{minHeight: "100vh", backgroundColor: "black", color:"white"}}>
//         <div style={{
//     width: "100%", // Take full width of the parent container
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     // gap: "10px",
//     padding: 0, // Remove any padding
//  // Center if needed
//   }}>
//       <InputField
//         label=""
//         placeholder="e.g., Black Holes"
//         value={topic}
//         onChange={(e) => setTopic(e.target.value)}
//       />
//       <button
//     className="px-3 bg-white text-white rounded-r-lg flex items-center justify-center mt-0"
//     onClick={handleSearchClick}
//   >
// <svg fill="#000000" width="20px" height="52px" viewBox="0 -0.24 28.423 28.423" id="_02_-_Search_Button" data-name="02 - Search Button" xmlns="http://www.w3.org/2000/svg">
//   <path id="Path_215" data-name="Path 215" d="M14.953,2.547A12.643,12.643,0,1,0,27.6,15.19,12.649,12.649,0,0,0,14.953,2.547Zm0,2A10.643,10.643,0,1,1,4.31,15.19,10.648,10.648,0,0,1,14.953,4.547Z" transform="translate(-2.31 -2.547)" fill-rule="evenodd"/>
//   <path id="Path_216" data-name="Path 216" d="M30.441,28.789l-6.276-6.276a1,1,0,1,0-1.414,1.414L29.027,30.2a1,1,0,1,0,1.414-1.414Z" transform="translate(-2.31 -2.547)" fill-rule="evenodd"/>
// </svg>
//   </button>
//       </div>
//       <div style={{ maxWidth: "100%", padding: "20px", textAlign: "center" }}>
//       {submitted && <SearchResults apiResponse={apiResponse} topic={topic} />}
//       </div>

//     </div>
    
//   );
// };

// // Export the component as default
// export default SearchPage;

'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

const sampleAPIResponse: APIResponse = { papers: [] };

const SearchPage: React.FC = () => {
  const router = useRouter();
  const [topic, setTopic] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [apiResponse, setAPIResponse] = useState<APIResponse>(sampleAPIResponse);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [shouldSearch, setShouldSearch] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const topicParam = searchParams.get("topic") || "";
    const tagsParam = searchParams.get("tags") || "";
    setTopic(topicParam);
    setTags(tagsParam);

    if (topicParam || tagsParam) {
      setShouldSearch(true);
    }
  }, []);

  const searchPapers = async () => {
    const query = { topic, tags: tags.split(",").map(tag => tag.trim()) };

    try {
      const response = await fetch("http://localhost:8000/search_papers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: APIResponse = await response.json();
      setAPIResponse(data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error fetching papers:", error);
      alert("An error occurred while fetching papers.");
    }
  };

  useEffect(() => {
    if (shouldSearch) {
      searchPapers();
      setShouldSearch(false);
    }
  }, [shouldSearch]);

  const handleSearchClick = () => {
    router.push(`/search?topic=${encodeURIComponent(topic)}&tags=${encodeURIComponent(tags)}`);
    setShouldSearch(true);
    setSubmitted(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchClick();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div className="flex items-center max-w-lg w-full mt-10 space-x-2">
        <input
          className="w-full p-3 rounded-l-lg bg-black text-white placeholder-gray-400 border border-gray-700 focus:outline-none"
          type="text"
          placeholder="e.g., Black Holes"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyPress}  // Submits on Enter key
        />
        <button
          className="p-3 bg-white text-black rounded-r-lg flex items-center justify-center"
          onClick={handleSearchClick}
        >
          <svg fill="#000000" width="20px" height="28px" viewBox="0 -0.24 28.423 28.423" id="_02_-_Search_Button" data-name="02 - Search Button" xmlns="http://www.w3.org/2000/svg">
  <path id="Path_215" data-name="Path 215" d="M14.953,2.547A12.643,12.643,0,1,0,27.6,15.19,12.649,12.649,0,0,0,14.953,2.547Zm0,2A10.643,10.643,0,1,1,4.31,15.19,10.648,10.648,0,0,1,14.953,4.547Z" transform="translate(-2.31 -2.547)" fill-rule="evenodd"/>   <path id="Path_216" data-name="Path 216" d="M30.441,28.789l-6.276-6.276a1,1,0,1,0-1.414,1.414L29.027,30.2a1,1,0,1,0,1.414-1.414Z" transform="translate(-2.31 -2.547)" fill-rule="evenodd"/>
 </svg>
        </button>
      </div>

      <div className="w-full px-4 mt-8">
        {submitted && <SearchResults apiResponse={apiResponse} topic={topic} />}
      </div>
    </div>
  );
};

export default SearchPage;
