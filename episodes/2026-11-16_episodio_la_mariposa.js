ov("DON'T MOVE…",0.9,3.9,250,130,{color:YEL});
ov('MISSED!',6.1,7.5,300,170,{color:'#ff6b6b',rot:-6,shake:2});
ov('Sneaky…',10.4,12.4,260,110);
ov('ACHOO!',14.6,15.7,260,190,{color:YEL,rot:-6,shake:2});
ov('SCANNING…',17.4,19.2,260,120,{color:'#7dffd6'});
ov('BEEP!',19.25,20.1,330,160,{color:'#ff6b6b',rot:5,shake:2});
ov('Aww…',20.4,21.9,280,130);
ov('Shh… stay still…',22.4,25.3,260,100);
ov('SO MANY FRIENDS!',29.2,32,230,120,{color:YEL,rot:-3});
//@@SPLIT@@
M.g.visible=false;prop.g.visible=false;gear.visible=false;
const LPX=-.8,LBX=.8;
const CAM=[[0,1.8,10.3],[0,1.15,CZ]];
// ---------- mariposas ----------
function makeBF(c,c2){const g=new THREE.Group();const body=std(0x3b1d6e,{roughness:.5});
 g.add(mesh(new THREE.CapsuleGeometry(.025,.13,4,8),body,[0,0,0],[1,1,1],[Math.PI/2,0,0]));
 g.add(sph(body,.035,[0,.01,.09]));
 for(const sx of[-1,1]){g.add(mesh(new THREE.CapsuleGeometry(.006,.09,3,6),body,[sx*.03,.06,.13],[1,1,1],[.7,0,-sx*.4]))}
 const W=[];for(const sx of[-1,1]){const w=new THREE.Group();g.add(w);const wm=std(c,{roughness:.35,side:THREE.DoubleSide,emissive:c,emissiveIntensity:.3});
  w.add(sph(wm,1,[sx*.13,0,.04],[.13,.012,.1]));w.add(sph(wm,1,[sx*.09,0,-.08],[.09,.012,.07]));
  w.add(sph(std(c2),1,[sx*.15,.006,.05],[.035,.012,.03]));W.push({w,sx})}
 scene.add(g);return{g,W,ph:rnd()*6}}
function setBF(b,p,t,o={}){o=Object.assign({ry:0,amp:1,rate:26,s:1.3,rx:-.8,rz:0},o);b.g.visible=true;b.g.position.set(...p);b.g.rotation.set(o.rx,o.ry,o.rz);b.g.scale.setScalar(o.s);
 const f=.15+o.amp*(.5+.5*Math.sin(t*o.rate+b.ph))*1.1;for(const{w,sx}of b.W)w.rotation.z=sx*f}
seed=4242;
const BFH=makeBF(0x9b6bff,0xffd23f);
const COLS=[[0xff6f91,0xffffff],[0xffd23f,0xff8c2e],[0x4aa8ff,0xffffff],[0x5fd068,0xffd23f],[0xff9f43,0x3b1d6e],[0x7dffd6,0x4aa8ff],[0xff5d73,0xffd23f],[0xb388ff,0xffffff],[0xffe14d,0xff5d73],[0x4fc3f7,0xffd23f]];
const SW=COLS.map(c=>makeBF(c[0],c[1]));
const SPOTS=[[LPX,1.27,CZ],[LPX-.55,.55,CZ+.12],[LPX+.56,.58,CZ+.12],[LPX+.3,.25,CZ+.45],[LPX-.3,.98,CZ+.3],[LBX,1.25,CZ],[LBX-.26,1.1,CZ+.12],[LBX+.27,1.1,CZ+.12],[LBX-.33,.3,CZ+.15],[LBX+.02,.4,CZ+.3]];
const SWD=SW.map((b,i)=>({start:[(i%2?1:-1)*(3+rnd()*1.5),.8+rnd()*3,CZ+(rnd()-.5)*2],t0:24.4+i*.38+rnd()*.15,dur:1.3+rnd()*.5,ry:(rnd()-.5)*1.4,wob:rnd()*6}));
// ---------- flor grande y rayo de escaneo ----------
const flower=new THREE.Group();flower.position.set(-.35,0,CZ+.45);scene.add(flower);
flower.add(cyl(std(0x3c9d3f),.05,1.05,[0,.52,0]));
flower.add(sph(std(0x4fba4f),1,[.16,.45,0],[.22,.05,.1]));flower.add(sph(std(0x4fba4f),1,[-.16,.3,0],[.22,.05,.1]));
const bloom=new THREE.Group();bloom.position.set(0,1.08,.02);flower.add(bloom);
for(let k=0;k<8;k++){const a=k/8*6.283;bloom.add(sph(std(0xffd23f,{roughness:.5}),1,[Math.cos(a)*.24,Math.sin(a)*.24,0],[.15,.15,.05]))}
bloom.add(sph(std(0xff8c2e,{roughness:.6}),.14,[0,0,.04],[1,1,.6]));
const beam=mesh(new THREE.CylinderGeometry(.33,.03,1,24,1,true),bas(0x7dffd6,{transparent:true,opacity:.28,side:THREE.DoubleSide,depthWrite:false}),[0,0,0],[1,1,1],[0,0,0],false);scene.add(beam);
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
function antTop(){bolt.g.updateMatrixWorld(true);return bolt.ant.localToWorld(V(0,.36,0)).toArray()}
function hover(t,cx,cy,cz,r=.6){return[cx+Math.sin(t*1.3)*r,cy+Math.sin(t*2.1)*.25,cz+Math.cos(t*1.3)*.3]}
function hideAll(){for(const b of SW)b.g.visible=false;beam.visible=false;flower.visible=false}
// partículas
burst('spark',1.05,[LBX,1.3,CZ],6,{sp:.7,up:.3,s0:.1,life:.6,ring:true});
burst('puff',6.35,[-.05,.3,CZ+.2],12,{sp:2.2,up:.6,s0:.12,s1:.45,color:0xfff3df,life:.7});
burst('puff',14.6,[-.2,.6,CZ+.8],12,{sp:2.2,up:.4,s0:.07,s1:.3,color:0xffffff,life:.55});
burst('spark',19.25,[.3,2.0,CZ],10,{sp:1.6,up:.6,s0:.18,life:.6,ring:true});
for(let i=0;i<6;i++)burst('spark',29.1+i*.18,[(rnd()-.5)*2.4,.6+rnd()*.8,CZ+.3],3,{sp:.6,up:.5,s0:.12,life:.6,ring:true});

function s1(u){ // 0-4 gancho: la mariposa se posa en la antena
 hideAll();const c=E.io(seg(u,2.6,3.9));
 camSet([lerp(LBX-.15,0,c),lerp(1.35,1.8,c),lerp(4.6,10.3,c)],[lerp(LBX,0,c),lerp(1.05,1.15,c),CZ]);
 setBolt(bolt,{x:LBX,z:CZ,look:u>1?[0,1]:[-.3,.6],es:u>1?1.35:1,eye:'dot',mouth:u>1?'o':'smile',al:.1,ar:.1,sy:u>1.05?1+Math.sin(u*45)*.008:1,blink:false});
 const top=antTop();
 if(u<1.05){const v=E.out(seg(u,0,1.05));setBF(BFH,[lerp(top[0]-1.2,top[0],v)+Math.sin(u*6)*.15*(1-v),lerp(top[1]+.9,top[1],v),lerp(top[2]+.8,top[2],v)],u,{ry:.6*(1-v)})}
 else setBF(BFH,top,u,{amp:.35,rate:6});
 setPip(pip,{x:LPX,z:CZ,look:[.9,.6],eye:1.2,pup:.8,beak:u>3?.4:0,wl:u>3.2?.35:0,wr:u>3.2?.35:0,brow:-.2,browY:1,blink:false});
}
function s2(u){ // 4-10 intento 1: saltar
 hideAll();camSet(...CAM);const t=u+4;
 // Pip
 let px=LPX,py=0,o={};
 if(t<5.4){o={sy:1-.22*E.io(seg(t,4.4,5.3)),look:[.9,.7],brow:.8,browY:.3,lid:.25,wl:.15,wr:.15,blink:false}}
 else if(t<6.35){const v=seg(t,5.4,6.35);px=lerp(LPX,-.05,v);py=1.7*Math.sin(Math.PI*v*.92)+(1-v)*0;o={rx:v*1.2,sy:1.12,look:[.6,1],eye:1.2,beak:.8,wl:1,wr:1,blink:false}}
 else if(t<8.0){px=-.05;py=0;o={rx:1.35,sy:1-pulse(t,6.35,.25)*.25,lid:.7,beak:.3,wl:.2,wr:.2,blink:false}}
 else{const v=seg(t,8.0,8.6),w=seg(t,8.6,9.8);px=lerp(-.05,LPX,E.io(w));py=hop(t,8.6,.3,.2)+hop(t,8.9,.3,.2)+hop(t,9.2,.3,.2)+hop(t,9.5,.3,.2);o={rx:lerp(1.35,0,E.back(v)),ry:w>0&&w<1?-.9:0,look:[.4,.8],brow:.7,browY:.2,lid:.2,blink:true}}
 setPip(pip,Object.assign({x:px,y:py,z:CZ},o));
 // Bolt
 const wob=t>5.85&&t<7?Math.sin((t-5.85)*25)*.18*(1-seg(t,5.85,7)):0;
 setBolt(bolt,{x:LBX,z:CZ,rz:wob,sy:1-pulse(t,5.85,.2)*.15,look:t<5.4?[-.6,.3]:t<6.4?[-.5,.9]:t<8?[-.9,-.4]:[-.5,.8],eye:t>5.85&&t<6.6?'ring':'dot',mouth:t>6.35&&t<8?'o':'flat',ant:wob*2,al:t>6.6&&t<8?.4:.1,ar:t>6.6&&t<8?.4:.1,blink:false});
 // mariposa
 const top=antTop();
 if(t<5.45)setBF(BFH,top,t,{amp:.35,rate:6});
 else{const v=E.out(seg(t,5.45,6.3));const hv=hover(t,.2,2.3,CZ,.7);setBF(BFH,[lerp(top[0],hv[0],v),lerp(top[1],hv[1],v),lerp(top[2],hv[2],v)],t,{ry:Math.sin(t*1.3)*.8})}
}
function s3(u){ // 10-17 intento 2: esconderse tras la flor
 hideAll();flower.visible=true;camSet(...CAM);const t=u+10;
 const hidden=seg(t,10.2,10.9);let px=lerp(LPX,-.4,E.io(hidden)),pz=lerp(CZ,CZ-.05,hidden);
 const land=12.8,sneeze=14.6;
 let o={look:[.5,.8],brow:.6,browY:.3,lid:.3,blink:false};
 if(t>11&&t<12.6)o={look:[.8,.6],brow:.7,lid:.35,blink:false};
 if(t>=land&&t<sneeze){const k=seg(t,land,14.4);o={look:[0,-.3],eye:1.1,sy:1+.12*k+(t>13.6?Math.sin(t*40)*.02:0),rx:-.2*k,lid:.3+.4*k,beak:.25+.6*k,brow:.5,browY:k,blink:false}}
 if(t>=sneeze){const k=seg(t,sneeze,15.2);px=lerp(-.4,-.75,E.out(k));o={sy:1-pulse(t,sneeze,.2)*.25,lid:t<15.4?1:.3,beak:t<15.2?.8:.1,look:[.5,1],brow:.5,blink:t>15.6}}
 setPip(pip,Object.assign({x:px,z:pz},o));
 if(t>=land&&t<sneeze)for(const e of pip.eyes)e.pup.position.set(-e.sx*.045,-.03,0);
 bloom.rotation.z=t>sneeze?Math.sin((t-sneeze)*18)*.25*Math.exp(-(t-sneeze)*2):Math.sin(t*2)*.03;
 bloom.position.x=t>sneeze?Math.sin((t-sneeze)*14)*.06*Math.exp(-(t-sneeze)*2):0;
 setBolt(bolt,{x:LBX,z:CZ,look:t<12.8?[-.4,.8]:[-.9,0],eye:t>sneeze&&t<15.6?'ring':'dot',es:t>12.8&&t<sneeze?1.25:1,mouth:t>12.8&&t<sneeze?'o':t>sneeze&&t<15.6?'o':'smile',
  face:t>13.2&&t<14.5?E.out(seg(t,13.2,13.5)):0,al:.1,ar:t>sneeze&&t<15.6?.6:.1,blink:t<12.8||t>15.6});
 // mariposa
 pip.g.updateMatrixWorld(true);const beak=pip.g.localToWorld(V(0,.62,.72)).toArray();
 if(t<11.6)setBF(BFH,hover(t,.2,2.3,CZ,.7),t,{ry:Math.sin(t*1.3)*.8});
 else if(t<land){const v=E.io(seg(t,11.6,land));const hv=hover(11.6,.2,2.3,CZ,.7);setBF(BFH,[lerp(hv[0],beak[0],v)+Math.sin(t*5)*.2*(1-v),lerp(hv[1],beak[1],v),lerp(hv[2],beak[2],v)],t,{ry:-.6*v})}
 else if(t<sneeze)setBF(BFH,beak,t,{amp:.3,rate:7,ry:-.6,rx:-1.2});
 else{const v=seg(t,sneeze,15.6);const hv=hover(t,.4,2.4,CZ,.6);const k=E.out(v);
  setBF(BFH,[lerp(beak[0]+1.4,hv[0],seg(t,15.2,16.4))*1+(1-seg(t,sneeze,15.2))*0,lerp(beak[1]+.9,hv[1],seg(t,15.2,16.4)),lerp(beak[2],hv[2],seg(t,15.2,16.4))],t,{rz:t<15.4?(t-sneeze)*14:0,ry:.5})}
}
function s4(u){ // 17-22 intento 3: el escáner de Bolt
 hideAll();camSet(...CAM);const t=u+17;
 const scan=t>17.3&&t<19.25;
 setBolt(bolt,{x:LBX,z:CZ,y:hop(t,17.1,.3,.2),glow:scan?1:0,al:scan?.9:t>20.2?.05:.2,ar:scan?.9:t>20.2?.05:.2,look:t<20.2?[-.5,1]:[-.3,-.6],es:scan?1.3:1,eye:t>19.25&&t<20.2?'ring':'dot',
  mouth:t>20.2?'frown':scan?'flat':'o',cut:t>20.2?.6:0,tilt:.35,ant:scan?Math.sin(t*30)*.1:0,blink:false});
 // mariposa
 let hp;
 if(t<19.25)hp=hover(t,.15,2.35,CZ,.35);
 else{const v=E.in(seg(t,19.25,20.0));const h0=hover(19.25,.15,2.35,CZ,.35);hp=[lerp(h0[0],-3.2,v),lerp(h0[1],4.6,v),h0[2]]}
 if(t<20.0)setBF(BFH,hp,t,{rate:t>19.25?40:26,ry:t>19.25?-1.2:Math.sin(t*1.3)*.8});else BFH.g.visible=false;
 if(scan){beam.visible=true;bolt.g.updateMatrixWorld(true);const S=bolt.head.localToWorld(V(0,.3,.32));const Hp=V(...hp);const d=Hp.clone().sub(S);const L=d.length();
  beam.position.copy(S.clone().add(Hp).multiplyScalar(.5));beam.scale.set(1,L,1);beam.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());beam.material.opacity=.22+.08*Math.sin(t*25)}
 setPip(pip,{x:LPX,z:CZ,look:t<19.25?[.6,1]:t<20.2?[-.8,1]:[.3,-.4],eye:t>19.25&&t<20.2?1.2:1,beak:t>19.25&&t<20.2?.7:0,lid:t>20.2?.5:0,brow:t>20.2?.9:-.2,wl:t>19.25&&t<20?.6:0,wr:t>19.25&&t<20?.6:0,blink:t<19.25});
}
function s5(u){ // 22-32 remate: quietos... y llegan diez mariposas
 hideAll();const t=u+22;const c=E.io(seg(t,22.2,23.6));
 camSet([0,lerp(1.8,1.6,c),lerp(10.3,9.7,c)],[0,lerp(1.15,.95,c),CZ]);
 const still=t>23.5&&t<29, open=t>=29;
 const shh=t>22.2&&t<23.5;
 setPip(pip,{x:LPX,z:CZ,look:open?[0,.3]:[.5,.2],lid:still?.92:open?0:.2,eye:open?1.25:1,pup:open?.75:1,beak:shh?.15:open&&t>30.4?.4+.3*Math.sin(t*22):open?.3:0,wl:shh?.7:0,wr:0,brow:open?-.6:-.2,browY:open?1:0,sy:1,blink:false});
 setBolt(bolt,{x:LBX,z:CZ,look:open?[0,.3]:[-.5,.2],eye:still?'line':open&&t>30.4?'arc':open?'ring':'dot',es:open?1.3:1,mouth:open?'smile':'flat',al:.1,ar:.1,glow:open?.6:0,blink:false});
 for(let i=0;i<SW.length;i++){const b=SW[i],d=SWD[i],sp=SPOTS[i];const v=seg(t,d.t0,d.t0+d.dur);
  if(t<d.t0){b.g.visible=false;continue}
  let p;if(v<1){const k=E.io(v);p=[lerp(d.start[0],sp[0],k)+Math.sin(t*4+d.wob)*.35*(1-k),lerp(d.start[1],sp[1],k)+Math.sin(t*6+d.wob)*.2*(1-k),lerp(d.start[2],sp[2],k)];setBF(b,p,t,{ry:d.ry*(1-k)+(d.start[0]<0?1:-1)*.8*(1-k)})}
  else{const lift=t>31.0?E.io(seg(t,31.0,32))*0:0;setBF(b,[sp[0],sp[1]+lift,sp[2]],t,{amp:.25,rate:5+i%3,ry:d.ry*.5,rx:-1.25})}}
 // la mariposa morada vuelve al final
 pip.g.updateMatrixWorld(true);const beak=pip.g.localToWorld(V(0,.62,.72)).toArray();
 if(t<28.8)BFH.g.visible=false;else{const v=E.io(seg(t,28.8,30.4));setBF(BFH,[lerp(2.6,beak[0]+.05,v),lerp(3.4,beak[1]-.14,v),lerp(CZ,beak[2]+.05,v)],t,v<1?{ry:-.8}:{amp:.3,rate:7,ry:-.6,rx:-1.25,s:1.05})}
}
const SC=[[0,4,s1],[4,10,s2],[10,17,s3],[17,22,s4],[22,27,s5],[27,32,u=>s5(u+5)]];
