# A Thousand Little Yeses

**Concept:** a quiet romantic editorial with a relationship timeline, keepsake gallery, letters, and a small promise interaction.

## Files
- `src/AThousandLittleYeses.tsx` — page and interactive timeline, gallery, letter and promise states.
- `styles/yeses.css` — isolated romantic editorial visual system.
- `data/demo-content.json` — editable content reference.
- `assets/` — reserved for local, licensed or generated assets.

## Preview in this repository
Run `npm run dev` at the repository root and visit `/templates/a-thousand-little-yeses/`.

## Customising
Edit the milestones, letter copy and photo array in `src/AThousandLittleYeses.tsx`. Replace the remote photo URLs with local assets and update alt text. The promise interaction is session-only and does not store personal data.

## Extraction
Copy this folder into a new React + TypeScript + Vite project. Install `react`, `react-dom`, `lucide-react`, TypeScript, Vite and the React Vite plugin; create an entry rendering `AThousandLittleYeses`; and adjust the stylesheet import. The folder uses the root Vite setup for its current preview and is not yet a standalone runnable app.

## Content note
All letters and milestones are fictional demo copy. Replace remote Unsplash photos with client-approved or locally generated images before delivery.
