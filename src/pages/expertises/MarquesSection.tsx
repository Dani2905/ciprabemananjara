import { Link } from 'react-router-dom';
import type { ExpertiseContentItem } from '../../data/expertiseContent';
import {
  ArrowUpRightIcon,
  ArrowPathIcon,
  DocumentArrowUpIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const trademarkServices = [
  {
    icon: MagnifyingGlassIcon,
    fr: {
      title: "Recherche d'antériorité",
      description: 'Analyse des bases de données et sources pertinentes pour repérer les signes antérieurs et éclairer la disponibilité de votre marque.',
      tags: ['OMAPI', 'OMPI / WIPO', 'Sources concurrentielles'],
    },
    en: {
      title: 'Availability search',
      description: 'Review of relevant databases and sources to identify earlier signs and inform an assessment of your mark.',
      tags: ['OMAPI', 'WIPO', 'Market sources'],
    },
  },
  {
    icon: DocumentArrowUpIcon,
    fr: {
      title: 'Dépôt de marque',
      description: "Préparation du dossier et accompagnement dans son dépôt auprès de l’OMAPI ou des organismes compétents. Pour les projets internationaux, les voies applicables — notamment celles faisant intervenir l’OMPI/WIPO — sont examinées selon le dossier.",
      tags: ['Dossier', 'Suivi', 'Réponses aux notifications'],
    },
    en: {
      title: 'Trademark filing',
      description: 'Preparation of the application and support with filing through OMAPI or other competent authorities. For international projects, applicable routes—including those involving WIPO—are reviewed in light of the matter.',
      tags: ['Application', 'Follow-up', 'Office responses'],
    },
  },
  {
    icon: ArrowPathIcon,
    fr: {
      title: 'Suivi & renouvellement',
      description: 'Suivi des dossiers, veille et organisation des renouvellements afin de maintenir vos droits dans la durée.',
      tags: ['Surveillance', 'Renouvellement', 'Alertes'],
    },
    en: {
      title: 'Monitoring & renewal',
      description: 'Matter follow-up, monitoring and renewal planning to help maintain your rights over time.',
      tags: ['Monitoring', 'Renewal', 'Alerts'],
    },
  },
] as const;

const trademarkSteps = [
  {
    number: '01',
    fr: { title: 'Consultation', text: 'Comprendre votre projet, le signe concerné, les produits ou services et les territoires visés.' },
    en: { title: 'Consultation', text: 'Understand your project, the sign, relevant goods or services and target territories.' },
  },
  {
    number: '02',
    fr: { title: 'Recherche', text: 'Repérer les antériorités pertinentes et examiner les résultats avec vous.' },
    en: { title: 'Search', text: 'Identify relevant earlier signs and review the results with you.' },
  },
  {
    number: '03',
    fr: { title: 'Dépôt', text: "Préparer le dossier et le déposer auprès de l'OMAPI ou de l'autorité compétente selon la voie retenue." },
    en: { title: 'Filing', text: 'Prepare and submit the application to OMAPI or the competent authority, depending on the selected route.' },
  },
  {
    number: '04',
    fr: { title: 'Suivi & protection', text: 'Suivre les échanges et échéances ; accompagner la suite de la procédure et les renouvellements, le cas échéant.' },
    en: { title: 'Follow-up & protection', text: 'Track correspondence and dates; support the next procedural steps and renewals, where applicable.' },
  },
] as const;

const advantages = [
  {
    fr: { title: 'Expertise locale & internationale', text: 'Un accompagnement pensé pour les démarches à Madagascar et les projets impliquant plusieurs territoires.' },
    en: { title: 'Local & international support', text: 'Guidance for matters in Madagascar and projects involving multiple territories.' },
  },
  {
    fr: { title: 'Processus optimisé', text: 'Des étapes clairement expliquées et un dossier préparé avec méthode pour limiter les retours évitables. Les délais restent soumis aux autorités compétentes.' },
    en: { title: 'An optimised process', text: 'Clear steps and a carefully prepared application to help avoid preventable back-and-forth. Timing remains subject to the competent authorities.' },
  },
  {
    fr: { title: 'Support continu', text: 'Un suivi des démarches, des notifications et des renouvellements à prévoir.' },
    en: { title: 'Ongoing support', text: 'Follow-up on procedures, office communications and upcoming renewals.' },
  },
  {
    fr: { title: 'Tarifs compétitifs', text: 'Une proposition détaillée selon le dossier, distinguant les honoraires et les frais prévisibles avant engagement.' },
    en: { title: 'Competitive fees', text: 'A detailed proposal based on the matter, distinguishing professional fees from foreseeable external costs before engagement.' },
  },
] as const;

export default function MarquesSection({ isFr, pageContent }: { isFr: boolean; pageContent: ExpertiseContentItem }) {
  const title = isFr ? pageContent.titleFr : pageContent.titleEn;
  const intro = isFr ? pageContent.introFr : pageContent.introEn;
  return (
    <article id="marques" className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-sm">
      <div className="p-7 sm:p-10 lg:p-12">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-surface text-brand-accent"><MagnifyingGlassIcon className="h-7 w-7" aria-hidden="true" /></span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">01 · {isFr ? 'Identité & différenciation' : 'Identity & differentiation'}</p>
            <p className="mt-1 text-xs font-medium text-gray-400">C.IP · {isFr ? 'Madagascar & international' : 'Madagascar & international'}</p>
          </div>
        </div>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h1 className="text-3xl font-light leading-tight sm:text-4xl">{title}</h1>
            <h3 className="mt-7 text-xl">{isFr ? "Qu'est-ce qu'une marque ?" : 'What is a trademark?'}</h3>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {intro}
            </p>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              {isFr
                ? 'La protection des marques contribue à sécuriser votre identité commerciale, à fidéliser vos clients et à vous différencier de la concurrence sur le marché malgache et à l’international.'
                : 'Trademark protection can help secure your commercial identity, build customer recognition and distinguish your business in Madagascar and internationally.'}
            </p>
          </div>
          <aside className="rounded-2xl border-l-2 border-brand-accent bg-brand-surface p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">{isFr ? 'Un point de départ essentiel' : 'A useful first step'}</p>
            <p className="mt-3 text-sm leading-7 text-gray-700">
              {isFr
                ? "Le choix du signe, des produits ou services et des territoires visés influence la démarche à préparer. Une recherche d'antériorité éclaire les risques, mais ne garantit pas à elle seule l'enregistrement."
                : 'The sign, relevant goods or services and target territories all shape the process. An availability search can inform risk, but cannot by itself guarantee registration.'}
            </p>
          </aside>
        </div>

        <div className="mt-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Un accompagnement de bout en bout' : 'Support from start to follow-up'}</p>
              <h3 className="mt-2 text-2xl">{isFr ? 'Nos services' : 'Our services'}</h3>
            </div>
            <p className="max-w-lg text-sm leading-6 text-gray-500">{isFr ? 'Du premier examen au suivi des échéances, nous vous aidons à comprendre chaque étape.' : 'From the initial review to ongoing deadlines, we help you understand each step.'}</p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {trademarkServices.map((service) => {
              const copy = isFr ? service.fr : service.en;
              const Icon = service.icon;
              return (
                <section key={copy.title} className="rounded-2xl border border-brand-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-surface text-brand-accent"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <h4 className="mt-5 text-lg font-semibold">{copy.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{copy.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {copy.tags.map((tag) => <span key={tag} className="rounded-full bg-brand-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-600">{tag}</span>)}
                  </div>
                </section>
              );
            })}
          </div>
          <p className="mt-4 text-xs leading-6 text-gray-500">{isFr ? "Les résultats d'une recherche et l'issue d'une demande dépendent notamment du signe, des droits antérieurs, des pièces et de l'examen des autorités compétentes." : 'Search results and application outcomes depend on the sign, earlier rights, supporting material and review by the competent authorities.'}</p>
        </div>

        <div className="mt-14 rounded-[1.75rem] bg-brand-black p-7 text-white sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent-light">{isFr ? 'Notre processus' : 'Our process'}</p>
          <h3 className="mt-2 text-2xl">{isFr ? 'Les étapes de votre démarche' : 'The steps in your matter'}</h3>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trademarkSteps.map((step) => {
              const copy = isFr ? step.fr : step.en;
              return (
                <div key={step.number} className="border-t border-white/20 pt-4">
                  <span className="font-display text-sm text-brand-accent-light">{step.number}</span>
                  <h4 className="mt-3 text-base font-semibold">{copy.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-white/65">{copy.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Pourquoi nous choisir ?' : 'Why work with us?'}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item, index) => {
              const copy = isFr ? item.fr : item.en;
              return (
                <div key={copy.title} className="rounded-2xl border border-brand-border bg-[#f8f7f3] p-5">
                  <span className="font-display text-sm text-brand-accent">0{index + 1}</span>
                  <h3 className="mt-3 text-base font-semibold">{copy.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{copy.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-brand-border bg-brand-surface px-7 py-8 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Contactez-nous' : 'Get in touch'}</p>
            <h3 className="mt-2 text-2xl">{isFr ? 'Prêt à protéger votre marque ?' : 'Ready to protect your brand?'}</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">{isFr ? 'Contactez-nous pour une consultation initiale gratuite. Les démarches et honoraires sont confirmés selon le périmètre de votre dossier.' : 'Contact us for an initial complimentary consultation. Procedures and fees are confirmed based on the scope of your matter.'}</p>
            <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a href="tel:+261340948961" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">+261 34 09 489 61</a>
              <a href="mailto:contact@rabemananjara.mg" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">contact@rabemananjara.mg</a>
              <span className="text-gray-600">Antananarivo, Madagascar</span>
            </div>
          </div>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent">
            {isFr ? 'Demander une consultation' : 'Request a consultation'} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
