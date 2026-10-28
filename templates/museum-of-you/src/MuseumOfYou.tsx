import { useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, Headphones, X } from 'lucide-react'
import '../styles/museum.css'

const exhibits = [
  { id: '01', room: 'THE BEGINNING', title: 'Once upon a tiny human', year: 'CHAPTER 01 · THE EARLY YEARS', text: 'Before the big ideas, the long stories, and the person everyone knows today, there was this little beginning.', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=85', caption: 'ARCHIVE 001 · LITTLE BEGINNINGS' },
  { id: '02', room: 'THE MAKING', title: 'A thousand firsts', year: 'CHAPTER 02 · BECOMING', text: 'First favourite songs. First big dreams. The little things that slowly turned into a whole personality.', image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1200&q=85', caption: 'ARCHIVE 014 · IN THE MAKING' },
  { id: '03', room: 'THE PEOPLE', title: 'The ones who stayed', year: 'CHAPTER 03 · YOUR PEOPLE', text: 'Some of the best parts of a life are the people who become part of the story and somehow make every chapter better.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85', caption: 'ARCHIVE 028 · IN GOOD COMPANY' },
  { id: '04', room: 'THE NOW', title: 'Look at you now', year: 'CHAPTER 04 · THE PRESENT DAY', text: 'Still becoming. Still surprising people. Still collecting reasons to be celebrated.', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85', caption: 'ARCHIVE 042 · CURRENT EDITION' },
]
const wishes = [
  { name: 'MAYA · FRIEND SINCE FOREVER', note: 'You make ordinary days feel like stories we will tell forever. Never get less you.' },
  { name: 'THE FAMILY ARCHIVE', note: 'We have loved every version of you, and we cannot wait to meet all the versions still to come.' },
  { name: 'YOUR PARTNER IN CRIME', note: 'You are the person I want to tell everything to. Happy birthday to my favourite human.' },
]
const awards = [
  ['THE GOLDEN HEART', 'For making people feel at home without even trying.'],
  ['MOST LIKELY TO', 'Turn a five-minute story into a forty-minute masterpiece.'],
  ['THE MAIN CHARACTER', 'For somehow making even the most ordinary Tuesday memorable.'],
]
export function MuseumOfYou() {
  const [active, setActive] = useState<number | null>(null)
  const [wish, setWish] = useState(0)
  const [audioOn, setAudioOn] = useState(false)
  const [awardOpen, setAwardOpen] = useState<number | null>(null)
  const selected = active === null ? null : exhibits[active]
  return <main className="museum-template">
    <header className="museum-top"><a className="museum-mark" href="/personal">T&T <span>STUDIO PRESENTS</span></a><span className="museum-edition">A PERSONAL EXHIBITION / 2026</span><a className="museum-exit" href="/personal">EXIT EXHIBITION ↗</a></header>
    <section className="museum-hero">
      <div className="museum-hero-meta"><span>EXHIBITION NO. 001</span><span>ADMISSION: ALL HEART</span></div>
      <p className="museum-kicker">{'A LIFE IN EXHIBITS · VOL. 01'}</p>
      <h1>The Museum<br/>of <em>You.</em></h1>
      <div className="museum-hero-bottom"><p>A living archive of the little beginnings, the big becoming, and every version of you worth celebrating.</p><a href="#galleries" className="museum-scroll">ENTER THE EXHIBITION <ArrowDown size={15}/></a></div>
      <div className="museum-hero-image"><img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1500&q=85" alt="A sunlit museum-like room filled with keepsakes" /><span>FIG. 001 — A LIFE STILL IN PROGRESS</span></div>
    </section>
    <section className="museum-intro" id="galleries"><div className="museum-section-label"><span>01 / THE COLLECTION</span><span>SELECT AN EXHIBIT TO EXPLORE</span></div><div className="museum-intro-grid"><h2>Every version<br/>belongs <em>here.</em></h2><p>Some stories deserve more than a slideshow. Wander through the chapters, open an exhibit, and see the many little things that make one person wonderfully, unmistakably themselves.</p></div>
      <div className="museum-exhibits">{exhibits.map((item, i) => <button className={`museum-exhibit museum-exhibit-${i+1}`} key={item.id} onClick={() => setActive(i)}><span className="museum-exhibit-no">{item.id} / EXHIBIT</span><img src={item.image} alt="" /><span className="museum-exhibit-caption">{item.room}</span><strong>{item.title}</strong><span className="museum-open">OPEN EXHIBIT ↗</span></button>)}</div>
    </section>
    <section className="museum-voice"><div className="museum-voice-copy"><span className="museum-section-label">02 / THE SOUND ARCHIVE</span><h2>Some things<br/>are better <em>heard.</em></h2><p>Little voice notes from the people who love you. This demo player shows how a real birthday message can live inside the exhibition.</p><button className="museum-audio-button" onClick={() => setAudioOn(v => !v)}><Headphones size={18}/><span>{audioOn ? 'DEMO MESSAGE PLAYING' : 'PLAY A LITTLE WISH'}</span><span>{audioOn ? 'Ⅱ' : '▶'}</span></button>{audioOn && <p className="museum-audio-note" role="status">Demo mode: add a real audio file in the template data to enable recorded playback.</p>}</div><div className="museum-record"><div className="museum-record-disc"><span>FOR<br/>YOU</span></div><span>VOICE NOTE 001</span><small>“Happy birthday. Never forget how loved you are.”</small></div></section>
    <section className="museum-wishes"><div className="museum-section-label"><span>03 / WORDS FROM YOUR PEOPLE</span><span>THE WISHES ROOM</span></div><div className="museum-wish-layout"><div><p className="museum-kicker">A FEW WORDS TO KEEP</p><h2>Filed under<br/><em>love.</em></h2><div className="museum-wish-controls"><button onClick={() => setWish(v => (v + wishes.length - 1) % wishes.length)} aria-label="Previous wish"><ArrowLeft/></button><span>0{wish+1} / 0{wishes.length}</span><button onClick={() => setWish(v => (v + 1) % wishes.length)} aria-label="Next wish"><ArrowRight/></button></div></div><article className="museum-wish-card"><span>PERSONAL CORRESPONDENCE · {String(wish+1).padStart(3,'0')}</span><blockquote>“{wishes[wish].note}”</blockquote><p>— {wishes[wish].name}</p></article></div></section>
    <section className="museum-awards"><div className="museum-section-label"><span>04 / SPECIAL RECOGNITION</span><span>AWARDS & DISTINCTIONS</span></div><h2>Officially, <em>iconic.</em></h2><p className="museum-awards-lede">Peer-reviewed by the people who know you best.</p><div className="museum-award-grid">{awards.map(([name,desc],i) => <button className={`museum-award ${awardOpen===i?'is-open':''}`} key={name} onClick={() => setAwardOpen(awardOpen===i?null:i)}><span>AWARD 0{i+1}</span><b>{name}</b><span className="museum-award-seal">✳</span>{awardOpen===i && <p>{desc}</p>}<small>{awardOpen===i?'CLOSE DETAILS':'REVEAL CITATION +'}</small></button>)}</div></section>
    <footer className="museum-footer"><span>END OF EXHIBITION — NOT THE END OF THE STORY</span><h2>To be continued, <em>beautifully.</em></h2><p>Happy birthday. The best chapters are still ahead.</p><a href="/personal">RETURN TO THE STUDIO ↗</a><small>DEMO EXPERIENCE · MADE WITH CARE</small></footer>
    {selected && <div className="museum-overlay" role="dialog" aria-modal="true" aria-labelledby="museum-modal-title" onMouseDown={e => { if (e.target === e.currentTarget) setActive(null) }}><article className="museum-modal"><button className="museum-modal-close" onClick={() => setActive(null)} aria-label="Close exhibit"><X/></button><span>{selected.id} / {selected.year}</span><img src={selected.image} alt="" /><small>{selected.caption}</small><h2 id="museum-modal-title">{selected.title}</h2><p>{selected.text}</p><button className="museum-modal-next" onClick={() => setActive((active! + 1) % exhibits.length)}>NEXT EXHIBIT <ArrowRight size={15}/></button></article></div>}
  </main>
}
