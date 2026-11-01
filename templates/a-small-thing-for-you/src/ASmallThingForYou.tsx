import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Menu, X } from 'lucide-react'
import '../styles/smallthing.css'
import { carePackageData, type CareAward, type CareGift } from './carePackageData'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const nav = [
  { href: '#st-top', label: 'The beginning' },
  { href: '#st-gifts', label: 'Good things' },
  { href: '#st-awards', label: 'Little reminders' },
  { href: '#st-note', label: 'A note for you' },
]

const jarNotes = [
  'Drink some water.',
  'You are allowed to rest.',
  'A slow evening still counts.',
  'You do not have to earn this.',
  'Keep the kind thought.',
]
const complimentMessages = [
  'A tiny compliment, in case you needed one: you make rooms kinder.',
  ...jarNotes,
]

function EnvelopeMark() {
  return (
    <svg className="st-envelope" viewBox="0 0 120 86" aria-hidden="true">
      <rect x="6" y="18" width="108" height="62" rx="4" fill="#f7f1e8" stroke="#8a7360" strokeWidth="1.6" />
      <path d="M6 22 60 58 114 22" fill="none" stroke="#c4785a" strokeWidth="1.6" />
    </svg>
  )
}

function JarMark() {
  return (
    <svg className="st-jar" viewBox="0 0 72 96" aria-hidden="true">
      <rect x="18" y="6" width="36" height="12" rx="3" fill="#cbb9a8" stroke="#4a372c" strokeWidth="1.6" />
      <path d="M16 22h40l-4 66H20Z" fill="#f4eee4" stroke="#4a372c" strokeWidth="1.6" />
      <path d="M24 40h24M22 54h28M26 68h20" stroke="#c4785a" strokeWidth="1.4" />
    </svg>
  )
}

function LeafMark() {
  return (
    <svg className="st-leaf" viewBox="0 0 36 48" aria-hidden="true">
      <path d="M18 46C18 28 4 24 8 8c12-2 22 10 20 24-6 4-10 6-10 14Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M18 44C16 28 14 18 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function ASmallThingForYou() {
  const data = carePackageData
  const [stuck, setStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openGift, setOpenGift] = useState<CareGift | null>(null)
  const [openAwards, setOpenAwards] = useState<Record<string, boolean>>({
    ...(data.awards[0] ? { [data.awards[0].id]: true } : {}),
  })
  const [reassurance, setReassurance] = useState(false)
  const [secret, setSecret] = useState(false)
  const [envelope, setEnvelope] = useState(false)
  const [jarNote, setJarNote] = useState<string | null>(null)
  const [complimentIndex, setComplimentIndex] = useState(0)
  const [petals, setPetals] = useState(false)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const giftCloseRef = useRef<HTMLButtonElement>(null)
  const lightboxCloseRef = useRef<HTMLButtonElement>(null)

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  useEffect(() => {
    document.title = `A Small Thing for You — for ${data.recipient}`
    const nodes = document.querySelectorAll('.st-in')
    if (prefersReducedMotion()) {
      nodes.forEach(node => node.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        if (entry.target.id === 'st-end') setPetals(true)
      })
    }, { threshold: 0.14 })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [data.recipient])

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const overlayOpen = Boolean(openGift) || Boolean(lightbox) || menuOpen
    document.body.style.overflow = overlayOpen ? 'hidden' : ''
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpenGift(null)
      setLightbox(null)
      setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openGift, lightbox, menuOpen])

  useEffect(() => {
    if (openGift) giftCloseRef.current?.focus()
  }, [openGift])

  useEffect(() => {
    if (lightbox) lightboxCloseRef.current?.focus()
  }, [lightbox])

  return (
    <main className="a-small-thing-for-you">
      <div className={`st-petals ${petals ? 'is-on' : ''}`} aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <i key={i} className={`st-petal st-petal-${i % 3}`} style={{ '--st-x': `${8 + i * 9}%`, '--st-delay': `${i * 0.4}s` } as CSSProperties} />
        ))}
        <i className="st-paper-bit st-paper-0" />
        <i className="st-paper-bit st-paper-1" />
        <span className="st-leaf-float st-leaf-float-0"><LeafMark /></span>
        <span className="st-leaf-float st-leaf-float-1"><LeafMark /></span>
      </div>
      <a className="st-skip" href="#st-gifts">Skip to the good things</a>

      <header className={`st-header ${stuck ? 'is-stuck' : ''} ${menuOpen ? 'is-open' : ''}`}>
        <a className="st-wordmark" href="#st-top" onClick={event => { event.preventDefault(); scrollTo('st-top') }}>
          A small thing <em>for you</em>
        </a>
        <span className="st-header-mark" aria-hidden="true"><LeafMark /></span>
        <button className="st-menu" type="button" aria-expanded={menuOpen} aria-controls="st-nav" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <nav id="st-nav" className={menuOpen ? 'is-open' : ''} aria-label="Care package sections">
          {nav.map(item => (
            <a key={item.href} href={item.href} onClick={event => { event.preventDefault(); scrollTo(item.href.slice(1)) }}>{item.label}</a>
          ))}
          <button type="button" className="st-header-cta" onClick={() => scrollTo('st-gifts')}>A little something</button>
        </nav>
      </header>

      <section className="st-hero" id="st-top" aria-labelledby="st-hero-title">
        <div className="st-hero-copy">
          <p className="st-kicker st-hero-kicker">
            {data.kicker.map(line => <span key={line}>{line}</span>)}
          </p>
          <h1 id="st-hero-title">{data.heading}</h1>
          <p className="st-lede">{data.lede}</p>
          <button type="button" className="st-cta" onClick={() => scrollTo('st-gifts')}>Open your little something</button>
          <div className="st-compliment" role="group" aria-label="A little reminder">
            <div className="st-compliment-note">
              <span key={complimentIndex} className="st-compliment-heart" aria-hidden="true">♥</span>
              <p key={`compliment-${complimentIndex}`} className="st-compliment-message" aria-live="polite" aria-atomic="true">
                {complimentMessages[complimentIndex]}
              </p>
            </div>
            <button
              type="button"
              className="st-compliment-next"
              onClick={() => setComplimentIndex(index => (index + 1) % complimentMessages.length)}
            >
              Another little reminder <span aria-hidden="true">↻</span>
            </button>
          </div>
        </div>
        <figure className="st-hero-visual">
          <img src="/templates/a-small-thing-for-you/close-tea.jpg" alt="Hands sharing a warm coffee together" loading="eager" />
        </figure>
        <div className="st-surprises">
          <button type="button" className="st-envelope-hit" onClick={() => setEnvelope(v => !v)} aria-expanded={envelope}>
            <EnvelopeMark />
            <span className="st-object-title">A folded compliment</span>
            <small>{envelope ? 'You have this way of making ordinary days feel looked-after.' : 'Open for a personal note'}</small>
          </button>
          <button
            type="button"
            className="st-jar-hit"
            onClick={() => setJarNote(jarNotes[Math.floor(Math.random() * jarNotes.length)])}
            aria-expanded={Boolean(jarNote)}
          >
            <JarMark />
            <span className="st-object-title">A little bottle of reminders</span>
            <small aria-live="polite">{jarNote ?? 'Open to find what you need'}</small>
          </button>
        </div>
      </section>

      <section className="st-gifts st-in" id="st-gifts">
        <h2>
          A few good things,
          <em> tucked away.</em>
        </h2>
        <div className="st-gift-grid">
          {data.gifts.map(gift => (
            <article className="st-gift" key={gift.id}>
              <button type="button" className="st-gift-photo" onClick={() => setLightbox({ src: gift.image, alt: gift.imageAlt })}>
                <img src={gift.image} alt={gift.imageAlt} />
              </button>
              <p className="st-kicker">{gift.label}</p>
              <h3>{gift.title}</h3>
              <p>{gift.text}</p>
              <button type="button" className="st-gift-open" onClick={() => { setOpenGift(gift); setPetals(true) }}>
                Open this little gift
              </button>
            </article>
          ))}
        </div>
      </section>

      {openGift && (
        <div className="st-overlay" role="dialog" aria-modal="true" aria-labelledby="st-gift-title" onMouseDown={event => { if (event.target === event.currentTarget) setOpenGift(null) }}>
          <article className="st-paper">
            <button className="st-close" type="button" ref={giftCloseRef} onClick={() => setOpenGift(null)}>Close</button>
            <p className="st-kicker">{openGift.label}</p>
            <h3 id="st-gift-title">{openGift.title}</h3>
            <img src={openGift.image} alt="" />
            <p>{openGift.text}</p>
            <p className="st-hand">{openGift.extra}</p>
          </article>
        </div>
      )}

      <section className="st-awards st-in" id="st-awards">
        <h2>
          Some things
          <em> are simply true.</em>
        </h2>
        <p className="st-award-instruction">Go on, tap an award. There's more.</p>
        <div className="st-award-row">
          {data.awards.map((award: CareAward) => {
            const open = Boolean(openAwards[award.id])
            return (
              <button
                type="button"
                className={`st-award ${open ? 'is-open' : ''}`}
                key={award.id}
                aria-expanded={open}
                onClick={() => setOpenAwards(current => ({ ...current, [award.id]: !current[award.id] }))}
              >
                <span className="st-kicker">{award.label}</span>
                <strong>{award.title}</strong>
                <small>{award.official}</small>
                {open && <p className="st-hand st-award-extra">{award.extra}</p>}
                <span className="st-award-prompt">{open ? 'A little truth about you ♥' : 'TAP TO REVEAL ↗'}</span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="st-note st-in" id="st-note">
        <div className="st-note-layout">
          <div className="st-note-copy">
            <h2>
              <span>{data.reminderTitle[0]}</span>
              <em>{data.reminderTitle[1]}</em>
            </h2>
            <p className="st-lede">{data.reminderBody}</p>
          </div>
          <div className={`st-reassurance-keepsake ${reassurance ? 'is-open' : ''}`}>
            <button
              type="button"
              className="st-keepsake-trigger"
              onClick={() => setReassurance(value => !value)}
              aria-expanded={reassurance}
              aria-controls="st-reassurance-letter"
            >
              <EnvelopeMark />
              <span>{reassurance ? 'Tuck this note away' : 'keep this close'}</span>
            </button>
            <div
              id="st-reassurance-letter"
              className="st-keepsake-letter"
              hidden={!reassurance}
              aria-live="polite"
            >
              <p className="st-hand">{data.reminderNote}</p>
              <span className="st-keepsake-heart" aria-hidden="true">♥</span>
            </div>
          </div>
        </div>
      </section>

      <section className="st-end st-in" id="st-end">
        <h2>{data.closingHeading}</h2>
        <p className="st-lede">{data.closingBody}</p>
        <div className="st-end-collage">
          {data.closingPhotos.map(photo => (
            <figure key={photo.src}>
              <button type="button" onClick={() => setLightbox({ src: photo.src, alt: photo.alt })}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </button>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className="st-hand">{data.closingNote}</p>
        <button type="button" className="st-quiet" onClick={() => setSecret(v => !v)}>
          {secret ? data.secret : 'One last folded note'}
        </button>
      </section>

      <footer className="st-footer">
        <a className="st-wordmark" href="#st-top" onClick={event => { event.preventDefault(); scrollTo('st-top') }}>
          A small thing <em>for you</em>
        </a>
        <p>A little reminder that you matter.</p>
        <nav aria-label="Footer">
          {nav.map(item => (
            <a key={item.href} href={item.href} onClick={event => { event.preventDefault(); scrollTo(item.href.slice(1)) }}>{item.label}</a>
          ))}
        </nav>
        <button type="button" onClick={() => scrollTo('st-top')}>Back to the beginning</button>
        <small>A little world by Tab & Tale</small>
      </footer>

      {lightbox && (
        <div className="st-overlay st-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.alt} onMouseDown={event => { if (event.target === event.currentTarget) setLightbox(null) }}>
          <button type="button" className="st-close st-lightbox-close" ref={lightboxCloseRef} onClick={() => setLightbox(null)}>Close</button>
          <img src={lightbox.src} alt={lightbox.alt} />
        </div>
      )}
    </main>
  )
}
