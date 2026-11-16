#!/bin/bash
# tools/contact.sh <name> t1 t2 t3 t4   -> stills/<name>.jpg (4 stills side by side; render them first with: node render.mjs stills t1,t2,t3,t4 <id>)
cd "$(dirname "$0")/.."
n=$1; shift; ins=""; for t in "$@"; do ins="$ins -i stills/t$(printf '%.2f' $t).jpg"; done
ffmpeg -y -loglevel error $ins -filter_complex "[0]scale=540:-1[a];[1]scale=540:-1[b];[2]scale=540:-1[c];[3]scale=540:-1[d];[a][b][c][d]hstack=4" -q:v 4 stills/$n.jpg && echo stills/$n.jpg
