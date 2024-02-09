import regex as re
import sys
import os

def replace_markers_in_file(input_file_path, output_file_path):
    # Read the contents of the input file
    try:
        with open(input_file_path, 'r', encoding='utf8') as file:
            content = file.read()
    except UnicodeDecodeError as e:
        print(f"Error reading file {input_file_path}: {e}")
        sys.exit(1)

    # Replace ** with [b] and [/b] (across multiple lines)
    content = re.sub(r'\*\*(.*?)\*\*', r'[b]\1[/b]', content, flags=re.DOTALL)

    # Replace * with [i] and [/i] (across multiple lines)
    content = re.sub(r'\*(.*?)\*', r'[i]\1[/i]', content, flags=re.DOTALL)

    # Replace ####, ###, ##, # in order
    content = re.sub(r'^####(.*?)\n(.*?)####', r'[spoiler="\1"]\2[/spoiler]', content, flags=re.MULTILINE | re.DOTALL)
    content = re.sub(r'^###(.*?)\n(.*?)###', r'[spoiler="\1"]\2[/spoiler]', content, flags=re.MULTILINE | re.DOTALL)
    content = re.sub(r'^##(.*?)\n(.*?)##', r'[spoiler="\1"]\2[/spoiler]', content, flags=re.MULTILINE | re.DOTALL)
    content = re.sub(r'^#(.*?)\n(.*?)#', r'[spoiler="\1"]\2[/spoiler]', content, flags=re.MULTILINE | re.DOTALL)

    # Replace <u> and </u> with [u] and [/u]
    content = content.replace('<u>', '[u]').replace('</u>', '[/u]')

    # Replace ![[ with [img]https://scrivenerprincess.github.io/sv-quests/ and ]] with [/img]
    content = content.replace('![[', '[img]https://scrivenerprincess.github.io/sv-quests/').replace(']]', '[/img]')

    # Write the modified content to the output file
    with open(output_file_path, 'w') as file:
        file.write(content)

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 convert-to-bbcode.py <input_file>")
        sys.exit(1)

    # Use a raw string for the file path
    input_file_path = sys.argv[1]
    if not os.path.isfile(input_file_path):
        print(f"Error: The file {input_file_path} does not exist.")
        sys.exit(1)

    base_name, ext = os.path.splitext(input_file_path)
    output_file_path = base_name + '-bbcode.md'
    replace_markers_in_file(input_file_path, output_file_path)

if __name__ == "__main__":
    main()