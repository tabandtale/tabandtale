# All Your Eras — Birthday Edition

A magazine-style birthday mini-site based on the supplied birthday design: blush pink, deep charcoal, script and pixel typography, scrapbook collages and celebratory interactions.

## Preview route

`/templates/all-your-eras`

## Personalising it

Edit `templates/all-your-eras/src/birthdayData.ts`. That file is the single source of truth for copy, photographs and optional voice-note audio.

Sample photographs live in `public/templates/all-your-eras/` and are Unsplash-licensed preview images. Replace them with the birthday person's own photos before publishing.

Voice-note cards are populated as sample cards. Playback stays disabled until you set a real `audioSrc`.

## Interactions

- Confetti cannons fire once as soon as the page opens
- The opening CTA fires a second burst and scrolls into the story
- Photographs tilt, zoom and reveal on scroll
- The award reveal uncovers the prize with confetti
- The envelope opens a full letter that can be closed and opened again
- A gentle confetti burst plays when the ending comes into view
- All motion respects `prefers-reduced-motion`
