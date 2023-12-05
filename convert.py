import json

# Specify the input file (.txt) and output file (.json) names
input_file_name = '/Users/praveenlawyantra/Desktop/Search Engine codes/Search Engine Summaries/ICJ_01_12_23/ICJ_01_12_metadata/153-20140715-ORD-01-00-EN_980tokens_refined_summary_metadata.txt'
output_file_name = '/Users/praveenlawyantra/Desktop/Search Engine codes/Search Engine Summaries/ICJ_01_12_23/ICJ_01_12_metadata/153-20140715-ORD-01-00-EN_980tokens_refined_summary_metadatajson.json'

# Read the JSON data from the input file
with open(input_file_name, 'r') as txt_file:
    json_data = json.load(txt_file)

# Write the JSON data to the output file with a .json extension
with open(output_file_name, 'w') as json_file:
    json.dump(json_data, json_file, indent=2)

print(f"Conversion successful. JSON data saved to {output_file_name}")
