import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Menu, X } from 'lucide-react'
import '../styles/yeses.css'
import { anniversaryData, type AnniversaryLetter } from './anniversaryData'

let openingHeartsDone = false

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const nav = [
  { href: '#yeses-top', label: 'The beginning' },
  { href: '#yeses-scenes', label: 'Little scenes' },
  { href: '#yeses-letters', label: 'Open when' },
  { href: '#yeses-chapters', label: 'Our chapters' },
  { href: '#yeses-tomorrow', label: 'Tomorrow' },
]

const heartBits = Array.from({ length: 22 }, (_, i) => ({
  left: `${6 + ((i * 17) % 88)}%`,
  delay: `${(i % 8) * 0.05}s`,
  size: `${10 + (i % 8)}px`,
  hue: i % 3,
}))

function HeartMark() {
  return (
    <svg className="yeses-heart" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20s-7.2-4.6-9.2-9.2C1.4 8 2.8 4.8 6 4.4c1.8-.2 3.4.7 4 2.2.6-1.5 2.2-2.4 4-2.2 3.2.4 4.6 3.6 3.2 6.4C19.2 15.4 12 20 12 20Z" fill="currentColor" />
    </svg>
  )
}

function HeartBurst({ on }: { on: boolean }) {
  if (!on) return null
  return (
    <div className="yeses-hearts" aria-hidden="true">
      {heartBits.map((bit, i) => (
        <i
          key={i}
          className={`yeses-heart-bit yeses-heart-bit-${bit.hue}`}
          style={{ left: bit.left, animationDelay: bit.delay, width: bit.size, height: bit.size } as CSSProperties}
        />
      ))}
    </div>
  )
}

function SparkMark() {
  return (
    <svg className="yeses-spark" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 2 27.2 20.2 44 24 27.2 27.8 24 46 20.8 27.8 4 24 20.8 20.2Z" fill="currentColor" />
    </svg>
  )
}

function PressedFlower() {
  return (
    <svg className="yeses-pressed" viewBox="0 0 90 140" aria-hidden="true">
      <path d="M46 136c-2-34-4-55-2-79" fill="none" stroke="#9eae96" strokeWidth="1.4" />
      <path d="M44 104c-15-14-23-12-27-10 8 13 16 17 27 14M45 119c13-13 22-13 28-10-8 12-17 16-28 14" fill="#a9b59b" stroke="#83917d" strokeWidth=".8" />
      {[0, 60, 120, 180, 240, 300].map(deg => (
        <ellipse key={deg} cx="45" cy="38" rx="8" ry="17" fill="#ead9d2" stroke="#b9858d" strokeWidth=".8" transform={`rotate(${deg} 45 38)`} />
      ))}
      <circle cx="45" cy="38" r="5.5" fill="#c4a05a" />
    </svg>
  )
}

function TeddyMark() {
  return (
    <svg className="yeses-teddy" viewBox="0 0 120 140" aria-hidden="true">
      <circle cx="28" cy="28" r="16" fill="#ead3d0" />
      <circle cx="92" cy="28" r="16" fill="#ead3d0" />
      <circle cx="60" cy="54" r="32" fill="#f3e4dc" />
      <circle cx="48" cy="50" r="4" fill="#3a2418" />
      <circle cx="72" cy="50" r="4" fill="#3a2418" />
      <ellipse cx="60" cy="64" rx="6" ry="4.5" fill="#c58b91" />
      <circle cx="60" cy="104" r="26" fill="#f6cbd4" />
      <circle cx="60" cy="104" r="14" fill="#ead3d0" />
    </svg>
  )
}

function EnvelopeMark({ open = false }: { open?: boolean }) {
  return (
    <svg className={`yeses-envelope-art ${open ? 'is-open' : ''}`} viewBox="0 0 160 110" aria-hidden="true">
      <rect x="8" y="28" width="144" height="74" rx="4" fill="#f7efe4" stroke="#b76d7a" strokeWidth="1.6" />
      <path className="yeses-envelope-flap" d="M8 28 80 75 152 28Z" fill="#f2e4d8" stroke="#b76d7a" strokeWidth="1.3" />
      <path d="M8 32 80 78 152 32" fill="none" stroke="#c58b91" strokeWidth="1.6" />
      <path d="M8 102 64 62" fill="none" stroke="#c58b91" strokeWidth="1.4" />
      <path d="M152 102 96 62" fill="none" stroke="#c58b91" strokeWidth="1.4" />
      <circle className="yeses-envelope-seal" cx="80" cy="58" r="10" fill="#7a3048" />
      <path d="M80 63s-4-2.8-4-5.1c0-1.9 2.4-2.7 4-.5 1.6-2.2 4-.9 4 .8 0 2.3-4 4.8-4 4.8Z" fill="#ead9a0" />
    </svg>
  )
}

function SealMark() {
  return (
    <svg className="yeses-seal" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#7a3048" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="#ead9a0" strokeWidth="1.4" />
      <path d="M32 20c6 0 10 5 10 11 0 11-10 19-10 19s-10-8-10-19c0-6 4-11 10-11Z" fill="#ead9a0" />
    </svg>
  )
}

export function AThousandLittleYeses() {
  const data = anniversaryData
  const [stuck, setStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openLetter, setOpenLetter] = useState<AnniversaryLetter | null>(null)
  const [reminderFlips, setReminderFlips] = useState<Record<string, boolean>>({})
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [secret, setSecret] = useState(false)
  const [sparked, setSparked] = useState(false)
  const [heroMemoryFlipped, setHeroMemoryFlipped] = useState(false)
  const [hearts, setHearts] = useState(false)
  const [extraNote, setExtraNote] = useState(false)
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({})
  const [teddyDelivering, setTeddyDelivering] = useState(false)
  const [teddyEnvelopeOpening, setTeddyEnvelopeOpening] = useState(false)
  const [chapterLetterOpen, setChapterLetterOpen] = useState(false)
  const [teddyEnvelopeOrigin, setTeddyEnvelopeOrigin] = useState({ x: 0, y: 0 })
  const endHeartsDone = useRef(false)
  const heartTimer = useRef(0)
  const teddySequenceActive = useRef(false)
  const teddyTimers = useRef<number[]>([])
  const letterCloseRef = useRef<HTMLButtonElement>(null)
  const lightboxCloseRef = useRef<HTMLButtonElement>(null)
  const chapterLetterCloseRef = useRef<HTMLButtonElement>(null)
  const teddyButtonRef = useRef<HTMLButtonElement>(null)

  const toggleChapter = (label: string) => {
    setExpandedChapters(current => ({ ...current, [label]: !current[label] }))
  }

  const closeChapterSurprise = () => {
    const shouldRestoreFocus = chapterLetterOpen || teddyDelivering
    teddyTimers.current.forEach(timer => window.clearTimeout(timer))
    teddyTimers.current = []
    teddySequenceActive.current = false
    setTeddyDelivering(false)
    setTeddyEnvelopeOpening(false)
    setChapterLetterOpen(false)
    if (shouldRestoreFocus) window.requestAnimationFrame(() => teddyButtonRef.current?.focus())
  }

  const openChapterSurprise = () => {
    if (teddySequenceActive.current || chapterLetterOpen) return
    teddySequenceActive.current = true
    if (prefersReducedMotion()) {
      setChapterLetterOpen(true)
      teddySequenceActive.current = false
      return
    }

    const teddyBounds = teddyButtonRef.current?.getBoundingClientRect()
    if (teddyBounds) setTeddyEnvelopeOrigin({ x: teddyBounds.right - 26, y: teddyBounds.top + teddyBounds.height * .52 })
    setTeddyDelivering(true)
    setTeddyEnvelopeOpening(false)
    const arrival = window.setTimeout(() => {
      setTeddyEnvelopeOpening(true)
      const reveal = window.setTimeout(() => {
        setTeddyDelivering(false)
        setTeddyEnvelopeOpening(false)
        setChapterLetterOpen(true)
        teddySequenceActive.current = false
      }, 420)
      teddyTimers.current.push(reveal)
    }, 720)
    teddyTimers.current.push(arrival)
  }

  const burstHearts = () => {
    if (prefersReducedMotion()) return
    window.clearTimeout(heartTimer.current)
    setHearts(false)
    window.requestAnimationFrame(() => {
      setHearts(true)
      heartTimer.current = window.setTimeout(() => setHearts(false), 1800)
    })
  }

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  useEffect(() => {
    document.title = `A Thousand Little Yeses — ${data.names}`
    const nodes = document.querySelectorAll('.yeses-in')
    if (prefersReducedMotion()) {
      nodes.forEach(node => node.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        if (entry.target.id === 'yeses-end' && !endHeartsDone.current) {
          endHeartsDone.current = true
          burstHearts()
        }
      })
    }, { threshold: 0.14 })
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
    if (prefersReducedMotion() || openingHeartsDone) return
    openingHeartsDone = true
    burstHearts()
    return () => window.clearTimeout(heartTimer.current)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const dots = Array.from(document.querySelectorAll<HTMLElement>('.yeses-trail i'))
    if (!dots.length) return
    const pts = dots.map(() => ({ x: -40, y: -40 }))
    let mx = -40
    let my = -40
    const onMove = (event: MouseEvent) => {
      mx = event.clientX
      my = event.clientY
    }
    let raf = 0
    const tick = () => {
      let x = mx
      let y = my
      pts.forEach((point, i) => {
        point.x += (x - point.x) * 0.22
        point.y += (y - point.y) * 0.22
        dots[i].style.transform = `translate(${point.x - 6}px, ${point.y - 6}px)`
        x = point.x
        y = point.y
      })
      raf = window.requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    raf = window.requestAnimationFrame(tick)
    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const roses = Array.from(document.querySelectorAll<HTMLElement>('.yeses-float'))
    const onScroll = () => {
      roses.forEach((el, i) => {
        const y = (el.getBoundingClientRect().top - window.innerHeight / 2) * (0.04 + i * 0.015)
        el.style.transform = `translateY(${y}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const overlayOpen = Boolean(openLetter) || Boolean(lightbox) || menuOpen || chapterLetterOpen
    document.body.style.overflow = overlayOpen ? 'hidden' : ''
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpenLetter(null)
      setLightbox(null)
      setMenuOpen(false)
      if (chapterLetterOpen || teddyDelivering) closeChapterSurprise()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openLetter, lightbox, menuOpen, chapterLetterOpen, teddyDelivering])

  useEffect(() => {
    if (openLetter) letterCloseRef.current?.focus()
  }, [openLetter])

  useEffect(() => {
    if (lightbox) lightboxCloseRef.current?.focus()
  }, [lightbox])

  useEffect(() => {
    if (chapterLetterOpen) chapterLetterCloseRef.current?.focus()
  }, [chapterLetterOpen])

  useEffect(() => () => teddyTimers.current.forEach(timer => window.clearTimeout(timer)), [])

  const photoButton = (src: string, alt: string, caption?: string, eager = false) => (
    <button type="button" onClick={() => { setLightbox({ src, alt }); burstHearts() }}>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} />
      {caption && <span>{caption}</span>}
    </button>
  )

  return (
    <main className="a-thousand-little-yeses">
      <HeartBurst on={hearts} />
      <div className="yeses-trail" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => <i key={i} />)}
      </div>
      <div className="yeses-drift" aria-hidden="true">
        <span className="yeses-drift-1"><HeartMark /></span>
      </div>
      <a className="yeses-skip" href="#yeses-scenes">Skip to the story</a>

      <header className={`yeses-header ${stuck ? 'is-stuck' : ''} ${menuOpen ? 'is-open' : ''}`}>
        <a className="yeses-wordmark" href="#yeses-top" onClick={event => { event.preventDefault(); scrollTo('yeses-top') }}>
          A thousand <em>little yeses</em>
        </a>
        <span className="yeses-header-mark" aria-hidden="true"><SparkMark /></span>
        <button className="yeses-menu" type="button" aria-expanded={menuOpen} aria-controls="yeses-nav" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <nav id="yeses-nav" className={menuOpen ? 'is-open' : ''} aria-label="Anniversary sections">
          {nav.map(item => (
            <a key={item.href} href={item.href} onClick={event => { event.preventDefault(); scrollTo(item.href.slice(1)) }}>{item.label}</a>
          ))}
          <button type="button" className="yeses-header-cta" onClick={() => scrollTo('yeses-scenes')}>Our story</button>
        </nav>
      </header>

      <section className="yeses-hero" id="yeses-top" aria-labelledby="yeses-hero-title">
        <figure className="yeses-hero-warm yeses-reveal">
          <div className={`yeses-memory-card ${heroMemoryFlipped ? 'is-flipped' : ''}`}>
            <div className="yeses-memory-face yeses-memory-front" aria-hidden={heroMemoryFlipped}>
              <img src={data.heroPhotos.warm.src} alt={data.heroPhotos.warm.alt} loading="eager" />
            </div>
            <div className="yeses-memory-face yeses-memory-back" aria-hidden={!heroMemoryFlipped}>
              <img src="/templates/a-thousand-little-yeses/close-1.jpg" alt="A close, quiet moment with their hands and wedding flowers" loading="lazy" />
            </div>
            <span className="yeses-memory-caption" aria-hidden="true">
              {heroMemoryFlipped ? 'a little more us' : data.heroPhotos.warm.caption}
            </span>
            {heroMemoryFlipped && <span className="yeses-memory-heart" aria-hidden="true"><HeartMark /></span>}
          </div>
          <button
            type="button"
            className="yeses-memory-sticker"
            onClick={() => setHeroMemoryFlipped(value => !value)}
            aria-pressed={heroMemoryFlipped}
            aria-label={heroMemoryFlipped ? 'Show the heart-shaped hands photograph' : 'Reveal a little more us'}
          >
            <span className="yeses-memory-sticker-copy">a little more<br />us</span>
          </button>
        </figure>
        <div className="yeses-hero-copy">
          <p className="yeses-kicker">{data.dedication}</p>
          <h1 id="yeses-hero-title">
            <span className="yeses-hero-line">
              Love lives
              <button type="button" className={`yeses-spark-hit ${sparked ? 'is-on' : ''}`} onClick={() => { setSparked(v => !v); burstHearts() }} aria-label="A little spark">
                <SparkMark />
              </button>
            </span>
            <span>in the little</span>
            <em>yeses.</em>
          </h1>
          {sparked && <p className="yeses-hand yeses-spark-note" role="status">another little yes.</p>}
        </div>
        <figure className="yeses-hero-dinner yeses-reveal">
          {photoButton(data.heroPhotos.dinner.src, data.heroPhotos.dinner.alt, data.heroPhotos.dinner.caption, true)}
        </figure>
        <p className="yeses-lede yeses-hero-lede">{data.openingBody}</p>
        <figure className="yeses-hero-small yeses-reveal">
          {photoButton(data.heroPhotos.small.src, data.heroPhotos.small.alt, data.heroPhotos.small.caption, true)}
        </figure>
        <figure className="yeses-hero-candle yeses-reveal">
          {photoButton(data.heroPhotos.candle.src, data.heroPhotos.candle.alt, data.heroPhotos.candle.caption, true)}
        </figure>
        <p className="yeses-hand yeses-hero-note">for {data.names}</p>
      </section>

      <section className="yeses-scenes yeses-in" id="yeses-scenes">
        <div className="yeses-scenes-heading">
          <p className="yeses-script">Little scenes.</p>
          <h2>Whole worlds.</h2>
        </div>
        <div className="yeses-scene-grid">
          {data.scenes.map((scene, index) => (
            <article className={`yeses-scene yeses-scene-${index}`} key={scene.label}>
              <figure>
                {photoButton(scene.image, scene.title)}
              </figure>
              <h3>{scene.title === scene.label ? scene.label : `${scene.label} ${scene.title}`}</h3>
              <p>{scene.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="yeses-letters yeses-in" id="yeses-letters">
        <div className="yeses-letters-heading">
          <p className="yeses-script">Open when</p>
          <h2>You need a reminder.</h2>
        </div>
        <div className="yeses-letter-row">
          {data.letters.map((letter, index) => (
            <article
              className={`yeses-keep yeses-keep-${index} ${openLetter?.id === letter.id ? 'is-selected' : ''}`}
              key={letter.id}
            >
              <span className="yeses-ribbon" aria-hidden="true" />
              <button
                type="button"
                className={`yeses-reminder-photo ${reminderFlips[letter.id] ? 'is-flipped' : ''}`}
                onClick={() => setReminderFlips(current => ({ ...current, [letter.id]: !current[letter.id] }))}
                aria-pressed={Boolean(reminderFlips[letter.id])}
                aria-label={reminderFlips[letter.id] ? `Show photograph for ${letter.title}` : `Reveal reminder: ${letter.reminder}`}
              >
                <span className="yeses-reminder-turn">
                  <span className="yeses-reminder-face yeses-reminder-front" aria-hidden={Boolean(reminderFlips[letter.id])}>
                    <img src={letter.image} alt="" loading="lazy" />
                  </span>
                  <span className="yeses-reminder-face yeses-reminder-back" aria-hidden={!reminderFlips[letter.id]}>
                    <span>{letter.reminder}</span>
                  </span>
                </span>
                {reminderFlips[letter.id] && <span className="yeses-reminder-heart" aria-hidden="true"><HeartMark /></span>}
              </button>
              <b>{letter.number}</b>
              <button
                type="button"
                className="yeses-letter-open"
                aria-expanded={openLetter?.id === letter.id}
                onClick={() => { setOpenLetter(letter); burstHearts() }}
              >
                <strong>{letter.title}</strong>
                <small>{letter.teaser}</small>
              </button>
            </article>
          ))}
        </div>
        <div className="yeses-letter-keep">
          <button type="button" className={`yeses-more ${extraNote ? 'is-open' : ''}`} onClick={() => { setExtraNote(v => !v); burstHearts() }} aria-expanded={extraNote}>
            <EnvelopeMark open={extraNote} />
            <span>{extraNote ? 'One more thing: I would say yes again tomorrow.' : 'One more thing'}</span>
          </button>
          <p className="yeses-hand">keep these somewhere safe</p>
        </div>
      </section>

      {openLetter && (
        <div className="yeses-overlay" role="dialog" aria-modal="true" aria-labelledby="yeses-letter-title" onMouseDown={event => { if (event.target === event.currentTarget) setOpenLetter(null) }}>
          <article className="yeses-letter-paper">
            <button className="yeses-close" type="button" ref={letterCloseRef} onClick={() => setOpenLetter(null)}>Close</button>
            <p className="yeses-kicker">{openLetter.number}</p>
            <h3 id="yeses-letter-title">{openLetter.title}</h3>
            <p>{openLetter.body}</p>
            <p className="yeses-hand">{openLetter.annotation}</p>
            <p className="yeses-hand yeses-sign">Always, {data.names.split(' & ')[0]}</p>
            <SealMark />
          </article>
        </div>
      )}

      <section className="yeses-chapters yeses-in" id="yeses-chapters">
        <div className="yeses-chapters-copy">
          <p className="yeses-kicker">Our chapters</p>
          <h2 className="yeses-script">Every chapter led me here.</h2>
          <p className="yeses-lede">{data.since}.</p>
        </div>
        <ol className="yeses-timeline">
          {data.chapters.map((chapter, index) => (
            <li key={chapter.label} className={expandedChapters[chapter.label] ? 'is-expanded' : ''}>
              <figure className={`yeses-chapter-photo yeses-chapter-photo-${index}`}>
                {photoButton(chapter.image, chapter.title)}
                <span className="yeses-chapter-photo-heart" aria-hidden="true">♥</span>
              </figure>
              <div className="yeses-chapter-copy">
                <p className="yeses-kicker">{chapter.label}</p>
                <p className="yeses-date">{chapter.date}</p>
                <h3>{chapter.title}</h3>
                <p>{chapter.text}</p>
                <button
                  type="button"
                  className="yeses-chapter-toggle"
                  aria-expanded={Boolean(expandedChapters[chapter.label])}
                  aria-controls={`chapter-detail-${index}`}
                  onClick={() => toggleChapter(chapter.label)}
                >
                  {expandedChapters[chapter.label] ? 'Tuck this detail away' : 'Keep one more detail'}
                </button>
                <p id={`chapter-detail-${index}`} className="yeses-chapter-detail" hidden={!expandedChapters[chapter.label]}>
                  {chapter.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <button
          type="button"
          ref={teddyButtonRef}
          className={`yeses-float yeses-keepsake yeses-keepsake-teddy ${teddyDelivering ? 'is-delivering' : ''}`}
          onClick={openChapterSurprise}
          aria-label="Open a little something for you"
          aria-expanded={chapterLetterOpen || teddyDelivering}
          aria-haspopup="dialog"
          aria-controls="yeses-chapter-letter"
        >
          <TeddyMark />
          <span className="yeses-hand">a little something for you</span>
          {teddyDelivering && <span className="yeses-teddy-carry"><EnvelopeMark /></span>}
        </button>
        {teddyDelivering && (
          <div
            className={`yeses-chapter-envelope-flight ${teddyEnvelopeOpening ? 'is-opening' : ''}`}
            style={{ left: `${teddyEnvelopeOrigin.x}px`, top: `${teddyEnvelopeOrigin.y}px` }}
            aria-hidden="true"
          >
            <EnvelopeMark open={teddyEnvelopeOpening} />
          </div>
        )}
        <div className="yeses-float yeses-keepsake yeses-keepsake-flower" aria-hidden="true"><PressedFlower /></div>
        <span className="yeses-star" aria-hidden="true"><SparkMark /></span>
      </section>

      {chapterLetterOpen && (
        <div
          className="yeses-chapter-surprise"
          role="dialog"
          aria-modal="true"
          aria-labelledby="yeses-chapter-letter-title"
          onMouseDown={event => { if (event.target === event.currentTarget) closeChapterSurprise() }}
        >
          <article className="yeses-chapter-letter" id="yeses-chapter-letter">
            <button className="yeses-chapter-letter-close" type="button" ref={chapterLetterCloseRef} onClick={closeChapterSurprise} aria-label="Close the letter">Close</button>
            <p className="yeses-kicker">A little something for you</p>
            <h2 id="yeses-chapter-letter-title">A note for us</h2>
            <p className="yeses-chapter-letter-message">{data.chapterSurprise}</p>
            <HeartMark />
          </article>
        </div>
      )}

      <section className="yeses-tomorrow yeses-in" id="yeses-tomorrow">
        <SparkMark />
        <h2 className="yeses-script">{data.tomorrowLine}</h2>
        <p>{data.tomorrowBody}</p>
      </section>

      <section className="yeses-end yeses-in" id="yeses-end">
        <p className="yeses-kicker">{data.closingKicker}</p>
        <h2>And I hope this one <em>keeps going.</em></h2>
        <div className="yeses-end-collage">
          {data.closingPhotos.map(photo => (
            <figure key={photo.src}>
              {photoButton(photo.src, photo.alt, photo.caption)}
            </figure>
          ))}
        </div>
        <p className="yeses-hand">{data.closingNote}</p>
          <button type="button" className="yeses-secret" onClick={() => { setSecret(v => !v); burstHearts() }}>
          {secret ? data.secret : 'A note, if you want it'}
        </button>
      </section>

      <footer className="yeses-footer">
        <a className="yeses-wordmark" href="#yeses-top" onClick={event => { event.preventDefault(); scrollTo('yeses-top') }}>
          A thousand <em>little yeses</em>
        </a>
        <p>For all the little moments, and all the ones still to come.</p>
        <nav aria-label="Footer">
          {nav.map(item => (
            <a key={item.href} href={item.href} onClick={event => { event.preventDefault(); scrollTo(item.href.slice(1)) }}>{item.label}</a>
          ))}
        </nav>
        <button type="button" onClick={() => scrollTo('yeses-top')}>Back to the beginning</button>
        <small>A little world by Tab & Tale</small>
      </footer>

      {lightbox && (
        <div className="yeses-overlay yeses-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.alt} onMouseDown={event => { if (event.target === event.currentTarget) setLightbox(null) }}>
          <button type="button" className="yeses-close yeses-lightbox-close" ref={lightboxCloseRef} onClick={() => setLightbox(null)}>Close</button>
          <img src={lightbox.src} alt={lightbox.alt} />
        </div>
      )}
    </main>
  )
}
