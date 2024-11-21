filename = 'metadata.json'

# Initialize line counter
line_count = 0

with open(filename, 'r') as file:
    for line in file:
        line_count += 1

print(f'Total number of lines in {filename}: {line_count}')