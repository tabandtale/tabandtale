# Tab & Tale

A React + TypeScript + Vite website for Tab & Tale, including the studio marketing pages and an independent birthday mini-site template.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. The birthday template is available at `/templates/all-your-eras`.

## Routes

- `/` — Tab & Tale homepage
- `/professional` — professional website services
- `/personal` — personal mini-sites
- `/templates/all-your-eras` — All Your Eras birthday template preview

## Template folders

The birthday mini-site lives in `templates/all-your-eras/`, with its own component, stylesheet, sample content and README. Its design is intentionally separate from the Tab & Tale marketing site. See `templates/all-your-eras/README.md` for personalisation notes.

## Professional FAQ enquiry form

The Professional page FAQ form posts to `api/professional-question.js`, a serverless function that sends the team notification and visitor acknowledgement through Gmail SMTP using Nodemailer. Configure these server-side environment variables before deploying the form:

- `GMAIL_USER=tab.and.tale@gmail.com`
- `GMAIL_APP_PASSWORD=your_google_app_password`

Do not use the normal Google account password. For Gmail SMTP, the Google account usually needs 2-Step Verification enabled, then an App Password generated from Google Account → Security → App passwords. If App passwords are unavailable for the account, use Google's OAuth2 SMTP flow instead; that requires Google Cloud OAuth credentials and token setup.

On Vercel, add both variables in Project Settings → Environment Variables for Production, Preview and Development as needed, then redeploy. A plain static Vite preview cannot execute this endpoint; use a serverless-capable deployment or adapt `api/professional-question.js` to your host's function format. Test safely by submitting the form only after the environment variables are configured, then confirm that both the team notification and visitor acknowledgement arrive.

## Before publishing

Replace remote stock-photo placeholders with client-provided or licensed assets. Add real supplied audio recordings and an authorised soundtrack if desired; current audio controls are visual demo interactions and do not play real audio. Personalise all sample text and messages.
