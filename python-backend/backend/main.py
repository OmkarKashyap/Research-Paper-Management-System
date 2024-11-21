from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from retrieve import ResearchPaperManager
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PaperQuery(BaseModel):
    topic: str
    tags: Optional[List[str]] = None
    limit: Optional[int] = 20

@app.post("/search_papers")
async def search_papers(query: PaperQuery):
    retriever = ResearchPaperManager()
    topic = query.topic
    tags = query.tags
    try:
        content = retriever.get_papers(topic, tags)
        print(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {e}")

    return content
    
