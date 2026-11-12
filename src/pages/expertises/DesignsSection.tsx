import { Link } from 'react-router-dom';
import type { ExpertiseContentItem } from '../../data/expertiseContent';
import {
  ArrowPathIcon,
  ArrowUpRightIcon,
  EyeIcon,
  GlobeAltIcon,
  PaintBrushIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';

const benefits = [
  {
    icon: EyeIcon,
    fr: {
      title: 'Protection visuelle',
      text: "Des droits exclusifs sur l'apparence enregistrée de vos produits, dans le périmètre prévu par le droit applicable.",
      tags: ['Exclusivité', 'Esthétique', 'Innovation'],
    },
    en: {
      title: 'Visual protection',
      text: 'Exclusive rights over the registered appearance of your products, within the scope of applicable law.',
      tags: ['Exclusivity', 'Aesthetics', 'Innovation'],
    },
  },
  {
    icon: ArrowPathIcon,
    fr: {
      title: 'Durée & renouvellements',
      text: 'Une protection généralement accordée par périodes renouvelables. La durée totale varie selon le régime et le territoire, et peut atteindre 25 ans dans certains systèmes.',
      tags: ['5–25 ans*', 'Renouvelable', 'Selon le régime'],
    },
    en: {
      title: 'Term & renewals',
      text: 'Protection is generally granted for renewable periods. The total term varies by regime and territory and may reach 25 years in some systems.',
      tags: ['5–25 years*', 'Renewable', 'Regime-dependent'],
    },
  },
  {
    icon: GlobeAltIcon,
    fr: {
      title: 'Protection internationale',
      text: 'Le système de La Haye peut permettre de demander une protection dans plusieurs territoires désignés, sous réserve des conditions d’accès et des règles locales.',
      tags: ['La Haye', 'Territoires désignés', 'OMPI / WIPO'],
    },
    en: {
      title: 'International protection',
      text: 'The Hague System may allow applicants to seek protection in several designated territories, subject to eligibility requirements and local rules.',
      tags: ['Hague System', 'Designated territories', 'WIPO'],
    },
  },
] as const;

const processSteps = [
  {
    number: '01',
    icon: PaintBrushIcon,
    fr: { title: 'Création', text: 'Développer le concept et documenter les caractéristiques esthétiques du design.' },
    en: { title: 'Creation', text: 'Develop the concept and document the design’s aesthetic features.' },
  },
  {
    number: '02',
    icon: PhotoIcon,
    fr: { title: 'Préparation', text: 'Réaliser les vues et réunir la documentation selon les exigences de la démarche envisagée.' },
    en: { title: 'Preparation', text: 'Prepare the views and supporting material for the requirements of the intended procedure.' },
  },
  {
    number: '03',
    icon: ArrowUpRightIcon,
    fr: { title: 'Dépôt', text: "Préparer et soumettre le dossier à l’OMAPI ou à l'autorité compétente selon le territoire et la voie retenue.", },
    en: { title: 'Filing', text: 'Prepare and submit the application to OMAPI or the competent authority, depending on the territory and route selected.' },
  },
  {
    number: '04',
    icon: ArrowPathIcon,
    fr: { title: 'Protection', text: 'Suivre les démarches, organiser les renouvellements et gérer les droits selon les échéances applicables.' },
    en: { title: 'Protection', text: 'Follow the procedure, plan renewals and manage rights according to applicable deadlines.' },
  },
] as const;

const reasons = [
  {
    fr: { title: 'Expertise créative', text: 'Une compréhension des enjeux esthétiques et de la valeur distinctive du design.' },
    en: { title: 'Creative expertise', text: 'An understanding of aesthetic considerations and the distinctive value of design.' },
  },
  {
    fr: { title: 'Accompagnement visuel', text: 'Un appui pour organiser les vues et les documents utiles au dépôt.' },
    en: { title: 'Visual guidance', text: 'Support in organising the views and documents needed for filing.' },
  },
  {
    fr: { title: 'Protection globale', text: 'Une étude des territoires et des voies de protection à envisager pour votre projet.' },
    en: { title: 'International perspective', text: 'A review of territories and protection routes to consider for your project.' },
  },
  {
    fr: { title: 'Conseils personnalisés', text: 'Des démarches adaptées à votre secteur, à votre calendrier et aux caractéristiques du design.' },
    en: { title: 'Tailored advice', text: 'Steps considered in light of your sector, timeline and the features of your design.' },
  },
] as const;

export default function DesignsSection({ isFr, pageContent }: { isFr: boolean; pageContent: ExpertiseContentItem }) {
  const title = isFr ? pageContent.titleFr : pageContent.titleEn;
  const intro = isFr ? pageContent.introFr : pageContent.introEn;
  return (
    <article id="dessins" className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-sm">
      <div className="p-7 sm:p-10 lg:p-12">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-surface text-brand-accent">
            <PaintBrushIcon className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">03 · {isFr ? 'Forme & apparence' : 'Form & appearance'}</p>
            <p className="mt-1 text-xs font-medium text-gray-400">C.IP · Madagascar & international</p>
          </div>
        </div>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h1 className="text-3xl font-light leading-tight sm:text-4xl">{title}</h1>
            <h3 className="mt-7 text-xl">{isFr ? "Qu'est-ce qu'un dessin ou modèle industriel ?" : 'What is an industrial design?'}</h3>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {intro}
            </p>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              {isFr
                ? "La protection des designs industriels peut contribuer à valoriser l'innovation esthétique et à préserver une identité visuelle distinctive sur le marché malgache et à l'international."
                : 'Industrial design protection can help recognise aesthetic innovation and maintain a distinctive visual identity in the Malagasy market and internationally.'}
            </p>
          </div>
          <aside className="rounded-2xl border-l-2 border-brand-accent bg-brand-surface p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">{isFr ? 'L’apparence au cœur de la protection' : 'Appearance at the heart of protection'}</p>
            <p className="mt-3 text-sm leading-7 text-gray-700">
              {isFr
                ? "Les représentations du produit sont essentielles pour décrire le design revendiqué. La protection porte sur l'apparence dans le cadre du dépôt retenu; les caractéristiques techniques peuvent relever d'autres protections."
                : 'Product representations are central to describing the design for which protection is sought. Protection concerns appearance within the scope of the filing; technical features may call for other forms of protection.'}
            </p>
          </aside>
        </div>

        <div className="mt-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Les atouts d’une protection adaptée' : 'The value of tailored protection'}</p>
              <h3 className="mt-2 text-2xl">{isFr ? 'Avantages de la protection' : 'Benefits of protection'}</h3>
            </div>
            <p className="max-w-lg text-sm leading-6 text-gray-500">{isFr ? 'Le périmètre et les effets des droits dépendent du design, du dépôt et des territoires concernés.' : 'The scope and effect of rights depend on the design, the filing and the territories involved.'}</p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const copy = isFr ? benefit.fr : benefit.en;
              const Icon = benefit.icon;
              return (
                <section key={copy.title} className="rounded-2xl border border-brand-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-surface text-brand-accent"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <h4 className="mt-5 text-lg font-semibold">{copy.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{copy.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {copy.tags.map((tag) => <span key={tag} className="rounded-full bg-brand-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-600">{tag}</span>)}
                  </div>
                </section>
              );
            })}
          </div>
          <p className="mt-4 text-xs leading-6 text-gray-500">
            {isFr ? (
              <>
                * La fourchette de 5 à 25 ans est indicative et dépend du régime et du territoire. Les textes malgaches référencés par l’OMPI prévoient un enregistrement initial de cinq ans, renouvelable deux fois par périodes de cinq ans; la durée et les conditions applicables au dossier doivent être confirmées. Le système de La Haye est soumis à des conditions d’accès, aux territoires désignés et à leur droit national.{' '}
                <a href="https://www.wipo.int/wipolex/fr/legislation/details/5313" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">Consulter WIPO Lex</a>.
              </>
            ) : (
              <>
                * The 5-to-25-year range is indicative and depends on the regime and territory. Madagascar’s legislation listed by WIPO provides an initial five-year registration, renewable twice for five-year periods; the duration and conditions applicable to a matter should be confirmed. The Hague System is subject to eligibility requirements, designated territories and their national laws.{' '}
                <a href="https://www.wipo.int/wipolex/en/legislation/details/5313" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">See WIPO Lex</a>.
              </>
            )}
          </p>
        </div>

        <div className="mt-14 rounded-[1.75rem] bg-brand-black p-7 text-white sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent-light">{isFr ? 'Notre processus' : 'Our process'}</p>
          <h3 className="mt-2 text-2xl">{isFr ? 'Les étapes de votre démarche' : 'The steps in your process'}</h3>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => {
              const copy = isFr ? step.fr : step.en;
              const Icon = step.icon;
              return (
                <div key={step.number} className="border-t border-white/20 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm text-brand-accent-light">{step.number}</span>
                    <Icon className="h-5 w-5 text-brand-accent-light" aria-hidden="true" />
                  </div>
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
            {reasons.map((item, index) => {
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
            <h3 className="mt-2 text-2xl">{isFr ? 'Votre design mérite une protection adaptée.' : 'Your design deserves tailored protection.'}</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">{isFr ? 'Contactez-nous pour valoriser votre créativité et examiner les démarches adaptées à votre projet.' : 'Contact us to recognise your creativity and review the steps suited to your project.'}</p>
            <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a href="tel:+261340948961" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">+261 34 09 489 61</a>
              <a href="mailto:contact@rabemananjara.mg" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">contact@rabemananjara.mg</a>
              <span className="text-gray-600">Antananarivo, Madagascar</span>
            </div>
          </div>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent">
            {isFr ? 'Parler de votre design' : 'Discuss your design'} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
