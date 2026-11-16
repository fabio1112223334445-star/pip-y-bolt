ov('ONE LAST',0.1,1.45,230,120,{color:YEL});ov('APPLE…',0.25,1.45,360,120);
ov('GRRRR…',2.35,3.3,1010,80,{x:-250,rot:-8,shake:1});
ov('TRY #1',3.5,5.6,175,118,{color:YEL});ov('FLY!',3.65,5.6,305,90);
ov('FLOP!',7.65,8.5,900,160,{color:'#ff6b6b',rot:-6,shake:2});
ov('TRY #2',9.3,11.4,175,118,{color:YEL});ov('ROBO-ARM!',9.45,11.4,305,90);
ov('BOING!',13.4,14.3,800,160,{color:'#ff6b6b',rot:7,shake:2});
ov('TRY #3',15.7,17.6,175,118,{color:YEL});ov('TEAMWORK!',15.85,17.6,305,90);
ov('SO CLOSE!',18.2,19.4,175,120,{color:YEL,rot:-3});
ov('CRASH!',20.2,21.1,820,170,{color:'#ff6b6b',rot:-7,shake:2});
ov('BONK!',23.1,23.9,560,150,{color:'#ff6b6b',rot:8,shake:2});
ov('FINALLY!',24.75,25.6,175,130,{color:YEL,rot:-3});
ov('…uh-oh',25.75,26.5,175,120);
ov('JACKPOT!',27.9,29.7,175,150,{color:YEL,rot:-3});
ov('bonk.',29.95,30.6,330,90);
//@@SPLIT@@
M.g.visible=false;prop.g.visible=false;gear.visible=false;
// ---------- apple tree ----------
const tree=new THREE.Group();tree.position.set(0,0,-1.2);scene.add(tree);
tree.add(mesh(new THREE.CylinderGeometry(.34,.46,3.9,20),std(0x9a6a43),[0,1.95,0]));
const canopy=new THREE.Group();canopy.position.set(0,3.6,0);tree.add(canopy);
for(const[x,y,z,r,c]of[[0,1.9,0,2.1,0x43b24f],[-1.4,1.3,.3,1.4,0x4bbb55],[1.4,1.4,.2,1.4,0x3fae4f],[0,1.2,1.0,1.5,0x52c25c],[-.7,2.9,.2,1.2,0x52c25c],[.8,2.8,0,1.2,0x4bbb55]])canopy.add(sph(std(c,{roughness:.9}),r,[x,y,z]));
{const a=new THREE.Vector3(0,.2,.2),b=new THREE.Vector3(.72,1.0,3.0);const d=b.clone().sub(a);const L=d.length();const br=mesh(new THREE.CylinderGeometry(.06,.11,L,10),std(0x9a6a43),a.clone().add(b).multiplyScalar(.5).toArray());br.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());canopy.add(br);
 canopy.add(sph(std(0x52c25c,{roughness:.9}),.42,[.72,1.28,3.0],[1.2,.8,1]));canopy.add(sph(std(0x43b24f,{roughness:.9}),.3,[.4,1.3,2.8],[1.2,.8,1]))}
const apPivot=new THREE.Group();apPivot.position.set(.72,.98,3.0);canopy.add(apPivot);
function makeApple(r){const g=new THREE.Group();g.add(sph(std(0xe8343f,{roughness:.22}),r,[0,0,0],[1,.92,1]));g.add(cyl(std(0x7a4a2a),r*.07,r*.5,[0,r*.95,0],[0,0,.2]));g.add(sph(std(0x5fd068),r,[r*.35,r*1.05,0],[.45,.08,.25]));g.add(sph(bas(0xffffff,{transparent:true,opacity:.6}),r*.2,[-r*.4,r*.45,r*.72],[1,1.5,.4],false));return g}
const hero=makeApple(.3);scene.add(hero);
const AP=[];seed=99;for(let i=0;i<32;i++){const g=makeApple(.26);scene.add(g);const L=i<17?0:i<27?1:2;const w=[1.9,1.4,.9][L];let x=(rnd()*2-1)*w,z=[1.2,1.5,1.7][L]+rnd()*[1.8,1.2,.7][L];AP.push({g,x,z,y:[.25,.66,1.03][L],t0:4.0+(i*7%32)*.047,rs:rnd()*6,sx:(rnd()-.5)*1.2})}
const antApple=makeApple(.2);bolt.ant.add(antApple);antApple.position.set(0,.3,0);antApple.visible=false;
const lastApple=makeApple(.26);scene.add(lastApple);
function heroHang(sw){place(hero,apPivot);hero.position.set(Math.sin(sw)*.6,-.6*Math.cos(sw),0);hero.rotation.set(0,0,sw);hero.scale.setScalar(1);hero.visible=true}
function heroFree(p,r=[0,0,0],s=1){place(hero,scene);hero.position.set(...p);hero.rotation.set(...r);hero.scale.setScalar(s);hero.visible=s>0.01}
function apples(u){for(const a of AP){const dt=u-a.t0;if(dt<0){a.g.visible=false;continue}a.g.visible=true;const fall=6.6-13*dt*dt;const tl=Math.sqrt((6.6-a.y)/13);let y=fall;if(dt>tl){const v=dt-tl;y=a.y+Math.max(0,.35*Math.exp(-v*4)*Math.abs(Math.sin(v*9)))}
 a.g.position.set(a.x+a.sx*Math.max(0,tl-dt)*.4,y,a.z);a.g.rotation.set(a.rs+Math.min(dt,tl)*5,a.rs,a.rs*2)}}
const WIDE=[[0,3.0,14.2],[0,3.2,0]];
function boltArm(s,wob=0){const a=bolt.arms[0];a.rotation.set(0,0,-Math.PI+wob);a.scale.set(s>1.5?1.7:1,s,s>1.5?1.7:1);a.children[1].scale.set(.07,.07/s,.07)}
function resetArm(){bolt.arms[0].scale.set(1,1,1);bolt.arms[0].children[1].scale.set(.07,.07,.07)}
const AX=.72,AY=3.95;

// particles
burst('spark',.35,[AX+.25,AY+.2,1.9],5,{sp:.5,up:.2,s0:.07,life:.6,ring:true});burst('spark',.85,[AX-.2,AY-.05,1.9],4,{sp:.4,up:.2,s0:.06,life:.5,ring:true});
for(let i=0;i<7;i++)burst('puff',5.9+i*.2,[.1,2.9,1.9],2,{sp:1.1,up:.2,g:7,s0:.07,s1:.05,color:0x9fdcff,life:.55,spread:.5});
burst('puff',7.65,[.1,.15,CZ],14,{sp:2.6,up:.8,s0:.2,s1:.7,color:0xfff3df,life:.8});
burst('puff',14.75,[.35,.15,CZ],8,{sp:1.6,up:.5,s0:.14,s1:.45,color:0xfff3df,life:.6});
burst('spark',18.2,[AX,AY-.25,1.9],7,{sp:1.1,up:.3,s0:.2,life:.5,ring:true});
burst('puff',20.2,[-.2,.2,CZ],18,{sp:3,up:1,s0:.22,s1:.85,color:0xfff3df,life:.9});
for(let i=0;i<5;i++)burst('puff',21.2+i*.12,[-.9,1.15,CZ],2,{sp:.6,up:.9,s0:.08,s1:.28,color:0xffffff,life:.5});
burst('puff',23.1,[-.5,1.0,-.5],8,{sp:1.6,up:.5,s0:.12,s1:.4,color:0xffffff,life:.5});
for(let i=0;i<8;i++)burst('puff',23.1+i*.08,[(rnd()-.5)*3,5.2+rnd(),0],2,{sp:.8,up:-.6,g:3,s0:.12,s1:.1,color:0x6fd66f,life:1.1});
burst('puff',24.36,[AX,.1,2.0],5,{sp:1,up:.4,s0:.08,s1:.3,color:0xfff3df,life:.4});
for(let i=0;i<14;i++)burst('puff',25.3+i*.1,[(rnd()-.5)*3.4,5+rnd()*1.5,0],2,{sp:.8,up:-.8,g:3,s0:.13,s1:.1,color:0x6fd66f,life:1.2});
for(let i=0;i<12;i++)burst('puff',26.2+i*.12,[(rnd()-.5)*3,.3,2.2],3,{sp:1.6,up:.7,s0:.14,s1:.5,color:0xfff3df,life:.6});
burst('spark',27.85,[.3,1.6,2.0],10,{sp:1.8,up:.8,s0:.22,life:.7,ring:true});burst('spark',28.15,[-.95,1.5,2.0],8,{sp:1.5,up:.8,s0:.2,life:.7,ring:true});
burst('conf',27.9,[0,3.2,1.5],50,{sp:3.4,up:3,g:7,s0:.13,life:1.9,color:CONF,ring:true,spread:1});

function common(u){apples(-1);antApple.visible=false;lastApple.visible=false;canopy.rotation.z=0;resetArm();place(pip.g,scene);place(bolt.g,scene)}
function s2A(u){common();heroHang(Math.sin(u*2.2)*.07);
 const c=E.io(seg(u,1.4,2.15));camSet([lerp(AX+.2,0,c),lerp(4.15,3.0,c),lerp(5.6,14.2,c)],[lerp(AX,0,c),lerp(AY-.1,3.2,c),lerp(1.8,0,c)]);
 const rum=u>2.3&&u<3.0;
 setPip(pip,{x:PX,z:CZ,y:hop(u,3.05,.3,.3),look:u<2.4?[.7,1]:u<3?[0,-1]:[.7,1],eye:u<2.3?1.15:1,beak:u<2.3?.6:rum?.2:0,sy:rum?1+Math.sin(u*45)*.06:1,brow:u>3?-.7:rum?.6:0,browY:u<2.3?1:0,wl:rum?.25:0,wr:rum?.25:0});
 setBolt(bolt,{x:BX,z:CZ,y:hop(u,3.1,.28,.25),look:u<2.4?[-.2,1]:u<3?[-1,-.4]:[-.2,1],es:u<2.3?1.25:1,mouth:u<2.3?'o':'smile',al:u>3?.9:.1,ar:.1,ant:Math.sin(u*5)*.12});
}
function s2B(u){common();heroHang(Math.sin(u*2.2)*.05+(u>2.2&&u<4?Math.sin(u*6)*.04:0));camSet(...WIDE);
 const tired=seg(u,2.2,3.6),hang=u>3.6&&u<4.0,fell=u>=4.25;
 let y=u<.5?0:u<4.0?kf(u,[[.5,0],[2.2,1.75,'out'],[3.0,1.95],[3.6,1.7]])+Math.sin(u*14)*.05*(1-tired*.5):u<4.25?lerp(1.7,0,E.in(seg(u,4.0,4.25))):0;
 const x=lerp(PX,.1,E.io(seg(u,.5,2.4)));const fr=lerp(42,13,tired),fl=u>.5&&u<3.6?.55+.45*Math.sin(u*fr):hang?.05:fell?.9:0;
 const flat=fell?kf(u,[[4.25,.45],[5.0,.5],[5.25,1.12,'out'],[5.45,1]]):u<.5?1-pulse(u,.15,.35)*.25:1;
 setPip(pip,{x,z:CZ,y,sy:flat,look:hang?[0,0]:fell?[0,0]:[.5,1],lid:tired>.2&&u<3.6?.3+tired*.25:hang?.5:fell&&u<5.2?1:0,brow:u<2.2?-.7:hang?0:.8,browY:tired>.2?1:0,beak:tired>.2&&u<3.6?.8:hang?0:fell&&u<5.2?.5:0,wl:fl,wr:fl,pup:u>4&&u<4.25?.6:1,eye:u>4&&u<4.25?1.25:1,blink:u<2.2||u>5.3,rz:tired*Math.sin(u*9)*.08});
 const ch=u>.5&&u<2.3;
 setBolt(bolt,{x:BX,z:CZ,y:ch?Math.abs(Math.sin(u*9))*.25:hop(u,4.27,.25,.2),look:u<4?[kf(u,[[.5,-.9],[2.4,-.5]]),kf(u,[[.5,0],[2.2,.9]])]:u<4.3?[-.6,-.3]:[-.7,-.5],eye:ch?'arc':u>4&&u<4.5?'line':'dot',es:u>2.6&&u<4?1.3:1,mouth:ch?'smile':u<5?'o':'flat',al:ch?1.1:u>3.2&&u<4.5?.55:.1,ar:ch?1.1:u>3.2&&u<4.5?.55:.1,ant:u>5.2?0:Math.sin(u*6)*.1,glow:u>5.2?1:0,cut:0,blink:false});
}
function s2C(u){common();camSet(...WIDE);
 const snap=4.2;const s=u<.5?1:u<snap?kf(u,[[.5,1],[2.6,13.6,'out'],[2.9,13.4],[3.1,14.5],[3.3,14.0],[3.5,14.7],[snap,14.2]]):lerp(14.2,1,E.out(seg(u,snap,snap+.14)));
 const wob=u>3.4&&u<snap?Math.sin((u-3.4)*26)*.06*seg(u,3.4,snap):0;
 const touch=u>3.0&&u<snap;heroHang(Math.sin(u*2.2)*.05+(touch?Math.sin(u*17)*.05:0)+(u>snap?Math.sin((u-snap)*9)*.3*Math.exp(-(u-snap)*1.6):0));
 const sp=u>snap?(1-Math.exp(-(u-snap)*2.2))*16:0, spinning=u>snap&&u<5.3, down=seg(u,5.3,5.6);
 setBolt(bolt,{x:BX-seg(u,snap,5.3)*.6,z:CZ,y:u<snap?(u>2.6?.06:0):hop(u,snap,.4,.5),ry:spinning?sp:0,rz:down*1.45+(spinning?Math.sin(u*20)*.12:0),
  look:u<snap?[-.3,1]:[0,0],eye:u>snap?'ring':'dot',cut:u>1.2&&u<snap?.55:0,tilt:-.3,mouth:u<snap?'flat':'o',ar:u>2.6&&u<snap?.4:.1,ant:u>snap?Math.sin(u*30)*.4:.0,blink:false,sy:u>2.6&&u<snap?1.06:1});
 if(u>=.3&&u<snap+.14)boltArm(Math.max(1,u<.5?1:s),wob);else if(u>=snap+.14&&u<snap+.6){bolt.arms[0].rotation.z=-(.15+Math.sin((u-snap)*40)*.8)}
 const ch=u>1.2&&u<3.4;
 setPip(pip,{x:PX,z:CZ,y:ch?Math.abs(Math.sin(u*8))*.22:hop(u,snap+.05,.3,.3),look:u<snap?[.9,kf(u,[[.5,0],[2.6,1]])]:[kf(u,[[snap,.9],[5.3,.3]]),-.2],eye:u>3.4&&u<snap+.6?1.2:1,pup:u>snap&&u<snap+.6?.7:1,beak:ch?.6:u>snap&&u<5?.9:0,wl:ch?.8+.2*Math.sin(u*22):u>snap&&u<4.8?.9:0,wr:ch?.8+.2*Math.sin(u*22):u>snap&&u<4.8?.9:0,
  brow:u>snap?.8:-.3,browY:u>3.4?1:0,lid:u>5.7?.45:0,blink:u<3.4});
}
function s2D(u){common();camSet(...WIDE);
 const bx=BX;const jump=hop(u,2.25,.65,1.05),land=u-2.9;
 const A=u>2.9&&u<4.3?kf(u,[[2.9,.03],[4.3,.34,'in']]):0;let th=u<2.9?0:u<4.3?Math.sin(land*7.5)*A:lerp(Math.sin(1.4*7.5)*.34,1.5,E.in(seg(u,4.3,4.62)));
 const crashed=u>=4.62;const psy=u<.9?1:crashed?1:kf(u,[[.9,.84],[1.9,.84],[2.2,.7],[2.3,1.1],[2.9,1.1],[3.0,.75],[3.2,.86]]);
 const touchT=2.55;heroHang(Math.sin(u*2.2)*.05+(u>touchT?Math.sin((u-touchT)*8)*.45*Math.exp(-(u-touchT)*1.1):0));
 if(!crashed){
  setPip(pip,{x:bx,z:CZ,y:jump,rz:th,sy:psy,look:[0,u<2?.3:.9],lid:u>.9&&u<2.2?.35:0,brow:u>.9?.8:0,browY:u>.9?.6:0,beak:u>.9&&u<2.2?.4:u>3.2?.9:.3,wl:u>3?.6+.4*Math.sin(u*25):.25,wr:u>3?.6+.4*Math.sin(u*25+2):.25,eye:u>3.2?1.2:1,pup:u>3.2?.7:1,blink:false});
  const h=1.08*psy;
  if(u<.9){const v=seg(u,.25,.9);setBolt(bolt,{x:lerp(.35,bx,v),z:CZ,y:lerp(0,h,v)+1.5*4*v*(1-v),rz:lerp(1.45,0,seg(u,0,.25)),look:[.5,.5],al:1,ar:1,mouth:'smile',eye:u<.25?'ring':'dot'})}
  else{setBolt(bolt,{x:bx-Math.sin(th)*h,z:CZ,y:jump+Math.cos(th)*h,rz:th,look:[-.3,1],cut:u<2.9?.5:0,tilt:-.3,es:u>3.2?1.4:1,mouth:u>3.2?'o':u>2.5&&u<2.9?'smile':'flat',ar:u>3?.7+.3*Math.sin(u*25):.5,ant:Math.sin(u*12)*(.1+A),blink:false});
   const s=kf(u,[[1.0,1],[1.8,6.0,'out'],[2.9,6.0],[3.3,2]]);boltArm(s,th*0)}
 }else{const v=u-4.62;
  setPip(pip,{x:lerp(.35,.3,seg(v,0,.4)),z:CZ,y:hop(u,4.62,.3,.35),rz:lerp(1.45,0,E.bounce(seg(v,.25,.8))),sy:1-pulse(u,4.62,.2)*.3,look:[0,0],lid:v<.6?1:.45,brow:.8,beak:v<.6?.5:0,blink:false});
  setBolt(bolt,{x:lerp(-.5,-.9,seg(v,0,.35)),z:CZ,y:hop(u,4.62,.35,.6),rz:lerp(Math.PI,0,E.io(seg(v,.3,.85))),eye:v<.95?'ring':'dot',cut:v>.95?.7:0,tilt:-.45,mouth:v<.95?'o':'frown',ant:v>.95?0:Math.sin(u*25)*.4,glow:0,blink:false,al:v>1.1?.1:0,ar:.1,sy:v>1.0?1+Math.sin(u*40)*.03:1})}
}
function s2E(u){common();
 const sh=u>4.0&&u<5.7?Math.sin(u*70)*.05:0;camSet([sh,3.0+sh,14.2],[0,3.2,0]);
 canopy.rotation.z=(u>1.3?Math.sin((u-1.3)*30)*.05*Math.exp(-(u-1.3)*3):0)+(u>3.5&&u<5.7?Math.sin(u*38)*.035*seg(u,3.5,4):0);
 // hero apple
 if(u<2.0)heroHang(Math.sin(u*2.2)*.05+(u>1.3?Math.sin((u-1.3)*20)*.25*Math.exp(-(u-1.3)*2):0));
 else if(u<6.9){const dt=u-2.0;const tf=.55;let y=dt<tf?AY-12.1*dt*dt:.3+hop(u,2.55,.38,.55)+hop(u,2.93,.2,.12);heroFree([lerp(AX,.55,seg(u,2.55,3.1)),y,lerp(1.8,2.45,seg(u,2.55,3.1))],[0,0,-seg(u,2.0,3.1)*5],u>4.6?0:1)}
 else{const b=u-6.9;const sc=b<.3?1:b<.6?.72:b<.9?.45:0;heroFree([.3+.02,.55+.62+Math.sin(u*30)*.01,2.3+.62],[.2,0,.3],sc)}
 apples(u);
 const sink=u<4.0?0:u<6.0?kf(u,[[4.0,0],[4.7,-.95,'in']]):0;
 // Bolt
 let bx,bz,by=0,o={};
 if(u<1.0){const v=seg(u,.1,1.0);bx=lerp(-.9,-.5,v);bz=lerp(CZ,-.3,v);by=hop(u,.1,.3,.3)+hop(u,.4,.3,.3)+hop(u,.7,.3,.3);o={cut:.7,tilt:-.45,mouth:'frown',ant:.0,glow:0,look:[.3,.5],al:.2,ar:.2}}
 else if(u<1.3){bx=-.5;bz=-.3+seg(u,1.0,1.25)*.35-seg(u,1.25,1.3)*.75;o={cut:.7,tilt:-.45,mouth:'frown',rx:-seg(u,1,1.25)*.3+seg(u,1.25,1.3)*.7,look:[.3,.3]}}
 else if(u<2.3){const v=seg(u,1.3,1.7);bx=-.5-v*.2;bz=lerp(-.7,.2,v);by=hop(u,1.3,.4,.4);o={eye:'ring',mouth:'o',ant:Math.sin(u*28)*.45*Math.exp(-(u-1.3)*1.5),hy:Math.sin(u*10)*.25,al:.75,ar:.75,rz:Math.sin(u*9)*.1}}
 else if(u<6.3){const v=seg(u,2.3,3.2);bx=lerp(-.7,-.95,v);bz=lerp(.2,CZ,v);by=u<3.2?hop(u,2.3,.3,.3)+hop(u,2.6,.3,.3)+hop(u,2.9,.3,.3):u<3.5?Math.abs(Math.sin((u-3.2)*12))*.2:sink;
  o=u<2.9?{look:[.8,-.3],mouth:'o'}:u<3.5?{eye:'arc',mouth:'smile',al:1.1,ar:1.1,look:[.8,-.5]}:{look:[.2,1],es:1.4,mouth:'o',al:u>4?1:.2,ar:u>4?1:.2,ant:Math.sin(u*30)*.2,blink:false}}
 else{bx=-.95;bz=2.45;const v=E.back(seg(u,6.3,6.6));by=lerp(-.95,.72,v);antApple.visible=true;const bonk=u-8.05;
  o={eye:bonk>0?'line':'arc',mouth:bonk>0?'flat':'smile',al:bonk>0?.1:1.1,ar:bonk>0?.1:1.1,sy:bonk>0?1-pulse(u,8.05,.2)*.3:1,look:[0,0],ant:bonk>0?.5:Math.sin(u*8)*.1,blink:false}}
 setBolt(bolt,Object.assign({x:bx,z:bz,y:by},o));
 // Pip
 let py=0,pz=CZ,po={};
 if(u<2.0)po={look:[u<1.3?-.9:.3,u<1.3?0:1],eye:u>1.3?1.15:1,brow:u<1.3?.6:0,lid:u<1.0?.4:0,beak:u>1.3&&u<1.8?.6:0};
 else if(u<2.9)po={look:[.3,kf(u,[[2.0,1],[2.55,-.9]])],eye:1.2,pup:.8,beak:.7,browY:1};
 else if(u<3.5){py=Math.abs(Math.sin((u-2.9)*11))*.35;po={look:[.4,-.6],beak:.5+.4*Math.sin(u*20),wl:.9,wr:.9,lid:.25,brow:-.3,browY:.5}}
 else if(u<6.0){py=sink;po={look:[0,1],eye:1.25,pup:.65,beak:.9,brow:.8,browY:1,wl:u>4?1:.2,wr:u>4?1:.2,blink:false}}
 else{const v=E.back(seg(u,6.0,6.3));py=lerp(-.95,.55,v);pz=2.3;const eat=u>6.9&&u<7.9,gig=u>8.1;
  po={look:gig?[-.9,0]:eat?[0,-.4]:[0,.2],lid:eat?.55:gig?.5:.2,brow:-.4,browY:.4,beak:eat?.5+.5*Math.sin(u*21):gig?.5+.4*Math.sin(u*28):.6,wl:eat?.3:gig?.5:.95,wr:eat?.3:gig?.7:.95,sy:eat?1+Math.sin(u*21)*.04:gig?1+Math.sin(u*28)*.05:1,blink:false}}
 setPip(pip,Object.assign({x:.3,z:pz,y:py},po));
 // last apple bonks Bolt
 if(u>7.6){const dt=u-7.6;const hit=.45;lastApple.visible=true;const hy=.72+1.3;if(dt<hit)lastApple.position.set(-.95,lerp(6.6,hy,E.in(dt/hit)),2.45);else{const v=dt-hit;lastApple.position.set(-.95-v*1.6,hy+2.2*v-6*v*v,2.45+v*.8)}lastApple.rotation.z=dt*6}
}
burst('puff',29.86,[-.95,2.0,2.5],5,{sp:1,up:.5,s0:.08,s1:.25,color:0xffffff,life:.35});
const SC=[[0,3.4,s2A],[3.4,9.2,s2B],[9.2,15.6,s2C],[15.6,21.8,s2D],[21.8,30.6,s2E]];
