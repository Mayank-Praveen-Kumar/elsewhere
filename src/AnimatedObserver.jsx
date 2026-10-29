import React, { memo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import sprite from './observer.svg?raw';
import contours from './observer-morph.json';

// The static torso and laptop are shared by both poses. Only head contours move.
function AnimatedObserver({ turned }) {
 const scene = useRef(null);
 const motion = useRef({ progress: 0 });
 const markup = useRef({ __html: sprite });
 useEffect(() => {
  const root = scene.current;
  const parts = contours.map((contour, i) => ({
   ...contour,
   element: root.querySelector(`[data-head-part="${i}"]`),
   color: gsap.utils.interpolate(contour.fillFrom, contour.fillTo),
  }));
  const eyes = [...root.querySelectorAll('[data-eye]')];
  const fold = root.querySelector('[data-rear-fold]');
  const paint = () => {
   const t = motion.current.progress;
   root.dataset.turnProgress = t.toFixed(3);
   parts.forEach(part => {
    const points = part.from.map((p, i) => p.map((n, axis) =>
     (n + (part.to[i][axis] - n) * t).toFixed(2)).join(' '));
    part.element.setAttribute('d', `M${points.join('L')}Z`);
    part.element.setAttribute('fill', part.color(t));
   });
   fold.setAttribute('opacity', String(1 - t));
   eyes.forEach((eye, i) => {
    const reveal = gsap.utils.clamp(0, 1, (t - (i ? 0.82 : 0.66)) / 0.16);
    eye.setAttribute('opacity', String(reveal));
    eye.setAttribute('transform', `translate(${(1 - reveal) * 7} 0)`);
   });
  };
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let interval;
  const animate = () => {
   clearInterval(interval);
   if (!turned || media.matches) {
    motion.current.progress = turned ? 1 : 0;
    paint();
   } else {
    const start = performance.now() + 80;
    const tick = () => {
     const u = gsap.utils.clamp(0, 1, (performance.now() - start) / 1450);
     motion.current.progress = u < .5 ? 4*u*u*u : 1 - Math.pow(-2*u+2, 3)/2;
     paint();
     if (u === 1) clearInterval(interval);
    };
    tick();
    interval = setInterval(tick, 1000/30);
   }
  };
  animate();
  media.addEventListener('change', animate);
  return () => { clearInterval(interval); media.removeEventListener('change', animate); };
 }, [turned]);
 return <div className="observer-sprite-scene observer-svg-scene" aria-hidden="true">
  <div ref={scene} className="observer-svg observer-svg-animated" data-pose={turned?'turned':'working'} dangerouslySetInnerHTML={markup.current}/>
 </div>;
}

export default memo(AnimatedObserver);
