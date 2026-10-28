# A Small Thing for You

**Concept:** an interactive gift box with pockets that reveal compliments, memories, a song suggestion and a note for a hard day.

## Files
- `src/ASmallThingForYou.tsx` — page, pocket reveal, save-for-this-visit state, awards and final note.
- `styles/smallthing.css` — isolated tactile-paper visual system.
- `data/demo-content.json` — editable content reference.
- `assets/` — reserved for local, licensed or generated assets.

## Preview in this repository
Run `npm run dev` at the repository root and visit `/templates/a-small-thing-for-you/`.

## Customising
Edit the `pockets` and `awards` arrays in `src/ASmallThingForYou.tsx`. The save action is only in-memory for the current visit; it does not store information. Replace the demo copy with client-approved notes and add local media as needed.

## Extraction
Copy this folder into a new React + TypeScript + Vite project. Install `react`, `react-dom`, `lucide-react`, TypeScript, Vite and the React Vite plugin; create an entry rendering `ASmallThingForYou`; and adjust the stylesheet import. The folder currently relies on the root Vite setup for previewing and is not yet a standalone runnable app.

## Content note
All notes and awards are fictional demo content. Replace any remote photography added later with client-approved or locally generated assets before delivery.
