import nodemailer from 'nodemailer'

const TO_EMAIL = 'tab.and.tale@gmail.com'
const MAX_BODY_SIZE = 12_000
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX = 5
const rateLimitStore = new Map()

function sendJson(response, status, payload) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(payload))
}

function normaliseText(value, maxLength) {
  return String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

function normaliseQuestion(value) {
  return String(value || '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, ' ').trim().slice(0, 2000)
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

function clientIp(request) {
  const forwarded = request.headers['x-forwarded-for']
  return Array.isArray(forwarded) ? forwarded[0] : String(forwarded || request.socket?.remoteAddress || 'unknown').split(',')[0].trim()
}

function checkRateLimit(ip) {
  const now = Date.now()
  const current = rateLimitStore.get(ip)
  if (!current || current.expiresAt <= now) {
    rateLimitStore.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (current.count >= RATE_LIMIT_MAX) return false
  current.count += 1
  return true
}

async function readBody(request) {
  if (request.body && typeof request.body === 'object') return request.body
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (body.length > MAX_BODY_SIZE) throw new Error('Request body is too large.')
  }
  return JSON.parse(body || '{}')
}

function createTransport() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) {
    throw new Error('Gmail SMTP is not configured yet.')
  }
  if (user !== TO_EMAIL || !isValidEmail(user)) {
    throw new Error('Gmail sender is not configured correctly.')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
}

async function sendEmail({ to, subject, text, replyTo }) {
  const transporter = createTransport()
  await transporter.sendMail({
    from: `Tab & Tale <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    ...(replyTo ? { replyTo } : {}),
  })
}

export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (request.method === 'OPTIONS') return sendJson(response, 204, {})
  if (request.method !== 'POST') return sendJson(response, 405, { error: 'Method not allowed.' })

  const ip = clientIp(request)
  if (!checkRateLimit(ip)) return sendJson(response, 429, { error: 'Too many attempts. Please try again later.' })

  try {
    const body = await readBody(request)
    const honeypot = normaliseText(body.website, 120)
    if (honeypot) return sendJson(response, 400, { error: 'Submission could not be processed.' })

    const name = normaliseText(body.name, 80)
    const email = normaliseText(body.email, 254).toLowerCase()
    const question = normaliseQuestion(body.question)
    const sourcePage = normaliseText(body.sourcePage || '/professional', 120)

    if (!name || !email || !question) return sendJson(response, 400, { error: 'Please fill in all required fields.' })
    if (!isValidEmail(email)) return sendJson(response, 400, { error: 'Please enter a valid email address.' })
    if (question.length < 10) return sendJson(response, 400, { error: 'Please add a little more detail to your question.' })

    const submittedAt = new Date().toISOString()
    await sendEmail({
      to: TO_EMAIL,
      replyTo: email,
      subject: `New website enquiry from ${name}`,
      text: `New Professional page enquiry\n\nName: ${name}\nEmail: ${email}\nSource page: ${sourcePage}\nSubmitted: ${submittedAt}\n\nQuestion:\n${question}`,
    })

    try {
      await sendEmail({
        to: email,
        subject: "We've received your message — Tab & Tale",
        text: `Hi ${name},\n\nThanks for reaching out to Tab & Tale! Your question has landed safely in our inbox.\n\nWe'll take a look and get back to you as soon as we can.\n\nUntil then, thanks for stopping by.\n\nLittle worlds, thoughtfully made.\nTab & Tale`,
      })
    } catch {
      return sendJson(response, 502, { error: 'Your question reached Tab & Tale, but the acknowledgement email could not be sent. Please avoid resubmitting and contact us directly if you need confirmation.' })
    }

    return sendJson(response, 200, { ok: true })
  } catch (error) {
    const message = error instanceof Error && (error.message === 'Gmail SMTP is not configured yet.' || error.message === 'Gmail sender is not configured correctly.')
      ? error.message
      : 'We could not send your question right now. Please try again later.'
    return sendJson(response, message.includes('configured') ? 503 : 500, { error: message })
  }
}
