import pandas as pd
import json

# Open the JSON file and read line by line
data = []
with open(r'data\\arxiv-metadata-oai-snapshot.json', 'r') as file:
    for line in file:
        # Parse each line as a JSON object
        try:
            data.append(json.loads(line))
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")

# Convert to DataFrame
df = pd.json_normalize(data)

# Save to CSV
df.to_csv('data.csv', index=False)
