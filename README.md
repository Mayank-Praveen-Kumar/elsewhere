# ELSEWHERE v0.4.4 — Animated observer head turn

Dither uses your two uploaded hooded coder poses. On the first reveal the figure faces the laptop. Leave the figure and return (or click Look closer) to trigger the second reveal: the hood contours animate over 1.45 seconds, then one pale eye and the other appear. The torso, arms, and laptop remain fixed; laptop light continues pulsing. The completed pose holds before blackout. The existing 60-second encounter also uses the turn.

The head is animated as SVG geometry, not a whole-image crossfade. Reduced-motion preferences show the final pose immediately.

## Run

```powershell
npm.cmd install
npm.cmd run dev
```

The React Bits background source files are included. Optional setup scripts can refresh them from the official registry.

## Build

```powershell
npm.cmd run build
```

## Update an existing installation

Replace `src/`, `public/images/`, `package.json`, and `vite.config.js` with these versions, then run `npm.cmd install`. Keep your own custom React Bits components if you have modified them.

## World 03 — CRT terminal

A dark 1990s CRT case surrounds bowed glass, a radial displacement filter, scanlines, phosphor glow and a recessed screen. The opening uses sparse green Courier text and deliberate pauses:

(Name). We found you.

You must remain weary of *him*.

...

The saved visitor name replaces (Name); UNKNOWN appears when no name was entered. Each message is separated by a blank line. Existing interactive terminal commands remain available afterward.

## v0.4.4 — Binary background and final-world handoff

Vertical columns of 1s and 0s travel at independent speeds in either direction and randomly change direction. Nearby digits receive a small push in the cursor movement direction, then spring back into place. The CRT remains readable above the background. Reduced-motion preferences keep the binary field still.

After Dither’s second reveal (or its timed encounter), the screen fades to black, holds briefly, then opens the terminal automatically. Navigating away cancels the pending handoff.
