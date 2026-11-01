import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Menu, Play, SkipBack, SkipForward, X } from 'lucide-react'
import '../styles/universe.css'
import { universeData, type UniverseMemory } from './universeData'

let openingFindingDone = false

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const nav = [
  { href: '#olu-top', label: 'The universe' },
  { href: '#olu-stars', label: 'The memories' },
  { href: '#olu-evidence', label: 'The evidence' },
  { href: '#olu-awards', label: 'The awards' },
  { href: '#olu-audio', label: 'The soundtrack' },
]

function StarMark() {
  return (
    <svg className="olu-star" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 2 23 16 38 20 23 24 20 38 17 24 2 20 17 16Z" fill="currentColor" />
    </svg>
  )
}

function PinMark({ color }: { color: string }) {
  return (
    <svg className={`olu-pin olu-pin-${color}`} viewBox="0 0 36 48" aria-hidden="true">
      <path d="M18 46s14-16 14-28A14 14 0 1 0 4 18c0 12 14 28 14 28Z" />
      <circle cx="18" cy="17" r="5.5" fill="#fff" />
    </svg>
  )
}

function SealMark() {
  return (
    <svg className="olu-seal" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#3d7a45" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="#f5e6a3" strokeWidth="1.4" />
      <path d="M32 18 35 28 46 32 35 36 32 46 29 36 18 32 29 28Z" fill="#f5e6a3" />
    </svg>
  )
}

const findings = [
  'New evidence of nonsense discovered.',
  'Friendship status: suspiciously strong.',
  'Research confirms: still each other’s favourite problem.',
  'Official finding: absolutely no common sense detected.',
]

export function OurLittleUniverse() {
  const data = universeData
  const [stuck, setStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState<UniverseMemory>(data.memories[0])
  const [openAward, setOpenAward] = useState<string | null>(null)
  const [secret, setSecret] = useState(false)
  const [stamped, setStamped] = useState(false)
  const [awardStamp, setAwardStamp] = useState(false)
  const [finding, setFinding] = useState<string | null>(null)
  const [shower, setShower] = useState(false)
  const [burst, setBurst] = useState(false)
  const [starNote, setStarNote] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const lightboxCloseRef = useRef<HTMLButtonElement>(null)
  const findingTimer = useRef(0)
  const endFindingDone = useRef(false)
  const mapFindingDone = useRef(false)
  const hasAudio = Boolean(data.audioSrc)

  const showFinding = (index: number) => {
    window.clearTimeout(findingTimer.current)
    setFinding(findings[index % findings.length])
    findingTimer.current = window.setTimeout(() => setFinding(null), 4200)
  }

  const pickMemory = (memory: UniverseMemory) => {
    setActive(memory)
    setBurst(true)
    window.setTimeout(() => setBurst(false), 700)
    if (!mapFindingDone.current) {
      mapFindingDone.current = true
      showFinding(1)
    }
  }

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  useEffect(() => {
    document.title = `Our Little Universe — ${data.names}`
    const nodes = document.querySelectorAll('.olu-in')
    if (prefersReducedMotion()) {
      nodes.forEach(node => node.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        if (entry.target.id === 'olu-end' && !endFindingDone.current) {
          endFindingDone.current = true
          setShower(true)
          showFinding(2)
        }
      })
    }, { threshold: 0.12 })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [data.names])

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const overlayOpen = Boolean(lightbox) || menuOpen
    document.body.style.overflow = overlayOpen ? 'hidden' : ''
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setLightbox(null)
      setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, menuOpen])

  useEffect(() => {
    if (lightbox) lightboxCloseRef.current?.focus()
  }, [lightbox])

  useEffect(() => {
    if (prefersReducedMotion() || openingFindingDone) return
    openingFindingDone = true
    const start = window.setTimeout(() => showFinding(0), 1600)
    return () => {
      window.clearTimeout(start)
      window.clearTimeout(findingTimer.current)
    }
  }, [])

  return (
    <main className="our-little-universe">
      <div className="olu-sky" aria-hidden="true">
        <i className="olu-float-star olu-float-star-0" />
        <i className="olu-float-star olu-float-star-1" />
        <i className="olu-float-star olu-float-star-2" />
        <i className="olu-mini-planet" />
        <i className="olu-shoot" />
        <i className="olu-ufo" />
        <i className="olu-smile" />
      </div>
      {shower && (
        <div className="olu-shower" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => <i key={i} style={{ left: `${6 + i * 6}%`, animationDelay: `${i * 0.08}s` } as CSSProperties} />)}
        </div>
      )}
      {finding && (
        <aside className="olu-finding" role="status">
          <p>{finding}</p>
          <button type="button" onClick={() => setFinding(null)}>File it</button>
        </aside>
      )}
      <a className="olu-skip" href="#olu-stars">Skip to the memories</a>

      <header className={`olu-header ${stuck ? 'is-stuck' : ''} ${menuOpen ? 'is-open' : ''}`}>
        <a className="olu-wordmark" href="#olu-top" onClick={event => { event.preventDefault(); scrollTo('olu-top') }}>
          Our little <em>universe</em>
        </a>
        <span className="olu-header-mark" aria-hidden="true"><StarMark /></span>
        <button className="olu-menu" type="button" aria-expanded={menuOpen} aria-controls="olu-nav" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <nav id="olu-nav" className={menuOpen ? 'is-open' : ''} aria-label="Friendship sections">
          {nav.map(item => (
            <a key={item.href} href={item.href} onClick={event => { event.preventDefault(); scrollTo(item.href.slice(1)) }}>{item.label}</a>
          ))}
          <button type="button" className="olu-header-cta" onClick={() => scrollTo('olu-evidence')}>Explore the evidence</button>
        </nav>
      </header>

      <section className="olu-hero" id="olu-top" aria-labelledby="olu-hero-title">
        <div className="olu-hero-copy">
          <p className="olu-kicker">{data.kicker}</p>
          <h1 id="olu-hero-title">Our little <em>universe.</em></h1>
          <p className="olu-lede">{data.lede}</p>
          <button type="button" className="olu-cta" onClick={() => scrollTo('olu-stars')}>Enter our universe ↗</button>
        </div>
        <figure className="olu-hero-art">
          <div className="olu-hero-photo-frame">
            <img
              className="olu-hero-photo"
              src="/templates/our-little-universe/hero-friends.jpg"
              alt="Friends with their arms around one another, sharing a quiet moment by the sea"
              loading="eager"
            />
            <span className="olu-photo-orbit" aria-hidden="true" />
          </div>
          <figcaption className="olu-hand">fig. 01 — the whole plot</figcaption>
        </figure>
      </section>

      <section className="olu-stars olu-in" id="olu-stars">
        <div className="olu-stars-copy">
          <p className="olu-kicker">01 / Field notes</p>
          <h2>Somewhere in <em>the stars.</em></h2>
          <p className="olu-lede">{data.mapNote}</p>
        </div>
        <div className="olu-map" role="list">
          <svg className="olu-path" viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden="true">
            <path d="M12 30 C22 12, 38 14, 48 28 S68 18, 78 24 S86 58, 72 66 S42 70, 36 54 S18 50, 12 30" />
          </svg>
          {data.memories.map(memory => (
            <button
              key={memory.id}
              type="button"
              role="listitem"
              className={`olu-marker ${active.id === memory.id ? 'is-on' : ''} ${burst && active.id === memory.id ? 'is-burst' : ''}`}
              style={{ left: memory.x, top: memory.y } as CSSProperties}
              aria-pressed={active.id === memory.id}
              onClick={() => pickMemory(memory)}
            >
              <PinMark color={memory.color} />
              <span>{memory.title}</span>
            </button>
          ))}
        </div>
        <article className="olu-memory" aria-live="polite">
          <button type="button" className="olu-memory-photo" onClick={() => setLightbox({ src: active.image, alt: active.title })}>
            <img src={active.image} alt="" />
          </button>
          <div>
            <p className="olu-kicker">{active.date}</p>
            <h3>{active.title}</h3>
            <p className="olu-hand">{active.place}</p>
            <p>{active.story}</p>
          </div>
        </article>
      </section>

      <section className="olu-evidence olu-in" id="olu-evidence">
        <p className="olu-kicker">02 / The camera roll</p>
        <h2>Evidence of <em>the nonsense.</em></h2>
        <p className="olu-lede">{data.evidenceIntro}</p>
        <div className="olu-photos">
          {data.evidence.map((item, index) => (
            <figure className={`olu-photo olu-photo-${index}`} key={item.label}>
              <button type="button" onClick={() => setLightbox({ src: item.image, alt: item.alt })}>
                <img src={item.image} alt={item.alt} loading="lazy" />
              </button>
              <figcaption>
                <b>{item.label}</b>
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="olu-awards olu-in" id="olu-awards">
        <h2>Extremely official. <em>Zero credentials.</em></h2>
        <div className="olu-award-row">
          {data.awards.map(award => {
            const open = openAward === award.id
            return (
              <article className={`olu-award ${open ? 'is-open' : ''}`} key={award.id}>
                <SealMark />
                <p className="olu-kicker">{award.id}</p>
                <h3>{award.title}</h3>
                <p>{award.citation}</p>
                {open && <p className="olu-hand">{award.extra}</p>}
                {open && awardStamp && <span className="olu-approved">Approved, unofficially</span>}
                <button type="button" onClick={() => {
                  setOpenAward(open ? null : award.id)
                  if (!open) {
                    setAwardStamp(true)
                    showFinding(3)
                  }
                }}>
                  {open ? 'Close the file' : 'Read more'}
                </button>
              </article>
            )
          })}
        </div>
      </section>

      <section className="olu-audio olu-in" id="olu-audio">
        <div className="olu-audio-copy">
          <p className="olu-kicker">04 / The soundtrack</p>
          <h2>In case you forgot, <em>I pick you.</em></h2>
          <p className="olu-lede">{data.pickYouBody}</p>
        </div>
        <div className="olu-player">
          <p className="olu-kicker">{data.audioSender}</p>
          <strong>{data.audioTitle}</strong>
          <p className="olu-hand">{data.audioCaption}</p>
          <div className="olu-wave" aria-hidden="true">
            {Array.from({ length: 28 }, (_, i) => (
              <b key={i} style={{ '--olu-h': `${8 + ((i * 11) % 22)}px` } as CSSProperties} />
            ))}
          </div>
          <div className="olu-progress" aria-hidden="true"><span /></div>
          <div className="olu-controls">
            <button type="button" disabled aria-label="Previous, unavailable until audio is added"><SkipBack size={16} /></button>
            <button type="button" disabled aria-label={hasAudio ? `Play ${data.audioTitle}` : 'Sample audio player, recording not added yet'}>
              <Play size={18} />
            </button>
            <button type="button" disabled aria-label="Next, unavailable until audio is added"><SkipForward size={16} /></button>
          </div>
          <small>{hasAudio ? 'Ready to play' : 'Sample player — add an audio file to make this play'}</small>
        </div>
      </section>

      <section className="olu-end olu-in" id="olu-end">
        <h2>Same stars. <em>New stories.</em></h2>
        <p className="olu-lede">{data.closingLine}</p>
        <div className="olu-end-visual">
          <div className="olu-constellation">
            {Array.from({ length: 8 }, (_, i) => <span key={i} aria-hidden="true"><StarMark /></span>)}
            <button type="button" className="olu-star-hit" onClick={() => setStarNote('Filed: the time we got lost on purpose.')} aria-label="A classified star">
              <StarMark />
            </button>
            <button type="button" className="olu-star-hit" onClick={() => setStarNote('Exhibit B: still laughing about it.')} aria-label="Another classified star">
              <StarMark />
            </button>
          </div>
          {starNote && <p className="olu-hand olu-star-note" role="status">{starNote}</p>}
          <div className="olu-end-photos">
            {data.closingPhotos.map(photo => (
              <figure key={photo.src}>
                <button type="button" onClick={() => setLightbox({ src: photo.src, alt: photo.alt })}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </button>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p className="olu-hand">{data.closingNote}</p>
        <button type="button" className={`olu-stamp ${stamped ? 'is-on' : ''}`} onClick={() => setStamped(v => !v)}>
          {stamped ? 'Approved, unofficially' : 'Stamp this file'}
        </button>
        <button type="button" className="olu-secret" onClick={() => setSecret(v => !v)}>
          {secret ? data.secret : 'A classified P.S.'}
        </button>
      </section>

      <footer className="olu-footer">
        <a className="olu-wordmark" href="#olu-top" onClick={event => { event.preventDefault(); scrollTo('olu-top') }}>
          Our little <em>universe</em>
        </a>
        <p>Officially unofficial. Permanently important.</p>
        <nav aria-label="Footer">
          {nav.map(item => (
            <a key={item.href} href={item.href} onClick={event => { event.preventDefault(); scrollTo(item.href.slice(1)) }}>{item.label}</a>
          ))}
        </nav>
        <button type="button" onClick={() => scrollTo('olu-top')}>Back to the beginning</button>
        <small>A little world by Tab & Tale</small>
      </footer>

      {lightbox && (
        <div className="olu-overlay" role="dialog" aria-modal="true" aria-label={lightbox.alt} onMouseDown={event => { if (event.target === event.currentTarget) setLightbox(null) }}>
          <button type="button" className="olu-close" ref={lightboxCloseRef} onClick={() => setLightbox(null)}>Close</button>
          <img src={lightbox.src} alt={lightbox.alt} />
        </div>
      )}
    </main>
  )
}
