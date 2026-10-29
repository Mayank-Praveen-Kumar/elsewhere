import React, { useId, useState } from 'react';
import displacement from './crt-displacement.png';

export default function CRTMonitor({ children, corrupt }) {
 const [poweredOff, setPoweredOff] = useState(false);
 const [closeShortcut, setCloseShortcut] = useState('Ctrl+W');
 const closeTab = () => {
  setCloseShortcut(/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘W' : 'Ctrl+W');
  setPoweredOff(true);
  // Browsers allow this only when this tab's browsing context is closable.
  // If they refuse, retain a clear, keyboard-accessible end state.
  window.close();
 };
 const filterId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
 return <section className={'crt-monitor'+(poweredOff?' crt-powered-off':'')} aria-label="CRT terminal monitor">
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
    <div className={'crt-screen-content'+(corrupt?' crt-interference':'')} inert={poweredOff} style={{filter:`url(#${filterId})`,visibility:poweredOff?'hidden':undefined}}>
     {children}
    </div>
    {poweredOff && <div className="crt-session-ended" role="status">
     <p>Transmission ended.</p>
     <small>If this tab stays open, close it with <kbd>{closeShortcut}</kbd>.</small>
    </div>}
    <div className="crt-glass-coating" aria-hidden="true"/>
   </div>
  </div>
  <div className="crt-chin">
   <span className="crt-maker">ELSEWHERE <small>VISION / 95</small></span>
   <span className="crt-vents" aria-hidden="true"/>
   <span className="crt-power-led" aria-hidden="true"/>
   <button className="crt-power-switch" type="button" onClick={closeTab} aria-label="Power off monitor and close tab" title="Power off and close tab" disabled={poweredOff}/>
  </div>
  <div className="crt-stand" aria-hidden="true"/>
 </section>;
}
