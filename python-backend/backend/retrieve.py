# import os
# from qdrant_client import QdrantClient, models
# from dotenv import load_dotenv
# from sentence_transformers import SentenceTransformer

# load_dotenv()
# qdrant_url = os.getenv('QDRANT_URL')
# qdrant_api = os.getenv('QDRANT_API_KEY')

# model = SentenceTransformer('all-MiniLM-L6-v2')

# client = QdrantClient(url=qdrant_url, api_key=qdrant_api)

# topic = "Black Holes"
# topic_emb = model.encode(topic)

# response = client.query_points(
#     collection_name="Research-Paper-Management",
#     query=topic_emb,
#     limit=20
# )
# # context = response[0].payload['content']
# for i in response:
#     for point in i[1]:
#         print(point.payload['title'])

import os
# from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient

class ResearchPaperManager:
    def __init__(self,collection_name="Research-Paper-Management"):
        # load_dotenv()
        QDRANT_API_KEY = 'gSLlpX3Lph13bRsLtRHCQa9jmfhDZX2N-OgVDlHpI4hi5-YJnsmAXg'
        QDRANT_URL = 'https://c98b2cd2-49f8-49f9-af4c-5e8bc3986ada.europe-west3-0.gcp.cloud.qdrant.io:6333'
        self.qdrant_url =QDRANT_API_KEY
        self.qdrant_api_key = QDRANT_URL
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.client = QdrantClient(url=self.qdrant_url, api_key=self.qdrant_api_key)
        self.collection_name = collection_name

    def encode_topic(self, topic):
        """Encode the topic into an embedding."""
        return self.model.encode(topic)

    def query_qdrant(self, topic_emb, limit=20):
        """Query points from Qdrant."""
        # print(limit)
        return self.client.query_points(
            collection_name=self.collection_name,
            query=topic_emb,
            limit=limit
        )

    def make_results(self, response):
        """Process and print the titles of the results."""
        papers = []
        for i in response:
            for point in i[1]:
                paper = {
                    "title": point.payload['title'],
                    "authors": point.payload['authors'],
                    "tags": point.payload['categories'],
                    "arxiv_id": point.payload['arXiv_id'],
                    "abstract": point.payload['content']
                }
                papers.append(paper)
        
        return { "papers" : papers}

    def get_papers(self, topic, tags):
        """Execute the full flow: encoding, querying, and printing results."""
        topic_emb = self.encode_topic(topic)
        print(topic_emb.shape)
        response = self.query_qdrant(topic_emb)
        print(response)
        return self.make_results(response)

if __name__ == "__main__":
    topic = "Black Holes"
    manager = ResearchPaperManager()
    manager.get_papers(topic, [])

    