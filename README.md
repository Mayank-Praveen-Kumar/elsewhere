# ELSEWHERE v0.4.1 — Official React Bits Faulty Terminal

Fixes the missing React Bits background in World 03. Uses the official React Bits Faulty Terminal WebGL component underneath the existing interactive transcript and input.

## Upgrade your working v0.4 installation
Copy these files from the ZIP into the matching paths in your existing project:
- `src/App.jsx`
- `src/style.css`
- `package.json`
- `scripts/install-faulty-terminal.mjs`

Then run:
```powershell
npm.cmd run setup:faulty-terminal
npm.cmd run dev
```

**Do not delete or overwrite your already installed** `src/reactbits/Topography.jsx`, `Topography.css`, `Dither.jsx`, or `Dither.css`. The ZIP does not include downloaded official React Bits components; the setup script installs Faulty Terminal.

## Fresh install
```powershell
npm.cmd install
npm.cmd run setup:topography
npm.cmd run setup:dither
npm.cmd run setup:faulty-terminal
npm.cmd run dev
```

The interactive command responses, typewriter messages, and visitor memory are preserved. The new background is configured with muted phosphor green glyphs, mouse reaction, subtle flicker, scanlines and click glitch. Browser rendering not tested in this environment.
