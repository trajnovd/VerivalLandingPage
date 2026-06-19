import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import nodemailer from 'nodemailer'

const app = express()

const smtpHost = process.env.SMTP_HOST
const smtpPort = Number(process.env.SMTP_PORT || 587)
const smtpSecure = process.env.SMTP_SECURE === 'true'
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const mailFrom = process.env.MAIL_FROM || 'VERIVAL <no-reply@verival.si>'
const notifyTo = process.env.NOTIFY_TO || 'info@verival.si'
const allowedOrigin = process.env.ALLOWED_ORIGIN
const port = Number(process.env.PORT || 3001)
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY
const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY
const recaptchaProjectId = process.env.RECAPTCHA_PROJECT_ID
const recaptchaApiKey = process.env.RECAPTCHA_API_KEY
const recaptchaExpectedAction = process.env.RECAPTCHA_EXPECTED_ACTION || ''
const recaptchaVerifyUrl = process.env.RECAPTCHA_VERIFY_URL || 'https://www.google.com/recaptcha/api/siteverify'

app.use(express.json())
app.use(
  cors({
    origin: allowedOrigin || true,
  }),
)

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function verifyRecaptchaEnterprise(token) {
  const url = `https://recaptcha.enterprise.googleapis.com/v1/projects/${recaptchaProjectId}/assessments?key=${recaptchaApiKey}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: {
        token,
        siteKey: recaptchaSiteKey,
        ...(recaptchaExpectedAction ? { expectedAction: recaptchaExpectedAction } : {}),
      },
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    console.error('reCAPTCHA Enterprise assessment request failed:', response.status, detail)
    return false
  }

  const result = await response.json()
  const valid = result?.tokenProperties?.valid === true

  if (!valid) {
    console.error('reCAPTCHA Enterprise token invalid:', result?.tokenProperties?.invalidReason)
  }

  return valid
}

async function verifyRecaptchaLegacy(token, remoteIp) {
  const body = new URLSearchParams()
  body.set('secret', recaptchaSecretKey)
  body.set('response', token)
  if (remoteIp) {
    body.set('remoteip', remoteIp)
  }

  const response = await fetch(recaptchaVerifyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!response.ok) {
    return false
  }

  const result = await response.json()
  return result.success === true
}

async function verifyRecaptcha(token, remoteIp) {
  const enterpriseConfigured = Boolean(recaptchaProjectId && recaptchaApiKey && recaptchaSiteKey)

  // CAPTCHA fully disabled if nothing is configured.
  if (!enterpriseConfigured && !recaptchaSecretKey) {
    return true
  }

  if (!token) {
    return false
  }

  if (enterpriseConfigured) {
    return verifyRecaptchaEnterprise(token)
  }

  return verifyRecaptchaLegacy(token, remoteIp)
}

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true })
})

app.post('/api/early-access', async (req, res) => {
  const firstName = typeof req.body?.firstName === 'string' ? req.body.firstName.trim() : ''
  const lastName = typeof req.body?.lastName === 'string' ? req.body.lastName.trim() : ''
  const email = typeof req.body?.email === 'string' ? req.body.email.trim() : ''
  const captchaToken = typeof req.body?.captchaToken === 'string' ? req.body.captchaToken.trim() : ''

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' })
  }

  try {
    const captchaValid = await verifyRecaptcha(captchaToken, req.ip)
    if (!captchaValid) {
      return res.status(400).json({ error: 'Captcha verification failed.' })
    }
  } catch (error) {
    console.error('Captcha verification error:', error)
    return res.status(500).json({ error: 'Captcha verification failed.' })
  }

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error('Missing SMTP configuration. Check SMTP_HOST, SMTP_USER and SMTP_PASS.')
    return res.status(500).json({ error: 'Email service is not configured.' })
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const subject = 'New VERIVAL early access signup'
  const text = [
    'A new pilot signup was submitted:',
    '',
    `First name: ${firstName}`,
    `Last name: ${lastName}`,
    `Email: ${email}`,
    '',
    `Submitted at: ${new Date().toISOString()}`,
  ].join('\n')

  try {
    const result = await transporter.sendMail({
      from: mailFrom,
      to: notifyTo,
      subject,
      text,
      replyTo: email,
    })

    console.log('Early access email sent:', {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
      response: result.response,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Failed to send early access email:', error)
    return res.status(500).json({ error: 'Failed to send email.' })
  }
})

app.listen(port, () => {
  console.log(`Early access server listening on port ${port}`)
})
