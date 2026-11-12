import { Link } from 'react-router-dom';
import type { ExpertiseContentItem } from '../../data/expertiseContent';
import {
  ArrowPathIcon,
  ArrowUpRightIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  TagIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const benefits = [
  {
    icon: ShieldCheckIcon,
    fr: { title: 'Protection juridique', text: "Un enregistrement peut permettre de s'opposer à certains usages du même nom pour une activité identique lorsqu'ils risquent de créer une confusion, selon le droit applicable.", tags: ['Droits territoriaux', 'Usage commercial', 'Confusion'] },
    en: { title: 'Legal protection', text: 'Registration may help prevent certain uses of the same name for the same activity where they are likely to cause confusion, subject to applicable law.', tags: ['Territorial rights', 'Commercial use', 'Confusion'] },
  },
  {
    icon: TagIcon,
    fr: { title: 'Image de marque', text: 'Un nom commercial cohérent aide le public à identifier votre activité et à construire une identité professionnelle.', tags: ['Identité', 'Notoriété', 'Marketing'] },
    en: { title: 'Brand identity', text: 'A consistent trade name helps the public identify your activity and supports a recognisable business identity.', tags: ['Identity', 'Recognition', 'Marketing'] },
  },
  {
    icon: ExclamationTriangleIcon,
    fr: { title: 'Prévention des conflits', text: "Une recherche d'antériorité peut révéler des dénominations similaires et éclairer vos choix, sans garantir à elle seule l'enregistrement ni l'absence de contestation.", tags: ['Antériorités', 'Réduction des risques', 'Vigilance'] },
    en: { title: 'Conflict prevention', text: 'An availability search may identify similar names and inform your choices, but cannot by itself guarantee registration or eliminate the risk of a dispute.', tags: ['Prior rights', 'Risk awareness', 'Review'] },
  },
] as const;

const processSteps = [
  {
    number: '01', icon: MagnifyingGlassIcon,
    fr: { title: 'Vérification', text: "Examiner les antériorités et les éventuelles similitudes; les délais de recherche sont à confirmer auprès de l'Office.", },
    en: { title: 'Search', text: 'Review earlier names and potential similarities; search timing should be confirmed with the Office.' },
  },
  {
    number: '02', icon: DocumentTextIcon,
    fr: { title: 'Préparation', text: "Réunir les informations sur le déposant, l'activité et l'établissement, ainsi que les pièces requises.", },
    en: { title: 'Preparation', text: 'Gather applicant, business activity and establishment details, together with the required documents.' },
  },
  {
    number: '03', icon: ArrowUpRightIcon,
    fr: { title: 'Dépôt', text: "Présenter la demande d'enregistrement du nom commercial à l'OMAPI. L'immatriculation d'une société au RCS est une formalité distincte.", },
    en: { title: 'Filing', text: 'Submit the trade-name registration application to OMAPI. A company’s registration in the Commercial Register (RCS) is a separate formality.' },
  },
  {
    number: '04', icon: ArrowPathIcon,
    fr: { title: 'Suivi & renouvellement', text: "Suivre la demande et les échéances. Selon les textes consultés, l'enregistrement est valable dix ans et peut être renouvelé par périodes successives de dix ans.", },
    en: { title: 'Follow-up & renewal', text: 'Track the application and deadlines. Under the texts consulted, registration lasts ten years and may be renewed for successive ten-year periods.' },
  },
] as const;

const reasons = [
  {
    fr: { title: 'Recherche diligente', text: 'Une vérification des antériorités organisée selon les modalités et délais confirmés par l’OMAPI.' },
    en: { title: 'Careful search', text: 'An availability search arranged in line with the procedure and timing confirmed by OMAPI.' },
  },
  {
    fr: { title: 'Accompagnement complet', text: 'Un appui du choix du nom au dépôt, puis au suivi des renouvellements.' },
    en: { title: 'End-to-end support', text: 'Guidance from choosing a name through filing and renewal follow-up.' },
  },
  {
    fr: { title: 'Expertise locale', text: 'Une attention portée aux règles malgaches et à la distinction entre nom commercial et formalités de société.' },
    en: { title: 'Local expertise', text: 'Attention to Malagasy rules and to the distinction between a trade name and company-registration formalities.' },
  },
  {
    fr: { title: 'Réactivité', text: 'Un suivi attentif des échéances, sans promettre un traitement accéléré par l’Office.' },
    en: { title: 'Responsiveness', text: 'Careful monitoring of deadlines, without promising accelerated processing by the Office.' },
  },
] as const;

export default function BusinessNameSection({ isFr, pageContent }: { isFr: boolean; pageContent: ExpertiseContentItem }) {
  const title = isFr ? pageContent.titleFr : pageContent.titleEn;
  const intro = isFr ? pageContent.introFr : pageContent.introEn;
  return (
    <article id="noms-commerciaux" className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-sm">
      <div className="p-7 sm:p-10 lg:p-12">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-surface text-brand-accent"><BuildingStorefrontIcon className="h-7 w-7" aria-hidden="true" /></span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">07 · {isFr ? 'Identité commerciale' : 'Business identity'}</p>
            <p className="mt-1 text-xs font-medium text-gray-400">C.IP · Madagascar & international</p>
          </div>
        </div>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h1 className="text-3xl font-light leading-tight sm:text-4xl">{title}</h1>
            <h3 className="mt-7 text-xl">{isFr ? "Qu'est-ce qu'un nom commercial ?" : 'What is a trade name?'}</h3>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {intro}
            </p>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              {isFr
                ? "À Madagascar, le nom commercial enregistré à l'OMAPI et l'immatriculation d'une société au Registre du commerce et des sociétés (RCS) sont deux démarches distinctes. Le nom commercial ne remplace pas la dénomination sociale ni les formalités de création de l'entreprise."
                : 'In Madagascar, registering a trade name with OMAPI and registering a company in the Commercial Register (RCS) are separate steps. A trade name does not replace a company’s legal name or its business-formation formalities.'}
            </p>
          </div>
          <aside className="rounded-2xl border-l-2 border-brand-accent bg-brand-surface p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">{isFr ? 'Un choix à vérifier' : 'A name to check'}</p>
            <p className="mt-3 text-sm leading-7 text-gray-700">
              {isFr
                ? "Une recherche d'antériorité peut aider à repérer des noms déjà utilisés ou enregistrés. La portée des droits dépend notamment de l'activité, du territoire et du risque de confusion; une recherche ne garantit pas à elle seule l'enregistrement."
                : 'An availability search can help identify names already in use or registered. Rights depend in part on the activity, territory and likelihood of confusion; a search alone does not guarantee registration.'}
            </p>
          </aside>
        </div>

        <div className="mt-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Sécuriser votre identité' : 'Safeguard your business identity'}</p>
              <h3 className="mt-2 text-2xl">{isFr ? 'Avantages de la protection' : 'Benefits of protection'}</h3>
            </div>
            <p className="max-w-lg text-sm leading-6 text-gray-500">{isFr ? 'La protection s’apprécie selon le nom, l’activité, le territoire et les droits antérieurs.' : 'Protection depends on the name, activity, territory and prior rights involved.'}</p>
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
                  <div className="flex items-center justify-between"><span className="font-display text-sm text-brand-accent-light">{step.number}</span><Icon className="h-5 w-5 text-brand-accent-light" aria-hidden="true" /></div>
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

        <p className="mt-10 text-xs leading-6 text-gray-500">
          {isFr ? (
            <>
              Selon les textes publiés par l’OMAPI, l’enregistrement du nom commercial dure dix ans et peut être renouvelé par périodes successives de dix ans — et non annuellement. La procédure OMAPI est distincte de l’immatriculation au RCS. Les délais de recherche, d’examen et de délivrance doivent être confirmés auprès de l’Office.{' '}
              <a href="http://www.omapi.mg/noms_commerciaux.html" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">Voir les informations de l’OMAPI</a>.
            </>
          ) : (
            <>
              According to OMAPI’s published guidance, trade-name registration lasts ten years and may be renewed for successive ten-year periods—not annually. OMAPI registration is separate from company registration in the RCS. Search, examination and issuance timing should be confirmed with the Office.{' '}
              <a href="http://www.omapi.mg/noms_commerciaux.html" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">See OMAPI guidance</a>.
            </>
          )}
        </p>
      </div>

      <div className="border-t border-brand-border bg-brand-surface px-7 py-8 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Contactez-nous' : 'Get in touch'}</p>
            <h3 className="mt-2 text-2xl">{isFr ? 'Protégez l’identité de votre entreprise.' : 'Protect your business identity.'}</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">{isFr ? 'Contactez-nous pour examiner le nom envisagé et les démarches adaptées à votre situation.' : 'Contact us to review your proposed name and the steps suited to your situation.'}</p>
            <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a href="tel:+261340948961" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">+261 34 09 489 61</a>
              <a href="mailto:contact@rabemananjara.mg" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">contact@rabemananjara.mg</a>
              <span className="text-gray-600">Antananarivo, Madagascar</span>
            </div>
          </div>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent">
            {isFr ? 'Échanger sur mon nom commercial' : 'Discuss my trade name'} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
