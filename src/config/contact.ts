export const contactConfig = {
  businessEmail: 'tab.and.tale@gmail.com',
  gmailComposeUrl: 'https://mail.google.com/mail/?view=cm&fs=1&to=tab.and.tale%40gmail.com',
  instagramDmUrl: 'https://ig.me/m/tab_and_tale',
  linkedInUrl: 'https://www.linkedin.com/in/tab-and-tale-017888446/',
} as const

type EmailOptions = {
  subject: string
  body?: string
}

export function createEmailHref({ subject, body }: EmailOptions) {
  const params = new URLSearchParams(contactConfig.gmailComposeUrl.split('?')[1])
  if (subject) params.set('su', subject)
  if (body) params.set('body', body)
  return `https://mail.google.com/mail/?${params.toString()}`
}

