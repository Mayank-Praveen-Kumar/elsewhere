# ELSEWHERE v0.3 — Dither encounter

## Update existing v0.2.2 project
Copy these from the archive into your existing project:
- `src/App.jsx`
- `src/style.css`
- `scripts/install-dither.mjs`
- `package.json`

Then, in the project folder, run:
```
npm.cmd run setup:dither
npm.cmd run dev
```
Keep your already installed `src/reactbits/Topography.jsx` and `Topography.css`. Do not replace your existing `src/reactbits` directory with the empty directory in the ZIP.

## Fresh install
```
npm.cmd install
npm.cmd run setup:topography
npm.cmd run setup:dither
npm.cmd run dev
```

## Dither interaction
Move the cursor into the central figure area: the working observer appears under a soft cursor mask. Leave the area and return within 60 seconds to see him turn toward you, with eyes visible and a brief screen flash. Otherwise, after 60 seconds in the world, the dither curtain opens, he turns and stares, and the screen blacks out. The scene resets automatically after blackout. Terminal remembers that the observer saw you.

This is an early interactive prototype. The hooded figure is CSS-drawn, not a finalized illustration or 3D model. The 60-second countdown pauses when the browser tab is hidden, but currently resets when you navigate away from Dither and return; persistent pause/resume across worlds is not implemented yet.
