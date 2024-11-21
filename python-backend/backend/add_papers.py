import os
from qdrant_client import QdrantClient, models
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
import PyPDF2
import os
import openai
from groq import Groq
import json

import json

filename = 'metadata.json'
lines_to_check = 2586192  # Adjust this number as needed
data_list = []
categories = set()
with open(filename, 'r') as file:
    for i in range(10000):

        line = file.readline()
        if not line:
            break  # End of file
        try:
            data = json.loads(line)
            data_list.append(data)
            temp = data['categories'].split()
            categories.update(temp)
        except json.JSONDecodeError as e:
            print(f"Error decoding line {i + 1}: {line.strip()} | {e}")

#id, authors, title, categories, abstract
load_dotenv()
qdrant_url = os.getenv('QDRANT_URL')
qdrant_api = os.getenv('QDRANT_API_KEY')

model = SentenceTransformer('all-MiniLM-L6-v2')

client = QdrantClient(url=qdrant_url, api_key=qdrant_api)
client.delete_collection(collection_name="Research-Paper-Management")
client.create_collection(
    collection_name="Research-Paper-Management",
    vectors_config=models.VectorParams(size=384, distance=models.Distance.COSINE),
)


for i in range(10000):
    sample = data_list[i]

    embeddings = model.encode(sample['abstract'])

    client.upsert(
        collection_name="Research-Paper-Management",
        points=[
            models.PointStruct(
                id=i,
                payload={
                    "arXiv_id" : sample['id'],
                    "authors": sample['authors'],
                    "categories" : sample['categories'].split(),
                    "title" : sample['title'],
                    "content" : sample['abstract']
                },
                vector=embeddings,
            
            ),
        ],
    )

response = client.query_points(
    collection_name="{collection_name}",
    query=[0.2, 0.1, 0.9, 0.7], # <--- Dense vector
)
print(response)
# context = response[0].payload['content']

# openai_client = openai.OpenAI(
#     base_url="https://api.groq.com/openai/v1",
#     api_key=os.environ.get("GROQ_API_KEY")
# )

# chat_completion = openai_client.chat.completions.create(
#     #
#     # Required parameters
#     #
#     messages=[
#         # Set an optional system message. This sets the behavior of the
#         # assistant and can be used to provide specific instructions for
#         # how it should behave throughout the conversation.
#         {
#             "role": "system",
#             "content": "you generate multiple choice questions based on the content given to you."
#         },
#         # Set a user message for the assistant to respond to.
#         {
#             "role": "user",
#             "content": context,
#         }
#     ],

#     # The language model which will generate the completion.
#     model="llama3-8b-8192",

#     #
#     # Optional parameters
#     #

#     # Controls randomness: lowering results in less random completions.
#     # As the temperature approaches zero, the model will become deterministic
#     # and repetitive.
#     temperature=0.5,

#     # The maximum number of tokens to generate. Requests can use up to
#     # 32,768 tokens shared between prompt and completion.
#     max_tokens=1024,

#     # Controls diversity via nucleus sampling: 0.5 means half of all
#     # likelihood-weighted options are considered.
#     top_p=1,

#     # A stop sequence is a predefined or user-specified text string that
#     # signals an AI to stop generating content, ensuring its responses
#     # remain focused and concise. Examples include punctuation marks and
#     # markers like "[end]".
#     stop=None,

#     # If set, partial message deltas will be sent.
#     stream=False,
# )

# # Print the completion returned by the LLM.
# print(chat_completion.choices[0].message.content)