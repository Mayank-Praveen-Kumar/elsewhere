# ELSEWHERE v0.3.1 — photographic observer

The supplied photograph is included at `public/images/dither-observer.webp` and replaces the previous CSS hooded character in Dither. The original React Bits Dither shader remains unchanged. The photo appears only inside the existing cursor reveal, with a darkened hood and pale eyes overlaid during the second encounter. This overlay is a prototype, not a realistic rotation of the photographed person.

## Update your existing working v0.3 project

Copy the following into your existing project, keeping all your current React Bits files and dependencies:

- `src/App.jsx`
- `src/style.css`
- `public/images/dither-observer.webp` (create `public/images` if needed)

Refresh the page. No npm reinstall or setup script is needed.

## Fresh installation

`npm.cmd install`, then `npm.cmd run setup:topography`, `npm.cmd run setup:dither`, and `npm.cmd run dev`.

This package uses the same source-download setup for React Bits as the previous version. The installed React Bits components are not included in the archive.
