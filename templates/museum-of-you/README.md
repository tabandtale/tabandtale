# Museum of You

**Concept:** an editorial birthday museum: archival chapters, exhibit labels, wishes, awards and a voice-note archive.

## Files
- `src/MuseumOfYou.tsx` — page sections and interactive exhibit/wish/award states.
- `styles/museum.css` — isolated archival visual system.
- `data/demo-content.json` — editable content reference for the sample.
- `assets/` — reserved for locally supplied, licensed or generated assets.

## Preview in this repository
Run `npm run dev` at the repository root and visit `/templates/museum-of-you/`. The route is registered in `src/main.tsx`.

## Customising
Edit the sample strings and arrays in `src/MuseumOfYou.tsx` (the JSON file is an editable content reference; keep the source data in sync if you change it). Replace the demonstration photo URLs with locally supplied assets and update image alt text. The audio control is intentionally a demo state until a real recording is configured.

## Extraction
Copy this folder into a new React + TypeScript + Vite project. Install `react`, `react-dom`, `lucide-react`, TypeScript, Vite and the React Vite plugin. Set up a root entry that renders `MuseumOfYou`, and adjust the stylesheet import to the local folder structure. The current root Vite app is required to preview it inside Tab & Tale; this folder is not yet a standalone runnable app.

## Content note
All names and messages are fictional demo copy. Remote Unsplash image URLs are visual placeholders, not client assets. Replace them before delivering a personalised site.
