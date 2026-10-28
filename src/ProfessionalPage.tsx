import { useState, type FormEvent } from 'react'
import logoUrl from '/logo.png'
import { ArrowDownRight, ArrowUpRight, Check, Heart, Menu, X } from 'lucide-react'
import './professional.css'
import { contactConfig, createEmailHref } from './config/contact'


const faqs = [
  { q: 'What kind of businesses do you work with?', a: 'Small businesses, independent brands, service providers, studios, creators and early-stage ideas. If you need a thoughtful online home, we can shape the right starting point together.' },
  { q: 'Can you work with an existing brand?', a: 'Absolutely. We can build around your existing logo, colours, imagery and voice—or help bring the visual pieces into a more cohesive direction.' },
  { q: 'What if I do not have all my content ready?', a: 'That is normal. We will map out what the site needs, help organise the content, and identify what is still missing before the build gets too far along.' },
  { q: 'Will my website work on mobile?', a: 'Yes. The layout is designed to adapt to phones, tablets and desktop screens, with clear navigation and readable content.' },
]

type QuestionForm = {
  name: string
  email: string
  question: string
  website: string
}

type QuestionStatus = 'idle' | 'submitting' | 'success' | 'error'

const initialQuestionForm: QuestionForm = { name: '', email: '', question: '', website: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Dots() { return <span className="pro-dots" aria-hidden="true"><i/><i/><i/></span> }

export default function ProfessionalPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [contactOpen, setContactOpen] = useState(false)
  const [questionForm, setQuestionForm] = useState<QuestionForm>(initialQuestionForm)
  const [questionStatus, setQuestionStatus] = useState<QuestionStatus>('idle')
  const [questionMessage, setQuestionMessage] = useState('')

  const updateQuestionField = (field: keyof QuestionForm, value: string) => {
    setQuestionForm(prev => ({ ...prev, [field]: value }))
    if (questionStatus !== 'submitting') {
      setQuestionStatus('idle')
      setQuestionMessage('')
    }
  }

  const validateQuestionForm = () => {
    const name = questionForm.name.trim()
    const email = questionForm.email.trim()
    const question = questionForm.question.trim()
    if (!name || !email || !question) return 'Please fill in your name, email address and question.'
    if (name.length > 80) return 'Please keep your name under 80 characters.'
    if (!emailPattern.test(email) || email.length > 254) return 'Please enter a valid email address.'
    if (question.length < 10) return 'Please add a little more detail to your question.'
    if (question.length > 2000) return 'Please keep your question under 2000 characters.'
    return ''
  }

  const submitQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (questionStatus === 'submitting') return
    const validationError = validateQuestionForm()
    if (validationError) {
      setQuestionStatus('error')
      setQuestionMessage(validationError)
      return
    }
    setQuestionStatus('submitting')
    setQuestionMessage('')
    try {
      const response = await fetch('/api/professional-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...questionForm, sourcePage: '/professional' }),
      })
      const result = await response.json().catch(() => ({ error: 'Something went wrong. Please try again.' }))
      if (!response.ok) throw new Error(result.error || 'Something went wrong. Please try again.')
      setQuestionStatus('success')
      setQuestionMessage('Thank you - your question has landed safely in our inbox.')
      setQuestionForm(initialQuestionForm)
    } catch (error) {
      setQuestionStatus('error')
      setQuestionMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return <main className="pro-page">
    <div className="pro-grain" aria-hidden="true" />
    <header className="pro-header">
      <a href="/" className="pro-brand" aria-label="Tab & Tale home"><img src={logoUrl} alt="Tab & Tale" /></a>
      <button className="pro-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={22}/> : <Menu size={22}/>}</button>
      <nav className={menuOpen ? 'pro-nav pro-nav-open' : 'pro-nav'} aria-label="Main navigation">
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#idea" onClick={() => setMenuOpen(false)}>The idea</a>
        <a href="#approach" onClick={() => setMenuOpen(false)}>Our approach</a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>FAQs</a>
        <a href="/personal" onClick={() => setMenuOpen(false)}>Personal websites <ArrowUpRight size={14}/></a>
        <button className="pro-nav-cta" onClick={() => { setContactOpen(true); setMenuOpen(false) }}>Let's build your site <Heart size={15}/></button>
      </nav>
    </header>

    <section className="pro-hero" id="about">
      <div className="pro-hero-copy">
        <h1>An idea,<br/>brought to <em>life.</em></h1>
        <p className="pro-intro">A thoughtful online home for your business, built to tell your story clearly, look like you mean it, and make the next step easy for your customers.</p>
        <div className="pro-hero-actions"><a className="pro-secondary" href="#approach">See how we work <ArrowDownRight size={17}/></a></div>
        <div className="pro-proof"><span><Check size={14}/> Designed around your brand</span><span><Check size={14}/> Responsive by default</span><span><Check size={14}/> Made with intention</span></div>
      </div>
      <div className="pro-visual pro-workboard" aria-label="A curated board of professional website design previews">
        <div className="pro-board-topline"><span>SELECTED DIGITAL DIRECTIONS</span><span>01 — 03</span></div>
        <div className="pro-board-main">
          <article className="pro-project-preview pro-project-featured">
            <div className="pro-project-browserbar"><Dots/></div>
            <div className="pro-project-interior"><span className="pro-project-kicker">INTERIORS · OBJECTS · LIVING</span><b>Spaces to<br/><i>feel something.</i></b><div className="pro-interior-photo"><span/><i/><b/></div><span className="pro-project-link">EXPLORE THE COLLECTION ↗</span></div>
            <span className="pro-project-caption">01 / BRAND WEBSITE</span>
          </article>
          <article className="pro-project-preview pro-project-side pro-project-studio">
            <div className="pro-project-browserbar"><Dots/></div>
            <div className="pro-studio-art"><span>F</span><i/><b/></div><div className="pro-studio-lines"><i/><i/><i/></div>
            <span className="pro-project-caption">02 / CREATIVE STUDIO</span>
          </article>
          <article className="pro-project-preview pro-project-side pro-project-editorial">
            <div className="pro-project-browserbar"><Dots/></div>
            <div className="pro-editorial-photo"><span>THE ART OF<br/><i>GETTING AWAY.</i></span></div><div className="pro-editorial-lines"><i/><i/></div>
            <span className="pro-project-caption">03 / EDITORIAL LANDING PAGE</span>
          </article>
        </div>
        <div className="pro-board-footer"><span>MADE TO FIT THE BRAND</span></div>
      </div>
    </section>

    <section className="pro-intro-band pro-about-band" id="idea"><div className="pro-about-label"><span className="pro-band-number">01 / THE IDEA</span></div><div className="pro-about-copy"><h2>Every good idea<br/>deserves its own space.</h2><p>Your website is often the first hello. We bring your brand, your offer and your point of view together in a digital space that feels considered—not copied and pasted.</p></div><div className="pro-about-note"><span className="pro-about-star">✳</span><span>Thoughtful by design.<br/><em>Distinctly yours.</em></span><small>OUR DESIGN PRINCIPLE</small></div></section>

    <section className="pro-services">
      <div className="pro-section-heading"><p className="pro-eyebrow"><span>✳</span> WHAT WE CAN MAKE</p><h2>From first thought<br/><em>to full expression.</em></h2><p>Start with what you need today. Make room for what comes next.</p></div>
      <div className="pro-service-grid">
        <article className="pro-service-card pro-service-lilac"><div className="pro-service-index">01 <span>THE FIRST HELLO</span></div><div className="pro-service-illustration pro-landing-art"><div className="pro-mini-browser"><div className="pro-mini-bar"><Dots/><span>yourbrand.co</span></div><div className="pro-mini-copy"><b>Made to<br/>mean <i>more.</i></b><span/><span/><span/></div><div className="pro-mini-sun">✳</div></div></div><h3>The idea, introduced.</h3><p>A polished landing page or simple site that introduces your business, explains what you do and gives people a clear way to get in touch.</p><ul><li>Brand-led visual direction</li><li>Services, story and contact details</li><li>Mobile-friendly layout</li></ul></article>
        <article className="pro-service-card pro-service-green"><div className="pro-service-index">02 <span>THE FULL PICTURE</span></div><div className="pro-service-illustration pro-multipage-art"><div className="pro-page-tile tile-one"><span>ABOUT</span><i/></div><div className="pro-page-tile tile-two"><span>SERVICES</span><i/><i/></div><div className="pro-page-tile tile-three"><span>CONTACT</span><i/></div><span className="pro-tile-flower">✳</span></div><h3>The idea, fully realised.</h3><p>A multi-page website for businesses ready to share more detail, answer customer questions and build a more complete online presence.</p><ul><li>Multiple connected pages</li><li>Clear navigation and content flow</li><li>Room to grow as you do</li></ul></article>
        <article className="pro-service-card pro-service-peach"><div className="pro-service-index">03 <span>THE PERSONAL TOUCH</span></div><div className="pro-service-illustration pro-refresh-art"><div className="pro-refresh-card"><span>THE BRAND EDIT</span><b>Same you.<br/><i>More you.</i></b><div className="pro-colour-dots"><i/><i/><i/><i/></div></div><span className="pro-refresh-arrow">↗</span></div><h3>The idea, reimagined.</h3><p>For an existing site that needs a little more clarity, consistency or character—without losing what already makes your business yours.</p><ul><li>Visual and layout refinement</li><li>Improved content hierarchy</li><li>More cohesive brand expression</li></ul></article>
      </div>
      <p className="pro-service-note">Not sure which fits? That's part of the conversation. We'll work it out together.</p>
    </section>

    <section className="pro-approach" id="approach"><div className="pro-approach-heading"><p className="pro-eyebrow"><span>✳</span> A GOOD PROCESS MAKES GOOD WORK</p><h2>Thoughtful from<br/><em>first hello to launch.</em></h2><p>No mysterious agency process. Just a collaborative, considered way to turn your idea into a site you feel good sharing.</p></div><div className="pro-steps"><article><span>01</span><div><h3>Get to know the idea.</h3><p>We talk about your business, your audience, what you need the site to do and what you want it to feel like.</p></div><span className="pro-step-symbol">↗</span></article><article><span>02</span><div><h3>Shape the direction.</h3><p>We bring the structure, visual direction and content priorities together before moving into the details.</p></div><span className="pro-step-symbol">✳</span></article><article><span>03</span><div><h3>Make it real.</h3><p>Your pages come together responsively, with space for feedback and thoughtful refinements along the way.</p></div><span className="pro-step-symbol">✦</span></article><article><span>04</span><div><h3>Put it out into the world.</h3><p>We help you get ready to share your new online home and understand the next steps for keeping it useful.</p></div><span className="pro-step-symbol">♡</span></article></div></section>

    <section className="pro-faq" id="faq"><div className="pro-faq-heading"><p className="pro-eyebrow"><span>✳</span> A FEW THINGS YOU MIGHT WONDER</p><h2>Good questions.<br/><em>Honest answers.</em></h2><p>Every project is a little different. Here's a useful place to start.</p></div><div className="pro-faq-list">{faqs.map((faq, i) => <article className={openFaq === i ? 'pro-faq-item is-open' : 'pro-faq-item'} key={faq.q}><button aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{faq.q}</span><span className="pro-faq-toggle">{openFaq === i ? '−' : '+'}</span></button>{openFaq === i && <p>{faq.a}</p>}</article>)}</div><div className="pro-question-side-heading"><h3>Reach out<br/>to us</h3></div><form className="pro-question-form" onSubmit={submitQuestion} noValidate><div className="pro-question-heading"><p className="pro-eyebrow"><span>✳</span> STILL CURIOUS?</p><h3>Still have a question?</h3><p>Tell us what's on your mind. We'll get back to you.</p></div><label>Name<span aria-hidden="true">*</span><input name="name" autoComplete="name" required maxLength={80} value={questionForm.name} onChange={event => updateQuestionField('name', event.target.value)} /></label><label>Email address<span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={254} value={questionForm.email} onChange={event => updateQuestionField('email', event.target.value)} /></label><label>Your question<span aria-hidden="true">*</span><textarea name="question" required minLength={10} maxLength={2000} rows={5} value={questionForm.question} onChange={event => updateQuestionField('question', event.target.value)} /></label><label className="pro-honeypot">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" value={questionForm.website} onChange={event => updateQuestionField('website', event.target.value)} /></label><button className="pro-primary" type="submit" disabled={questionStatus === 'submitting'}>{questionStatus === 'submitting' ? 'Sending...' : 'Send us your question ↗'}</button>{questionMessage && <p className={questionStatus === 'success' ? 'pro-form-message pro-form-success' : 'pro-form-message pro-form-error'} role="status">{questionMessage}</p>}<small>Your details will only be used to respond to your enquiry.</small></form></section>

    <section className="pro-cta"><div className="pro-cta-shape" aria-hidden="true">✳</div><p className="pro-eyebrow"><span>✳</span> YOUR IDEA, NEXT</p><h2>Let's make a little<br/><em>room for you.</em></h2><p>Tell us what you're building, what isn't working yet, or what you've been imagining. We'll start there.</p><button className="pro-primary" onClick={() => setContactOpen(true)}>Start a conversation <ArrowUpRight size={17}/></button><span className="pro-cta-footnote">NO BIG PITCH. JUST A GOOD FIRST CHAT.</span></section>

    <footer className="pro-footer"><a href="/" className="pro-footer-brand"><img src={logoUrl} alt="Tab & Tale"/><span>Little worlds, thoughtfully made.</span></a><div className="pro-footer-links"><a href="#about">About</a><a href="#idea">The idea</a><a href="#approach">Our approach</a><a href="#faq">FAQs</a><a href="/personal">Personal websites</a><button onClick={() => setContactOpen(true)}>Let's talk ↗</button></div><p>© {new Date().getFullYear()} Tab & Tale. Made with care.</p></footer>

    {contactOpen && <div className="pro-contact-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setContactOpen(false) }}><section className="pro-contact-dialog" role="dialog" aria-modal="true" aria-labelledby="pro-contact-title"><button className="pro-dialog-close" aria-label="Close contact options" onClick={() => setContactOpen(false)}><X size={19}/></button><p className="pro-eyebrow"><span>✳</span> LET'S MAKE SOMETHING</p><h2 id="pro-contact-title">Tell us what you're dreaming up.</h2><p>Pick the easiest way to start. You can share the details when you're ready.</p><div className="pro-contact-choices"><a href={createEmailHref({ subject: 'Website project enquiry', body: 'Hi Tab & Tale! I would like to talk about a website project.' })} target="_blank" rel="noopener noreferrer">Email <ArrowUpRight size={17}/></a><a href={contactConfig.instagramDmUrl} target="_blank" rel="noopener noreferrer">Instagram DM <ArrowUpRight size={17}/></a><a href={contactConfig.linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={17}/></a></div><small>Instagram DM, LinkedIn and Gmail are ready to use. Choose whichever feels easiest.</small></section></div>}
  </main>
}
