# ELSEWHERE — Prototype 0.1

An original three-world interactive experience. Built with React, GSAP and Lenis. It uses lightweight custom canvas interpretations of the Topography, Dither and Faulty Terminal visual directions **as placeholders**. The official React Bits components are **not yet integrated**; they can be swapped in as the visual system is refined.

## Start

1. Install Node.js 20+.
2. Run `npm install` in this folder.
3. Run `npm run dev` and open the local address shown.
4. Run `npm run build` to generate production files.

## Implemented

- Cinematic GSAP fade-to-black world transitions.
- Three separate, animated world environments.
- Topography: six cursor-discoverable messages, name input and ambiguous response.
- Dither: hooded figure illustrated with CSS, first/second discovery states, 60-second timed reveal, flickering monitor, and blackout reset.
- Faulty Terminal: type-on sequence that changes with the visitor's name and observer encounter.
- Persistent progress stored locally in browser localStorage; reset available in WORLDS menu.
- Lenis initialized globally, ready for future scroll-based scenes.

## Next steps / known limitations

- Swap custom canvas backgrounds for **official React Bits** Topography, Dither, and Faulty Terminal source components, according to their current docs and dependencies. Current canvas versions are visual stand-ins, not the official effects.
- Replace CSS-drawn hooded figure with commissioned layered artwork or a rigged animation; the tear effect is a prototype.
- Improve Dither cursor reveal so it follows the pointer accurately in all layouts, and implement fully deterministic encounter triggers across pointer and touch.
- Add accessible non-hover discovery controls for mobile and keyboard navigation.
- Add sound design and an optional mute control only after audio exists.
- Test build and browsers after installing dependencies (the generation environment has no access to npm registry).

No account, backend, analytics, or external identity collection is included.
