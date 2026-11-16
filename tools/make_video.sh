#!/bin/bash
# tools/make_video.sh <id> <final_name.mp4>
# Builds episodes/<id>.js, renders every scene (2 workers), synthesizes audio/<id>.py, muxes to out/final/<final_name.mp4>
set -e
cd "$(dirname "$0")/.."
ID=$1; NAME=${2:-$1.mp4}
python3 tools/build.py $ID
N=$(node -e "const s=require('fs').readFileSync('episodes/$ID.js','utf8');const m=s.match(/const SC=\[(.*)\];/s);console.log((m[1].match(/\[[^\[\]]*\]/g)||[]).length)")
echo "scenes: $N"; mkdir -p out/final out/logs
rm -f out/${ID}_s*.mp4
w(){ for i in $(seq $1 2 $((N-1))); do node render.mjs scene $i $ID; done > out/logs/${ID}_w$1.txt 2>&1; }
w 0 & w 1 & wait
grep -h "exit\|ERR" out/logs/${ID}_w*.txt
for i in $(seq 0 $((N-1))); do test -f out/${ID}_s$i.mp4 || { echo "missing scene $i"; exit 1; }; echo "file ${ID}_s$i.mp4"; done > out/${ID}_list.txt
ffmpeg -y -loglevel error -f concat -i out/${ID}_list.txt -c copy out/${ID}_video.mp4
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 out/${ID}_video.mp4)
PYTHONPATH=audio python3 audio/$ID.py $DUR out/${ID}_audio.wav
ffmpeg -y -loglevel error -i out/${ID}_video.mp4 -i out/${ID}_audio.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart out/final/tmp_$NAME
mv out/final/tmp_$NAME out/final/$NAME
ffmpeg -y -loglevel error -i out/final/$NAME -vf "fps=10/$DUR,scale=216:-1,tile=10x1" -frames:v 1 -q:v 4 out/final/${NAME%.mp4}_sheet.jpg
ffprobe -v error -show_entries format=duration,size -of compact out/final/$NAME
echo "contact sheet: out/final/${NAME%.mp4}_sheet.jpg"
