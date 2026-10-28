import { useState } from 'react'
import { ArrowRight, Heart, X } from 'lucide-react'
import '../styles/smallthing.css'

const pockets = [
  { id: '01', title: 'A tiny compliment', kind: 'FOR THE DAYS YOU FORGET', body: 'You have this way of making people feel noticed. I hope someone reminds you how special that is today.' , icon: '✳', color: 'orange' },
  { id: '02', title: 'A memory to keep', kind: 'FILED UNDER: US', body: 'Remember that time we laughed so hard that absolutely nothing made sense? I still think about it when I need a little joy.', icon: '☼', color: 'blue' },
  { id: '03', title: 'A song for the walk home', kind: 'A LITTLE SOUNDTRACK', body: 'Put on your favourite song, take the long way home, and let the day be a little softer around the edges.', icon: '♫', color: 'pink' },
  { id: '04', title: 'Open on a hard day', kind: 'SEALED WITH CARE', body: 'You do not have to have it all figured out today. Eat something, drink some water, and remember you are loved exactly as you are.', icon: '♡', color: 'green' },
]
const awards = ['EXPERT AT MAKING A ROOM FEEL WARMER','MOST LIKELY TO HAVE A GOOD SNACK','A VERY IMPORTANT PERSON, ACTUALLY']
export function ASmallThingForYou() {
  const [opened, setOpened] = useState<string | null>(null)
  const [award, setAward] = useState<number | null>(null)
  const [finalOpen, setFinalOpen] = useState(false)
  const [saved, setSaved] = useState<string[]>([])
  const selected = pockets.find(p=>p.id===opened)
  const toggleSaved = (id:string) => setSaved(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id])
  return <main className="smallthing-template">
    <header className="smallthing-nav"><a href="/personal" className="smallthing-brand">little things<span> DEPT. OF THOUGHTFULNESS</span></a><a href="/personal">BACK TO THE STUDIO ↗</a></header>
    <section className="smallthing-hero"><div className="smallthing-hero-copy"><span className="smallthing-eyebrow">NO BIRTHDAY. NO REASON. JUST YOU.</span><h1>A small<br/>thing <em>for you.</em></h1><p>Because sometimes someone deserves a little corner of the internet filled with good things. This one is yours to open, whenever.</p><button onClick={()=>document.getElementById('pockets')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}>OPEN YOUR LITTLE GIFT <ArrowRight size={16}/></button></div><div className="smallthing-gift-art" aria-hidden="true"><div className="smallthing-sun">✳</div><div className="smallthing-gift-box"><div className="smallthing-box-lid"/><div className="smallthing-ribbon-v"/><div className="smallthing-ribbon-h"/><span>for<br/>you</span></div><span className="smallthing-tag">NO OCCASION<br/>NEEDED ♡</span><span className="smallthing-spark spark-1">✦</span><span className="smallthing-spark spark-2">✳</span></div></section>
    <section className="smallthing-pocket-section" id="pockets"><div className="smallthing-section-top"><span>01 / THE POCKETS</span><p>Choose one. There is no wrong order.</p></div><h2>A few good things,<br/><em>tucked away.</em></h2><div className="smallthing-pocket-grid">{pockets.map(p=><button key={p.id} className={`smallthing-pocket pocket-${p.color} ${opened===p.id?'is-open':''}`} onClick={()=>setOpened(opened===p.id?null:p.id)}><span className="smallthing-pocket-id">POCKET {p.id}</span><span className="smallthing-pocket-icon">{p.icon}</span><b>{p.title}</b><small>{opened===p.id?'FOLD IT BACK UP −':'PEEK INSIDE +'}</small></button>)}</div>{selected && <article className={`smallthing-reveal reveal-${selected.color}`} role="region" aria-live="polite"><button onClick={()=>setOpened(null)} aria-label="Close pocket"><X size={18}/></button><span>{selected.kind}</span><h3>{selected.title}</h3><p>{selected.body}</p><button className="smallthing-save" onClick={()=>toggleSaved(selected.id)}>{saved.includes(selected.id)?'SAVED TO YOUR POCKET ♥':'KEEP THIS NOTE ♡'}</button></article>}</section>
    <section className="smallthing-awards"><div className="smallthing-section-top"><span>02 / COMPLETELY UNOFFICIAL AWARDS</span><p>Peer reviewed by someone who adores you.</p></div><h2>Some things<br/>are simply <em>true.</em></h2><div className="smallthing-award-stack">{awards.map((a,i)=><button key={a} onClick={()=>setAward(award===i?null:i)} className={`smallthing-award small-award-${i+1}`}><span>✳ AWARD 0{i+1}</span><b>{a}</b><span>{award===i?'−':'+'}</span>{award===i && <p>It is official because we said so. No further evidence required.</p>}</button>)}</div></section>
    <section className="smallthing-last"><span>03 / ONE LAST THING</span><h2>You don't have<br/>to earn <em>being loved.</em></h2><p>Not by being useful. Not by being funny. Not by having a perfect day. You are already worth all the good things.</p><button onClick={()=>setFinalOpen(v=>!v)}>{finalOpen?'CLOSE YOUR NOTE':'OPEN ONE LAST NOTE'} <Heart size={16}/></button>{finalOpen && <blockquote>“If today feels a little too much, let this be your reminder: you matter, you are loved, and you do not have to do anything to deserve either.”</blockquote>}</section>
    <footer className="smallthing-footer"><span>MADE FOR NO REASON, WHICH IS A PRETTY GOOD REASON</span><h2>Keep the little things.</h2><p>They have a way of becoming the big things.</p><a href="/personal">RETURN TO TAB & TALE ↗</a></footer>

  </main>
}
