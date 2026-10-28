import { useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, Heart, X } from 'lucide-react'
import '../styles/yeses.css'

const milestones = [
  { date: 'THE BEGINNING', title: 'Before it had a name', text: 'The first conversation. The first laugh that lasted too long. The moment an ordinary day quietly became part of our story.' },
  { date: 'SOMEWHERE ALONG THE WAY', title: 'A place that became ours', text: 'A thousand small rituals, familiar roads, favourite orders, and the comfort of knowing exactly who to look for in a room.' },
  { date: 'RIGHT HERE, RIGHT NOW', title: 'Still my favourite yes', text: 'Not because every day is perfect, but because we keep finding our way back to the little things that make this ours.' },
]
const letters = [
  { title: 'The way you listen', body: 'You make space for the whole story, even when I take the scenic route getting to the point. I hope you know how rare that feels.' },
  { title: 'The everyday you', body: 'The sleepy voice. The familiar laugh. The way you remember the tiny details. I fall for the ordinary versions of you, too.' },
  { title: 'The future note', body: 'For the days ahead: I hope we keep being curious about each other, keep making room for change, and keep choosing the little yeses.' },
]
export function AThousandLittleYeses() {
  const [openLetter, setOpenLetter] = useState<number | null>(null)
  const [milestone, setMilestone] = useState(0)
  const [photo, setPhoto] = useState(0)
  const [promise, setPromise] = useState(false)
  const photos = [
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
  ]
  return <main className="yeses-template">
    <header className="yeses-nav"><a href="/personal" className="yeses-wordmark">a thousand <i>little yeses</i></a><span>AN ONGOING LOVE LETTER</span><a href="/personal">LEAVE A NOTE ↗</a></header>
    <section className="yeses-hero"><div className="yeses-hero-text"><p className="yeses-eyebrow">FOR MY FAVOURITE PERSON, ALWAYS</p><h1>Love lives<br/>in the <em>little</em><br/>yeses.</h1><p>In the ordinary mornings, the long way home, the jokes that never get old. In every small choice that says: still you.</p><a href="#story">READ OUR STORY <ArrowDown size={15}/></a></div><div className="yeses-hero-art"><img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1100&q=85" alt="A couple holding hands in a quiet moment"/><span className="yeses-photo-caption">A MOMENT, KEPT FOREVER</span><span className="yeses-heart-seal">YOURS<br/>ALWAYS <Heart size={20} fill="currentColor"/></span></div><span className="yeses-side-note">A STORY IN NO PARTICULAR HURRY — EST. WHENEVER WE BEGAN</span></section>
    <section className="yeses-intro" id="story"><span>01 / THE THINGS THAT BROUGHT US HERE</span><p>Maybe love is not one grand gesture. Maybe it is a thousand little yeses, collected over time until they become a life that feels like home.</p></section>
    <section className="yeses-timeline"><div className="yeses-section-title"><span>02 / OUR STORY, IN CHAPTERS</span><h2>Every chapter<br/>led me <em>here.</em></h2></div><div className="yeses-timeline-layout"><div className="yeses-timeline-nav">{milestones.map((m,i)=><button key={m.date} className={milestone===i?'active':''} onClick={()=>setMilestone(i)}><span>0{i+1}</span><span>{m.date}</span></button>)}</div><article className="yeses-milestone"><span>CHAPTER 0{milestone+1}</span><h3>{milestones[milestone].title}</h3><p>{milestones[milestone].text}</p><div className="yeses-timeline-controls"><button onClick={()=>setMilestone(v=>(v+milestones.length-1)%milestones.length)} aria-label="Previous chapter"><ArrowLeft/></button><span>0{milestone+1} / 0{milestones.length}</span><button onClick={()=>setMilestone(v=>(v+1)%milestones.length)} aria-label="Next chapter"><ArrowRight/></button></div></article></div></section>
    <section className="yeses-gallery"><div className="yeses-section-title"><span>03 / MOMENTS I WOULD KEEP</span><h2>Little scenes.<br/><em>Whole worlds.</em></h2></div><div className="yeses-gallery-layout"><div className="yeses-gallery-image"><img src={photos[photo]} alt="A romantic memory from the sample gallery"/><span>MEMORY 0{photo+1} / THE KEEPSAKE COLLECTION</span></div><div className="yeses-gallery-caption"><p>THE ALMOST-ORDINARY DAYS</p><h3>Nothing spectacular.<br/>Everything <em>important.</em></h3><p>The coffee runs, the long walks, the quiet company. The moments that would look small to anyone else.</p><div><button onClick={()=>setPhoto(v=>(v+photos.length-1)%photos.length)} aria-label="Previous photo"><ArrowLeft/></button><button onClick={()=>setPhoto(v=>(v+1)%photos.length)} aria-label="Next photo"><ArrowRight/></button></div></div></div></section>
    <section className="yeses-letters"><div className="yeses-section-title"><span>04 / THINGS I WANT YOU TO KNOW</span><h2>Open when<br/>you need a <em>reminder.</em></h2></div><p className="yeses-letters-lede">Three little letters. No occasion required.</p><div className="yeses-letter-grid">{letters.map((letter,i)=><button className={`yeses-letter ${openLetter===i?'is-open':''}`} key={letter.title} onClick={()=>setOpenLetter(openLetter===i?null:i)}><span>LETTER 0{i+1}</span><span className="yeses-envelope">✉</span><b>{letter.title}</b>{openLetter===i && <p>{letter.body}</p>}<small>{openLetter===i?'FOLD AWAY −':'OPEN LETTER +'}</small></button>)}</div></section>
    <section className="yeses-vows"><span>05 / A SMALL PROMISE</span><h2>In every version<br/>of tomorrow, <em>you.</em></h2><p>Here is to the ordinary days that become our favourite memories, and the little yeses we have not said yet.</p><button onClick={()=>setPromise(v=>!v)}>{promise?'PROMISE KEPT ♥':'KEEP THIS LITTLE PROMISE'}</button>{promise && <div className="yeses-promise-note" role="status">A little reminder saved for this visit: keep choosing the kind thing, the honest thing, and each other.</div>}</section>
    <footer className="yeses-footer"><span>WRITTEN WITH ALL MY LITTLE YESes</span><p>Some stories are still being written.</p><h2>And I hope this one<br/><em>keeps going.</em></h2><a href="/personal">RETURN TO THE STUDIO ↗</a></footer>
    {openLetter!==null && <div className="yeses-letter-overlay" role="dialog" aria-modal="true" aria-labelledby="yeses-dialog-title" onMouseDown={e=>{if(e.target===e.currentTarget)setOpenLetter(null)}}><article><button className="yeses-close" onClick={()=>setOpenLetter(null)} aria-label="Close letter"><X/></button><span>PRIVATE CORRESPONDENCE · 0{openLetter+1}</span><div className="yeses-envelope-large">✉</div><h2 id="yeses-dialog-title">{letters[openLetter].title}</h2><p>{letters[openLetter].body}</p><small>ALWAYS, YOUR PERSON</small></article></div>}
  </main>
}
