import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      nav: { home: 'Accueil', about: 'Le Cabinet', services: 'Expertises', news: 'Actualités', contact: 'Contact', admin: 'Administration démo' },
      home: {
        hero: {
          desc: 'Le Cabinet Rabemananjara vous accompagne dans la protection et la valorisation de vos actifs de propriété industrielle, à Madagascar et dans les territoires concernés.',
          cta_contact: 'Parler de votre projet',
          cta_services: 'Nos expertises',
        },
        areas: "Domaines d'intervention",
        areas_link: 'Découvrir nos expertises',
        news: 'Actualités du Cabinet',
        news_link: 'Toutes les actualités',
        news_empty: 'Les actualités seront bientôt disponibles.',
      },
      expertises: {
        services: {
          marques: { title: 'Marques & signes distinctifs', desc: 'Votre nom, votre logo ou votre signe distinctif aide les clients à vous reconnaître. Nous vous aidons à examiner sa disponibilité, le périmètre des produits et services et les territoires à prioriser.' },
          brevets: { title: "Brevets d'invention", desc: 'Une innovation technique mérite une stratégie préparée avant toute divulgation. Nous vous aidons à structurer les informations, repérer les points à examiner et organiser les prochaines étapes.' },
          dessins: { title: 'Dessins & modèles', desc: 'La forme et l’apparence d’un produit peuvent participer à sa différenciation. Nous vous aidons à documenter la création et à examiner les options selon vos marchés.' },
          contentieux: { title: 'Contentieux & litiges', desc: 'Face à une atteinte présumée, l’analyse des droits, des faits et des preuves aide à choisir une réponse proportionnée. Nous vous accompagnons dans l’évaluation des options.' },
          contrats: { title: 'Audits & contrats', desc: 'Clarifiez qui détient, utilise ou concède vos actifs immatériels. Nous vous accompagnons dans la revue des accords et des points de propriété intellectuelle à discuter.' },
        },
      },
      footer: { note: 'Les informations de ce site sont générales et ne remplacent pas un conseil juridique adapté à votre situation.' },
      contact: {
        eyebrow: 'Restons en contact', title: 'Parlons de votre projet', intro: 'Présentez-nous votre projet via le formulaire ou contactez le Cabinet à Antananarivo.',
        name: 'Nom', email: 'Adresse e-mail', subject: 'Sujet', message: 'Votre message', send: 'Envoyer la demande', prepare: 'Préparer un courriel', sending: 'Envoi en cours…',
        email_missing: "L’adresse e-mail publique est modifiable dans l’Admin; le destinataire réel se configure sur le serveur.",
        email_ready: 'Votre application de messagerie va préparer le message.',
        sent: 'Votre demande a été transmise au service de messagerie du Cabinet.',
        not_configured: 'L’envoi du formulaire n’est pas encore configuré. Utilisez l’adresse e-mail affichée ci-dessus.',
        delivery_failed: 'Impossible de transmettre votre demande pour le moment. Réessayez plus tard ou écrivez directement au Cabinet.',
        too_many: 'Trop de tentatives. Patientez avant de réessayer.',
        api_note: 'Le formulaire transmet la demande par e-mail au Cabinet. Pour les informations confidentielles, contactez le Cabinet directement par téléphone.',
        demo_note: 'En mode aperçu, le bouton ouvre votre logiciel de messagerie; le site ne reçoit pas le message.',
      },
      not_found: { title: 'Page introuvable', text: "Cette adresse ne correspond à aucune page du site.", back: "Retour à l'accueil" },
    },
  },
  en: {
    translation: {
      nav: { home: 'Home', about: 'The Firm', services: 'Expertise', news: 'News', contact: 'Contact', admin: 'Demo admin' },
      home: {
        hero: {
          desc: 'Cabinet Rabemananjara supports the protection and strategic use of your industrial property assets in Madagascar and the relevant territories.',
          cta_contact: 'Discuss your project',
          cta_services: 'Our expertise',
        },
        areas: 'Areas of expertise',
        areas_link: 'Explore our expertise',
        news: 'Firm news',
        news_link: 'All news',
        news_empty: 'News will be available soon.',
      },
      expertises: {
        services: {
          marques: { title: 'Trademarks & distinctive signs', desc: 'Your name, logo or distinctive sign helps customers recognise your business. We help review availability, goods and services, and the territories to prioritise.' },
          brevets: { title: 'Patents', desc: 'A technical innovation deserves a strategy before disclosure. We help structure the information, identify points to review and organise the next steps.' },
          dessins: { title: 'Industrial designs', desc: 'A product’s form and appearance can set it apart. We help document the creation and explore options in light of your target markets.' },
          contentieux: { title: 'Disputes & litigation', desc: 'When infringement is suspected, reviewing rights, facts and evidence helps shape a proportionate response. We help assess the options.' },
          contrats: { title: 'Audits & agreements', desc: 'Clarify who owns, uses or licenses your intangible assets. We help review agreements and identify intellectual-property points to address.' },
        },
      },
      footer: { note: 'Information on this website is general and is not a substitute for legal advice tailored to your circumstances.' },
      contact: {
        eyebrow: 'Get in touch', title: 'Let’s discuss your project', intro: 'Tell us about your project using the form or contact the firm in Antananarivo.',
        name: 'Name', email: 'Email address', subject: 'Subject', message: 'Your message', send: 'Send request', prepare: 'Prepare an email', sending: 'Sending…',
        email_missing: 'The public email address can be changed in Admin; the actual recipient is configured on the server.',
        email_ready: 'Your email application will prepare the message.',
        sent: 'Your request has been handed to the firm’s email service.',
        not_configured: 'Contact-form email delivery is not configured yet. Use the email address shown above.',
        delivery_failed: 'We could not send your request right now. Please try again later or email the firm directly.',
        too_many: 'Too many attempts. Please wait before trying again.',
        api_note: 'The form sends your request to the firm by email. For confidential information, contact the firm directly by phone.',
        demo_note: 'In preview mode, this button opens your email application; the website does not receive the message.',
      },
      not_found: { title: 'Page not found', text: 'This address does not match a page on the website.', back: 'Back to home' },
    },
  },
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'cpi-language',
    },
  });

i18n.on('languageChanged', (language) => {
  if (typeof document !== 'undefined') document.documentElement.lang = language.startsWith('en') ? 'en' : 'fr';
});

export default i18n;
