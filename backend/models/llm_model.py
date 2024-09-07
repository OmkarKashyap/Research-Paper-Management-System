import sys
import json
import torch
from transformers import AutoTokenizer, AutoModel

# Load pre-trained model and tokenizer
model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

# Sample paper database (replace this with your actual database)
papers = [
    {"id": "1", "title": "Deep Learning in Neural Networks", "abstract": "This paper reviews deep learning in neural networks."},
    {"id": "2", "title": "Attention is All You Need", "abstract": "We propose the Transformer, a novel neural network architecture."},
    # Add more papers here
]

def encode_text(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).squeeze()

def similarity(vec1, vec2):
    return torch.cosine_similarity(vec1, vec2, dim=0)

def search_papers(query, top_k=5):
    query_vec = encode_text(query)
    
    results = []
    for paper in papers:
        paper_vec = encode_text(paper["title"] + " " + paper["abstract"])
        sim = similarity(query_vec, paper_vec).item()
        results.append((sim, paper))
    
    results.sort(reverse=True, key=lambda x: x[0])
    return [paper for _, paper in results[:top_k]]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please provide a search query.")
        sys.exit(1)

    query = sys.argv[1]
    results = search_papers(query)
    print(json.dumps(results))