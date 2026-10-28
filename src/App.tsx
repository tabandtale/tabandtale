import { useRef, useState, type PointerEvent } from 'react'
import logoUrl from '/logo.png'
import { ArrowDown, ArrowUpRight, Asterisk, Heart, MousePointer2, X } from 'lucide-react'
import { contactConfig, createEmailHref } from './config/contact'

type WindowKey = 'studio' | 'birthday' | 'portfolio'
type Point = { x: number; y: number }
type ContactPreference = 'instagram' | 'linkedin' | 'email'

const windowCopy: Record<WindowKey, { url: string; label: string }> = {
  studio: { url: 'goodthings.studio', label: 'Studio preview' },
  birthday: { url: 'justforyou.club', label: 'Birthday preview' },
  portfolio: { url: 'lookwhatimade.site', label: 'Portfolio preview' },
}

function BrowserDots() {
  return <span className="browser-dots" aria-hidden="true"><i /><i /><i /></span>
}

function App() {
  const collageRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<Record<WindowKey, Point>>({
    studio: { x: 0, y: 0 }, birthday: { x: 0, y: 0 }, portfolio: { x: 0, y: 0 },
  })
  const [dragging, setDragging] = useState<WindowKey | null>(null)
  const [activeWindow, setActiveWindow] = useState<WindowKey>('studio')
  const [hiddenWindows, setHiddenWindows] = useState<WindowKey[]>([])
  const [reveal, setReveal] = useState<string | null>(null)
  const [hasMovedWindows, setHasMovedWindows] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [contactPreference, setContactPreference] = useState<ContactPreference | null>(null)

  const startDrag = (key: WindowKey, event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const target = event.currentTarget.closest<HTMLElement>('.browser-window')
    const area = collageRef.current
    if (!target || !area) return
    const areaRect = area.getBoundingClientRect()
    const windowRect = target.getBoundingClientRect()
    const startX = event.clientX
    const startY = event.clientY
    const origin = positions[key]
    const baseLeft = windowRect.left - areaRect.left - origin.x
    const baseTop = windowRect.top - areaRect.top - origin.y
    const pointerId = event.pointerId
    event.currentTarget.setPointerCapture(pointerId)
    setDragging(key)
    setHasMovedWindows(true)
    setActiveWindow(key)
    const onMove = (e: globalThis.PointerEvent) => {
      setPositions(prev => ({
        ...prev,
        [key]: {
          x: Math.max(-baseLeft, Math.min(areaRect.width - baseLeft - windowRect.width, origin.x + e.clientX - startX)),
          y: Math.max(-baseTop, Math.min(areaRect.height - baseTop - windowRect.height, origin.y + e.clientY - startY)),
        },
      }))
    }
    const onEnd = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onEnd)
      window.removeEventListener('pointercancel', onEnd)
      setDragging(null)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onEnd, { once: true })
    window.addEventListener('pointercancel', onEnd, { once: true })
  }

  const closeWindow = (key: WindowKey) => {
    setHiddenWindows(prev => prev.includes(key) ? prev : [...prev, key])
    setReveal(`${windowCopy[key].label} tucked away! Use the sticker to bring the windows back.`)
  }
  const restoreWindows = () => {
    setHiddenWindows([])
    setReveal('All the little windows are back. Have a peek around!')
  }

  const styleFor = (key: WindowKey) => ({
    transform: `translate(${positions[key].x}px, ${positions[key].y}px) rotate(${{ studio: -5, birthday: 5, portfolio: 4 }[key]}deg)`,
    zIndex: activeWindow === key ? 8 : key === 'birthday' ? 5 : key === 'portfolio' ? 4 : 3,
  })

  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <a className="brand-lockup" href="#top" aria-label="Tab & Tale home">
          <img className="brand-logo" src={logoUrl} alt="Tab & Tale" />
        </a>
        <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          <a href="#top" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#paths" onClick={() => setMenuOpen(false)}>What we make</a>
          <a href="#details" onClick={() => setMenuOpen(false)}>Details</a>
          <button className="nav-cta" onClick={() => { setContactOpen(true); setMenuOpen(false) }}>Let's talk <ArrowUpRight size={16} /></button>
        </div>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}><span /><span /></button>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">Your ideas<br />deserve a little <span className="playground-word">corner<span className="underline-swoosh" /></span><br />of the internet<span className="headline-period">.</span></h1>
          <p className="hero-description">We make thoughtful websites with personality — from polished online homes for businesses and creators to little digital surprises for your favourite people. Whatever the idea, we give it a corner of the internet to call its own.</p>
        </div>

        <div className="collage" id="windows" ref={collageRef} aria-label="Interactive previews of websites we could make">
          <div className="collage-orb orb-one" aria-hidden="true" />
          <div className="collage-orb orb-two" aria-hidden="true" />
          {!hiddenWindows.includes('studio') && <article className={`browser-window window-studio ${activeWindow === 'studio' ? 'window-active' : ''} ${dragging === 'studio' ? 'is-dragging' : ''}`} style={styleFor('studio')} onPointerDown={() => setActiveWindow('studio')}>
            <div className="window-bar" onPointerDown={e => startDrag('studio', e)}><BrowserDots /><span className="window-url">goodthings.studio</span><button className="window-close" aria-label="Hide studio preview" onClick={() => closeWindow('studio')}><X size={13} /></button></div>
            <div className="studio-content">
              <div className="mini-kicker">A GOOD PLACE TO START</div>
              <div className="studio-heading">Make room<br />for <span>good things.</span></div>
              <div className="mini-sun">✳</div>
              <div className="studio-bottom"><span>Thoughtful websites for good people.</span><span className="mini-arrow"><ArrowUpRight size={16} /></span></div>
            </div>
          </article>}
          {!hiddenWindows.includes('birthday') && <article className={`browser-window window-birthday ${activeWindow === 'birthday' ? 'window-active' : ''} ${dragging === 'birthday' ? 'is-dragging' : ''}`} style={styleFor('birthday')} onPointerDown={() => setActiveWindow('birthday')}>
            <div className="window-bar" onPointerDown={e => startDrag('birthday', e)}><BrowserDots /><span className="window-url">justforyou.club</span><button className="window-close" aria-label="Hide birthday preview" onClick={() => closeWindow('birthday')}><X size={13} /></button></div>
            <div className="birthday-content">
              <span className="birthday-label">A LITTLE SURPRISE FOR YOU</span>
              <div className="cake-wrap" aria-hidden="true"><span className="cake-candle">✦</span><span className="cake-emoji">🎂</span><span className="cake-spark spark-a">✧</span><span className="cake-spark spark-b">♡</span></div>
              <h2>you make life<br />a little <span>sweeter.</span></h2>
            </div>
          </article>}
          {!hiddenWindows.includes('portfolio') && <article className={`browser-window window-portfolio ${activeWindow === 'portfolio' ? 'window-active' : ''} ${dragging === 'portfolio' ? 'is-dragging' : ''}`} style={styleFor('portfolio')} onPointerDown={() => setActiveWindow('portfolio')}>
            <div className="window-bar" onPointerDown={e => startDrag('portfolio', e)}><BrowserDots /><span className="window-url">lookwhatimade.site</span><button className="window-close" aria-label="Hide portfolio preview" onClick={() => closeWindow('portfolio')}><X size={13} /></button></div>
            <div className="portfolio-content"><span className="portfolio-label">PORTFOLIO / 2026</span><div className="portfolio-art"><span className="art-shape art-shape-a"/><span className="art-shape art-shape-b"/><span className="art-shape art-shape-c"/><span className="art-face">☺</span></div><div className="portfolio-footer"><strong>made by me.</strong><span>designer & daydreamer ↗</span></div></div>
          </article>}

          <button className="sticker sticker-star" aria-label="Show a little encouragement" onClick={() => setReveal('A tiny reminder: your idea does not have to be big to deserve a beautiful website. ✳')}><Asterisk size={37} strokeWidth={2.7} /></button>
          <button className="sticker sticker-heart" aria-label="Show a little love" onClick={() => setReveal('Made with a little more feeling. Always. ♡')}><Heart size={27} strokeWidth={2.6} fill="currentColor" /></button>
          <button className="sticker sticker-pointer" aria-label="Bring back hidden windows" onClick={restoreWindows}><MousePointer2 size={26} fill="currentColor" /><span>click around!</span></button>
          <div className={`drag-hint ${hasMovedWindows ? 'is-hidden' : ''}`} aria-hidden="true">drag me around</div>
          {reveal && <div className="reveal-note" role="status" aria-live="polite"><span className="reveal-spark">✳</span><span>{reveal}</span><button aria-label="Dismiss message" onClick={() => setReveal(null)}><X size={14} /></button></div>}
        </div>

        <a className="scroll-cue" href="#paths" aria-label="Scroll to next section"><span className="scroll-icon"><ArrowDown size={15} /></span></a>
      </section>

      <section className="paths-section" id="paths">
        <div className="section-intro"><span className="section-label">TWO LITTLE DOORS <span>↘</span></span><h2>What's the <span>story?</span></h2><p>Good ideas deserve more than just a group chat.</p></div>
        <div className="path-cards">
          <article className="path-card path-business"><div className="path-topline"><span>01 / THE STUDIO</span><span className="path-icon"><ArrowUpRight size={20} /></span></div><div className="path-illustration business-illustration"><div className="illu-window"><div className="illu-dots"><i/><i/><i/></div><div className="illu-sun">✳</div><div className="illu-lines"><i/><i/><i/></div></div><span className="illu-sticker">GOOD<br/>IDEAS!</span></div><h3>For the plot you're building.</h3><p>Your work, your vision, your place on the web.</p><a className="text-link text-link-button" href="/professional">Let's build your website <ArrowUpRight size={17}/></a></article>
          <article className="path-card path-personal"><div className="path-topline"><span>02 / THE LITTLE THINGS</span><span className="path-icon"><Heart size={18} /></span></div><div className="path-illustration personal-illustration"><div className="illu-note"><span>hey, you!</span><Heart size={30} fill="currentColor"/><b>you're<br/>pretty<br/>special.</b></div><span className="personal-spark">✦</span><span className="personal-flower">✿</span></div><h3>For the people in your plot.</h3><p>Tiny digital celebrations for your favourite characters.</p><a className="text-link text-link-button" href="/personal">Make something personal <ArrowUpRight size={17}/></a></article>
        </div>
      </section>

      <footer className="footer" id="details">
        <div className="footer-main">
          <a className="footer-logo-link" href="#top" aria-label="Tab & Tale home"><img src={logoUrl} alt="Tab & Tale" className="footer-logo" /></a>
          <div className="footer-tagline-block"><p className="footer-tagline">Little worlds, thoughtfully made.</p><p className="footer-description">Websites for big ideas, little celebrations, and everything in between.</p></div>
          <div className="footer-links"><span className="footer-label">FIND YOUR WAY</span><a href="#top">About</a><a href="#paths">What we make</a><a href="#windows">Tiny previews</a></div>
          <div className="footer-links"><span className="footer-label">SAY HELLO</span><a href={contactConfig.instagramDmUrl} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={contactConfig.linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><button onClick={() => { setContactPreference(null); setContactOpen(true) }}>Contact options ↗</button></div>
        </div>
        <div className="footer-bottom"><span>EST. 2026</span><span>© {new Date().getFullYear()} Tab & Tale. Made with care.</span><a href="#top">Back to the top ↑</a></div>
      </footer>
      {contactOpen && <div className="contact-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setContactOpen(false) }}><section className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title"><button className="dialog-close" aria-label="Close contact options" onClick={() => setContactOpen(false)}><X size={18}/></button><span className="section-label">LET'S MAKE SOMETHING</span><h2 id="contact-title">Where should we say hello?</h2><p>Choose the way that feels easiest. We’ll take it from there.</p><div className="contact-options"><a className={`contact-option ${contactPreference === 'instagram' ? 'selected' : ''}`} href={contactConfig.instagramDmUrl} target="_blank" rel="noopener noreferrer" onClick={() => setContactPreference('instagram')}><span className="contact-option-icon">◎</span><span><strong>Instagram DM</strong><small>For DMs, ideas and inspiration</small></span><ArrowUpRight size={18}/></a><a className={`contact-option ${contactPreference === 'linkedin' ? 'selected' : ''}`} href={contactConfig.linkedInUrl} target="_blank" rel="noopener noreferrer" onClick={() => setContactPreference('linkedin')}><span className="contact-option-icon">in</span><span><strong>LinkedIn</strong><small>For professional enquiries</small></span><ArrowUpRight size={18}/></a><a className={`contact-option ${contactPreference === 'email' ? 'selected' : ''}`} href={createEmailHref({ subject: 'Tab & Tale enquiry', body: 'Hi Tab & Tale! I would like to talk about a website.' })} target="_blank" rel="noopener noreferrer" onClick={() => setContactPreference('email')}><span className="contact-option-icon">@</span><span><strong>Email</strong><small>Open Gmail compose</small></span><ArrowUpRight size={18}/></a></div><p className="contact-config-note">Instagram DM, LinkedIn and Gmail are ready to use. Choose whichever feels easiest.</p></section></div>}
      <div className="bottom-confetti" aria-hidden="true"><span>✳</span><span>♡</span><span>✦</span><span>✳</span></div>
    </main>
  )
}

export default App
