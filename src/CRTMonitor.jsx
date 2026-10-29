import React, { useId } from 'react';
import displacement from './crt-displacement.png';

export default function CRTMonitor({ children, corrupt }) {
 const filterId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
 return <section className="crt-monitor" aria-label="CRT terminal monitor">
  <svg className="crt-filter-defs" aria-hidden="true" width="0" height="0">
   <defs>
    <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
     <feImage href={displacement} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="curvature"/>
     <feDisplacementMap in="SourceGraphic" in2="curvature" scale="14" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
   </defs>
  </svg>
  <div className="crt-bezel">
   <div className="crt-glass">
    <div className={'crt-screen-content'+(corrupt?' crt-interference':'')} style={{filter:`url(#${filterId})`}}>
     {children}
    </div>
    <div className="crt-glass-coating" aria-hidden="true"/>
   </div>
  </div>
  <div className="crt-chin" aria-hidden="true">
   <span className="crt-maker">ELSEWHERE <small>VISION / 95</small></span>
   <span className="crt-vents"/>
   <span className="crt-power-led"/><span className="crt-power-switch"/>
  </div>
  <div className="crt-stand" aria-hidden="true"/>
 </section>;
}
