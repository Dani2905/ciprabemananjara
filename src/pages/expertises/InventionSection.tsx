import { Link } from 'react-router-dom';
import type { ExpertiseContentItem } from '../../data/expertiseContent';
import {
  ArrowPathIcon,
  ArrowUpRightIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  LightBulbIcon,
  PlusCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

const protectionOptions = [
  {
    icon: LightBulbIcon,
    fr: {
      title: "Brevet d'invention",
      description: "Protection d'une invention technique nouvelle, impliquant une activité inventive et susceptible d'application industrielle. La durée dépend du territoire et du régime applicable.",
      tags: ['OMAPI', 'PCT', '20 ans selon territoire*'],
    },
    en: {
      title: 'Invention patent',
      description: 'Protection for a technical invention that is new, involves an inventive step and is capable of industrial application. The term depends on the territory and applicable regime.',
      tags: ['OMAPI', 'PCT', '20 years, depending on territory*'],
    },
  },
  {
    icon: WrenchScrewdriverIcon,
    fr: {
      title: "Modèle d'utilité",
      description: "Dans les pays qui prévoient ce titre, il peut protéger certaines améliorations techniques utiles. Les critères, la disponibilité et la durée — parfois jusqu'à 10 ans — varient selon le droit local.",
      tags: ['10 ans dans certains pays', 'Procédure variable', 'Disponibilité à vérifier'],
    },
    en: {
      title: 'Utility model',
      description: 'In jurisdictions that provide for this title, it may protect certain useful technical improvements. Requirements, availability and term—sometimes up to 10 years—vary under local law.',
      tags: ['10 years in some countries', 'Procedure varies', 'Check local availability'],
    },
  },
  {
    icon: PlusCircleIcon,
    fr: {
      title: "Certificat d'addition",
      description: "Titre accessoire pouvant couvrir un perfectionnement rattaché à une invention principale, si les conditions de rattachement sont satisfaites. À Madagascar, il prend fin avec le brevet ou le certificat d'auteur d'invention principal; l'intérêt et les coûts dépendent du dossier.",
      tags: ['Complémentaire', 'Perfectionnement', 'Coûts selon le dossier'],
    },
    en: {
      title: 'Certificate of addition',
      description: 'A supplementary title that may cover an improvement linked to a main invention where the required connection is established. In Madagascar, it ends with the main patent or inventor’s certificate; its suitability and costs depend on the matter.',
      tags: ['Supplementary', 'Improvement', 'Matter-dependent costs'],
    },
  },
] as const;

const processSteps = [
  {
    number: '01',
    icon: ClipboardDocumentCheckIcon,
    fr: { title: 'Évaluation', text: "Examiner la solution, les informations disponibles et les critères de brevetabilité, sans préjuger de la décision de l'office." },
    en: { title: 'Assessment', text: 'Review the solution, available information and patentability criteria, without prejudging the office’s decision.' },
  },
  {
    number: '02',
    icon: DocumentTextIcon,
    fr: { title: 'Rédaction', text: 'Préparer la description, les revendications, les dessins utiles et les autres pièces du dossier technique.' },
    en: { title: 'Drafting', text: 'Prepare the description, claims, relevant drawings and other elements of the technical application.' },
  },
  {
    number: '03',
    icon: ArrowUpRightIcon,
    fr: { title: 'Dépôt', text: "Déposer auprès de l'OMAPI ou engager, selon le projet, les démarches PCT ou les dépôts directs à l'étranger." },
    en: { title: 'Filing', text: 'File with OMAPI or, depending on the project, pursue a PCT route or direct foreign filings.' },
  },
  {
    number: '04',
    icon: ArrowPathIcon,
    fr: { title: 'Maintenance', text: 'Suivre les échanges et échéances, les annuités ou taxes de maintien et les renouvellements applicables.' },
    en: { title: 'Maintenance', text: 'Monitor correspondence and deadlines, annuities or maintenance fees, and applicable renewals.' },
  },
] as const;

const reasons = [
  {
    fr: { title: 'Expertise technique', text: 'Une analyse structurée des critères de brevetabilité et des caractéristiques de votre solution.' },
    en: { title: 'Technical expertise', text: 'A structured review of patentability criteria and the features of your solution.' },
  },
  {
    fr: { title: 'Accompagnement complet', text: 'Un appui de la préparation du dossier au suivi des démarches et échéances.' },
    en: { title: 'End-to-end support', text: 'Support from application preparation through procedural follow-up and deadlines.' },
  },
  {
    fr: { title: 'Protection internationale', text: 'Étude des voies PCT et des dépôts à l’étranger selon les territoires visés.' },
    en: { title: 'International protection', text: 'Review of PCT and foreign filing routes in light of your target territories.' },
  },
  {
    fr: { title: 'Évaluation gratuite', text: 'Un premier échange d’évaluation, sans engagement, pour examiner votre projet.' },
    en: { title: 'Complimentary assessment', text: 'An initial, no-obligation assessment discussion to review your project.' },
  },
] as const;

export default function InventionSection({ isFr, pageContent }: { isFr: boolean; pageContent: ExpertiseContentItem }) {
  const title = isFr ? pageContent.titleFr : pageContent.titleEn;
  const intro = isFr ? pageContent.introFr : pageContent.introEn;
  return (
    <article id="brevets" className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-sm">
      <div className="p-7 sm:p-10 lg:p-12">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-surface text-brand-accent">
            <LightBulbIcon className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">02 · {isFr ? 'Invention & innovation' : 'Invention & innovation'}</p>
            <p className="mt-1 text-xs font-medium text-gray-400">C.IP · Madagascar & international</p>
          </div>
        </div>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h1 className="text-3xl font-light leading-tight sm:text-4xl">{title}</h1>
            <h3 className="mt-7 text-xl">{isFr ? "Qu'est-ce qu'un brevet ?" : 'What is a patent?'}</h3>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {intro}
            </p>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              {isFr
                ? "La protection par brevet peut contribuer à valoriser une innovation technique et à soutenir un avantage concurrentiel sur le marché malgache et à l'international."
                : 'Patent protection can help recognise technical innovation and support a competitive advantage in the Malagasy market and internationally.'}
            </p>
          </div>
          <aside className="rounded-2xl border-l-2 border-brand-accent bg-brand-surface p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">{isFr ? 'Avant toute divulgation' : 'Before any disclosure'}</p>
            <p className="mt-3 text-sm leading-7 text-gray-700">
              {isFr
                ? "La nouveauté et l'activité inventive s'apprécient au regard des règles applicables et des divulgations antérieures. Avant une publication, un salon ou un pitch non confidentiel, faites examiner le calendrier et les mesures de confidentialité à envisager."
                : 'Novelty and inventive step are assessed under applicable rules and in light of prior disclosures. Before a publication, trade show or non-confidential pitch, review timing and possible confidentiality measures.'}
            </p>
          </aside>
        </div>

        <div className="mt-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Des options selon votre projet' : 'Options for your project'}</p>
              <h3 className="mt-2 text-2xl">{isFr ? 'Types de protection' : 'Types of protection'}</h3>
            </div>
            <p className="max-w-lg text-sm leading-6 text-gray-500">{isFr ? 'Le titre approprié dépend de l’invention, des territoires, des objectifs et des règles applicables.' : 'The appropriate title depends on the invention, territories, objectives and applicable rules.'}</p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {protectionOptions.map((option) => {
              const copy = isFr ? option.fr : option.en;
              const Icon = option.icon;
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
          <p className="mt-4 text-xs leading-6 text-gray-500">
            {isFr ? (
              <>
                * Les durées dépendent du droit applicable. Les textes malgaches publiés par l’OMAPI et référencés par l’OMPI prévoient 15 ans pour un brevet à compter du dépôt, avec une prolongation possible de cinq ans sous conditions; les modèles d’utilité ne sont pas prévus dans tous les systèmes et leur disponibilité locale doit être vérifiée. Le PCT est une voie de dépôt internationale, pas un brevet mondial : chaque office désigné décide de la délivrance dans sa phase nationale.{' '}
                <a href="https://www.wipo.int/wipolex/fr/legislation/details/5313" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">Consulter les textes de l’OMPI</a>.
              </>
            ) : (
              <>
                * Terms depend on applicable law. Malagasy legislation published by OMAPI and listed by WIPO provides a 15-year patent term from filing, with a possible five-year extension subject to conditions; utility models are not provided for in every system and local availability should be checked. The PCT is an international filing route, not a worldwide patent: each designated office decides on grant in its national phase.{' '}
                <a href="https://www.wipo.int/wipolex/en/legislation/details/5313" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">See WIPO legislation</a>.
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
            <h3 className="mt-2 text-2xl">{isFr ? 'Votre invention mérite une protection adaptée.' : 'Your invention deserves tailored protection.'}</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">{isFr ? 'Contactez-nous pour une évaluation initiale gratuite et sans engagement de votre projet.' : 'Contact us for an initial, no-obligation assessment of your project.'}</p>
            <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a href="tel:+261340948961" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">+261 34 09 489 61</a>
              <a href="mailto:contact@rabemananjara.mg" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">contact@rabemananjara.mg</a>
              <span className="text-gray-600">Antananarivo, Madagascar</span>
            </div>
          </div>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent">
            {isFr ? 'Demander une évaluation gratuite' : 'Request a free assessment'} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
