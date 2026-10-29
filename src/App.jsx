import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import TopographyBits from './reactbits/Topography.jsx';
import DitherBits from './reactbits/Dither.jsx';
import { ArrowUpRight, RotateCcw, Volume2, VolumeX } from 'lucide-react';

const KEY = 'elsewhere-visitor-v1';
const initial = { name: '', found: [], visited: [], sawObserver: false };
function load() { try { return { ...initial, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return initial; } }
const WORLDS = [ ['topography','TOPOGRAPHY','The unknown is familiar.'], ['dither','DITHER','Something is looking back.'], ['terminal','FAULTY TERMINAL','Connection established.'] ];
function CanvasBackground({ mode, pointer }) {
 const ref=useRef(null);
 useEffect(()=>{
  const canvas=ref.current, ctx=canvas.getContext('2d'); let raf, t=0, w=0,h=0,dpr=1;
  const resize=()=>{dpr=Math.min(devicePixelRatio||1,2);w=canvas.clientWidth;h=canvas.clientHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
  resize();window.addEventListener('resize',resize);
  const draw=()=>{t+=0.012;ctx.clearRect(0,0,w,h);ctx.fillStyle='#05070b';ctx.fillRect(0,0,w,h);
   if(mode==='unused-topography') {const px=pointer.current.x/w||0.5,py=pointer.current.y/h||0.5;for(let i=0;i<24;i++){ctx.beginPath();const offset=i*22;for(let x=-20;x<=w+20;x+=8){const y=h*.54+Math.sin(x*.005+t*.36+i*.13)*56+Math.sin(x*.012-t*.18+i*.31)*23+(i-12)*24+Math.sin(x*.002+px*3)*24+(py-.5)*18; if(x===-20)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.strokeStyle=`rgba(84,128,255,${.07+Math.sin(i*.42+t)*.04})`;ctx.lineWidth=1.15;ctx.stroke();}}
   if(mode==='dither'){const step=7;for(let y=0;y<h;y+=step)for(let x=0;x<w;x+=step){const wave=Math.sin(x*.016+t*.7+Math.sin(y*.012-t*.2)*2)*Math.cos(y*.015-t*.32);const v=(wave+1)/2;const r=1.2+v*2.5;ctx.fillStyle=`rgba(192,202,214,${.07+v*.22})`;ctx.fillRect(x,y,r,r)}}
   if(mode==='terminal'){for(let y=0;y<h;y+=4){ctx.fillStyle='rgba(82,220,145,.018)';ctx.fillRect(0,y,w,1)}for(let i=0;i<46;i++){const x=((i*137.2+t*9)% (w+50));const y=(i*79.7)%h;ctx.fillStyle=`rgba(91,240,159,${.045+.035*Math.sin(t+i)})`;ctx.fillRect(x,y,1,12)}}
   raf=requestAnimationFrame(draw)};raf=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)};
 },[mode,pointer]);return <canvas className="world-canvas" ref={ref} aria-hidden="true"/>;
}
const MESSAGES=[{id:'lost',x:17,y:27,text:'Are you lost?'},{id:'here',x:74,y:22,text:"You shouldn't be here."},{id:'where',x:49,y:44,text:'Do you know where you are?'},{id:'who',x:26,y:70,text:'Who are you?'},{id:'watch',x:81,y:69,text:"They're watching."},{id:'name',x:51,y:82,text:'Tell us your name before they get it out of you.'}];
function Topography({ visitor, update, pointer }) {
 const [cursor,setCursor]=useState({x:-1000,y:-1000,inside:false});
 const [unlocked,setUnlocked]=useState(false);
 const [input,setInput]=useState('');
 const [reply,setReply]=useState(false);
 const seenTerminal=visitor.visited.includes('terminal');
 const recorded=useRef(new Set(visitor.found));
 useEffect(()=>{recorded.current=new Set(visitor.found)},[visitor.found]);
 const proximity=(m)=>{
   if(!cursor.inside)return 0;
   const d=Math.hypot(cursor.x-m.x,cursor.y-m.y);
   const inner=4.5,outer=18;
   const t=Math.max(0,Math.min(1,(outer-d)/(outer-inner)));
   return t*t*(3-2*t);
 };
 const move=e=>{
   pointer.current={x:e.clientX,y:e.clientY};
   const r=e.currentTarget.getBoundingClientRect();
   const x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;
   setCursor({x,y,inside:true});
   for(const m of MESSAGES){
     if(Math.hypot(x-m.x,y-m.y)<10){
       if(!recorded.current.has(m.id)){
         recorded.current.add(m.id);
         update(v=>v.found.includes(m.id)?v:{...v,found:[...v.found,m.id]});
       }
       if(m.id==='name'&&!visitor.name)setUnlocked(true);
     }
   }
 };
 const submit=e=>{
   e.preventDefault();const name=input.trim().slice(0,32);if(!name)return;
   update(v=>({...v,name}));setUnlocked(false);setReply(true);
 };
 const message=m=>{
   if(!seenTerminal)return m.text;
   if(m.id==='who')return visitor.name?`We know who you are, ${visitor.name}.`:'You still have not told us.';
   if(m.id==='lost')return 'Why did you come back?';
   if(m.id==='watch')return 'He remembers you.';
   return m.text;
 };
 return <div className="world-content topography-world" onPointerMove={move} onPointerLeave={()=>setCursor(c=>({...c,inside:false}))}>
   <div className="topography-bits" aria-hidden="true"><TopographyBits color="#240775" lineCount={22} lineWidth={1.2} elevation={1} speed={0.25} glow={0.55} mouseInteraction mouseStrength={0.25}/></div>
   <div className="topography-hit-layer">{MESSAGES.map(m=>{
      const strength=proximity(m);
      const shown=!(m.id==='name'&&(unlocked||reply||visitor.name));
      return <div key={m.id} className="secret" style={{left:`${m.x}%`,top:`${m.y}%`,opacity:shown?strength:0,filter:`blur(${(1-strength)*9}px)`,transform:`translate(-50%,-50%) translateY(${(1-strength)*8}px)`,textShadow:`0 0 ${12+strength*18}px rgba(115,71,215,${strength*.45})`}}>{message(m)}</div>
   })}</div>
   {(unlocked||reply)&&<div className="name-capsule" style={{left:'51%',top:'82%'}}>
     {reply ? <>
       <p className="name-reply">{visitor.name}. <em>That's what you call yourself?</em></p>
       <button className="capsule-button" onClick={()=>setReply(false)}>CONTINUE</button>
     </> : <>
       <p className="name-prompt">Tell us your name before <em>they</em> get it out of you.</p>
       <form className="name-form" onSubmit={submit}>
         <input autoFocus maxLength={32} value={input} onChange={e=>setInput(e.target.value)} placeholder="Your name" aria-label="Your name"/>
         <button className="capsule-button" type="submit">SUBMIT ↗</button>
       </form>
       <button className="name-dismiss" onClick={()=>setUnlocked(false)}>NOT YET</button>
     </>}
   </div>}
 </div>;
}
function Observer({ phase }) {
 const [frame,setFrame]=useState(0);
 useEffect(()=>{
   const began=performance.now();
   const update=()=>{
     const elapsed=performance.now()-began;
     if(phase==='working')setFrame(Math.floor(elapsed/145)%11);
     else if(phase==='turned'||phase==='tearing')setFrame(elapsed<1050?11+Math.min(7,Math.floor(elapsed/132)):19+Math.floor(elapsed/420)%4);
     else if(phase==='staring')setFrame(19+Math.floor(elapsed/420)%4);
     else setFrame(0);
   };
   update();const id=setInterval(update,65);return()=>clearInterval(id);
 },[phase]);
 return <div className="observer-sprite-scene" aria-hidden="true">
   <div className="observer-sprite" style={{backgroundPosition:`${(frame%6)*20}% ${Math.floor(frame/6)*(100/3)}%`}} />
 </div>;
}
function Dither({ pointer, onEncounter }) {
 const [phase,setPhase]=useState('hidden');
 const [cursor,setCursor]=useState({x:-999,y:-999});
 const [firstSeen,setFirstSeen]=useState(false);
 const [remaining,setRemaining]=useState(60);
 const [flash,setFlash]=useState(false);
 const phaseRef=useRef('hidden');
 const firstSeenRef=useRef(false);
 const timeLeft=useRef(60000);
 const lastTick=useRef(null);
 const timers=useRef([]);
 const region=useRef(null);
 const wasInside=useRef(false);
 const encounterRef=useRef(onEncounter);
 encounterRef.current=onEncounter;
 const setStage=next=>{phaseRef.current=next;setPhase(next)};
 const schedule=(fn,ms)=>{const id=setTimeout(fn,ms);timers.current.push(id)};
 const clearTimers=()=>{timers.current.forEach(clearTimeout);timers.current=[]};
 const reset=()=>{
   clearTimers();timeLeft.current=60000;lastTick.current=null;
   firstSeenRef.current=false;wasInside.current=false;setRemaining(60);setFlash(false);setStage('hidden');
 };
 useEffect(()=>()=>clearTimers(),[]);
 const conclude=()=>{
   encounterRef.current();
   setStage('blackout');
   schedule(reset,1900);
 };
 const turn=()=>{
   if(phaseRef.current!=='working')return;
   setStage('turned');
   encounterRef.current();
   setFlash(true);
   schedule(()=>setFlash(false),480);
   schedule(conclude,3100);
 };
 const tear=()=>{
   if(phaseRef.current!=='working')return;
   setStage('tearing');
   encounterRef.current();
   schedule(()=>setStage('staring'),2600);
   schedule(conclude,5700);
 };
 useEffect(()=>{
   if(phase!=='working')return;
   lastTick.current=performance.now();
   const interval=setInterval(()=>{
     if(document.hidden){lastTick.current=performance.now();return;}
     const now=performance.now();
     timeLeft.current=Math.max(0,timeLeft.current-(now-lastTick.current));
     lastTick.current=now;
     setRemaining(Math.ceil(timeLeft.current/1000));
     if(timeLeft.current<=0)tear();
   },100);
   return()=>{clearInterval(interval);lastTick.current=null};
 },[phase]);
 const withinTarget=(x,y)=>{
   const r=region.current?.getBoundingClientRect();
   if(!r)return false;
   const centerX=r.width*.5,centerY=r.height*.52;
   return Math.hypot((x-centerX)/Math.min(185,r.width*.22),(y-centerY)/Math.min(175,r.height*.25))<1;
 };
 const move=e=>{
   pointer.current={x:e.clientX,y:e.clientY};
   const r=e.currentTarget.getBoundingClientRect();
   const x=e.clientX-r.left,y=e.clientY-r.top;
   setCursor({x,y});
   const inside=withinTarget(x,y);
   if(!inside){wasInside.current=false;return;}
   if(wasInside.current)return;
   wasInside.current=true;
   if(phaseRef.current==='working'){turn();return;}
   if(phaseRef.current==='hidden'){
     firstSeenRef.current=true;timeLeft.current=60000;
     setStage('working');
   }
 };
 const revealAgain=()=>{
   if(phaseRef.current==='working'&&firstSeenRef.current)turn();
 };
 const active=['working','turned','tearing','staring'].includes(phase);
 return <div className="world-content dither-world" ref={region} onPointerMove={move}>
   <div className="dither-bits" aria-hidden="true">
     <DitherBits waveSpeed={0.045} waveFrequency={2.8} waveAmplitude={0.26}
       waveColor={[0.65,0.7,0.77]} backgroundColor={[0.018,0.022,0.035]}
       colorNum={4} pixelSize={3} ditherMode="bayer"
       enableMouseInteraction mouseEffect="erase" mouseRadius={0.8} mouseStrength={0.8}
       trail={0.35} clickRipple={false}/>
   </div>
   <div className={'observer-reveal-v3 '+(active?'is-active':'')+(phase==='tearing'||phase==='staring'?' is-open':'')}
     style={{'--mx':`${cursor.x}px`,'--my':`${cursor.y}px`}}>
     <Observer phase={phase}/>
   </div>
   <div className="observer-interaction-zone" onClick={revealAgain}
     role="button" tabIndex={0} aria-label="Look closer" onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();revealAgain()}}}/>
   {phase==='tearing'&&<div className="curtain-opening" aria-hidden="true"><div/><div/></div>}
   {flash&&<div className="dither-screen-flash" aria-hidden="true"/>}
   {phase==='blackout'&&<div className="dither-blackout" aria-hidden="true"/>}
 </div>;
}

function Terminal({visitor}){
 const lines=visitor.name?[`> CONNECTION ESTABLISHED`,`> SEARCHING FOR IDENTITY...`,`> MATCH FOUND.`,`> ${visitor.name.toUpperCase()}.`,`> THAT'S WHAT YOU TOLD THEM.`,...(visitor.sawObserver?['> YOU SAW HIM.','> DIDN’T YOU?']:['> THERE IS STILL SOMETHING YOU HAVEN’T SEEN.']),'> BUT IS THAT WHO YOU ARE?']:['> CONNECTION ESTABLISHED','> IDENTITY UNKNOWN.','> INTERESTING.','> YOU HAVE MANAGED TO REMAIN ANONYMOUS.','> FOR NOW.',...(visitor.sawObserver?['> HE SAW YOU.']:[])];
 const [visible,setVisible]=useState(0);useEffect(()=>{setVisible(0);const id=setInterval(()=>setVisible(v=>Math.min(lines.length,v+1)),1100);return()=>clearInterval(id)},[visitor.name,visitor.sawObserver]);return <div className="world-content terminal-world"><CanvasBackground mode="terminal" pointer={{current:{x:0,y:0}}}/><div className="terminal-box"><div className="terminal-lines" aria-live="polite">{lines.slice(0,visible).map((line,i)=><div key={i}>{line}</div>)}<span className="cursor-block">▌</span></div></div></div>
}
export default function App(){const [visitor,setVisitor]=useState(load),[world,setWorld]=useState('landing'),[transition,setTransition]=useState(false),[menu,setMenu]=useState(false),[muted,setMuted]=useState(true);const pointer=useRef({x:0,y:0}),veil=useRef(null),busy=useRef(false);
 useEffect(()=>localStorage.setItem(KEY,JSON.stringify(visitor)),[visitor]);
 const go=useCallback(next=>{if(busy.current||next===world)return;busy.current=true;setMenu(false);setTransition(true);gsap.to(veil.current,{opacity:1,duration:.48,ease:'power2.inOut',onComplete:()=>{setWorld(next);setVisitor(v=>next==='landing'||v.visited.includes(next)?v:{...v,visited:[...v.visited,next]});gsap.to(veil.current,{opacity:0,duration:.7,delay:.15,ease:'power2.inOut',onComplete:()=>{busy.current=false;setTransition(false)}})}})},[world]);
 const onEncounter=useCallback(()=>setVisitor(v=>v.sawObserver?v:{...v,sawObserver:true}),[]);
 const reset=()=>{if(!window.confirm('Forget your name and all discoveries on this browser?'))return;localStorage.removeItem(KEY);setVisitor({...initial});go('landing')};
 return <div className="app"><header className="header"><button className="brand" onClick={()=>go('landing')}>ELSEWHERE<span>®</span></button><div className="header-right"><button className="menu-button" onClick={()=>setMenu(v=>!v)} aria-expanded={menu}>{menu?'CLOSE':'WORLDS'} <span>{menu?'−':'+'}</span></button></div></header>{world==='landing'?<main className="landing"><div className="landing-orbit orbit-one"/><div className="landing-orbit orbit-two"/><div className="landing-center"><h1>THERE IS<br/>MORE <em>HERE</em><br/>THAN YOU SEE<span className="dot">.</span></h1><button className="enter" onClick={()=>go('topography')}>ENTER <ArrowUpRight size={17}/></button></div></main>:<main className="stage">{world==='topography'&&<Topography visitor={visitor} update={setVisitor} pointer={pointer}/ >}{world==='dither'&&<Dither pointer={pointer} onEncounter={onEncounter}/ >}{world==='terminal'&&<Terminal visitor={visitor}/>}</main>}<nav className="world-nav" aria-label="World navigation">{WORLDS.map(([id,label],i)=><button key={id} onClick={()=>go(id)} className={world===id?'selected':''}><span>0{i+1}</span>{label}<ArrowUpRight size={13}/></button>)}</nav>{menu&&<div className="menu-panel">{WORLDS.map(([id,label,desc],i)=><button onClick={()=>go(id)} key={id}><small>0{i+1}</small><span>{label}</span><ArrowUpRight/></button>)}<button className="reset-progress" onClick={reset}><RotateCcw size={15}/> FORGET EVERYTHING</button></div>}<div className="transition-veil" ref={veil} aria-hidden="true"/><div className="screen-grain" aria-hidden="true"/></div>}
