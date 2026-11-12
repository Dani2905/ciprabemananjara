export interface LocalizedText {
  fr: string;
  en: string;
}

export type SimulatorIconKey = 'office' | 'store' | 'bulb';

export interface SimulatorStep {
  id: string;
  fr: string;
  en: string;
}

export interface SimulatorProfile {
  id: string;
  icon: SimulatorIconKey;
  label: LocalizedText;
  intro: LocalizedText;
  steps: SimulatorStep[];
  focus: LocalizedText;
}

export interface AboutValue {
  id: string;
  title: LocalizedText;
  text: LocalizedText;
}

export interface ExpertiseCategoryLabel {
  slug: string;
  fr: string;
  en: string;
}

export interface SitePagesContent {
  navigation: {
    home: LocalizedText;
    about: LocalizedText;
    services: LocalizedText;
    news: LocalizedText;
    contact: LocalizedText;
    navDescriptions: {
      home: LocalizedText;
      about: LocalizedText;
      services: LocalizedText;
      news: LocalizedText;
      contact: LocalizedText;
    };
    contactCta: LocalizedText;
    contactQuestion: LocalizedText;
    country: LocalizedText;
  };
  home: {
    heroBadge: LocalizedText;
    heroTitle: LocalizedText;
    heroContactCta: LocalizedText;
    heroExpertisesCta: LocalizedText;
    areasTitle: LocalizedText;
    areasLink: LocalizedText;
    newsTitle: LocalizedText;
    newsLink: LocalizedText;
    newsEmpty: LocalizedText;
    simulator: {
      eyebrow: LocalizedText;
      title: LocalizedText;
      intro: LocalizedText;
      disclaimer: LocalizedText;
      chooseProfile: LocalizedText;
      selectedProfile: LocalizedText;
      chooseProcedure: LocalizedText;
      procedureHeading: LocalizedText;
      stepsHeading: LocalizedText;
      focusPrefix: LocalizedText;
      emptyText: LocalizedText;
      contactCta: LocalizedText;
      profiles: SimulatorProfile[];
    };
  };
  notFound: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    text: LocalizedText;
    back: LocalizedText;
  };
  newsPage: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    intro: LocalizedText;
    listLabel: LocalizedText;
    itemType: LocalizedText;
    readMore: LocalizedText;
    emptyTitle: LocalizedText;
    emptyText: LocalizedText;
    publicationNote: LocalizedText;
    backToNews: LocalizedText;
    articleEyebrow: LocalizedText;
    articleDetail: LocalizedText;
    contactEyebrow: LocalizedText;
    contactTitle: LocalizedText;
    contactIntro: LocalizedText;
    contactCta: LocalizedText;
    relatedEyebrow: LocalizedText;
    relatedTitle: LocalizedText;
    relatedLink: LocalizedText;
  };
  about: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    lead: LocalizedText;
    cardEyebrow: LocalizedText;
    cardText: LocalizedText;
    commitmentEyebrow: LocalizedText;
    commitmentTitle: LocalizedText;
    values: AboutValue[];
    ctaEyebrow: LocalizedText;
    ctaTitle: LocalizedText;
    ctaButton: LocalizedText;
  };
  expertiseOverview: {
    brandLabel: LocalizedText;
    heroEyebrow: LocalizedText;
    title: LocalizedText;
    intro: LocalizedText;
    contactCta: LocalizedText;
    exploreCta: LocalizedText;
    featureLabel: LocalizedText;
    featureTitle: LocalizedText;
    domainCountLabel: LocalizedText;
    geography: LocalizedText;
    indexEyebrow: LocalizedText;
    indexTitle: LocalizedText;
    indexIntro: LocalizedText;
    focusLabel: LocalizedText;
    previewCta: LocalizedText;
    disclaimer: LocalizedText;
    categories: ExpertiseCategoryLabel[];
  };
  contact: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    intro: LocalizedText;
    addressLabel: LocalizedText;
    address: LocalizedText;
    phoneLabel: LocalizedText;
    phone: string;
    email: string;
    emailLabel: LocalizedText;
    supportNote: LocalizedText;
    urgentNote: LocalizedText;
    formName: LocalizedText;
    formEmail: LocalizedText;
    formSubject: LocalizedText;
    formMessage: LocalizedText;
    formSend: LocalizedText;
    formPrepare: LocalizedText;
    formEmailReady: LocalizedText;
    formSending: LocalizedText;
    formSent: LocalizedText;
    formNotConfigured: LocalizedText;
    formDeliveryFailed: LocalizedText;
    formTooMany: LocalizedText;
    formApiNote: LocalizedText;
    formDemoNote: LocalizedText;
    formInvalid: LocalizedText;
  };
  footer: {
    descriptor: LocalizedText;
    note: LocalizedText;
    cta: LocalizedText;
    navigationHeading: LocalizedText;
    contactHeading: LocalizedText;
    informationHeading: LocalizedText;
    legalNotice: LocalizedText;
    privacyPolicy: LocalizedText;
    adminLink: LocalizedText;
    rightsReserved: LocalizedText;
  };
}

const text = (fr: string, en: string): LocalizedText => ({ fr, en });

export const defaultSitePagesContent: SitePagesContent = {
  navigation: {
    home: text('Accueil', 'Home'),
    about: text('Le Cabinet', 'The Firm'),
    services: text('Expertises', 'Expertise'),
    news: text('Actualités', 'News'),
    contact: text('Contact', 'Contact'),
    navDescriptions: {
      home: text('Retour à l’accueil', 'Back to home'),
      about: text('Découvrir le cabinet', 'About the firm'),
      services: text('Nos domaines d’accompagnement', 'Practice areas'),
      news: text('Actualités et analyses', 'News and insights'),
      contact: text('Entrer en contact', 'Get in touch'),
    },
    contactCta: text('Parlons de votre projet', 'Discuss your project'),
    contactQuestion: text('Un projet à protéger ?', 'A project to protect?'),
    country: text('Madagascar', 'Madagascar'),
  },
  home: {
    heroBadge: text('Accompagnement en propriété industrielle', 'Industrial property support'),
    heroTitle: text('Propriété Industrielle.', 'Industrial Property.'),
    heroContactCta: text('Parler de votre projet', 'Discuss your project'),
    heroExpertisesCta: text('Nos expertises', 'Our expertise'),
    areasTitle: text("Domaines d'intervention", 'Areas of expertise'),
    areasLink: text('Découvrir nos expertises', 'Explore our expertise'),
    newsTitle: text('Actualités du Cabinet', 'Firm news'),
    newsLink: text('Toutes les actualités', 'All news'),
    newsEmpty: text('Les actualités seront bientôt disponibles.', 'News will be available soon.'),
    simulator: {
      eyebrow: text('Simulateur de procédure', 'Procedure guide'),
      title: text('Les étapes de procédure selon votre profil.', 'Procedural steps for your profile.'),
      intro: text('Choisissez votre profil pour découvrir les principales étapes à envisager. Le parcours exact dépendra du droit concerné et de votre dossier.', 'Choose your profile to see the main steps to consider. The exact process depends on the relevant rights and your matter.'),
      disclaimer: text('Outil pédagogique général — les formalités, délais et frais doivent être confirmés pour chaque dossier. Cette présentation ne remplace pas un avis juridique.', 'General educational tool — formalities, deadlines and fees must be confirmed for each matter. This is not legal advice.'),
      chooseProfile: text('Choisissez votre profil', 'Select your profile'),
      selectedProfile: text('Profil sélectionné', 'Selected profile'),
      chooseProcedure: text('Voir la procédure', 'View process'),
      procedureHeading: text('Parcours procédural indicatif', 'Indicative procedural pathway'),
      stepsHeading: text('Étapes principales', 'Main steps'),
      focusPrefix: text('Point de vigilance : ', 'Important: '),
      emptyText: text('Sélectionnez un profil pour afficher les étapes de procédure.', 'Select a profile to see procedural steps.'),
      contactCta: text('Vérifier la procédure de mon dossier', 'Review the process for my matter'),
      profiles: [
        {
          id: 'international', icon: 'office',
          label: text('Entreprise internationale', 'International company'),
          intro: text('Pour une entreprise présente dans plusieurs pays, la procédure commence par une vue d’ensemble des actifs, des entités propriétaires et des territoires concernés. Les démarches doivent ensuite être coordonnées selon le type de droit et les règles de chaque pays ou organisme.', 'For a business operating in several countries, the procedure starts with an overview of its assets, owning entities and relevant territories. Steps are then coordinated according to the type of right and the rules of each country or authority.'),
          steps: [
            { id: 'step-1', fr: 'Inventorier les marques, inventions, dessins et modèles ainsi que leurs titulaires.', en: 'Inventory trademarks, inventions, designs and their owners.' },
            { id: 'step-2', fr: 'Définir les pays et territoires prioritaires pour chaque actif.', en: 'Set priority countries and territories for each asset.' },
            { id: 'step-3', fr: 'Vérifier les droits existants, les contrats et les éventuelles divulgations antérieures.', en: 'Review existing rights, agreements and any prior disclosures.' },
            { id: 'step-4', fr: 'Choisir, avec le Cabinet, la voie de dépôt ou de protection applicable à chaque territoire.', en: 'Choose, with the firm, the filing or protection route applicable to each territory.' },
            { id: 'step-5', fr: 'Rassembler les pièces et informations requises, puis déposer auprès des organismes compétents ou par l’intermédiaire des correspondants locaux.', en: 'Gather required information and documents, then file with competent authorities or through local correspondents.' },
            { id: 'step-6', fr: 'Suivre les formalités, demandes de précisions, décisions et échéances propres à chaque dossier.', en: 'Track formalities, requests for information, decisions and matter-specific dates.' },
          ],
          focus: text('Une protection dans un pays ne signifie pas automatiquement une protection dans les autres pays. Le périmètre doit être vérifié dossier par dossier.', 'Protection in one country does not automatically mean protection in others. Scope must be checked for each matter.'),
        },
        {
          id: 'sme', icon: 'store',
          label: text('PME malgache', 'Malagasy SME'),
          intro: text('Pour une PME qui développe son activité à Madagascar, la procédure consiste d’abord à identifier ce qu’elle souhaite protéger et qui en détient les droits. Le Cabinet peut ensuite aider à préparer les démarches adaptées aux actifs et marchés visés.', 'For an SME growing its activity in Madagascar, the process first involves identifying what it wants to protect and who owns the rights. The firm can then help prepare steps suited to the relevant assets and markets.'),
          steps: [
            { id: 'step-1', fr: 'Identifier l’actif concerné : nom ou logo, création visuelle, invention ou autre élément distinctif.', en: 'Identify the asset: a name or logo, visual creation, invention or other distinctive element.' },
            { id: 'step-2', fr: 'Préciser le titulaire prévu, les produits ou services concernés et les territoires visés.', en: 'Specify the intended owner, relevant goods or services and target territories.' },
            { id: 'step-3', fr: 'Vérifier les informations et documents disponibles, y compris les contrats avec salariés ou prestataires.', en: 'Review available information and documents, including agreements with employees or contractors.' },
            { id: 'step-4', fr: 'Examiner les droits antérieurs et déterminer les démarches à envisager auprès de l’organisme compétent.', en: 'Check prior rights and determine which steps to consider with the competent authority.' },
            { id: 'step-5', fr: 'Préparer et déposer le dossier avec les pièces requises pour la procédure retenue.', en: 'Prepare and submit the application with the documents required for the selected procedure.' },
            { id: 'step-6', fr: 'Suivre les notifications, répondre aux demandes dans les délais applicables et conserver les preuves de dépôt et décisions.', en: 'Track notices, respond within applicable time limits and keep filing receipts and decisions.' },
          ],
          focus: text('Les pièces, formalités, frais et délais varient selon le type de droit et la procédure. Ils doivent être confirmés pour votre dossier avant le dépôt.', 'Documents, formalities, fees and time limits vary by right and procedure. Confirm them for your matter before filing.'),
        },
        {
          id: 'inventor', icon: 'bulb',
          label: text('Inventeur', 'Inventor'),
          intro: text('Pour un inventeur, la première étape est de documenter la solution et les personnes qui y ont contribué, tout en examinant les divulgations déjà faites ou prévues. Cela permet d’évaluer la procédure de protection à envisager avant de communiquer davantage sur l’invention.', 'For an inventor, the first step is to document the solution and its contributors while reviewing disclosures already made or planned. This helps assess which protection process to consider before sharing more about the invention.'),
          steps: [
            { id: 'step-1', fr: 'Préserver la confidentialité et noter toute présentation, publication, vente ou démonstration déjà réalisée.', en: 'Preserve confidentiality and note any presentation, publication, sale or demonstration already made.' },
            { id: 'step-2', fr: 'Décrire le problème technique, la solution, son fonctionnement et les variantes connues.', en: 'Describe the technical problem, solution, how it works and known variations.' },
            { id: 'step-3', fr: 'Identifier les inventeurs, le titulaire prévu et les contrats ou financements liés au projet.', en: 'Identify inventors, the intended owner and agreements or funding connected to the project.' },
            { id: 'step-4', fr: 'Faire examiner les options de protection et les droits antérieurs pertinents.', en: 'Review protection options and relevant prior rights.' },
            { id: 'step-5', fr: 'Préparer la description, les dessins et les autres pièces nécessaires au dossier choisi.', en: 'Prepare the description, drawings and other documents needed for the selected matter.' },
            { id: 'step-6', fr: 'Déposer avant toute divulgation lorsque cela est nécessaire, puis suivre l’examen et les réponses à fournir.', en: 'File before disclosure where required, then monitor examination and any responses due.' },
            { id: 'step-7', fr: 'Noter les échéances et obligations à suivre après le dépôt ou l’obtention d’un droit.', en: 'Record dates and obligations to follow after filing or grant.' },
          ],
          focus: text('Une divulgation publique peut affecter les options disponibles. Avant un pitch, un salon ou une publication, demandez conseil sur le calendrier et la confidentialité.', 'Public disclosure may affect available options. Before a pitch, trade show or publication, seek advice on timing and confidentiality.'),
        },
      ],
    },
  },
  notFound: {
    eyebrow: text('Erreur 404', 'Error 404'),
    title: text('Page introuvable', 'Page not found'),
    text: text('La page que vous cherchez n’existe pas ou a été déplacée.', 'The page you are looking for does not exist or may have moved.'),
    back: text('Retour à l’accueil', 'Back to home'),
  },
  newsPage: {
    eyebrow: text('Journal', 'Journal'),
    title: text('Actualités & éclairages.', 'News & insights.'),
    intro: text('Les dernières nouvelles et ressources du Cabinet autour de la propriété industrielle.', 'The latest firm news and resources on industrial property.'),
    listLabel: text('Liste des actualités', 'News list'),
    itemType: text('Actualité', 'Update'),
    readMore: text('Lire le détail', 'Read article'),
    emptyTitle: text('Aucune actualité publiée pour le moment.', 'No news has been published yet.'),
    emptyText: text('Les actualités seront bientôt disponibles.', 'News will be available soon.'),
    publicationNote: text('Les actualités fournies dans cette version sont des exemples et doivent être vérifiées avant publication.', 'The news items supplied in this version are examples and should be verified before publication.'),
    backToNews: text('Retour aux actualités', 'Back to news'),
    articleEyebrow: text('Actualités & éclairages', 'News & insights'),
    articleDetail: text('Détail de l’actualité', 'Article details'),
    contactEyebrow: text('Une question ?', 'Have a question?'),
    contactTitle: text('Échangez avec le Cabinet.', 'Talk to the firm.'),
    contactIntro: text('Contactez-nous pour discuter de votre situation.', 'Contact us to discuss your situation.'),
    contactCta: text('Nous contacter', 'Contact us'),
    relatedEyebrow: text('À lire également', 'Related articles'),
    relatedTitle: text('Autres actualités', 'More news'),
    relatedLink: text('Tout voir', 'View all'),
  },
  about: {
    eyebrow: text('Le Cabinet', 'The Firm'),
    title: text('Protéger la valeur de vos idées.', 'Protecting the value of your ideas.'),
    lead: text('Le Cabinet Rabemananjara accompagne les acteurs qui souhaitent identifier, protéger et valoriser leurs actifs de propriété industrielle.', 'Cabinet Rabemananjara supports people and organisations seeking to identify, protect and make the most of their industrial property.'),
    cardEyebrow: text('C.IP · Madagascar', 'C.IP · Madagascar'),
    cardText: text('Une expertise au service de vos projets.', 'Expertise in service of your ambitions.'),
    commitmentEyebrow: text('Notre engagement', 'Our commitment'),
    commitmentTitle: text('Un accompagnement pensé pour durer.', 'Guidance designed for the long term.'),
    values: [
      { id: 'clarity', title: text('Une vision claire', 'A clear view'), text: text('Des explications accessibles pour mieux comprendre les options qui s’offrent à votre projet.', 'Clear explanations to help you understand the options available for your project.') },
      { id: 'listening', title: text('Une écoute attentive', 'Attentive listening'), text: text('Un accompagnement construit à partir de vos objectifs, de votre activité et de vos contraintes.', 'Guidance shaped around your goals, your business and your constraints.') },
      { id: 'rigor', title: text('Une approche rigoureuse', 'A considered approach'), text: text('Une attention portée aux étapes, aux délais et aux éléments qui soutiennent vos droits.', 'Careful attention to process, timing and the materials that support your rights.') },
    ],
    ctaEyebrow: text('Un premier échange', 'A first conversation'),
    ctaTitle: text('Parlons des prochaines étapes.', 'Let’s discuss the next steps.'),
    ctaButton: text('Nous contacter', 'Contact us'),
  },
  expertiseOverview: {
    brandLabel: text('Propriété industrielle', 'Industrial property'),
    heroEyebrow: text('Nos expertises', 'Our expertise'),
    title: text('Vos idées méritent une procédure de protection claire.', 'Your ideas deserve a clear protection process.'),
    intro: text('De la première recherche à la valorisation de vos actifs, trouvez l’accompagnement adapté à votre projet, à votre activité et aux territoires concernés.', 'From an initial search to the commercial use of your assets, find guidance suited to your project, business and target territories.'),
    contactCta: text('Parler de votre projet', 'Discuss your project'),
    exploreCta: text('Explorer les domaines', 'Explore the areas'),
    featureLabel: text('Un accompagnement sur mesure', 'Guidance tailored to your needs'),
    featureTitle: text('domaines d’expertise', 'areas of expertise'),
    domainCountLabel: text('territoires concernés', 'target territories'),
    geography: text('Madagascar & territoires visés', 'Madagascar & target territories'),
    indexEyebrow: text('Index des domaines', 'Practice index'),
    indexTitle: text('Choisissez le sujet qui vous concerne.', 'Choose the area that concerns you.'),
    indexIntro: text('Survolez ou sélectionnez un domaine pour en voir un aperçu, puis ouvrez sa page dédiée.', 'Hover over or select an area for a preview, then open its dedicated page.'),
    focusLabel: text('À la une', 'In focus'),
    previewCta: text('Voir la page dédiée', 'View dedicated page'),
    disclaimer: text('Les démarches et protections envisageables dépendent du dossier et des territoires concernés.', 'Available procedures and protections depend on the matter and relevant territories.'),
    categories: [
      { slug: 'marques', fr: 'Identité', en: 'Identity' },
      { slug: 'brevets', fr: 'Innovation', en: 'Innovation' },
      { slug: 'dessins', fr: 'Création', en: 'Creation' },
      { slug: 'contentieux', fr: 'Défense', en: 'Dispute resolution' },
      { slug: 'contrats', fr: 'Valorisation', en: 'Commercialisation' },
      { slug: 'indications-geographiques', fr: 'Terroir', en: 'Origin & place' },
      { slug: 'noms-commerciaux', fr: 'Entreprise', en: 'Business' },
    ],
  },
  contact: {
    eyebrow: text('Restons en contact', 'Get in touch'),
    title: text('Parlons de votre projet', 'Let’s discuss your project'),
    intro: text('Présentez-nous votre projet via le formulaire ou contactez le Cabinet à Antananarivo.', 'Tell us about your project using the form or contact the firm in Antananarivo.'),
    addressLabel: text('Adresse', 'Address'),
    address: text('Antananarivo, Madagascar', 'Antananarivo, Madagascar'),
    phoneLabel: text('Téléphone', 'Phone'),
    phone: '+261 34 09 489 61',
    email: 'contact@rabemananjara.mg',
    emailLabel: text('Courriel', 'Email'),
    supportNote: text('Accompagnement pour des projets à Madagascar et à l’international.', 'Support for projects in Madagascar and internationally.'),
    urgentNote: text('Pour une demande urgente, contactez directement le Cabinet au +261 34 09 489 61.', 'For urgent enquiries, contact the firm directly on +261 34 09 489 61.'),
    formName: text('Nom', 'Name'),
    formEmail: text('Adresse e-mail', 'Email address'),
    formSubject: text('Sujet', 'Subject'),
    formMessage: text('Votre message', 'Your message'),
    formSend: text('Envoyer la demande', 'Send request'),
    formPrepare: text('Préparer un courriel', 'Prepare an email'),
    formEmailReady: text('Votre logiciel de messagerie va s’ouvrir pour vous permettre d’envoyer votre demande.', 'Your email application will open so you can send your request.'),
    formSending: text('Envoi en cours…', 'Sending…'),
    formSent: text('Votre demande a été transmise au service de messagerie du Cabinet.', 'Your request has been handed to the firm’s email service.'),
    formNotConfigured: text('L’envoi du formulaire n’est pas encore configuré. Utilisez l’adresse e-mail affichée ci-dessus.', 'Contact-form email delivery is not configured yet. Use the email address shown above.'),
    formDeliveryFailed: text('Impossible de transmettre votre demande pour le moment. Réessayez plus tard ou écrivez directement au Cabinet.', 'We could not send your request right now. Please try again later or email the firm directly.'),
    formTooMany: text('Trop de tentatives. Patientez avant de réessayer.', 'Too many attempts. Please wait before trying again.'),
    formApiNote: text('Le formulaire transmet la demande par e-mail au Cabinet. Pour les informations confidentielles, contactez le Cabinet directement par téléphone.', 'The form sends your request to the firm by email. For confidential information, contact the firm directly by phone.'),
    formDemoNote: text('En mode aperçu, le bouton ouvre votre logiciel de messagerie; le site ne reçoit pas le message.', 'In preview mode, this button opens your email application; the website does not receive the message.'),
    formInvalid: text('Vérifie les champs et réessaie. Le message doit comporter au moins cinq caractères.', 'Check the fields and try again. The message must contain at least five characters.'),
  },
  footer: {
    descriptor: text('Conseil en propriété industrielle', 'Industrial property counsel'),
    note: text('Les informations de ce site sont générales et ne remplacent pas un conseil juridique adapté à votre situation.', 'Information on this website is general and is not a substitute for legal advice tailored to your circumstances.'),
    cta: text('Parlons de votre projet', 'Discuss your project'),
    navigationHeading: text('Navigation', 'Explore'),
    contactHeading: text('Contact', 'Get in touch'),
    informationHeading: text('Informations', 'Information'),
    legalNotice: text('Mentions légales', 'Legal notice'),
    privacyPolicy: text('Confidentialité', 'Privacy policy'),
    adminLink: text('Administration', 'Administration'),
    rightsReserved: text('Tous droits réservés.', 'All rights reserved.'),
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function mergeKnownShape(defaults: unknown, saved: unknown): unknown {
  if (typeof defaults === 'string') return typeof saved === 'string' ? saved : defaults;
  if (Array.isArray(defaults)) {
    if (!Array.isArray(saved)) return structuredClone(defaults);
    const sample = defaults[0];
    if (sample === undefined) return structuredClone(saved);
    return saved
      .filter((item) => typeof item === 'object' && item !== null && !Array.isArray(item))
      .map((item) => mergeKnownShape(sample, item));
  }
  if (isRecord(defaults)) {
    const source = isRecord(saved) ? saved : {};
    return Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, mergeKnownShape(value, source[key])]));
  }
  return saved ?? defaults;
}

const STORAGE_KEY = 'sitePagesContentV1';

function withHardcodedSections(content: SitePagesContent): SitePagesContent {
  const defaults = defaultSitePagesContent;
  return {
    ...content,
    navigation: {
      ...content.navigation,
      services: structuredClone(defaults.navigation.services),
      navDescriptions: {
        ...content.navigation.navDescriptions,
        services: structuredClone(defaults.navigation.navDescriptions.services),
      },
    },
    home: {
      ...content.home,
      heroExpertisesCta: structuredClone(defaults.home.heroExpertisesCta),
      areasTitle: structuredClone(defaults.home.areasTitle),
      areasLink: structuredClone(defaults.home.areasLink),
      simulator: structuredClone(defaults.home.simulator),
    },
    expertiseOverview: structuredClone(defaults.expertiseOverview),
    footer: {
      ...content.footer,
      legalNotice: structuredClone(defaults.footer.legalNotice),
      privacyPolicy: structuredClone(defaults.footer.privacyPolicy),
    },
  };
}

export function getSitePagesContent(): SitePagesContent {
  if (typeof window === 'undefined') return structuredClone(defaultSitePagesContent);
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredClone(defaultSitePagesContent);
    return withHardcodedSections(mergeKnownShape(defaultSitePagesContent, JSON.parse(saved)) as SitePagesContent);
  } catch (error) {
    console.error('Failed to parse general page content from localStorage.', error);
    return structuredClone(defaultSitePagesContent);
  }
}

export function saveSitePagesContent(content: SitePagesContent): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(withHardcodedSections(content)));
  window.dispatchEvent(new Event('sitePagesUpdated'));
}
