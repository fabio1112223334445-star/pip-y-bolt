// usage: node render.mjs stills t1,t2,... <id>   |  node render.mjs scene <index> <id>   (run from repo root after: python3 tools/build.py <id>)
import {createRequire} from 'module';import http from 'http';import fs from 'fs';import path from 'path';import {spawn} from 'child_process';
let chromium;try{chromium=createRequire('/opt/npm-tools/node_modules/')('playwright').chromium}catch(e){chromium=createRequire(import.meta.url)('playwright').chromium}
const EP=process.argv[4]||'index';
const ROOT=path.dirname(new URL(import.meta.url).pathname);
const mime={'.html':'text/html','.js':'text/javascript','.woff2':'font/woff2'};
const srv=http.createServer((q,s)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){s.writeHead(404);s.end();return}s.writeHead(200,{'content-type':mime[path.extname(f)]||'application/octet-stream'});s.end(d)})});
await new Promise(r=>srv.listen(0,r));const port=srv.address().port;
const br=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--no-sandbox']});
const pg=await br.newPage({viewport:{width:1080,height:1920}});
pg.on('console',m=>{if(m.type()==='error')console.log('PAGE:',m.text())});pg.on('pageerror',e=>console.log('ERR:',e.message));
await pg.goto(`http://localhost:${port}/${EP}.html`);await pg.waitForFunction('window.READY===true',null,{timeout:60000});
const [mode,arg,EPa]=process.argv.slice(2);const FPS=30;
if(mode==='stills'){fs.mkdirSync(ROOT+'/stills',{recursive:true});for(const t of arg.split(',')){const t0=Date.now();await pg.evaluate(t=>window.renderAt(t),+t);await pg.screenshot({path:`${ROOT}/stills/t${(+t).toFixed(2)}.jpg`,type:'jpeg',quality:80});console.log(t,Date.now()-t0,'ms')}}
else{const sc=await pg.evaluate('window.SCENES');const [a,b]=sc[+arg];const f0=Math.round(a*FPS),f1=Math.round(b*FPS);
 fs.mkdirSync(ROOT+'/out',{recursive:true});const tmp=`${ROOT}/out/${EP}_s${arg}.tmp.mp4`,fin=`${ROOT}/out/${EP}_s${arg}.mp4`;
 const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',''+FPS,'-c:v','mjpeg','-i','-','-c:v','libx264','-crf','18','-preset','veryfast','-pix_fmt','yuv420p','-r',''+FPS,tmp],{stdio:['pipe','inherit','inherit']});
 for(let f=f0;f<f1;f++){await pg.evaluate(t=>window.renderAt(t),f/FPS+1e-4);const buf=await pg.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if((f-f0)%30===0)console.log('scene',arg,f-f0,'/',f1-f0)}
 ff.stdin.end();const code=await new Promise(r=>ff.on('close',r));if(code===0)fs.renameSync(tmp,fin);console.log('scene',arg,'exit',code)}
await br.close();srv.close();
