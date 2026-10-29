# ELSEWHERE v0.4.2 — User-provided hooded coder sprites

This version uses the **two SVG sprites from your uploaded Figma exports**, without AI sprite generation:

- `Hooded Coder Sprite(1).zip` → `public/images/coder-working.svg`
- `Hooded Coder Sprite (1)(1).zip` → `public/images/coder-turned.svg`

Both retain their laptop light-pulsing CSS animations, embedded in each SVG. The second sprite fades in when the visitor returns or when the 60-second timer expires. The React Bits Dither and Faulty Terminal effects remain intact.

## Update an existing working v0.4.1

Copy `src/App.jsx`, `src/style.css`, and **both** SVG files in `public/images/` into your project. No npm install or React Bits setup needed.

## Fresh installation

```powershell
npm.cmd install
npm.cmd run setup:topography
npm.cmd run setup:dither
npm.cmd run setup:faulty-terminal
npm.cmd run dev
```

The official React Bits component files are installed via setup scripts and are not bundled. The supplied assets are SVG vector sprites (not frame-by-frame raster sprite sheets); this version uses the two poses with a stepped crossfade, not a true interpolated head-turn animation.

Refreshed with the two latest uploaded exports. Sprite paths also work when hosted in a subdirectory. Leaving the Dither page area resets cursor entry detection so returning to the figure triggers the second pose.
