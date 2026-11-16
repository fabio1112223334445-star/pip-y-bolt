ov('Ah…',0.25,2.3,300,130);
ov('ah…',0.95,2.3,440,150,{rot:4});
ov('ACHOO!',2.3,3.5,280,200,{color:YEL,rot:-6,shake:2});
ov('…Pip?',4.2,6.3,300,110);
ov('?!',6.5,7.6,280,170,{color:YEL,rot:8,shake:1});
ov('Ah…',10.45,11.2,300,130);
//@@SPLIT@@
M.g.visible=false;prop.g.visible=false;gear.visible=false;
const LPX=-.8,LBX=.8;
burst('puff',2.32,[LPX+.05,.6,CZ+.7],14,{sp:2.6,up:.4,s0:.08,s1:.35,color:0xffffff,life:.55});
burst('spark',2.35,[LPX,.7,CZ+.5],8,{sp:1.6,up:.6,s0:.18,life:.5,ring:true});
for(let i=0;i<4;i++)burst('puff',2.45+i*.05,[LBX,1.1,CZ],1,{sp:.8,up:.2,s0:.06,s1:.18,color:0xfff3df,life:.4});
burst('puff',8.0,[LPX,.05,CZ],8,{sp:1.4,up:.4,s0:.1,s1:.35,color:0xfff3df,life:.5});
function sGag(u){
 camSet([0,1.8,10.3],[0,1.15,CZ]);
 // ---- Pip ----
 const build=seg(u,0,2.3), fly=u>=2.3&&u<2.9, gone=u>=2.9&&u<6.4, back=u>=6.4&&u<8.0, after=u>=8.0;
 if(u<2.3){
  setPip(pip,{x:LPX,z:CZ,sy:1+.16*E.io(build)+(u>1.6?Math.sin(u*40)*.02:0),rx:-.25*build,look:[0,.6*build],lid:.6*build,brow:.4*build,browY:build,beak:.25+.75*build,wl:.25*build,wr:.25*build,eye:1,blink:u<.6});
 }else if(fly){const v=seg(u,2.3,2.9);
  setPip(pip,{x:lerp(LPX,-4.2,E.out(v)),y:1.2*Math.sin(Math.PI*v),z:CZ,rz:v*7,sy:.8,lid:1,beak:.6,wl:1,wr:1,blink:false});
 }else if(gone){setPip(pip,{x:-30,y:0,z:CZ});
 }else if(back){const v=seg(u,6.4,8.0);
  setPip(pip,{x:lerp(4.5,LPX,E.out(v)),y:2.2*Math.sin(Math.PI*v),z:CZ,rz:-(1-v)*8,sy:1.05,eye:1.25,pup:.65,beak:1,wl:.6+.4*Math.sin(u*40),wr:.6+.4*Math.sin(u*40),brow:.8,browY:1,blink:false});
 }else{const w=u-8.0;const shake=w>.5&&w<1.3?Math.sin(w*55)*.25:0;
  setPip(pip,{x:LPX,z:CZ,sy:1-pulse(u,8.0,.22)*.3+pulse(u,8.2,.25)*.08,ry:shake,look:w<.5?[0,0]:w<1.4?[0,0]:w<2.2?[1,0]:[0,.3],lid:w>1.4&&w<2.2?.45:0,beak:w>1.4&&w<2.2?.6:0,brow:w<1.4?.6:-.4,wl:w>1.4&&w<2.2?.45:0,wr:w>1.4&&w<2.2?.45:0,eye:1,blink:w>2.2});
  if(u>10.3){const b=seg(u,10.3,11.2);pip.q.scale.y*=1+.1*b;pip.beakP.rotation.x=.25*.7+.4*b}
 }
 // ---- Bolt ----
 const blast=u>=2.3&&u<3.1;
 let lookB=u<2.3?[-.9,0]:u<3.1?[-1,0]:u<4.2?[-1,0]:u<5.3?[kf(u,[[4.2,-1],[4.7,1],[5.3,-1]]),.2]:u<6.4?[0,.6]:u<8.0?[kf(u,[[6.4,1],[7.6,-.9]]),.3]:u<9.4?[-.9,0]:[-.6,0];
 setBolt(bolt,{x:LBX,z:CZ,y:hop(u,8.05,.3,.25),rz:blast?Math.sin((u-2.3)*30)*.12*(1-seg(u,2.3,3.1)):0,sy:blast?1-pulse(u,2.3,.25)*.2:1,
  look:lookB,eye:blast?'line':u>6.4&&u<8.0?'ring':u>9.4&&u<10.3?'arc':'dot',es:u>1.7&&u<2.3?1.4:u>3.1&&u<6.4?1.2:1,
  mouth:blast?'flat':u>3.1&&u<6.4?'o':u>6.4&&u<8.0?'o':u>9.4&&u<10.3?'smile':u>10.3?'o':'flat',
  face:u>1.9&&u<2.3?E.out(seg(u,1.9,2.2)):0,al:u>3.1&&u<6.4&&u>4.4&&u<5.4?.55:.1,ar:u>4.4&&u<5.4?.55:.1,
  ant:blast?Math.sin((u-2.3)*35)*.6*(1-seg(u,2.3,3.1)):Math.sin(u*4)*.08,hy:u>4.2&&u<5.3?kf(u,[[4.2,-.3],[4.7,.3],[5.3,-.3]]):0,blink:!blast&&!(u>6.4&&u<8)});
}
const SC=[[0,5.6,sGag],[5.6,11.2,u=>sGag(u+5.6)]];
