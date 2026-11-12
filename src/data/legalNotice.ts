export interface LocalizedNoticeText {
  fr: string;
  en: string;
}

export interface LegalNoticeBlock {
  id: string;
  adminLabel: string;
  titleFr: string;
  titleEn: string;
  bodyFr: string;
  bodyEn: string;
}

export interface LegalNoticeContent {
  /** ISO date; updated automatically when the Admin saves this page. */
  updatedAt: string;
  /** Legal-notice email, kept separate from the site's general contact email. */
  email: string;
  accreditation: LocalizedNoticeText;
  contact: LocalizedNoticeText;
  hostingProvider: LocalizedNoticeText;
  hostingPhone: string;
  hostingWebsite: string;
  pageEyebrow: LocalizedNoticeText;
  pageTitle: LocalizedNoticeText;
  updatedLabel: LocalizedNoticeText;
  draftNotice: LocalizedNoticeText;
  blocks: LegalNoticeBlock[];
}

const localized = (fr: string, en: string): LocalizedNoticeText => ({ fr, en });

export const defaultLegalNoticeContent: LegalNoticeContent = {
  updatedAt: '2026-10-26',
  // Kept from the legal information supplied by the Cabinet; editable in Admin.
  email: 'info@cip-rabemananjara.mg',
  accreditation: localized(
    'Ando Fanantenana RABEMANANJARA figure sur la liste officielle des représentants en propriété industrielle agréés par l’OMAPI pour l’année 2026, en qualité de mandataire et conseil en propriété industrielle.',
    'Ando Fanantenana RABEMANANJARA is listed on OMAPI’s official 2026 register of accredited industrial property representatives as an industrial property agent and counsel.',
  ),
  contact: localized(
    'Téléphone : +261 34 09 489 61\nAdresse : N 35 Ambohidrazaka, Alasora, Antananarivo 103, Madagascar',
    'Telephone: +261 34 09 489 61\nAddress: N 35 Ambohidrazaka, Alasora, Antananarivo 103, Madagascar',
  ),
  hostingProvider: localized(
    'Tranokala (filiale de 3AS Company)\nVI 30 Ambatovinaky, près du Ministère de l’Eau et de l’Assainissement, Antananarivo 101, Madagascar',
    'Tranokala (a subsidiary of 3AS Company)\nVI 30 Ambatovinaky, near the Ministry of Water and Sanitation, Antananarivo 101, Madagascar',
  ),
  hostingPhone: '+261 34 41 189 33',
  hostingWebsite: 'https://tranokala.pro/',
  pageEyebrow: localized('Informations', 'Information'),
  pageTitle: localized('Mentions légales', 'Legal notice'),
  updatedLabel: localized('Dernière mise à jour :', 'Last updated:'),
  draftNotice: localized(
    'Projet de mentions légales à relire et à valider par le Cabinet avant publication, notamment pour les coordonnées, les assurances et les clauses juridiques.',
    'Draft legal notice. The firm should review and approve it before publication, particularly the contact details, insurance information and legal clauses.',
  ),
  blocks: [
    {
      id: 'company', adminLabel: 'Informations sur l’entreprise',
      titleFr: 'Informations sur l’entreprise', titleEn: 'Company information',
      bodyFr: 'Raison sociale : Cabinet C.IP RABEMANANJARA\nStatut juridique : Cabinet individuel de propriété industrielle\nAdresse : N 35 Ambohidrazaka, Alasora, Antananarivo 103, Madagascar\nTéléphone : +261 34 09 489 61\nE-mail : {{email}}\nReprésentante : Ando Fanantenana RABEMANANJARA',
      bodyEn: 'Legal name: Cabinet C.IP RABEMANANJARA\nLegal status: Individual industrial property practice\nAddress: N 35 Ambohidrazaka, Alasora, Antananarivo 103, Madagascar\nTelephone: +261 34 09 489 61\nEmail: {{email}}\nRepresentative: Ando Fanantenana RABEMANANJARA',
    },
    {
      id: 'registration', adminLabel: 'Enregistrement et autorisations',
      titleFr: 'Enregistrement et autorisations', titleEn: 'Registration and authorisations',
      bodyFr: 'Mandataire agréé OMAPI : {{accreditation}}\nConsulter la liste officielle : http://www.omapi.mg/listes_des_mandataires.html\nSpécialisation : Propriété industrielle et droit des affaires.\nAssurance RCP : Souscrite auprès d’Assurance ARO (information communiquée par le Cabinet).',
      bodyEn: 'OMAPI-accredited representative: {{accreditation}}\nView OMAPI’s official list: http://www.omapi.mg/listes_des_mandataires.html\nSpecialisation: Industrial property and business law.\nProfessional liability insurance: Held with Assurance ARO (information supplied by the firm).',
    },
    {
      id: 'publication', adminLabel: 'Directeur de publication',
      titleFr: 'Directeur de publication', titleEn: 'Publication director',
      bodyFr: 'Nom : Ando Fanantenana RABEMANANJARA\nFonction : Gérant du Cabinet\nContact : {{email}}',
      bodyEn: 'Name: Ando Fanantenana RABEMANANJARA\nPosition: Managing Director of the firm\nContact: {{email}}',
    },
    {
      id: 'hosting', adminLabel: 'Hébergement du site',
      titleFr: 'Hébergement du site', titleEn: 'Website hosting',
      bodyFr: 'Hébergeur et adresse :\n{{hostingProvider}}\nTéléphone : {{hostingPhone}}\nSite web : {{hostingWebsite}}',
      bodyEn: 'Host and address:\n{{hostingProvider}}\nTelephone: {{hostingPhone}}\nWebsite: {{hostingWebsite}}',
    },
    {
      id: 'intellectual-property', adminLabel: 'Propriété intellectuelle',
      titleFr: 'Propriété intellectuelle', titleEn: 'Intellectual property',
      bodyFr: 'Les textes, mises en page et créations réalisés par le Cabinet sont protégés par les droits applicables. Les marques, logos, icônes, polices, photographies et autres contenus de tiers restent soumis aux droits de leurs titulaires et aux licences correspondantes. Toute réutilisation doit respecter ces droits et, lorsque nécessaire, faire l’objet d’une autorisation préalable.',
      bodyEn: 'Texts, page layouts and creative works produced by the firm are protected by applicable rights. Trademarks, logos, icons, fonts, photographs and other third-party materials remain subject to their owners’ rights and applicable licences. Any reuse must respect those rights and, where required, obtain prior permission.',
    },
    {
      id: 'personal-data', adminLabel: 'Protection des données personnelles',
      titleFr: 'Protection des données personnelles', titleEn: 'Personal data protection',
      bodyFr: 'En mode serveur, le formulaire public transmet les demandes par e-mail au Cabinet et ne les conserve pas dans une boîte de réception de l’Admin. L’envoi effectif dépend de la configuration du service de messagerie. Dans l’aperçu local, le formulaire prépare un courriel dans le logiciel de messagerie du visiteur. Consultez la Politique de confidentialité pour plus d’informations.',
      bodyEn: 'In server mode, the public form sends enquiries to the firm by email and does not store them in an Admin inbox. Actual delivery depends on the email service being configured. In local preview, the form prepares an email in the visitor’s email application. See the Privacy Policy for more information.',
    },
    {
      id: 'cookies', adminLabel: 'Cookies et stockage local',
      titleFr: 'Cookies et stockage local', titleEn: 'Cookies and local storage',
      bodyFr: 'À la date de cette mise à jour, aucun outil de mesure d’audience ni cookie publicitaire ou de suivi n’est configuré dans le site. La préférence de langue et certains contenus temporaires peuvent être conservés dans le stockage local du navigateur (localStorage), qui est distinct des cookies. Toute mise en place ultérieure de cookies ou d’outils tiers devra être reflétée dans la politique de confidentialité.',
      bodyEn: 'As of this update, the website has no configured audience-measurement tools or advertising/tracking cookies. The language preference and some temporary content may be stored in the browser’s local storage, which is different from cookies. Any later use of cookies or third-party tools must be reflected in the privacy policy.',
    },
    {
      id: 'liability', adminLabel: 'Limitation de responsabilité',
      titleFr: 'Limitation de responsabilité', titleEn: 'Limitation of liability',
      bodyFr: 'Les informations publiées sur ce site sont générales et fournies à titre indicatif. Elles ne constituent pas un conseil juridique personnalisé. Le Cabinet ne peut garantir l’absence d’erreurs ou d’interruptions et sa responsabilité s’apprécie conformément au droit applicable.',
      bodyEn: 'Information on this website is general and provided for information only. It is not legal advice tailored to an individual matter. The firm cannot guarantee that the website will be error-free or uninterrupted; any liability is assessed under applicable law.',
    },
    {
      id: 'law', adminLabel: 'Droit applicable',
      titleFr: 'Droit applicable', titleEn: 'Applicable law',
      bodyFr: 'Le site est régi par le droit malgache. Sous réserve des règles impératives applicables, tout différend relève des juridictions compétentes d’Antananarivo.',
      bodyEn: 'This website is governed by Malagasy law. Subject to mandatory applicable rules, disputes fall within the jurisdiction of the competent courts in Antananarivo.',
    },
    {
      id: 'contact', adminLabel: 'Contact',
      titleFr: 'Contact', titleEn: 'Contact',
      bodyFr: '{{contact}}\nE-mail : {{email}}',
      bodyEn: '{{contact}}\nEmail: {{email}}',
    },
  ],
};

/** Legal notice copy is bundled in code and intentionally not editable in Admin. */
export function getLegalNoticeContent(): LegalNoticeContent {
  return structuredClone(defaultLegalNoticeContent);
}
