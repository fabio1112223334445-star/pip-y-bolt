ov('A',0.35,5.0,120,420,{color:YEL});
ov('A is for…',2.2,5.0,640,110);
ov('Hmm…',5.4,7.0,300,120);
ov('APPLE!',10.6,12.9,250,190,{color:'#ff6b6b',rot:-4,shake:1});
ov('A is for Ap—',13.0,14.3,300,105);
ov('CHOMP!',14.3,15.3,280,190,{color:YEL,rot:6,shake:2});
ov('A a',17.4,24.5,120,300,{color:YEL});
ov('Apple',18.4,24.5,500,150,{color:'#ff6b6b'});
ov('Say it with Pip: A!',20.2,24.5,700,80);
//@@SPLIT@@
M.g.visible=false;prop.g.visible=false;gear.visible=false;
const LPX=-.8,LBX=.8;
function makeApple(r){const g=new THREE.Group();g.add(sph(std(0xe8343f,{roughness:.22}),r,[0,0,0],[1,.92,1]));g.add(cyl(std(0x7a4a2a),r*.07,r*.5,[0,r*.95,0],[0,0,.2]));g.add(sph(std(0x5fd068),r,[r*.35,r*1.05,0],[.45,.08,.25]));g.add(sph(bas(0xffffff,{transparent:true,opacity:.6}),r*.2,[-r*.4,r*.45,r*.72],[1,1.5,.4],false));scene.add(g);return g}
const apple=makeApple(.26),apple2=makeApple(.26);
const core=new THREE.Group();core.add(cyl(std(0xfff1d6),.06,.34,[0,0,0]));core.add(sph(std(0xe8343f,{roughness:.22}),.13,[0,.17,0],[1,.45,1]));core.add(sph(std(0xe8343f,{roughness:.22}),.13,[0,-.17,0],[1,.45,1]));core.add(cyl(std(0x7a4a2a),.018,.12,[0,.27,0]));scene.add(core);
const CAM=[[0,1.8,10.3],[0,1.15,CZ]];
burst('spark',.35,[LBX,1.25,CZ],10,{sp:1.6,up:.8,s0:.2,life:.7,ring:true});
burst('puff',6.55,[LPX-.6,.2,CZ],6,{sp:1.2,up:.4,s0:.1,s1:.35,color:0xfff3df,life:.5});
burst('spark',10.55,[LPX,1.3,CZ+.3],10,{sp:1.5,up:.7,s0:.2,life:.6,ring:true});
for(let i=0;i<3;i++)burst('puff',14.3+i*.32,[LPX+.55,.55,CZ+.7],4,{sp:1.1,up:.5,s0:.05,s1:.16,color:0xffe7b0,life:.35});
burst('conf',17.4,[0,2.6,1.4],40,{sp:3.2,up:2.6,g:7,s0:.12,life:1.8,color:CONF,ring:true,spread:1});
burst('spark',18.4,[LBX+.35,1.05,CZ+.2],8,{sp:1.2,up:.6,s0:.18,life:.6,ring:true});
function hideApples(){apple.visible=false;apple2.visible=false;core.visible=false}
function sA(u){ // 0-5 la letra
 camSet(...CAM);hideApples();
 setBolt(bolt,{x:LBX,z:CZ,y:hop(u,.1,.32,.35),glow:u>.3?1:0,al:u>.3&&u<2?1.1:.15,ar:u>.3&&u<2?1.1:.15,eye:u<2?'arc':'dot',mouth:'smile',look:u<2?[0,.6]:[-.9,.1],ant:Math.sin(u*9)*.15,blink:u>2});
 setPip(pip,{x:LPX,z:CZ,y:hop(u,.5,.3,.25),look:u<2.2?[.4,1]:[.9,.2],eye:u>.4&&u<2.2?1.2:1,pup:u>.4&&u<2.2?.8:1,beak:u>.4&&u<1.6?.7:0,wl:u>.4&&u<1.1?.8:0,wr:u>.4&&u<1.1?.8:0,brow:-.3,browY:u<2.2?1:0,blink:u>2.2});
}
function sB(u){ // 5-11 Pip busca la manzana
 camSet(...CAM);hideApples();const t=u+5;
 const leave=seg(t,6.3,6.9),ret=seg(t,8.9,9.9);
 let px=LPX,py=0,o={};
 if(t<6.3){o={look:[kf(t,[[5,0],[5.6,-.9],[6.0,.9],[6.3,-.9]]),.3],brow:.6,browY:.6,beak:.15}}
 else if(t<8.9){px=lerp(LPX,-3.4,E.in(leave));py=hop(t,6.3,.3,.3)+hop(t,6.6,.3,.3);o={ry:-1.2*leave,look:[-1,0],wl:.5,wr:.5}}
 else{px=lerp(-3.4,LPX,E.out(ret));py=t<9.9?Math.abs(Math.sin((t-8.9)*10))*.25:hop(t,10.1,.35,.4);o={ry:-1.0*(1-ret),look:[.9,.4],eye:1.1,beak:t>10.1?.7:0,wl:t>10.1?.9:.4,wr:t>10.1?.9:.4,brow:-.4,lid:t>10.1?.25:0,blink:false}}
 setPip(pip,Object.assign({x:px,y:py,z:CZ},o));
 if(t>=8.9){apple.visible=true;pip.g.updateMatrixWorld(true);const p=new THREE.Vector3(0,1.42,0);pip.g.localToWorld(p);
  if(t<10.15){apple.position.copy(p);apple.rotation.set(0,0,Math.sin(t*10)*.15)}
  else{const v=E.out(seg(t,10.15,10.5));apple.position.set(lerp(p.x,LPX+.5,v),lerp(p.y,.5,v)+hop(t,10.15,.35,.3),lerp(p.z,CZ+.5,v));apple.rotation.set(0,t*2,0)}
  apple.scale.setScalar(1+pulse(t,10.5,.3)*.25)}
 setBolt(bolt,{x:LBX,z:CZ,look:t<6.9?[-.9,0]:t<8.9?[-1,0]:[-.9,.3],eye:t>9.9?'ring':'dot',es:t>8.9?1.2:1,mouth:t>9.9?'o':'flat',
  al:t>6.9&&t<8.9?.35+.15*Math.sin(t*12):.15,ar:.15,ant:Math.sin(t*4)*.1,hy:t>6.9&&t<8.9?-.2:0,cut:t>7.2&&t<8.9?.35:0,blink:t<9.9});
}
function sC(u){ // 11-17 APPLE y CHOMP
 camSet(...CAM);const t=u+11;core.visible=false;apple2.visible=false;
 const bites=t<14.3?0:t<14.62?1:t<14.94?2:3;
 const ap=[LPX+.5,.5+Math.sin(t*3)*.03,CZ+.5];
 apple.visible=bites<3;apple.position.set(...ap);apple.rotation.set(0,t*1.2,0);apple.scale.set(1-bites*.22,1,1-bites*.22);
 if(bites>=3&&t<16.9){core.visible=true;core.position.set(ap[0],ap[1]-.02,ap[2]);core.rotation.set(0,0,.2);core.scale.setScalar(1)}
 const chomp=t>14.25&&t<15.2, full=t>15.2;
 setPip(pip,{x:LPX,z:CZ,y:t<13?hop(t,11.1,.3,.3)+hop(t,11.5,.3,.3):0,look:t<13?[.4,.2]:[.6,-.3],beak:t<13?.6:chomp?.5+.5*Math.sin((t-14.25)*20):full?.15:.2,
  wl:t<13?.85:full?.25:.1,wr:t<13?.85:full?.25:.1,lid:chomp?.5:full?.55:0,sy:full?1+Math.sin(t*20)*.03*Math.max(0,1-(t-15.2)):1,brow:-.4,blink:false});
 if(full)for(const e of pip.eyes)e.pup.position.set(0,0,0);
 setBolt(bolt,{x:LBX,z:CZ,y:t<13?Math.abs(Math.sin((t-11)*9))*.2:0,look:[-.9,.1],eye:t<14.3?'arc':t<15.6?'line':'dot',mouth:t<14.3?'smile':t<15.6?'flat':'frown',
  al:t<13?1.1:t<14.3?.6:.1,ar:t<13?1.1:.1,cut:t>15.6?.55:0,tilt:.3,ant:t>14.3&&t<14.8?Math.sin(t*40)*.4:0,blink:false});
}
function sD(u){ // 17-24.5 tarjeta final
 camSet(...CAM);const t=u+17;apple.visible=false;core.visible=t<17.6;if(core.visible){core.position.set(LPX+.5,lerp(.5,-.5,seg(t,17,17.6)),CZ+.5)}
 const pull=E.back(seg(t,18.2,18.7));apple2.visible=t>18.2;
 const tease=t>22.6?E.io(seg(t,22.6,23.4)):0;
 bolt.g.updateMatrixWorld(true);
 apple2.position.set(LBX+.42-tease*.55,lerp(.3,.82,pull)+Math.sin(t*3)*.03,CZ+.3);apple2.rotation.set(0,t*1.4,0);apple2.scale.setScalar(pull);
 setBolt(bolt,{x:LBX,z:CZ,ry:-.2,ar:lerp(.15,.8,pull),al:.15,eye:t<18.2?'line':'arc',mouth:'smile',look:[-.7,.2],glow:t>18.2?.6:0,ant:Math.sin(t*5)*.1,blink:false});
 const sayA=pulse(t,20.4,.5)+pulse(t,21.4,.5);
 setPip(pip,{x:LPX+tease*.25,z:CZ,y:hop(t,20.35,.35,.3)+hop(t,21.35,.35,.3),rz:-tease*.15,look:[.9,.15],eye:t>18.4?1.15:1,pup:.85,beak:sayA*.9+(t>22.6?.6:0),wl:sayA*.9,wr:sayA*.9,brow:-.4,browY:t>18.4?1:0,lid:t>23.6?.25:0,blink:false});
 if(t>23.5){apple2.position.x+=E.io(seg(t,23.5,23.9))*.5;}
}
const SC=[[0,5,sA],[5,11,sB],[11,17,sC],[17,24.5,sD]];
