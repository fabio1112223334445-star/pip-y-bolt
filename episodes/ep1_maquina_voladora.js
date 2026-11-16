ov('NOTHING CAN',0.1,1.0,250,104);ov('GO WRONG…',0.25,1.0,362,104);
ov('PLINK!',0.72,1.5,1340,92,{color:YEL,rot:-10,x:250});
ov('UH-OH!',2.15,3.2,280,170,{color:YEL,rot:-5,shake:1});
ov('CRASH!',3.7,4.7,330,190,{color:'#ff6b6b',rot:-7,shake:2});
ov('FIX #1',6.5,8.6,235,118,{color:YEL});ov('PUT THE PROPELLER BACK',6.65,8.6,370,66);
ov('BONK!',11.5,12.4,560,160,{color:'#ff6b6b',rot:8,x:150,shake:2});
ov('FIX #2',14.1,16.3,170,118,{color:YEL});ov('BALLOONS!',14.25,16.3,300,84);
ov('POP!',17.6,18.2,430,150,{color:'#ff6b6b',rot:-12,x:-200,shake:2});ov('POP!',17.9,18.4,300,120,{color:YEL,rot:10,x:230,shake:2});
ov('THUD!',18.5,19.3,620,150,{color:'#ff6b6b',rot:5,shake:2});
ov('WAIT…',21.5,23.0,250,150,{color:YEL});
ov('CLICK!',24.3,25.3,330,170,{color:'#7dffd6',rot:-6,shake:1});
ov('THEY DID IT!',30.3,32.4,255,138,{color:YEL,rot:-3});
ov('…uh-oh?',33.0,34.0,290,130);

//@@SPLIT@@
// one-time particle events
burst('puff',3.7,[0,.3,0],16,{sp:3.2,up:1.2,s0:.25,s1:.9,color:0xfff3df,life:.9});
burst('puff',4.42,[PX,.1,CZ],5,{sp:1.2,up:.5,s0:.1,s1:.35,color:0xfff3df,life:.5});burst('puff',4.5,[BX,.1,CZ],5,{sp:1.2,up:.5,s0:.1,s1:.35,color:0xfff3df,life:.5});
for(let i=0;i<9;i++)PE.push({kind:'puff',t0:.8+i*.2,life:.9,p:[.2,HS+2.4,-.8],v:[1.6+rnd(),1.2+rnd()*.6,-.5],g:0,s0:.12,s1:.5,color:0x6b6f8a,rs:0});
burst('spark',5.52,[PX,1.25,CZ],7,{sp:1.2,up:.8,s0:.16,life:.55,ring:true});
burst('spark',7.7,[0,3.2,-1.2],8,{sp:1.6,up:.6,s0:.2,life:.6,ring:true});
burst('puff',11.52,[BX,1.3,CZ],6,{sp:1.4,up:.8,s0:.1,s1:.3,color:0xffffff,life:.4});
burst('spark',13.42,[PX,2.0,CZ],8,{sp:1.5,up:.4,s0:.18,life:.5,ring:true});
[17.6,17.75,17.9,18.05,18.2].forEach((t,i)=>{const b=M.bal[[0,1,2,4,3][i]].p;burst('conf',t,[b.x,b.y+2.2,b.z-1],12,{sp:3,up:1.5,g:9,s0:.13,life:.9,color:CONF,ring:true})});
burst('puff',18.5,[0,.3,0],14,{sp:3,up:1,s0:.22,s1:.8,color:0xfff3df,life:.8});
burst('spark',21.9,[-.65,1.3,CZ],8,{sp:.9,up:.5,s0:.14,life:.7,ring:true});burst('spark',22.3,[-.65,1.3,CZ],6,{sp:.7,up:.6,s0:.12,life:.6,ring:true});
burst('spark',24.32,[0,.9,.25],18,{sp:2.6,up:.4,s0:.26,life:.8,ring:true});
burst('spark',25.25,[0,3.2,-1.2],9,{sp:1.6,up:.6,s0:.2,life:.6,ring:true});
burst('conf',30.3,[0,HS+3.4,-.5],60,{sp:4.2,up:3.5,g:5,s0:.14,life:2.4,color:CONF,ring:true,spread:1});
burst('spark',30.35,[0,HS+2,0],20,{sp:3.5,up:1,s0:.3,life:1.1,ring:true});
burst('conf',31.0,[0,HS+4,-.5],40,{sp:3.8,up:3,g:5,s0:.14,life:2.2,color:CONF,ring:true,spread:1.5});

function sceneA(u){ // 0-3.2 sky failure
 const drop=u>2.7?-34*Math.pow(u-2.7,2)*1.4:0, hang=pulse(u,2.3,.4)*.25;
 const bob=Math.sin(u*5)*.08, shake=u>.8&&u<2.7?Math.sin(u*55)*.03*seg(u,.8,1.6):0;
 machine({y:HS+bob+hang+drop+shake,z:0,rz:Math.sin(u*3.2)*.05+shake*2+kf(u,[[1.9,0],[2.3,.12],[2.7,-.06]])});
 balloons(()=>0);
 const sk=[[0,34],[.9,34],[1.2,14],[1.45,22],[1.7,5],[1.9,0]];const a=spin(Math.min(u,1.9),sk);
 if(u<1.9)propOnMast(a,kf(u,sk));else{const v=u-1.9;propFree([Math.sin(v*6)*.5,HS+3.2+v*13,-.3],[v*4,a+v*20,v*3])}
 if(u<.7)gearSlot();else{const v=u-.7;gearFree([v*2.6,HS+.9+1.6*v-9*v*v,1.3+v*2.2],[v*9,v*5,v*7])}
 const lookG=u>.75&&u<1.5, lookUp=u>1.9&&u<2.35, cam2=u>=2.35;
 const pl=lookG?[.9,-.9]:lookUp?[.2,1]:[0,0];
 seatPip({look:pl,eye:u>.75?1.18:1,pup:u>1.9?.75:1,beak:u<.7?.5+.3*Math.sin(u*14):(u>1.9?1:.3),wl:u<.7?.7+.2*Math.sin(u*12):(u>2.35?.9+.1*Math.sin(u*40):.2),wr:u<.7?.7+.2*Math.sin(u*12+1):(u>2.35?.9+.1*Math.sin(u*40):.2),brow:u>.75?.8:-.2,browY:u>.75?1:0,sy:u>2.7?1.18:1,lid:u<.7?.0:0,blink:u<.7});
 seatBolt({look:lookG?[.8,-.8]:lookUp?[-.2,1]:[0,0],eye:u<.7?'arc':'dot',es:u>.75?1.35:1,mouth:u<.7?'smile':'o',al:u<.7?.9:(u>2.35?1.1:.3),ar:u<.7?.9:(u>2.35?1.1:.3),ant:Math.sin(u*9)*.2,sy:u>2.7?1.15:1,blink:false});
 camSet([0,HS+1.7,11.5],[0,HS+1.75,0]);
}
function sceneB(u){ // 3.2-6.4 crash
 const my=u<.5?kf(u,[[.08,13],[.5,0,'in']]):hop(u,.5,.42,.55)+hop(u,.92,.25,.15);
 const sq=u<.5?1.1:1-pulse(u,.5,.16)*.3+pulse(u,.66,.2)*.08;
 machine({y:my,rz:kf(u,[[.5,0],[.7,-.1],[1.0,.16],[1.3,.12]]),sy:sq});balloons(()=>0);
 const sh=u>.5&&u<1?Math.sin(u*80)*.12*(1-seg(u,.5,1)):0;
 camSet([sh,3.3+sh*.6,12],[0,1.85,0]);
 // pip eject
 if(u<.5){seatPip({eye:1.2,pup:.7,beak:1,wl:1,wr:1,brow:.8,browY:1,blink:false});}
 else{place(pip.g,scene);const v=seg(u,.5,1.22);const land=u-1.22;
  setPip(pip,{x:lerp(-.5,PX,v),y:u<1.22?lerp(1.2,0,v)+3.2*4*v*(1-v):hop(u,1.22,.3,.25),z:lerp(-.9,CZ,v),rz:u<1.22?v*Math.PI*4:0,
   sy:land>0?1-pulse(u,1.22,.18)*.3+pulse(u,1.4,.2)*.1:1.05,eye:land<0?1.2:1,pup:land<0?.7:1,beak:land<0?1:(u>2.3&&u<2.6?.4:0),wl:land<0?1:(u>2.75?.55*pulse(u,2.75,.45):.0),wr:land<0?1:(u>2.75?.55*pulse(u,2.75,.45):0),
   look:u<1.6?[0,0]:u<2.3?[kf(u,[[1.6,0],[1.8,.7],[2.2,.7]]),.3]:u<2.45?[0,.2]:u<2.7?[-.8,0]:[.9,.1],brow:u>2.7?.6:0,lid:land>0&&land<.35?.55:0,blink:u>1.6});
  if(u>=2.3)pip.q.scale.y*=1-pulse(u,2.3,.2)*.12;}
 if(u<.55){seatBolt({eye:'dot',es:1.4,mouth:'o',al:1,ar:1,blink:false});}
 else{place(bolt.g,scene);const v=seg(u,.55,1.3);const land=u-1.3;
  setBolt(bolt,{x:lerp(.52,BX,v),y:u<1.3?lerp(1.2,0,v)+2.8*4*v*(1-v):hop(u,1.3,.25,.18),z:lerp(-.9,CZ,v),rz:u<1.3?-v*Math.PI*4:Math.sin(land*9)*.12*Math.max(0,1-land*.9),
   eye:u<1.3?'dot':u<2.5?'ring':'dot',es:u<1.3?1.4:1,mouth:u<1.3?'o':u<2.5?'flat':'frown',al:u<1.3?1:.1,ar:u<1.3?1:.1,ant:Math.sin(u*10)*.35*Math.max(0,1-land*.5),sy:land>0?1-pulse(u,1.3,.16)*.25:1,
   look:u>2.7?[-.8,0]:[0,0],cut:u>2.7?.6:0,tilt:u>2.7?.35:0,hy:u<2.5&&land>0?Math.sin(land*8)*.2:0,blink:false});}
 // propeller falls & sticks
 if(u<1.35)propFree([0,30,3],[0,0,0]);else{const v=seg(u,1.35,1.72);const w=u>1.72?Math.sin((u-1.72)*30)*.25*Math.exp(-(u-1.72)*6):0;propFree([0,lerp(9,.5,E.in(v)),3.0],[Math.PI/2,0,lerp(4,.9,v)+w],.9)}
 if(u>1.72&&u<1.76)0;
 // gear lands on Pip's head
 if(u<2.3){const v=seg(u,1.85,2.3);gearFree([PX+(1-v)*.4,lerp(9,1.12,E.in(v)),CZ],[Math.PI/2*v,(1-v)*6,(1-v)*4])}else gearCrown();
}
burst('puff',4.92,[0,.1,3.0],5,{sp:1,up:.5,s0:.08,s1:.3,color:0xfff3df,life:.45});
function sceneC(u){ // 6.4-13 fix #1
 place(pip.g,scene);place(bolt.g,scene);
 camSet([0,3.1,11.4],[0,1.85,0]);balloons(()=>0);gearCrown();
 const sk=[[2.2,0],[2.5,6],[3.3,38],[5,38]];const a=spin(clamp(u,2.2,5),sk)*(u>2.2?1:0);const spd=kf(u,sk);
 machine({rz:.12+(u>2.5&&u<3.5?Math.sin(u*60)*.012:0),y:0});
 // propeller: carried by Bolt -> tossed to mast -> spins -> flies -> bonk -> hat
 let boltSq=1,bonk=u-5.1;
 if(u<.7){place(prop.g,scene);const bx=BX,by=hop(u,.1,.3,.2)+hop(u,.4,.3,.2);propFree([bx,by+1.32,CZ],[0,0,Math.sin(u*10)*.08],.8)}
 else if(u<1.3){const v=seg(u,.7,1.3);const tp=new THREE.Vector3();M.mast.getWorldPosition(tp);propFree([lerp(BX,tp.x,v),lerp(1.32,tp.y,v)+2.2*4*v*(1-v),lerp(CZ,tp.z,v)],[v*6.283*2,0,v*6.283],lerp(.8,1,v))}
 else if(u<3.4){propOnMast(a,spd);prop.g.rotation.z=u<1.7?Math.sin((u-1.3)*30)*.2*Math.exp(-(u-1.3)*7):0}
 else if(u<5.1){const tp=new THREE.Vector3();M.mast.getWorldPosition(tp);let p;
  if(u<3.9)p=[tp.x,tp.y+kf(u,[[3.4,0],[3.7,.9,'out'],[3.9,.8]]),tp.z];
  else if(u<4.3){const v=E.in(seg(u,3.9,4.3));p=[tp.x+v*3,tp.y+.8+v*7,tp.z]}
  else if(u<4.75)p=[BX,20,CZ];else{const v=E.in(seg(u,4.75,5.1));p=[BX,lerp(9,1.25,v),CZ]}
  propFree(p,[0,0,Math.sin(u*9)*.15]);prop.r.rotation.y=a;prop.blur.material.opacity=.42}
 else{propHat(a+ (5.1-5)*0 + spin(clamp(bonk,0,1.5),[[0,20],[1.5,2.2]])+Math.max(0,bonk-1.5)*2.2);boltSq=1-pulse(u,5.1,.2)*.35+pulse(u,5.3,.25)*.1}
 const up=u>3.4&&u<5.0;
 setBolt(bolt,{x:BX,z:CZ,y:u<.7?hop(u,.1,.3,.2)+hop(u,.4,.3,.2):hop(u,1.35,.3,.3),sy:boltSq,
  al:u<.72?1.1:u<1.3?1.15-seg(u,.72,1.3)*.6:u<1.9?1.05:u>5.1?.05:.25,ar:u<.72?1.1:u<1.3?1.15-seg(u,.72,1.3)*.6:u<1.9?1.05:u>5.1?.05:.25,
  eye:u>1.3&&u<1.9?'arc':u>5.1&&u<5.45?'line':'dot',es:up?1.4:u>2.4&&u<3.4?1.2:1,look:u>5.5?[0,0]:up?[kf(u,[[3.4,-.7],[3.9,-.6],[4.3,.2],[4.7,0]]),1]:u>.7?[-.6,.8]:[0,.6],
  mouth:u>5.1?'flat':up?'o':u>1.3?'smile':'flat',cut:u>5.45?.95:0,tilt:0,ant:u>5.1?.5:Math.sin(u*6)*.1,blink:u<3.4});
 const tap=pulse(u,2.05,.3);const gig=u>5.4&&u<6.2;
 setPip(pip,{x:PX+tap*.25,z:CZ-tap*.9,y:hop(u,1.95,.3,.25)+(gig?Math.abs(Math.sin((u-5.4)*14))*.12:0)+hop(u,2.6,.3,.25)*0,
  ry:tap*.8,look:u>5.2?[kf(u,[[5.2,.9],[6.2,.9],[6.4,0]]),0]:up?[kf(u,[[3.4,.5],[4.3,.9],[4.7,.6]]),1]:u>1?[.5,.8]:[.8,.5],
  eye:up?1.2:1,pup:up?.75:1,beak:gig?.5+.4*Math.sin(u*28):up?.9:u>2.4&&u<3.4?.5:0,wl:gig?.55:u>2.4&&u<3.4?.5+.3*Math.sin(u*20):up?.3:0,wr:gig?.75:u>2.4&&u<3.4?.5+.3*Math.sin(u*20):up?.3:0,
  lid:gig?.5:0,brow:up?.7:gig?-.3:0,browY:up?1:0,sy:gig?1+Math.sin((u-5.4)*28)*.05:1,blink:!up});
}
function sceneD(u){ // 13-20 fix #2 balloons
 place(pip.g,scene);place(bolt.g,scene);
 const cu=E.io(seg(u,.9,1.9))*(1-E.io(seg(u,5.75,6.35)));camSet([0,lerp(3.1,4.9,cu),lerp(11.4,16.2,cu)],[0,lerp(1.85,3.9,cu),0]);gearCrown();
 const lift=u<5.25?kf(u,[[2.4,0],[3.7,1.7,'io']])+ (u>3.7?Math.sin((u-3.7)*3)*.08:0):kf(u,[[5.25,1.7],[5.5,0,'in']])+hop(u,5.5,.3,.3);
 machine({y:lift,rz:u<2.4?.12:u<5.25?Math.sin(u*2.5)*.05:kf(u,[[5.5,0],[5.8,.12]]),sy:1-pulse(u,5.5,.16)*.25});
 const popT=[4.6,4.75,4.9,5.2,5.05];
 balloons(i=>{const t0=1.2+i*.2;if(u<t0)return 0;if(u>popT[i])return 0;return E.el(seg(u,t0,t0+.5))*(1+pulse(u,popT[i]-.08,.16)*.25)});
 propHat(u*2.2);
 bulb.visible=u>.4&&u<1.25;bulb.position.set(PX,1.75+E.back(seg(u,.4,.6))*.3,CZ);bulb.scale.setScalar(E.back(seg(u,.4,.62))*(1-seg(u,1.1,1.25)));
 // Pip
 let py=0,px=PX,pz=CZ,o={};
 const cheer=u>2.6&&u<3.5;
 if(u<3.5){py=hop(u,.3,.35,.45)+(cheer?Math.abs(Math.sin((u-2.6)*10))*.3:0);o={look:u<1.2?[0,.9]:[.5,1],eye:u>.4&&u<1.2?1.15:1,beak:u>.4&&u<1.2||cheer?.7:0,wl:u>.4&&u<1.1?.9:cheer?.8+.2*Math.sin(u*25):0,wr:cheer?.8+.2*Math.sin(u*25):0,brow:-.2,browY:u>.4&&u<1.2?1:0}}
 else if(u<5.3){const v=E.io(seg(u,3.5,4.25));px=lerp(PX,-1.95,v);py=lerp(0,6.55,v)+Math.sin(u*9)*.06;pz=lerp(CZ,-.2,v);const peck=pulse(u,4.5,.2);px+=peck*.3;
  const fl=.55+.45*Math.sin(u*38);o={ry:.9*v,rz:u>4.25&&u<4.5?-.3*seg(u,4.25,4.4):0,look:u<4.62?[.9,.1]:[0,0],eye:u>4.62?1.25:1.05,pup:u>4.62?.65:1,wl:fl,wr:fl,beak:u>4.62?1:peck*.6,brow:u>4.62?.8:-.3,browY:u>4.62?1:.5,blink:false};
  if(u>4.62){o.ry=.9*(1-seg(u,4.62,4.8))}}
 else{const v=seg(u,5.3,5.72);px=lerp(-1.95,PX,v);py=u<5.72?lerp(6.55,0,E.in(v)):hop(u,5.72,.28,.22);pz=lerp(-.2,CZ,v);
  o={sy:u>5.72?1-pulse(u,5.72,.18)*.35:1.15,look:u>6.3?[0,0]:u>5.9?[.8,0]:[0,-.5],eye:u<5.72?1.25:1,pup:u<5.72?.65:1,beak:u<5.72?1:u>6.3?.25:0,wl:u<5.72?1:u>6.3?.35:.0,wr:u<5.72?1:0,brow:.7,browY:u>6?.5:1,lid:u>6.3?.25:0,blink:u>6}}
 setPip(pip,Object.assign({x:px,y:py,z:pz},o));
 const fp=seg(u,5.85,6.15);
 setBolt(bolt,{x:BX,z:CZ,y:cheer?Math.abs(Math.sin((u-2.6)*10+1))*.25:hop(u,5.5,.25,.15),al:cheer?1.1:.1,ar:cheer?1.1:.1,face:E.back(fp)>1?1:E.out(fp),
  look:u<1.2?[-.8,.3]:u<3.5?[-.3,1]:u<5.3?[-.7,1]:u<5.85?[-.5,-.2]:[0,0],eye:cheer?'arc':u>5.85?'line':'dot',es:u>4.6&&u<5.85?1.4:1,mouth:cheer?'smile':u>4.6&&u<5.85?'o':u>5.85?'flat':u>1.2?'smile':'flat',
  hx:u>5.85?.18*fp:0,ant:u>5.85?.6:Math.sin(u*5)*.1,cut:0,blink:u<4.6});
}
function sceneE(u){ // 20-26 discovery
 place(pip.g,scene);place(bolt.g,scene);
 const ex=.65;balloons(()=>0);bulb.visible=false;
 const c1=E.io(seg(u,1.5,2.3)),c2=E.io(seg(u,2.9,3.7));
 const cp=[lerp(lerp(0,-.5,c1),0,c2),lerp(lerp(1.6,1.6,c1),2.7,c2),lerp(lerp(8.6,5.6,c1),11.2,c2)],cl=[lerp(lerp(0,-.62,c1),0,c2),lerp(lerp(1.0,1.02,c1),1.5,c2),lerp(lerp(CZ,CZ,c1),.4,c2)];
 camSet(cp,cl);
 const fix=seg(u,4.3,4.6);machine({rz:.12*(1-E.back(fix)),y:hop(u,4.3,.3,.22),glow:u>4.3?1.4+.6*Math.sin(u*10):0});
 const sp=new THREE.Vector3();M.slot.getWorldPosition(sp);
 const see=u>1.4, got=u>4.3, cheer=u>5.2;
 // gear
 if(u<3.4)gearCrown();else if(u<4.3){const v=seg(u,3.4,4.3);const hp=[-ex,1.12,CZ];gearFree([lerp(hp[0],sp.x,v),lerp(hp[1],sp.y,v)+2.3*4*v*(1-v),lerp(hp[2],sp.z+.08,v)],[lerp(-1.4,-.35,v)+v*6.283*2,0,v*12])}else gearSlot((1-E.el(seg(u,4.3,4.8)))*1.2);
 // propeller: hat -> mast
 if(u<4.7)propHat(u*2.2+1);else if(u<5.25){const v=seg(u,4.7,5.25);const tp=new THREE.Vector3();M.mast.getWorldPosition(tp);propFree([lerp(ex,tp.x,v),lerp(1.3,tp.y,v)+2.4*4*v*(1-v),lerp(CZ,tp.z,v)],[v*12.566,0,v*6.283],lerp(.62,1,v))}
 else{propOnMast(spin(u-5.25,[[0,0],[.75,12]]),0);prop.g.rotation.z=Math.sin((u-5.25)*30)*.2*Math.exp(-(u-5.25)*7)}
 const flick=pulse(u,3.25,.3);
 setPip(pip,{x:-ex,z:CZ,y:cheer?Math.abs(Math.sin((u-5.2)*11))*.35:hop(u,3.2,.3,.2),sy:u<1.4?.9:1+flick*.12,rx:-flick*.25,
  look:u<1.4?[.1,-.9]:u<2.5?[.7,-.2]:u<3.3?[kf(u,[[2.5,.5],[2.75,0]]),1]:u<4.3?[kf(u,[[3.4,.3],[4.3,.9]]),kf(u,[[3.4,1],[3.9,.6],[4.3,-.2]])]:cheer?[.4,.2]:[.9,0],
  lid:u<1.4?.45:0,brow:u<1.4?1:u<2.6?.3:-.3,browY:u>2.6?1:0,eye:u>2.6&&u<3.3?1.2:1,beak:u>2.8&&u<3.3?.8:cheer?.5+.4*Math.sin(u*20):got?.6:0,
  wl:cheer?.8+.2*Math.sin(u*24):u<1.4?0:0,wr:cheer?.8+.2*Math.sin(u*24):got?.6:0,blink:u<1.4||u>4.5});
 if(u>2.5&&u<3.3){for(const e of pip.eyes)e.pup.position.x=-e.sx*.035*seg(u,2.5,2.75)}
 const toss=pulse(u,4.6,.35);
 setBolt(bolt,{x:ex,z:CZ,y:cheer?Math.abs(Math.sin((u-5.2)*11+1.2))*.3:hop(u,1.42,.25,.22),
  look:u<1.2?[0,-.8]:u<3.4?[-.9,.25]:u<4.3?[kf(u,[[3.4,-.8],[4.3,-.4]]),kf(u,[[3.4,.6],[4.3,-.3]])]:[-.3,.3],
  eye:cheer||(got&&u<4.6)?'arc':'dot',es:see&&u<3.4?1.4:1,cut:u<1.4?.75:0,tilt:u<1.4?.4:0,mouth:u<1.4?'frown':see&&u<2.4?'o':'smile',
  al:u>2.3&&u<3.4?.62:cheer?1.1:toss*1.1,ar:cheer?1.1:toss*1.1,alf:0,ant:u<1.4?.7:see&&u<2.2?Math.sin(u*40)*.15:0,glow:see&&u<3?1:got?.6:0,hy:u>1.4&&u<3.4?-.25:0,blink:u>3.4&&!cheer});
}
function sceneF(u){ // 26-34 lift off
 balloons(()=>0);bulb.visible=false;
 const my=u<1.3?hop(u,.5,.2,.08)+hop(u,.9,.2,.08):kf(u,[[1.3,0],[2.1,1.1,'io'],[3.2,16,'in'],[4.4,HS,'out']])+(u>4.4?Math.sin((u-4.4)*5)*.08:0);
 const f=clamp(my/7);const lag=Math.sin(Math.PI*seg(u,2.0,4.4))*.9;
 machine({y:my,z:lerp(-1,0,f),rz:u>1&&u<2?Math.sin(u*40)*.02:Math.sin(u*3.2)*.05,sy:1-pulse(u,.5,.2)*.06-pulse(u,.9,.2)*.06,glow:1.2+.5*Math.sin(u*8)});
 camSet([0,my+lerp(3.1,1.7,f)-lag,lerp(11.4,11.5,f)],[0,my+lerp(1.85,1.75,f)-lag*.2,0]);
 const sk=[[0,0],[.6,3],[1.3,28],[2,36],[8,36]];propOnMast(spin(u,sk)+.9,kf(u,sk));
 const rat=u>6.5;gearSlot(rat?Math.sin(u*45)*.35*seg(u,6.5,6.9):0);if(rat)gear.position.z=.06+.07*Math.abs(Math.sin(u*22))*seg(u,6.5,7.2);
 const sky=u>4.3,cheer=u>4.3&&u<6.4;
 const lookP=rat?(u<7.1?[.7,-.9]:u<7.45?[.9,0]:[0,0]):[0,0],lookB=rat?(u<7.1?[-.6,-.9]:u<7.45?[-.9,0]:[0,0]):[0,0];
 if(u<.5){place(pip.g,scene);const v=seg(u,.05,.5);const tp=new THREE.Vector3();M.sl.getWorldPosition(tp);setPip(pip,{x:lerp(PX,tp.x,v),y:lerp(0,tp.y,v)+1.6*4*v*(1-v),z:lerp(CZ,tp.z,v),wl:1,wr:1,beak:.6,look:[.4,.6]})}
 else seatPip({y:cheer?Math.abs(Math.sin((u-4.3)*9))*.22:0,look:u<4.3?[0,kf(u,[[1.3,0],[2,.9]])]:lookP,eye:u>2&&u<4.3?1.12:rat&&u>6.7?1.15:1,pup:rat&&u>6.7?.75:1,
  beak:cheer?.6+.4*Math.sin(u*18):u<4.3?.6:rat?.2:.3,wl:cheer?.9+.1*Math.sin(u*22):u<4.3?.5+.2*Math.sin(u*30):.15,wr:cheer?.9+.1*Math.sin(u*22+1):u<4.3?.5+.2*Math.sin(u*30):.15,
  brow:rat&&u>6.7?.8:-.3,browY:rat?1:.4,lid:cheer?.3:0,blink:!rat});
 if(u<.9){place(bolt.g,scene);const v=seg(u,.4,.9);const tp=new THREE.Vector3();M.sr.getWorldPosition(tp);setBolt(bolt,{x:lerp(BX,tp.x,v),y:lerp(0,tp.y,v)+1.6*4*v*(1-v),z:lerp(CZ,tp.z,v),al:1,ar:1,eye:'arc',look:[-.3,.5]})}
 else seatBolt({y:cheer?Math.abs(Math.sin((u-4.3)*9+1.3))*.2:0,look:u<4.3?[0,.7]:lookB,eye:cheer||u<4.3&&u>2?'arc':'dot',es:rat&&u>6.7?1.35:1,mouth:rat&&u>6.7?(u>7.45?'flat':'o'):'smile',
  al:cheer?1.1:.3,ar:cheer?1.1:.3,ant:Math.sin(u*9)*.2,glow:cheer?.8:0,blink:!rat});
}
burst('puff',26.5,[-.5,.3,-.6],4,{sp:1,up:.4,s0:.08,s1:.25,color:0xfff3df,life:.4});
for(let i=0;i<10;i++)burst('puff',27.3+i*.09,[(rnd()-.5)*1.6,.2,-.6],2,{sp:2.4,up:.3,s0:.15,s1:.55,color:0xfff3df,life:.7});

const SC=[[0,3.2,sceneA],[3.2,6.4,sceneB],[6.4,13,sceneC],[13,20,sceneD],[20,26,sceneE],[26,34,sceneF]];
