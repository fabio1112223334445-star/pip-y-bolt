from alib import *
# gancho suave
for i,n in enumerate([84,88,91,88,84]): add(mus,.2+i*.35,bell(note(n),.8),.25)
add(sfx,1.05,bell(2637,.5),.35)
for i in range(6): add(sfx,1.2+i*.45,sweep(900,950,.08),.06)
theme(4.0,5.4,.5,full=False)
# intento 1
add(sfx,4.4,sweep(300,200,.9,.02),.18); add(sfx,5.4,boing(.4),.5); add(sfx,5.4,whoosh(.6),.6)
add(sfx,5.45,sweep(800,1600,.3),.18)
add(sfx,6.3,sweep(1200,300,.15,0,1.4),.2); add(sfx,6.35,thud(),1.0); add(sfx,6.4,bonk()*.5,.4)
add(sfx,6.8,voice(233,196,.5),.25)
for t0 in (8.6,8.9,9.2,9.5): add(sfx,t0,pluck(note(67),.1),.25)
# intento 2
theme(10.0,12.6,.6,full=False)
for i in range(6): add(sfx,10.3+i*.3,pluck(note(60+(i%2)*3),.12),.18)
add(sfx,12.8,bell(2349,.4),.35)
add(sfx,13.3,voice(330,360,.5),.28); add(sfx,13.9,voice(360,420,.6),.32)
add(sfx,14.6,lp(noise(.35),3)*np.exp(-tt(.35)*7),1.0); add(sfx,14.6,voice(620,300,.3),.5); add(sfx,14.62,whoosh(.6),.6)
add(sfx,14.7,sweep(1400,400,.6,0,.8),.2); add(sfx,15.3,boing(.3),.3)
# intento 3
add(sfx,17.1,boing(.25),.3)
t=tt(1.9); add(sfx,17.35,np.sin(2*np.pi*np.cumsum(900+300*np.sin(2*np.pi*3*t))/SR)*.5*np.minimum(1,t*20)*np.minimum(1,(1.9-t)*20),.25)
add(sfx,19.25,bonk(),.8); add(sfx,19.3,bonk(),.6); add(sfx,19.3,sweep(600,2400,.6),.25); add(sfx,19.3,whoosh(.6),.45)
for i,(n,d) in enumerate([(69,.5),(65,.5),(62,.8)]): add(mus,20.3+i*.4,marimba(note(n),d),.55)
# remate
add(sfx,22.3,lp(noise(.6),6)*np.sin(np.pi*tt(.6)/.6)*.5,.4)
for i in range(16): add(mus,23.6+i*.33,bell(note([72,76,79,84,79,76][i%6]),.7),.14)
for i in range(10): add(sfx,24.4+i*.38+.6,bell(note(88+(i%4)*2),.4),.2)
add(sfx,29.0,pop(),.5)
for i,n in enumerate([84,88,91,96]): add(sfx,29.05+i*.09,bell(note(n),.6),.3)
theme(29.0,32.0,1.0,oct=True)
add(sfx,30.4,voice(440,520,.25),.3); add(sfx,30.7,voice(440,520,.25),.3); add(sfx,31.0,voice(440,560,.3),.3)
finish()
