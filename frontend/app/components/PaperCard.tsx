// import React, { useState } from "react";

// type Paper = {
//     title: string;
//     authors: string;
//     tags: string[];
//     arxiv_id: string;
//     abstract: string;
// };

// type PaperCardProps = {
//     paper: Paper;
// };

// function PaperCard({ paper }: PaperCardProps) {
//     const [showFullAbstract, setShowFullAbstract] = useState(false);
    
//     // Toggle function to show/hide the full abstract
//     const toggleAbstract = () => {
//         setShowFullAbstract(!showFullAbstract);
//     };
    
//     // Limit abstract to 100 characters initially
//     const abstractPreview = paper.abstract.length > 300
//         ? paper.abstract.slice(0, 300) + "..."
//         : paper.abstract;

//     return (
//         <div style={{ padding: "15px", borderRadius: "5px", marginBottom: "15px", width:"80%" }}>
//             <a style={{ fontSize: "20px", fontWeight: "bold" }} href={`https://arxiv.org/pdf/${paper.arxiv_id}`} target="_blank" rel="noopener noreferrer">{paper.title}</a>
//             <p>{paper.authors}</p>
//             <p><strong>Abstract:</strong> {showFullAbstract ? paper.abstract : abstractPreview}</p>
//             {paper.abstract.length > 100 && (
//                 <button
//                     onClick={toggleAbstract}
//                     style={{
//                         background: "none",
//                         border: "none",
//                         color: "#007bff",
//                         cursor: "pointer",
//                         padding: "0",
//                         fontSize: "14px"
//                     }}
//                 >
//                     {showFullAbstract ? "Show less" : "Show more"}
//                 </button>
//             )}
//             <p><strong>Tags:</strong> {paper.tags.join(", ")}</p>
//         </div>
//     );
// }

// export default PaperCard;


import React, { useState } from "react";

type Paper = {
    title: string;
    authors: string;
    tags: string[];
    arxiv_id: string;
    abstract: string;
};

type PaperCardProps = {
    paper: Paper;
};

function PaperCard({ paper }: PaperCardProps) {
    const [showFullAbstract, setShowFullAbstract] = useState(false);

    const toggleAbstract = () => {
        setShowFullAbstract(!showFullAbstract);
    };

    const abstractPreview = paper.abstract.length > 300
        ? paper.abstract.slice(0, 300) + "..."
        : paper.abstract;

    return (
        <div
        className="mb-6 mt-4 w-full py-2 px-20"
        >
            <a className="text-xl font-bold hover:underline" href={`https://arxiv.org/pdf/${paper.arxiv_id}`} target="_blank" rel="noopener noreferrer">{paper.title}</a>
            <p className="text-sm my-1">{paper.authors}</p>
            <p><strong>Abstract:</strong> {showFullAbstract ? paper.abstract : abstractPreview}</p>
            {paper.abstract.length > 300 && (
                <button
                    onClick={toggleAbstract}
                    style={{
                        background: "none",
                        border: "none",
                        color: "#007bff",
                        cursor: "pointer",
                        padding: "0",
                        fontSize: "14px",
                    }}
                >
                    {showFullAbstract ? "Show less" : "Show more"}
                </button>
            )}
            <p><strong>Tags:</strong> {paper.tags.join(", ")}</p>
        </div>
    );
}

export default PaperCard;
