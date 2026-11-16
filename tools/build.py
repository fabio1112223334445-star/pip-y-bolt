# python3 tools/build.py <id>   -> writes <id>.html at repo root from core/ + episodes/<id>.js
import sys,os
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/..')
n=sys.argv[1]
ep=open(f'episodes/{n}.js').read().split('//@@SPLIT@@')
assert len(ep)==2,'episode file needs exactly one //@@SPLIT@@ line (overlays above, scene code below)'
open(f'{n}.html','w').write(open('core/core_head.txt').read()+ep[0]+open('core/core_help.txt').read()+ep[1]+open('core/core_tail.txt').read())
print('built',n+'.html')
