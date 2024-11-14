'use client';

import React, { useState } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
    const [topic, setTopic] = useState("");
    const [tags, setTags] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        router.push({
            pathname: '/search',
            query: { topic, tags }
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <h1>Research Paper Finder</h1>
            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic..."
                style={{ padding: "10px", marginBottom: "10px", width: "300px" }}
            />
            <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags (comma-separated)"
                style={{ padding: "10px", marginBottom: "10px", width: "300px" }}
            />
            <button onClick={handleSearch} style={{ padding: "10px 20px", cursor: "pointer" }}>Search</button>
        </div>
    );
};

export default HomePage;
