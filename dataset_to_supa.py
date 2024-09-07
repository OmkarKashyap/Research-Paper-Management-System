import json
from supabase import create_client, Client
from datetime import datetime


url: str = "YOUR_SUPABASE_URL"
key: str = "YOUR_SUPABASE_KEY"
supabase: Client = create_client(url, key)

def insert_paper(paper_data):
    paper = {
        'id': paper_data['id'],
        'submitter': paper_data['submitter'],
        'title': paper_data['title'],
        'comments': paper_data['comments'],
        'journal_ref': paper_data['journal-ref'],
        'doi': paper_data['doi'],
        'report_no': paper_data['report-no'],
        'categories': paper_data['categories'],
        'license': paper_data['license'],
        'abstract': paper_data['abstract'],
        'update_date': datetime.strptime(paper_data['update_date'], '%Y-%m-%d').date()
    }
    supabase.table('papers').insert(paper).execute()

    for i, author in enumerate(paper_data['authors_parsed']):
        author_name = ' '.join(author)
        author_result = supabase.table('authors').select('id').eq('name', author_name).execute()
        
        if len(author_result.data) == 0:
            author_id = supabase.table('authors').insert({'name': author_name}).execute().data[0]['id']
        else:
            author_id = author_result.data[0]['id']
        
        supabase.table('paper_authors').insert({
            'paper_id': paper_data['id'],
            'author_id': author_id,
            'author_position': i
        }).execute()

    for version in paper_data['versions']:
        supabase.table('paper_versions').insert({
            'paper_id': paper_data['id'],
            'version': version['version'],
            'created': datetime.strptime(version['created'], '%a, %d %b %Y %H:%M:%S %Z').date()
        }).execute()

with open('arxiv-metadata-oai-snapshot.json', 'r') as file:
    for line in file:
        paper_data = json.loads(line)
        insert_paper(paper_data)

print("Data insertion complete!")