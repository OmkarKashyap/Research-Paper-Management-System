import React from "react";
import PaperCard from "./PaperCard";

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

type SearchResultsProps = {
    apiResponse: APIResponse;
    topic: string;
};

function SearchResults({ apiResponse, topic}: SearchResultsProps) {
    return (
        <div style={{ marginTop: "30px", textAlign: "left",
        width:"100%"
        }}>
            <h2 className="px-20">Search Results for "{topic}"</h2>
            {/* <div style={{ flexBasis: "33.33%", flexShrink: 0 }}></div> */}
            <div >
            {apiResponse.papers.length > 0 ? (
                apiResponse.papers.map((paper, index) => (
                    <PaperCard key={index} paper={paper} />
                ))
            ) : (
                <p>No papers found for the given topic and tags.</p>
            )}
            </div>
            
        </div>
    );
}

export default SearchResults;
