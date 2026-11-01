import { useState, type FormEvent } from 'react'
import { ArrowDownRight, ArrowUpRight, Heart, Menu, Sparkles, X } from 'lucide-react'
import './personal.css'
import { contactConfig, createEmailHref } from './config/contact'

const logoUrl = '/logo.png'
const templates = [
  { no: '01', tag: 'BIRTHDAY', name: 'All Your Eras', desc: 'A birthday website for the main character, complete with memories, messages and a little bit of chaos.', className: 'birthday', note: 'for their big day', previewPath: '/templates/all-your-eras/' },
  { no: '02', tag: 'ANNIVERSARY', name: 'A Thousand Little Yeses', desc: 'Your love story, told through meaningful milestones, little memories, letters and all the reasons you choose each other.', className: 'anniversary', note: 'for your favourite person', previewPath: '/templates/a-thousand-little-yeses/' },
  { no: '03', tag: 'JUST BECAUSE', name: 'A Small Thing for You', desc: 'A tiny digital gift filled with hidden notes, little surprises and thoughtful details, just because.', className: 'justbecause', note: 'for absolutely no reason', previewPath: '/templates/a-small-thing-for-you/' },
  { no: '04', tag: 'FRIENDSHIP', name: 'Our Little Universe', desc: 'An affectionate friendship zine filled with inside jokes, candid photos, shared memories and little notes.', className: 'friendship', note: 'for your person', previewPath: '/templates/our-little-universe/' },
]

const personalFaqs = [
  { q: '01. What exactly is a personal website?', a: 'Think of it as a little corner of the internet made just for someone. It could be a birthday surprise, a digital scrapbook, an anniversary gift or simply a way to celebrate a person and their story.' },
  { q: '02. What kind of personal websites can I get made?', a: 'Anything with a story worth telling! Birthday websites, anniversary surprises, friendship pages, digital memory books, proposal websites, celebration pages and personalised mini-sites.' },
  { q: '03. Do I need to know anything about coding or website design?', a: 'Not at all. You bring the idea, the memories and the little details. We\'ll take care of bringing everything together online.' },
  { q: '04. Can I personalise the website?', a: 'Absolutely! You can share photographs, videos, messages, favourite songs, inside jokes, important dates and other details you\'d like included. We\'ll work together to make the website feel personal.' },
  { q: '05. Do you have ready-made templates?', a: 'Yes! We have a collection of thoughtfully designed templates that you can explore. You can choose one as it is or ask us about personalising it.' },
  { q: '06. Can I request something completely custom?', a: 'Of course. If you have an idea that doesn\'t fit into an existing template, we can build something around your concept, preferences and requirements.' },
  { q: '07. How do I place an order?', a: 'Browse the templates or tell us what you\'d like to create through our enquiry form. We\'ll get in touch to understand your idea, discuss the details and take things forward.' },
  { q: '08. How long does it take to make my website?', a: 'It depends on the type of website, its customisation and the content involved. We\'ll discuss the expected timeline with you before getting started.' },
  { q: '09. Can I share the website with other people?', a: 'Yes! Once your website is ready and published, you can share its link with friends, family or anyone you\'d like to surprise.' },
  { q: '10. What if I have an idea but don\'t know where to start?', a: 'That\'s perfectly fine. You don\'t need to have everything figured out. Tell us whatever you have in mind, even if it\'s just a rough idea, and we\'ll help you shape it.' },
]

type PersonalQuestionForm = {
  name: string
  email: string
  question: string
  website: string
}

type PersonalQuestionStatus = 'idle' | 'submitting' | 'success' | 'error'

const initialPersonalQuestionForm: PersonalQuestionForm = { name: '', email: '', question: '', website: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function PersonalPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [questionForm, setQuestionForm] = useState<PersonalQuestionForm>(initialPersonalQuestionForm)
  const [questionStatus, setQuestionStatus] = useState<PersonalQuestionStatus>('idle')
  const [questionMessage, setQuestionMessage] = useState('')

  const updateQuestionField = (field: keyof PersonalQuestionForm, value: string) => {
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
        body: JSON.stringify({ ...questionForm, sourcePage: 'Personal Page' }),
      })
      const result = await response.json().catch(() => ({ error: 'Something went wrong. Please try again.' }))
      if (!response.ok) throw new Error(result.error || 'Something went wrong. Please try again.')
      setQuestionStatus('success')
      setQuestionMessage('Thank you - your question has landed safely in our inbox.')
      setQuestionForm(initialPersonalQuestionForm)
    } catch (error) {
      setQuestionStatus('error')
      setQuestionMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }
  return <main className="personal-page">
    <header className="personal-header">
      <a href="/" className="personal-brand" aria-label="Tab & Tale home"><img src={logoUrl} alt="Tab & Tale" /></a>
      <button className="personal-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button>
      <nav className={menuOpen ? 'personal-nav is-open' : 'personal-nav'}><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#idea" onClick={() => setMenuOpen(false)}>The idea</a><a href="#templates" onClick={() => setMenuOpen(false)}>Little templates</a><a href="#approach" onClick={() => setMenuOpen(false)}>Our Approach</a><a href="#faqs" onClick={() => setMenuOpen(false)}>FAQs</a><a href="/professional" onClick={() => setMenuOpen(false)}>Business Websites <ArrowUpRight size={14}/></a><button className="personal-nav-cta personal-contact-trigger" onClick={() => { setContactOpen(true); setMenuOpen(false) }}>Let's build your site <Heart size={15}/></button></nav>
    </header>
    <section className="personal-hero" id="about">
      <div className="personal-hero-copy"><h1>Some people<br/>deserve <em>their own</em><br/>little website.</h1><p className="personal-lede">A birthday, a best friend, your favourite person—or just a reason to make someone smile. Turn your memories into a tiny corner of the internet, made with love.</p><div className="personal-actions"><a className="personal-secondary" href="#approach">See how we work <ArrowDownRight size={17}/></a></div></div>
      <div className="personal-hero-art" aria-label="Illustrated preview of a personal mini website"><div className="personal-sunblob"/><div className="personal-polaroid"><div className="personal-polaroid-photo"><span>♡</span><i/><b>our kind<br/>of magic</b></div><small>little moments, big feelings</small></div><div className="personal-note-card"><span>dear you,</span><b>the world<br/>is sweeter<br/>with you in it.</b><Heart size={24} fill="currentColor"/><i>xo, always</i></div><span className="personal-flower flower-a">✿</span><span className="personal-flower flower-b">✳</span><span className="personal-tape"/></div>
    </section>
    <section className="personal-intro" id="idea"><span className="personal-section-index">01 / A LITTLE SOMETHING SPECIAL</span><h2>Not just a link.<br/><em>A feeling they can open.</em></h2><p>Think of it like a digital keepsake: their photos, your words, shared memories, and all the little details that make your person your person. We make the page; you bring the meaning.</p><div className="personal-intro-stamp">MADE WITH<br/>A LOT OF ♥</div></section>
    <section className="personal-templates" id="templates"><div className="personal-section-heading"><div><p className="personal-eyebrow"><Sparkles size={14}/> THE LITTLE TEMPLATE SHOP</p><h2>Not sure what to make?<br/><em>Start here.</em></h2></div><p>Explore our little collection of ready-made templates. Find one you love, make it your own, and give someone a little surprise worth remembering.</p></div><div className="personal-template-grid">{templates.map(t => <article className={`personal-template-card template-${t.className}`} key={t.no}><div className="template-preview"><div className="template-browser"><div className="template-browser-bar"><span/><span/><span/><small>{t.className}.little.site</small></div><div className="template-preview-art"><div className="template-preview-shape"/><div className="template-preview-copy"><small>{t.tag}</small><b>{t.className === 'birthday' ? 'a day all about you' : t.className === 'anniversary' ? 'look how far we came' : t.className === 'friendship' ? 'my favourite human' : 'just because, you'}</b><i/><i/><i/></div>{t.className === 'birthday' ? <span className="preview-cake">✿</span> : t.className === 'anniversary' ? <span className="preview-cake">♡</span> : t.className === 'friendship' ? <span className="preview-cake">✦</span> : <span className="preview-cake">☼</span>}</div></div><span className="template-number">{t.no}</span></div><div className="template-details"><div className="template-meta"><span>{t.tag}</span><span>{t.note}</span></div><h3>{t.name}</h3><p>{t.desc}</p><a href={t.previewPath} className="template-link">Preview this template <ArrowUpRight size={16}/></a></div></article>)}</div><div className="personal-coming-soon"><span className="coming-heart"><Heart size={19}/></span><p><b>More little templates are on their way.</b><br/>Have a theme in mind? Tell us and we might make it next.</p><a href={createEmailHref({ subject: 'Template idea', body: 'Hi Tab & Tale! I have an idea for a personal mini-site template.' })} target="_blank" rel="noopener noreferrer">Suggest a template <ArrowUpRight size={15}/></a></div></section>
    <section className="personal-how" id="approach"><div className="personal-how-heading"><p className="personal-eyebrow"><Sparkles size={14}/> EASY AS A LITTLE LOVE NOTE</p><h2>Three little steps.<br/><em>One very happy person.</em></h2><p>No design skills required. You bring the story; we help turn it into a website.</p></div><div className="personal-how-steps"><article><span>01</span><div><h3>Pick your starting point.</h3><p>Choose a ready-made template or tell us the idea you have in mind.</p></div><b>♡</b></article><article><span>02</span><div><h3>Make it yours.</h3><p>Send over photos, memories, names, dates, and the words you want them to see.</p></div><b>✿</b></article><article><span>03</span><div><h3>Send a little surprise.</h3><p>We put it together and share your link, ready for you to send to your favourite person.</p></div><b>↗</b></article></div></section>
    <section className="personal-faq" id="faqs"><div className="personal-faq-heading"><p className="personal-eyebrow"><Sparkles size={14}/> LITTLE QUESTIONS, HONEST ANSWERS</p><h2>Things you might<br/><em>wonder.</em></h2></div><div className="personal-faq-list">{personalFaqs.map((faq, i) => <article className={openFaq === i ? 'personal-faq-item is-open' : 'personal-faq-item'} key={faq.q}><button aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{faq.q}</span><span className="personal-faq-toggle">{openFaq === i ? '−' : '+'}</span></button>{openFaq === i && <p>{faq.a}</p>}</article>)}</div></section>
    <section className="personal-enquiry"><div className="personal-enquiry-heading"><h2>Reach out to us</h2></div><form className="personal-question-form" onSubmit={submitQuestion} noValidate><label>Name<span aria-hidden="true">*</span><input name="name" autoComplete="name" required maxLength={80} value={questionForm.name} onChange={event => updateQuestionField('name', event.target.value)} /></label><label>Email address<span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={254} value={questionForm.email} onChange={event => updateQuestionField('email', event.target.value)} /></label><label>Your question<span aria-hidden="true">*</span><textarea name="question" required minLength={10} maxLength={2000} rows={5} value={questionForm.question} onChange={event => updateQuestionField('question', event.target.value)} /></label><label className="personal-honeypot">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" value={questionForm.website} onChange={event => updateQuestionField('website', event.target.value)} /></label><button className="personal-button" type="submit" disabled={questionStatus === 'submitting'}>{questionStatus === 'submitting' ? 'Sending...' : 'Send us your question ↗'}</button>{questionMessage && <p className={questionStatus === 'success' ? 'personal-form-message personal-form-success' : 'personal-form-message personal-form-error'} role="status">{questionMessage}</p>}<small>Your details will only be used to respond to your enquiry.</small></form></section>
    <section className="personal-final"><div className="personal-final-art"><span>♡</span><i className="personal-final-seal" aria-hidden="true">♡</i><b>✿</b></div><p className="personal-eyebrow"><Sparkles size={14}/> A LITTLE INTERNET MAGIC</p><h2>Have someone<br/>in <em>mind?</em></h2><p>Tell us who it's for and what you're celebrating. We'll help you make something that feels like them—and like you.</p><button className="personal-button personal-contact-trigger" onClick={() => setContactOpen(true)}>Let's make their little world <ArrowUpRight size={17}/></button><small>NO PERFECT WORDS NEEDED. JUST A LITTLE IDEA.</small></section>
    <footer className="personal-footer"><a href="/" className="personal-footer-brand"><img src={logoUrl} alt="Tab & Tale"/><span>Little worlds, thoughtfully made.</span></a><div className="personal-footer-links"><a href="#about">About</a><a href="#idea">The idea</a><a href="#templates">Little templates</a><a href="#approach">Our Approach</a><a href="#faqs">FAQs</a><a href="/professional">Business Websites</a><button className="personal-footer-contact" onClick={() => setContactOpen(true)}>Say hello ↗</button></div><p>© {new Date().getFullYear()} Tab & Tale. Made with care.</p></footer>
    {contactOpen && <div className="personal-contact-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setContactOpen(false) }}><section className="personal-contact-dialog" role="dialog" aria-modal="true" aria-labelledby="personal-contact-title"><button className="personal-dialog-close" aria-label="Close contact options" onClick={() => setContactOpen(false)}><X size={18}/></button><p className="personal-eyebrow"><Sparkles size={14}/> LET'S MAKE SOMETHING PERSONAL</p><h2 id="personal-contact-title">Where should we say hello?</h2><p>Choose the way that feels easiest. You can share the details when you're ready.</p><div className="personal-contact-options"><a href={contactConfig.instagramDmUrl} target="_blank" rel="noopener noreferrer">Instagram DM <ArrowUpRight size={16}/></a><a href={contactConfig.linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16}/></a><a href={createEmailHref({ subject: 'Personal mini-site enquiry', body: 'Hi Tab & Tale! I would like to talk about a personal mini-site.' })} target="_blank" rel="noopener noreferrer">Email <ArrowUpRight size={16}/></a></div></section></div>}
  </main>
}
