import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { Menu, Pause, Play, X } from 'lucide-react'
import '../styles/all-your-eras.css'
import { birthdayData, type VoiceNote } from './birthdayData'

let openingBurstDone = false

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type CannonBit = {
  side: 'left' | 'right'
  delay: string
  duration: string
  kind: number
  spread: string
  lift: string
  size: string
}

const cannonBits: CannonBit[] = [
  ...Array.from({ length: 28 }, (_, i) => ({
    side: 'left' as const,
    delay: `${(i % 10) * 0.035}s`,
    duration: `${1.45 + (i % 7) * 0.12}s`,
    kind: i % 5,
    spread: `${16 + ((i * 19) % 56)}vw`,
    lift: `${12 + ((i * 13) % 30)}vh`,
    size: `${6 + (i % 7)}px`,
  })),
  ...Array.from({ length: 28 }, (_, i) => ({
    side: 'right' as const,
    delay: `${(i % 10) * 0.035}s`,
    duration: `${1.45 + (i % 7) * 0.12}s`,
    kind: i % 5,
    spread: `${16 + ((i * 23) % 56)}vw`,
    lift: `${12 + ((i * 17) % 30)}vh`,
    size: `${6 + (i % 7)}px`,
  })),
]

const nav = [
  { href: '#aye-legend', label: 'The beginning' },
  { href: '#aye-eras', label: 'The eras' },
  { href: '#aye-messages', label: 'The love notes' },
  { href: '#aye-letter', label: 'The letter' },
  { href: '#aye-end', label: 'The memories' },
]

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return null
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

function ConfettiCannons({ on }: { on: boolean }) {
  if (!on) return null
  return (
    <div className="aye-confetti" aria-hidden="true">
      {cannonBits.map((bit, i) => (
        <i
          key={`${bit.side}-${i}`}
          className={`aye-confetti-bit aye-confetti-${bit.kind} aye-cannon-${bit.side}`}
          style={{
            '--aye-delay': bit.delay,
            '--aye-dur': bit.duration,
            '--aye-spread': bit.spread,
            '--aye-lift': bit.lift,
            width: bit.size,
            height: bit.kind === 1 ? `${parseInt(bit.size, 10) + 8}px` : bit.size,
          } as CSSProperties}
        />
      ))}
    </div>
  )
}

function BowMark() {
  return (
    <svg className="aye-bow" viewBox="0 0 36 28" aria-hidden="true">
      <path d="M18 14 4 6c6-8 14 1 14 8Z" fill="#b76d85" />
      <path d="M18 14 32 6c-6-8-14 1-14 8Z" fill="#efc4d2" />
      <circle cx="18" cy="15" r="3.2" fill="#ead9a0" />
    </svg>
  )
}

function SparkMark() {
  return (
    <svg className="aye-spark" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 2 27 19 44 24 27 29 24 46 21 29 4 24 21 19Z" fill="currentColor" />
    </svg>
  )
}

function CakeMark({ blown }: { blown: boolean }) {
  return (
    <svg className={`aye-cake ${blown ? 'is-blown' : ''}`} viewBox="0 0 240 320" aria-hidden="true">
      <defs>
        <linearGradient id="aye-cake-cream" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#fffdf8" />
          <stop offset=".68" stopColor="#f7ece0" />
          <stop offset="1" stopColor="#e5cbbd" />
        </linearGradient>
        <linearGradient id="aye-cake-pink" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#f6d5dc" />
          <stop offset=".62" stopColor="#e8b3c1" />
          <stop offset="1" stopColor="#cb8799" />
        </linearGradient>
        <linearGradient id="aye-cake-sage" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#dce3ce" />
          <stop offset=".7" stopColor="#c5d2b8" />
          <stop offset="1" stopColor="#a0b08e" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="287" rx="91" ry="13" fill="#5a3b42" opacity=".12" />
      {[82, 107, 132, 157].map((x, i) => (
        <g key={x}>
          <rect x={x} y="48" width="6" height="42" rx="3" fill={['#d99bab', '#e6c982', '#a9b99e', '#d99bab'][i]} />
          <path d={`M${x + 1} 58h4`} stroke="#fff8ed" strokeWidth="1.5" opacity=".8" />
          <path className={`aye-flame ${blown ? 'is-out' : ''}`} d={`M${x + 3} 45c-11-8 1-19 3-26 8 11 9 20-3 26Z`} fill="#f4c66b" stroke="#e89a68" strokeWidth="1.5" />
          <ellipse className={`aye-flame-core ${blown ? 'is-out' : ''}`} cx={x + 3} cy="42" rx="2" ry="3.5" fill="#fff0bb" />
          {blown && <ellipse className="aye-smoke" cx={x + 3} cy="27" rx="4" ry="8" fill="#d8cfc6" />}
        </g>
      ))}
      <path d="M63 111c0-19 114-19 114 0v39H63Z" fill="url(#aye-cake-cream)" stroke="#d9b9a9" strokeWidth="2" />
      <path d="M63 111c0-19 114-19 114 0 0 10-12 13-19 5-7 15-20 14-25 2-9 14-21 13-27 1-10 13-23 12-28 1-7 9-15 7-15-9Z" fill="url(#aye-cake-pink)" stroke="#d9b9a9" strokeWidth="1.6" />
      <path d="M45 158c0-18 150-18 150 0v77H45Z" fill="url(#aye-cake-cream)" stroke="#d9b9a9" strokeWidth="2" />
      <path d="M45 158c0-18 150-18 150 0 0 11-12 14-20 5-8 16-23 15-28 2-10 16-24 15-31 2-10 14-24 13-31 1-9 11-21 7-21-10Z" fill="url(#aye-cake-sage)" stroke="#d9b9a9" strokeWidth="1.6" />
      <path d="M45 235h150v14c0 14-150 14-150 0Z" fill="url(#aye-cake-pink)" stroke="#d9b9a9" strokeWidth="2" />
      <path d="M70 172c8-5 13-5 20 0m59 0c8-5 13-5 20 0" fill="none" stroke="#fff8ef" strokeWidth="2" strokeLinecap="round" />
      {[67, 91, 115, 139, 163, 183].map((x, i) => <circle key={x} cx={x} cy={i % 2 ? 222 : 218} r="2.5" fill={i % 2 ? '#d99bab' : '#dfc786'} />)}
      {[76, 100, 124, 148, 172].map(x => <circle key={x} cx={x} cy="131" r="2.2" fill="#fff8ef" opacity=".9" />)}
      <path d="M55 194c18 8 34 8 50 0m30 0c17 8 33 8 50 0" fill="none" stroke="#fffdf7" strokeWidth="2" strokeLinecap="round" opacity=".55" />
      <path d="M89 270c13-12 25-12 31 0 7-12 20-12 31 0" fill="none" stroke="#fff9ef" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function GiftMark({ open = false }: { open?: boolean }) {
  return (
    <svg className={`aye-gift-art ${open ? 'is-open' : ''}`} viewBox="0 0 140 120" aria-hidden="true">
      <path d="M20 35 70 12l50 23-5 68-45 12-45-12Z" fill="#f9eee0" stroke="#b9947f" strokeWidth="1.6" />
      <path d="m25 39 45 21 45-21M70 60v50" fill="none" stroke="#d4b19d" strokeWidth="1.3" />
      <path d="m25 39 45 21 45-21" fill="#fff8ef" stroke="#b9947f" strokeWidth="1.4" />
      <path d="M69 59c-12-19-30-15-26-5 3 8 18 8 27 5Zm2 0c12-19 30-15 26-5-3 8-18 8-27 5Z" fill="#ba7686" stroke="#9e5e70" strokeWidth="1.4" />
      <path d="M69 61 58 90l12 8 1-37 2 37 12-8-12-29" fill="#d8b768" stroke="#b89a57" strokeWidth="1.2" />
      <g className="aye-gift-lid">
        <path d="M25 39 70 19l45 20-45 21Z" fill="#fff8ef" stroke="#b9947f" strokeWidth="1.4" />
      </g>
      <circle cx="70" cy="60" r="8" fill="#8c4859" stroke="#f3dfc9" strokeWidth="2" />
      <path d="m70 55 1.5 3.2 3.5.4-2.5 2.4.6 3.4-3.1-1.7-3.1 1.7.6-3.4-2.5-2.4 3.5-.4Z" fill="#f4dfb0" />
    </svg>
  )
}

function MedalMark() {
  return (
    <svg className="aye-medal" viewBox="0 0 180 210" aria-hidden="true">
      <path d="M54 8 90 82 18 56Z" fill="#b76d85" />
      <path d="M126 8 90 82 162 56Z" fill="#ead9a0" />
      <circle cx="90" cy="128" r="58" fill="#fff9f3" stroke="#2b1622" strokeWidth="3" />
      <circle cx="90" cy="128" r="44" fill="none" stroke="#b76d85" strokeWidth="2.2" />
      <path d="M90 102c9 0 16 7 16 16 0 18-16 32-16 32s-16-14-16-32c0-9 7-16 16-16Z" fill="#b76d85" />
    </svg>
  )
}

function SealMark() {
  return (
    <svg className="aye-seal" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="34" fill="#7a3048" />
      <circle cx="36" cy="36" r="26" fill="none" stroke="#ead9a0" strokeWidth="1.6" />
      <path d="M36 22c6 0 10 5 10 11 0 12-10 21-10 21s-10-9-10-21c0-6 4-11 10-11Z" fill="#ead9a0" />
    </svg>
  )
}

function VoiceCard({ note }: { note: VoiceNote }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(note.durationLabel)
  const hasAudio = Boolean(note.audioSrc)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
    const onEnded = () => { setPlaying(false); setProgress(0) }
    const onMeta = () => {
      const formatted = formatDuration(audio.duration)
      if (formatted) setDuration(formatted)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('loadedmetadata', onMeta)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('loadedmetadata', onMeta)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || !hasAudio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  return (
    <article className="aye-voice-card">
      <img src={note.image} alt="" className="aye-voice-avatar" />
      <div>
        <p className="aye-kicker">{note.sender}</p>
        <p className="aye-voice-caption">{note.caption}</p>
        {hasAudio && <audio ref={audioRef} src={note.audioSrc} preload="metadata" />}
        <div className="aye-voice-wave" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <b key={i} className={playing ? 'is-playing' : ''} style={{ '--aye-h': `${7 + ((i * 9) % 18)}px` } as CSSProperties} />
          ))}
        </div>
        <div className="aye-voice-progress" aria-hidden="true">
          <span style={{ width: `${hasAudio ? progress * 100 : 18}%` }} />
        </div>
        <div className="aye-voice-row">
          <button
            type="button"
            onClick={toggle}
            disabled={!hasAudio}
            aria-label={hasAudio ? (playing ? `Pause voice note from ${note.sender}` : `Play voice note from ${note.sender}`) : `Sample voice note from ${note.sender}, audio not added yet`}
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
            {hasAudio ? (playing ? 'Pause' : 'Listen') : 'Awaiting audio'}
          </button>
          <span>{duration}</span>
        </div>
      </div>
    </article>
  )
}

export default function AllYourEras() {
  const data = birthdayData
  const [confetti, setConfetti] = useState(false)
  const [stuck, setStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [awardOpen, setAwardOpen] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const [openNote, setOpenNote] = useState<string | null>(data.messages[0]?.id ?? null)
  const [secret, setSecret] = useState(false)
  const [stickerPeeled, setStickerPeeled] = useState(false)
  const [stickerPeeling, setStickerPeeling] = useState(false)
  const [mainPhotoFlipped, setMainPhotoFlipped] = useState(false)
  const [topRightPhotoFlipped, setTopRightPhotoFlipped] = useState(false)
  const [bottomRightPhotoFlipped, setBottomRightPhotoFlipped] = useState(false)
  const [blown, setBlown] = useState(false)
  const [giftOpen, setGiftOpen] = useState(false)
  const [wish, setWish] = useState(false)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const endBurstDone = useRef(false)
  const confettiTimer = useRef(0)
  const letterCloseRef = useRef<HTMLButtonElement>(null)
  const lightboxCloseRef = useRef<HTMLButtonElement>(null)
  const giftCloseRef = useRef<HTMLButtonElement>(null)
  const stickerTimer = useRef(0)
  const stickerInteractionStarted = useRef(false)
  const photoFlipSequenceStarted = useRef(false)
  const photoFlipTimers = useRef<number[]>([])
  const stickerPointerStart = useRef<{ x: number; y: number } | null>(null)

  const burstConfetti = () => {
    if (prefersReducedMotion()) return
    window.clearTimeout(confettiTimer.current)
    setConfetti(false)
    window.requestAnimationFrame(() => {
      setConfetti(true)
      confettiTimer.current = window.setTimeout(() => setConfetti(false), 2300)
    })
  }

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  const startParty = () => {
    burstConfetti()
    scrollTo('aye-legend')
  }

  const revealAward = () => {
    setAwardOpen(true)
    burstConfetti()
  }

  const onLetterKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setLetterOpen(true)
    }
  }

  useEffect(() => {
    document.title = `All Your Eras — Happy Birthday ${data.name}`
    const nodes = document.querySelectorAll('.aye-in')
    if (prefersReducedMotion()) {
      nodes.forEach(node => node.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        if (entry.target.id === 'aye-end' && !endBurstDone.current) {
          endBurstDone.current = true
          burstConfetti()
        }
      })
    }, { threshold: 0.16 })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [data.name])

  useEffect(() => {
    if (prefersReducedMotion() || openingBurstDone) return
    const start = window.setTimeout(() => {
      openingBurstDone = true
      burstConfetti()
    }, 80)
    return () => {
      window.clearTimeout(start)
      window.clearTimeout(confettiTimer.current)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const overlayOpen = letterOpen || Boolean(lightbox) || menuOpen || giftOpen
    document.body.style.overflow = overlayOpen ? 'hidden' : ''
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setLetterOpen(false)
      setLightbox(null)
      setMenuOpen(false)
      setGiftOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [letterOpen, lightbox, menuOpen, giftOpen])

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const show = window.setTimeout(() => setWish(true), reduced ? 0 : 2400)
    const hide = reduced ? 0 : window.setTimeout(() => setWish(false), 14000)
    return () => {
      window.clearTimeout(show)
      if (hide) window.clearTimeout(hide)
    }
  }, [])

  useEffect(() => {
    if (letterOpen) {
      burstConfetti()
      letterCloseRef.current?.focus()
    }
  }, [letterOpen])

  useEffect(() => {
    if (lightbox) lightboxCloseRef.current?.focus()
  }, [lightbox])

  useEffect(() => {
    if (giftOpen) giftCloseRef.current?.focus()
  }, [giftOpen])

  useEffect(() => () => {
    window.clearTimeout(stickerTimer.current)
    photoFlipTimers.current.forEach(timer => window.clearTimeout(timer))
  }, [])

  const startPhotoFlipSequence = () => {
    if (photoFlipSequenceStarted.current) return
    photoFlipSequenceStarted.current = true

    const flipDuration = prefersReducedMotion() ? 0 : 720
    const pause = prefersReducedMotion() ? 350 : 400
    const schedule = (callback: () => void, delay: number) => {
      photoFlipTimers.current.push(window.setTimeout(callback, delay))
    }

    schedule(() => {
      setMainPhotoFlipped(true)
      schedule(() => {
        setTopRightPhotoFlipped(true)
        schedule(() => setBottomRightPhotoFlipped(true), flipDuration + pause)
      }, flipDuration + pause)
    }, 0)
  }

  const peelSticker = () => {
    if (stickerInteractionStarted.current || stickerPeeled || stickerPeeling) return
    stickerInteractionStarted.current = true
    if (prefersReducedMotion()) {
      setStickerPeeled(true)
      startPhotoFlipSequence()
      return
    }
    setStickerPeeling(true)
    stickerTimer.current = window.setTimeout(() => {
      setStickerPeeled(true)
      setStickerPeeling(false)
      startPhotoFlipSequence()
    }, 520)
  }

  const renderCollagePhoto = (
    index: number,
    className: string,
    flipped: boolean,
    isMain = false,
  ) => {
    const original = data.collageFront[index]
    const alternate = data.collageBack[index]
    const activePhoto = flipped ? alternate : original

    return (
      <figure className={`aye-profile-photo ${className}`} key={original.src}>
        <div className="aye-profile-photo-control">
          <span className={`aye-profile-photo-turn ${flipped ? 'is-flipped' : ''}`}>
            <span className="aye-profile-photo-face aye-profile-photo-front" aria-hidden={flipped}>
              <img src={original.src} alt={original.alt} loading={isMain ? 'eager' : 'lazy'} />
            </span>
            <span className="aye-profile-photo-face aye-profile-photo-back" aria-hidden={!flipped}>
              <img src={alternate.src} alt={alternate.alt} loading="lazy" />
            </span>
          </span>
        </div>
        {activePhoto.caption && <figcaption>{activePhoto.caption}</figcaption>}
        {isMain && !stickerPeeled && (
          <button
            type="button"
            className={`aye-peel-sticker ${stickerPeeling ? 'is-peeling' : ''}`}
            onPointerDown={event => {
              stickerPointerStart.current = { x: event.clientX, y: event.clientY }
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerUp={event => {
              const start = stickerPointerStart.current
              if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 9) peelSticker()
              stickerPointerStart.current = null
            }}
            onPointerCancel={() => { stickerPointerStart.current = null }}
            onClick={peelSticker}
            aria-busy={stickerPeeling}
            aria-label="Peel this sticker to reveal alternate photographs"
          >
            <span>peel this</span>
            <i aria-hidden="true" />
          </button>
        )}
      </figure>
    )
  }

  return (
    <main className="all-your-eras">
      <ConfettiCannons on={confetti} />
      <a className="aye-skip" href="#aye-legend">Skip to the story</a>

      <header className={`aye-header ${stuck ? 'is-stuck' : ''} ${menuOpen ? 'is-open' : ''}`}>
        <a className="aye-wordmark" href="#aye-top" onClick={event => { event.preventDefault(); scrollTo('aye-top') }}>
          All your <em>Eras</em>
        </a>
        <span className="aye-header-mark" aria-hidden="true"><BowMark /></span>
        <button className="aye-menu" type="button" aria-expanded={menuOpen} aria-controls="aye-nav" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <nav id="aye-nav" className={menuOpen ? 'is-open' : ''} aria-label="Birthday sections">
          {nav.map(item => (
            <a key={item.href} href={item.href} onClick={event => { event.preventDefault(); scrollTo(item.href.slice(1)) }}>{item.label}</a>
          ))}
          <button type="button" className="aye-header-cta" onClick={() => { setMenuOpen(false); startParty() }}>Make a wish</button>
        </nav>
      </header>

      <section className="aye-hero" id="aye-top" aria-labelledby="aye-hero-title">
        <div className="aye-hero-copy">
          <p className="aye-kicker">
            <button type="button" className="aye-spark-hit" onClick={burstConfetti} aria-label="A little extra sparkle">
              <SparkMark />
            </button>
            A little internet birthday
          </p>
          <h1 id="aye-hero-title">Happy <em>birthday</em>, {data.name}.</h1>
          <p className="aye-lede">Make a wish. Then wander through every era that made you this version of yourself.</p>
          <button className="aye-btn" type="button" onClick={startParty}>Enter the celebration</button>
        </div>
        <div className="aye-wish-bridge">
          {wish && (
            <aside className="aye-wish-note" role="status">
              <span className="aye-wish-seal" aria-hidden="true"><SealMark /></span>
              <p>A little wish, just in: happy birthday, {data.nickname}.</p>
              <button type="button" onClick={() => setWish(false)}>Got it</button>
            </aside>
          )}
        </div>
        <div className="aye-hero-stage">
          <div className="aye-hero-keepsakes">
            <p className="aye-hand aye-hero-note">for {data.nickname}, obviously.</p>
            <button
              type="button"
              className={`aye-cake-hit ${blown ? 'is-blown' : ''}`}
              onClick={() => {
                if (blown) {
                  burstConfetti()
                  return
                }
                setBlown(true)
                burstConfetti()
              }}
              aria-pressed={blown}
              aria-label={blown ? 'Candles blown out. Celebrate again' : 'Blow out the candles'}
            >
              <CakeMark blown={blown} />
              <span>{blown ? 'Wish granted' : 'Blow out the candles'}</span>
            </button>
            <button
              type="button"
              className={`aye-gift ${giftOpen ? 'is-open' : ''}`}
              onClick={() => {
                setGiftOpen(true)
                burstConfetti()
              }}
              aria-haspopup="dialog"
              aria-expanded={giftOpen}
            >
              <GiftMark open={giftOpen} />
              <span>A little something for you</span>
            </button>
          </div>
          <figure className="aye-hero-polaroid">
            <button type="button" onClick={() => setLightbox({ src: data.heroImage || '', alt: data.name })}>
              <img src={data.heroImage} alt={`Portrait of ${data.name}`} />
            </button>
            <figcaption>{data.polaroidCaption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="aye-legend aye-in" id="aye-legend">
        <div className="aye-legend-intro">
          <p className="aye-kicker">01 / The beginning</p>
          <h2>So, who is this <em>legend</em>?</h2>
          <p className="aye-lede">{data.introduction}</p>
          <p className="aye-hand">all the details, kept close</p>
        </div>
        <div className="aye-profile">
          <div className="aye-profile-scene">
            {renderCollagePhoto(0, 'aye-profile-main', mainPhotoFlipped, true)}
            {renderCollagePhoto(1, 'aye-profile-side aye-profile-a', topRightPhotoFlipped)}
            {renderCollagePhoto(2, 'aye-profile-side aye-profile-b', bottomRightPhotoFlipped)}
          </div>
        </div>
        <dl className="aye-facts">
          <div><dt>Name</dt><dd>{data.name}</dd></div>
          <div><dt>Birthday</dt><dd>{data.birthday}</dd></div>
          <div><dt>Nickname</dt><dd>{data.nickname}</dd></div>
          <div><dt>Favourite things</dt><dd>{data.favouriteThings.join(' · ')}</dd></div>
        </dl>
      </section>

      <section className="aye-eras aye-in" id="aye-eras" aria-labelledby="aye-eras-title">
        <div className="aye-eras-heading">
          <p className="aye-kicker">02 / The lore</p>
          <h2 id="aye-eras-title">All your <em>eras</em></h2>
        </div>
        {data.eras.map((era, index) => (
          <article className={`aye-era aye-era-${index}`} key={era.label}>
            <button type="button" onClick={() => setLightbox({ src: era.image || '', alt: era.label })}>
              <img src={era.image} alt={`${era.label}: ${era.caption}`} loading="lazy" />
            </button>
            <p className="aye-era-label">{era.label}</p>
            <small>{era.caption}</small>
          </article>
        ))}
        {data.scrapbookExtras.map((extra, index) => (
          <figure className={`aye-era-extra aye-era-extra-${index + 1}`} key={extra.src} style={{ '--aye-tilt': extra.rotate } as CSSProperties}>
            <button type="button" onClick={() => setLightbox({ src: extra.src, alt: extra.caption })}>
              <img src={extra.src} alt={extra.caption} loading="lazy" />
            </button>
            <figcaption>{extra.caption}</figcaption>
          </figure>
        ))}
      </section>

      <section className="aye-messages aye-in" id="aye-messages">
        <div className="aye-messages-intro">
          <p className="aye-kicker">03 / The fan club</p>
          <h2>Look who’s <em>obsessed</em> with you</h2>
          <p className="aye-lede">Notes from the people who have loved every version of you. Unfold the ones you want to keep reading.</p>
        </div>
        <div className="aye-notes">
          {data.messages.map((message, index) => {
            const open = openNote === message.id
            return (
              <article className={`aye-note aye-note-${index} ${open ? 'is-open' : ''}`} key={message.id}>
                <header>
                  <img src={message.image} alt="" loading="lazy" />
                  <div>
                    <strong>{message.sender}</strong>
                    <span>{message.relationship}</span>
                  </div>
                </header>
                <p>{open ? message.message : `${message.message.slice(0, 96)}${message.message.length > 96 ? '…' : ''}`}</p>
                {message.message.length > 96 && (
                  <button type="button" onClick={() => setOpenNote(open ? null : message.id)}>
                    {open ? 'Fold the note' : 'Keep reading'}
                  </button>
                )}
              </article>
            )
          })}
        </div>
      </section>

      <section className="aye-award aye-in" id="aye-award">
        <p className="aye-kicker">04 / The ceremony</p>
        <h2>And the award goes to… <em>the people’s favourite</em></h2>
        <p className="aye-lede">After extensive research (the group chat), the jury has reached a completely unbiased conclusion.</p>
        <div className={`aye-stage ${awardOpen ? 'is-open' : ''}`}>
          <button type="button" className="aye-medal-hit" onClick={revealAward} aria-expanded={awardOpen} aria-controls="aye-award-copy">
            <MedalMark />
            <span>{awardOpen ? 'Celebrate again' : 'Reveal the award'}</span>
          </button>
          <div className="aye-stage-copy" id="aye-award-copy" aria-live="polite">
            {awardOpen ? (
              <>
                <p className="aye-kicker">Presented to {data.name}</p>
                <h3>{data.award.title}</h3>
                <p>{data.award.explanation}</p>
              </>
            ) : (
              <p className="aye-hand">the envelope, please</p>
            )}
          </div>
        </div>
      </section>

      <section className="aye-letter aye-in" id="aye-letter">
        <div className="aye-letter-copy">
          <p className="aye-kicker">05 / From the heart</p>
          <h2>Please read with your <em>whole heart</em></h2>
          <p className="aye-lede">A letter, kept for this exact day. Open it when you are ready.</p>
        </div>
        <button className="aye-envelope" type="button" aria-expanded={letterOpen} aria-controls="aye-letter-paper" onClick={() => setLetterOpen(true)} onKeyDown={onLetterKey}>
          <span className="aye-envelope-flap" />
          <span className="aye-envelope-front">
            <b>To {data.name}</b>
            <small>Open the letter</small>
            <SealMark />
          </span>
        </button>
        {letterOpen && (
          <div className="aye-letter-overlay" role="dialog" aria-modal="true" aria-labelledby="aye-letter-title" onMouseDown={event => { if (event.target === event.currentTarget) setLetterOpen(false) }}>
            <article className="aye-letter-paper" id="aye-letter-paper">
              <button className="aye-letter-close" type="button" ref={letterCloseRef} onClick={() => setLetterOpen(false)}>Close</button>
              <p className="aye-kicker">From the heart</p>
              <h3 id="aye-letter-title">{data.letter.heading}</h3>
              {data.letter.content.split('\n\n').map(paragraph => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
              <p className="aye-hand">{data.letter.signature}</p>
            </article>
          </div>
        )}
      </section>

      <section className="aye-voice aye-in" id="aye-voice">
        <p className="aye-kicker">06 / One last thing</p>
        <h2>Some things sound better <em>out loud</em></h2>
        <p className="aye-lede">Little voice notes from people who love you. Keep them forever, okay?</p>
        <div className="aye-voice-grid">
          {data.voiceNotes.map(note => <VoiceCard key={note.id} note={note} />)}
        </div>
      </section>

      <section className="aye-end aye-in" id="aye-end">
        <div className="aye-end-copy">
          <p className="aye-kicker">07 / The finale</p>
          <h2>The end? <em>Never.</em></h2>
          <p className="aye-lede">A little corner of the internet, made with an unreasonable amount of love.</p>
          <p className="aye-hand">{data.closingNote}</p>
          <button className="aye-secret" type="button" onClick={() => setSecret(v => !v)}>
            {secret ? `P.S. ${data.name}, you are the favourite plotline.` : 'A tiny postscript, if you want it'}
          </button>
        </div>
        <div className="aye-end-collage">
          {data.closingImages.map(image => (
            <figure key={image.src}>
              <button type="button" onClick={() => setLightbox({ src: image.src, alt: image.caption })}>
                <img src={image.src} alt={image.caption} loading="lazy" />
              </button>
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="aye-footer">
        <div className="aye-footer-brand">
          <a className="aye-wordmark" href="#aye-top" onClick={event => { event.preventDefault(); scrollTo('aye-top') }}>All your <em>Eras</em></a>
          <BowMark />
        </div>
        <p>Made with love, for your favourite human.</p>
        <nav aria-label="Footer">
          {nav.map(item => (
            <a key={item.href} href={item.href} onClick={event => { event.preventDefault(); scrollTo(item.href.slice(1)) }}>{item.label}</a>
          ))}
        </nav>
        <button type="button" onClick={() => scrollTo('aye-top')}>Back to the beginning</button>
        <small>A little world by Tab & Tale</small>
      </footer>

      {giftOpen && (
        <div
          className="aye-gift-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="aye-gift-title"
          onMouseDown={event => { if (event.target === event.currentTarget) setGiftOpen(false) }}
        >
          <article className="aye-gift-keep">
            <button className="aye-gift-close" type="button" ref={giftCloseRef} onClick={() => setGiftOpen(false)}>Close</button>
            <p className="aye-kicker">A little present</p>
            <figure>
              <img src="/templates/all-your-eras/party.jpg" alt={`A birthday keepsake for ${data.name}`} />
              <figcaption>keep this one</figcaption>
            </figure>
            <h3 id="aye-gift-title">For {data.nickname}</h3>
            <p className="aye-hand">Another trip around the sun, {data.name}.</p>
          </article>
        </div>
      )}
      {lightbox && (
        <div className="aye-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.alt} onMouseDown={event => { if (event.target === event.currentTarget) setLightbox(null) }}>
          <button type="button" className="aye-lightbox-close" ref={lightboxCloseRef} onClick={() => setLightbox(null)}>Close</button>
          <img src={lightbox.src} alt={lightbox.alt} />
        </div>
      )}
    </main>
  )
}
