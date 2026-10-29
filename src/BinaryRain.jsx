import React, { useEffect, useRef } from 'react';

export default function BinaryRain() {
 const ref = useRef(null);
 useEffect(() => {
  const canvas=ref.current, ctx=canvas.getContext('2d');
  if(!ctx)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let columns=[],w=0,h=0,frame,last=0,previous=0,pointer=null;
  const spacing=22;
  const resize=()=>{
   const r=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);
   w=r.width;h=r.height;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
   columns=Array.from({length:Math.ceil(w/24)},(_,i)=>({
    x:i*24+12,offset:Math.random()*(h+88),speed:(Math.random()<.5?-1:1)*(12+Math.random()*32),change:3+Math.random()*7,
    cells:Array.from({length:Math.ceil(h/spacing)+4},()=>({bit:Math.random()<.5?'0':'1',alpha:.12+Math.random()*.38,x:0,y:0,vx:0,vy:0,flip:Math.random()*4})),
   }));
  };
  const yOf=(column,j)=>{
   const span=column.cells.length*spacing;
   return ((j*spacing+column.offset)%span+span)%span-spacing*2;
  };
  const move=e=>{
   const r=canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,now=performance.now();
   if(x<0||y<0||x>w||y>h||media.matches){pointer=null;return;}
   const dx=pointer&&now-pointer.time<150?x-pointer.x:0,dy=pointer&&now-pointer.time<150?y-pointer.y:0;
   pointer={x,y,time:now};
   const magnitude=Math.hypot(dx,dy);if(!magnitude)return;
   const force=Math.min(magnitude,18)*.22;
   columns.forEach(col=>col.cells.forEach((cell,j)=>{
    const distance=Math.hypot(col.x+cell.x-x,yOf(col,j)+cell.y-y);
    if(distance<105){const falloff=(1-distance/105)**2;cell.vx+=dx/magnitude*force*falloff;cell.vy+=dy/magnitude*force*falloff;}
   }));
  };
  const draw=now=>{
   frame=requestAnimationFrame(draw);
   if(document.hidden){previous=now;return;}
   if(now-last<1000/30)return;
   const dt=Math.min((now-(previous||now))/1000,.05);previous=last=now;
   ctx.clearRect(0,0,w,h);ctx.font='14px "Courier New", monospace';ctx.textAlign='center';ctx.textBaseline='middle';
   columns.forEach(col=>{
    if(!media.matches){
     col.offset+=col.speed*dt;col.change-=dt;
     if(col.change<=0){col.speed=(Math.random()<.5?-1:1)*(12+Math.random()*32);col.change=3+Math.random()*7;}
    }
    col.cells.forEach((cell,j)=>{
     if(!media.matches){
      cell.vx=(cell.vx-cell.x*.065)*.84;cell.vy=(cell.vy-cell.y*.065)*.84;
      cell.x=Math.max(-9,Math.min(9,cell.x+cell.vx));cell.y=Math.max(-9,Math.min(9,cell.y+cell.vy));
      cell.flip-=dt;if(cell.flip<=0){cell.bit=Math.random()<.5?'0':'1';cell.flip=.8+Math.random()*4;}
     }else{cell.x=cell.y=cell.vx=cell.vy=0;}
     ctx.fillStyle=`rgba(77,189,111,${cell.alpha})`;ctx.fillText(cell.bit,col.x+cell.x,yOf(col,j)+cell.y);
    });
   });
  };
  resize();const observer=new ResizeObserver(resize);observer.observe(canvas);
  const leave=()=>{pointer=null;};window.addEventListener('pointermove',move,{passive:true});window.addEventListener('blur',leave);
  frame=requestAnimationFrame(draw);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointermove',move);window.removeEventListener('blur',leave);};
 },[]);
 return <canvas ref={ref} className="binary-rain" aria-hidden="true"/>;
}
