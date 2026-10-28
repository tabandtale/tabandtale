# All Your Eras — Birthday Edition

A loud, joyful, maximalist birthday mini-site with confetti, sticker-like labels, a personality field guide, life-era timeline, playful awards, love notes, camera-roll gallery, secret unlock, heartfelt letter and a voice-note finale.

## Preview route

With the Tab & Tale Vite project running, open:

`/templates/all-your-eras`

The template is imported by `src/main.tsx` and uses its own stylesheet at `templates/all-your-eras/styles/all-your-eras.css`.

## Personalising it

Edit `templates/all-your-eras/src/AllYourEras.tsx`:

- Replace `[ THEIR NAME ]` and all sample copy.
- Update the `eras` array for the person's actual life stages and stories.
- Update the `notes` array with real messages and relationships.
- Replace the `photos` array images and captions with supplied photographs.
- Replace the sample birthday/personality photos with approved images.
- Replace the sample letter with a real letter.
- Connect real supplied voice notes to an audio element before representing them as playable recordings. The current voice-note UI is deliberately demo-only.
- The soundtrack control is currently a visual interaction; connect a licensed or user-supplied track before launch. Audio is not autoplayed.

## Design notes

The visual language is intentionally distinct from the Tab & Tale studio website: bright birthday yellow, punchy pink, aqua, lilac, dark ink, oversized type, wonky photo frames, scrapbook notes and playful section treatments. It is responsive and includes reduced-motion support. The initial confetti is brief and can be replayed by pressing **Enter Your Eras**.

## Assets and rights

Remote Unsplash URLs are placeholders for preview only. Replace them with client-provided images or assets that are appropriately licensed before publishing a personalised site. Do not redistribute commercial music recordings without the necessary rights.
