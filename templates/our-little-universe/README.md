# Our Little Universe

**Concept:** an indie friendship zine with a constellation of clickable memory nodes, candid photo contact sheets, playful awards and a note from a friend.

## Files
- `src/OurLittleUniverse.tsx` — friendship experience and interactive constellation/memory cards.
- `styles/universe.css` — isolated zine-inspired visual system.
- `data/demo-content.json` — editable content reference.
- `assets/` — reserved for local, licensed or generated imagery.

## Preview in this repository
Run `npm run dev` at the repository root and visit `/templates/our-little-universe/`.

## Customising
Edit the memory list and award copy in `src/OurLittleUniverse.tsx`. Replace remote photo URLs with local files and update alt text. Constellation points are positioned as percentages so they can be rearranged for a particular story.

## Extraction
Copy this folder into a new React + TypeScript + Vite project, install `react`, `react-dom`, `lucide-react`, TypeScript, Vite and the React Vite plugin, create an entry that renders `OurLittleUniverse`, and adjust the stylesheet import. This folder currently relies on the repository's root Vite setup for previewing and is not yet a standalone runnable app.

## Content note
The names and memories are fictional demo content. Replace remote Unsplash photos with client-approved or locally generated assets before delivery.
