# ELSEWHERE v0.3.2 — Animated Observer Sprite

This build replaces the static full-scene photograph with a **23-frame sprite animation** of one hooded figure and one laptop, based on the supplied visual reference. The image is a sprite atlas at `public/images/observer-sprite.webp` (6 columns × 4 rows, 384 × 288 px per frame). The animation switches between idle typing, turning, and staring states. The official React Bits Dither layer remains in place.

## Update your existing v0.3.1 installation
Copy `src/App.jsx`, `src/style.css`, and `public/images/observer-sprite.webp` from this archive into your existing project. No reinstall needed. The old `dither-observer.webp` is no longer used.

## Fresh installation
```
npm.cmd install
npm.cmd run setup:topography
npm.cmd run setup:dither
npm.cmd run dev
```

## Note
This is an **early sprite pass**. The source sprite artwork was generated from the supplied visual reference; the frame sheet is not a pixel-perfect extraction from the original photograph. The typing motion is subtle, and the stare uses a closer framing. We can refine the silhouette, transparent background, and timing next.
