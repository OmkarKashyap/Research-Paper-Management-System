import pandas as pd
from supabase import create_client, Client
import os

# Replace these with your actual Supabase URL and Key from environment variables for security
SUPABASE_URL = os.getenv("SUPABASE_URL",  'https://jrravywgicgpufxkunff.supabase.co/')
SUPABASE_KEY = os.getenv("SUPABASE_KEY", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpycmF2eXdnaWNncHVmeGt1bmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2ODQ4MzUsImV4cCI6MjA0MTI2MDgzNX0.GNFeSKXTecl5t433EAI0XAbQ1j1rhOSUUo8SIcZzby0')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Define the CSV file path and your Supabase table name
csv_file_path = "data.csv"
table_name = "research_papers"

# Define the chunk size (number of rows per chunk)
chunk_size = 10000

# Initialize counters
chunk_num = 1
total_rows_uploaded = 0

try:
    # Read the CSV file in chunks and upload each to Supabase
    for chunk in pd.read_csv(csv_file_path, chunksize=chunk_size):
        print(f"Uploading chunk {chunk_num}...")

        # Convert chunk to list of dictionaries
        data = chunk.to_dict(orient="records")
        
        # Insert chunk data into Supabase and handle response
        try:
            response = supabase.table(table_name).insert(data).execute()
            if response.status_code == 201:
                total_rows_uploaded += len(data)
                print(f"Chunk {chunk_num} uploaded successfully.")
            else:
                print(f"Error in chunk {chunk_num}: {response.structured_error()}")
        except Exception as upload_error:
            print(f"Failed to upload chunk {chunk_num}:", upload_error)
        
        # Increment chunk counter
        chunk_num += 1

    print(f"Total rows uploaded: {total_rows_uploaded}")

    # Verify upload by counting rows in Supabase (use only if data size is manageable)
    response = supabase.table(table_name).select("*", count="exact").execute()
    if response.data:
        print("Total rows in the table after upload:", response.count)
    else:
        print("Row count retrieval error:", response.error)

except Exception as e:
    print("An error occurred:", str(e))
