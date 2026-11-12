const { randomUUID } = require('node:crypto');
const { Router } = require('express');
const { rateLimit } = require('express-rate-limit');
const nodemailer = require('nodemailer');
const { config, hasContactMailConfiguration } = require('./config');
const { requireSameOrigin } = require('./security');

const contactRouter = Router();
let mailTransport;

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'too_many_contact_requests' },
});

function textField(value, { allowNewlines = false } = {}) {
  if (typeof value !== 'string') return '';
  const normalized = allowNewlines
    ? value.replace(/\r\n?/g, '\n').replace(/\0/g, '')
    : value.replace(/[\r\n\0]/g, ' ');
  return normalized.trim();
}

function isEmail(value) {
  return typeof value === 'string'
    && value.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getMailTransport() {
  if (!mailTransport) {
    mailTransport = nodemailer.createTransport({
      host: config.contact.smtpHost,
      port: config.contact.smtpPort,
      secure: config.contact.smtpSecure,
      auth: {
        user: config.contact.smtpUser,
        pass: config.contact.smtpPassword,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
      tls: { minVersion: 'TLSv1.2' },
    });
  }
  return mailTransport;
}

contactRouter.post('/public/contact', requireSameOrigin, contactLimiter, async (request, response) => {
  const incoming = request.body && typeof request.body === 'object' && !Array.isArray(request.body)
    ? request.body
    : {};

  // Quietly accept a filled honeypot without sending mail, so automated submitters do not learn the check.
  if (typeof incoming.website === 'string' && incoming.website.trim()) {
    return response.status(202).json({ accepted: true });
  }

  const name = textField(incoming.name);
  const email = textField(incoming.email).toLowerCase();
  const subject = textField(incoming.subject);
  const message = textField(incoming.message, { allowNewlines: true });

  if (
    !name || name.length > 120
    || !isEmail(email)
    || !subject || subject.length > 180
    || message.length < 5 || message.length > 5_000
  ) {
    return response.status(400).json({ error: 'invalid_contact_request' });
  }

  if (
    !hasContactMailConfiguration()
    || !isEmail(config.contact.recipientEmail)
    || !isEmail(config.contact.senderEmail)
  ) {
    return response.status(503).json({ error: 'contact_not_configured' });
  }

  const reference = randomUUID().slice(0, 8).toUpperCase();
  const text = [
    'Nouvelle demande envoyée depuis le formulaire de contact du site C.IP Rabemananjara.',
    `Référence : ${reference}`,
    '',
    `Nom : ${name}`,
    `Adresse e-mail : ${email}`,
    `Sujet : ${subject}`,
    '',
    'Message :',
    message,
  ].join('\n');

  try {
    await getMailTransport().sendMail({
      from: { name: 'Site C.IP Rabemananjara', address: config.contact.senderEmail },
      to: config.contact.recipientEmail,
      replyTo: { name, address: email },
      subject: `[Contact C.IP ${reference}] ${subject}`,
      text,
      headers: { 'X-Contact-Reference': reference },
    });
    return response.status(202).json({ accepted: true, reference });
  } catch (error) {
    // Never log the message body, sender address, credentials, or raw SMTP response.
    console.error('Contact email delivery failed:', error?.name ?? 'UnknownError');
    return response.status(503).json({ error: 'contact_delivery_failed' });
  }
});

module.exports = { contactRouter };
