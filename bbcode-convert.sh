#!/bin/bash

# Check if a file name is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <file>"
    exit 1
fi

# Original and new file names
ORIGINAL_FILE=$1
NEW_FILE="${ORIGINAL_FILE%.html}.bbcode"

# Make a copy of the original file
cp "$ORIGINAL_FILE" "$NEW_FILE"

# Replace <i> and </i>
sed -i 's/<i>/[i]/g' "$NEW_FILE"
sed -i 's/<\/i>/[\/i]/g' "$NEW_FILE"

# Replace <b> and </b>
sed -i 's/<b>/[b]/g' "$NEW_FILE"
sed -i 's/<\/b>/[\/b]/g' "$NEW_FILE"

# Replace <hr></hr>
sed -i 's/<hr><\/hr>/[hr=3]/g' "$NEW_FILE"

# Replace <u> and </u>
sed -i 's/<u>/[u]/g' "$NEW_FILE"
sed -i 's/<\/u>/[\/u]/g' "$NEW_FILE"

# Replace span classes
sed -i 's/<span class="ally">/[color=#ffd6d6]/g' "$NEW_FILE"
sed -i 's/<span class="cruel">/[color=#e6e6ff]/g' "$NEW_FILE"
sed -i 's/<span class="witch">/[color=#dafaff]/g' "$NEW_FILE"
sed -i 's/<span class="counselor">/[color=#d5f0dd]/g' "$NEW_FILE"
sed -i 's/<span class="caretaker">/[color=#ffead6]/g' "$NEW_FILE"

# Replace </span>
sed -i 's/<\/span>/[\/color]/g' "$NEW_FILE"

# Replace <my-spoiler name into [SPOILER and </my-spoiler> into [/SPOILER]
sed -i 's/<my-spoiler name/[SPOILER/g' "$NEW_FILE"
sed -i 's/<\/my-spoiler>/[\/SPOILER]/g' "$NEW_FILE"

# Replace <img src=" into [IMG]https://scrivenerprincess.github.io/sv-quests and ></img> into [/IMG]
sed -i 's/<img src="/[IMG]https:\/\/scrivenerprincess.github.io\/sv-quests/g' "$NEW_FILE"
sed -i 's/><\/img>/[\/IMG]/g' "$NEW_FILE"

# Replace "> into "]
sed -i 's/">/"]/g' "$NEW_FILE"

echo "Processing complete. Output in $NEW_FILE"
