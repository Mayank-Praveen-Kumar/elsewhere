import React from 'react';
import { createRoot } from 'react-dom/client';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import App from './App.jsx';
import './style.css';
createRoot(document.getElementById('root')).render(<ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}><App /></ReactLenis>);
