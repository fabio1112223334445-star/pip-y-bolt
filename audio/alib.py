import numpy as np, wave
import sys
SR=44100; DUR=float(sys.argv[1]); N=int(SR*DUR)
mus=np.zeros(N); sfx=np.zeros(N)
rng=np.random.default_rng(3)
def tt(d): return np.arange(int(SR*d))/SR
def add(buf,t0,x,g=1.0):
    i=int(t0*SR)
    if i>=N or i<0: return
    x=x[:N-i]; buf[i:i+len(x)]+=x*g
def lp(x,k):  # moving-average lowpass
    return np.convolve(x,np.ones(k)/k,mode='same') if k>1 else x
def note(n): return 440*2**((n-69)/12)
def marimba(f,d=.35):
    t=tt(d); return (np.sin(2*np.pi*f*t)*np.exp(-t*9)+.35*np.sin(2*np.pi*4*f*t)*np.exp(-t*30))*np.minimum(1,t*400)
def pluck(f,d=.22):
    t=tt(d); return (np.sin(2*np.pi*f*t)+.4*np.sin(2*np.pi*2*f*t)+.2*np.sin(2*np.pi*3*f*t))*np.exp(-t*16)*np.minimum(1,t*500)
def bass(f,d=.3):
    t=tt(d); return (np.sin(2*np.pi*f*t)+.3*np.sin(2*np.pi*2*f*t))*np.exp(-t*7)*np.minimum(1,t*300)
def bell(f,d=.8):
    t=tt(d); return (np.sin(2*np.pi*f*t)+.5*np.sin(2*np.pi*2.76*f*t)*np.exp(-t*6)+.25*np.sin(2*np.pi*5.4*f*t)*np.exp(-t*10))*np.exp(-t*5)*np.minimum(1,t*800)
def sweep(f0,f1,d,vib=0,shape=1.0):
    t=tt(d); u=(t/d)**shape; f=f0*(f1/f0)**u*(1+vib*np.sin(2*np.pi*7*t)); ph=2*np.pi*np.cumsum(f)/SR
    return np.sin(ph)*np.minimum(1,t*60)*np.minimum(1,(d-t)*40)
def noise(d): return rng.uniform(-1,1,int(SR*d))
def pop():
    t=tt(.12); return (noise(.12)*np.exp(-t*60)*.8+np.sin(2*np.pi*np.cumsum(500*np.exp(-t*25))/SR)*np.exp(-t*30))
def plink():
    return bell(2093,.5)*.7+bell(3136,.5)*.4
def thud(g=1):
    t=tt(.35); return np.sin(2*np.pi*np.cumsum(95*np.exp(-t*5)+35)/SR)*np.exp(-t*9)+lp(noise(.35),30)*np.exp(-t*18)*1.2
def crash():
    t=tt(.9); x=lp(noise(.9),6)*np.exp(-t*6)*1.1+np.sin(2*np.pi*np.cumsum(80*np.exp(-t*4)+30)/SR)*np.exp(-t*5)*1.3
    for k in range(7): add(x,.05+k*.09+rng.uniform(0,.04),bell(rng.uniform(900,2600),.25)*.25)
    return x
def bonk():
    t=tt(.18); return (np.sin(2*np.pi*640*t)+.6*np.sin(2*np.pi*1310*t))*np.exp(-t*35)
def boing(d=.45):
    t=tt(d); f=170+140*np.exp(-t*5)*np.sin(2*np.pi*11*t)+60*t; return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*5)*np.minimum(1,t*300)
def whoosh(d=.5):
    t=tt(d); return lp(noise(d),14)*np.sin(np.pi*t/d)**2*1.6
def hum(d,speed):  # speed: function u(0..1)->0..1
    t=tt(d); s=np.array([speed(x) for x in np.linspace(0,1,200)]); s=np.interp(t/d,np.linspace(0,1,200),s)
    f=45+70*s; ph=2*np.pi*np.cumsum(f)/SR
    x=(np.sin(ph)+.5*np.sin(2*ph)+.3*np.sin(3*ph))*(.6+.4*np.sin(2*np.pi*np.cumsum(6+22*s)/SR))
    return lp(x,8)*s*np.minimum(1,t*20)*np.minimum(1,(d-t)*20)
def brass(f,d):
    t=tt(d); x=sum(np.sin(2*np.pi*f*k*t)/k for k in range(1,7)); return lp(x,10)*np.minimum(1,t*40)*np.minimum(1,(d-t)*12)*(1+.02*np.sin(2*np.pi*6*t))
def voice(f0,f1,d):
    t=tt(d); f=f0*(f1/f0)**(t/d); ph=2*np.pi*np.cumsum(f)/SR; x=sum(np.sin(k*ph)/k for k in range(1,5)); return lp(x,16)*np.sin(np.pi*np.minimum(1,t/d))**.5*np.minimum(1,(d-t)*30)

# ---------- music ----------
B=.25  # eighth note @120bpm
MEL=[76,79,84,79, 81,79,76,None, 77,81,84,81, 79,83,86,None]   # 2 beats per chord
CH=[[60,64,67],[60,64,67],[65,69,72],[67,71,74]]
BS=[48,48,53,55]
def theme(t0,t1,g=1.0,full=True,oct=False):
    k=0; t=t0
    while t<t1-0.01:
        bar=(k//4)%4; st=k%4
        m=MEL[(k)%16]
        if m is not None:
            add(mus,t,marimba(note(m)),.55*g)
            if oct: add(mus,t,marimba(note(m+12),.25),.22*g)
        if st%2==0: add(mus,t,bass(note(BS[bar]-(0 if st==0 else -7 if bar<2 else 0))),.6*g)
        if full and st%2==1:
            for c in CH[bar]: add(mus,t,pluck(note(c)),.16*g)
        if full and st%2==0: add(mus,t,lp(noise(.03),2)*np.exp(-tt(.03)*150),.10*g)
        k+=1; t+=B

def finish(path=None):
    path=path or (sys.argv[2] if len(sys.argv)>2 else 'out/audio.wav')
    global mus
    mus2=lp(mus,2)
    mix=np.tanh((mus2*.42+sfx*.75)*1.25)
    mix[-int(.05*SR):]*=np.linspace(1,0,int(.05*SR))
    mix=mix/np.abs(mix).max()*.92
    st=np.stack([mix,mix],1)
    w=wave.open(path,'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype(np.int16).tobytes()); w.close()
