# ELSEWHERE v0.2 — Purple Topography

World 01 now uses **the official React Bits Topography source** installed from the public React Bits registry. Color: `#240775`. Fixed secret locations, distance-weighted fading, persistent name, post-Terminal message changes. Worlds 02 and 03 remain v0.1 prototypes.

## Setup (PowerShell on Windows)

```powershell
npm.cmd install
npm.cmd run setup:topography
npm.cmd run dev
```

The **setup:topography** step is mandatory and downloads the official component source from `https://reactbits.dev/r/Topography-JS-CSS.json` into `src/reactbits/`. This source is not bundled in this archive. An internet connection is required for setup. The development server cannot compile until the source is installed.

If the React Bits registry changes, see https://reactbits.dev/backgrounds/topography for the latest installation command.

Your browser localStorage progress from v0.1 is preserved when running on the same origin (`localhost:5173`).

**Notes:** The React Bits component itself responds to pointer interaction, but the overlay uses pointer events on the parent. Other worlds are still prototypes.
