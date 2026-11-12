import { Link } from 'react-router-dom';
import type { ExpertiseContentItem } from '../../data/expertiseContent';
import {
  ArrowPathIcon,
  ArrowUpRightIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const indicationTypes = [
  {
    icon: MapPinIcon,
    fr: {
      title: 'Indication géographique',
      text: "Elle identifie un produit comme originaire d'un lieu, lorsque sa qualité, sa réputation ou une autre caractéristique peut être attribuée essentiellement à cette origine.",
      tags: ['IG', 'Qualité', 'Origine'],
    },
    en: {
      title: 'Geographical indication',
      text: 'It identifies a product as originating in a place when its quality, reputation or another characteristic is essentially attributable to that origin.',
      tags: ['GI', 'Quality', 'Origin'],
    },
  },
  {
    icon: GlobeAltIcon,
    fr: {
      title: "Appellation d'origine",
      text: "Il s'agit d'un type particulier d'indication géographique, fondé sur un lien plus étroit entre les caractéristiques du produit et son environnement géographique, y compris les facteurs humains et naturels.",
      tags: ['AO / AOP selon le régime', 'Authenticité', 'Terroir'],
    },
    en: {
      title: 'Appellation of origin',
      text: 'This is a particular type of geographical indication, based on a closer link between the product’s characteristics and its geographical environment, including human and natural factors.',
      tags: ['AO / PDO, by regime', 'Authenticity', 'Terroir'],
    },
  },
] as const;

const benefits = [
  {
    icon: MapPinIcon,
    fr: { title: 'Valorisation du terroir', text: "Mettre en valeur l'origine, les pratiques et les caractéristiques qui distinguent un produit local." },
    en: { title: 'Terroir value', text: 'Highlight the origin, practices and characteristics that distinguish a local product.' },
  },
  {
    icon: ShieldCheckIcon,
    fr: { title: 'Positionnement de valeur', text: 'Un signe collectif reconnu peut soutenir la différenciation et une meilleure valorisation commerciale, sans garantir un prix de vente.' },
    en: { title: 'Market positioning', text: 'A recognised collective sign may support differentiation and stronger market positioning, without guaranteeing a particular selling price.' },
  },
  {
    icon: UserGroupIcon,
    fr: { title: 'Protection collective', text: 'Les producteurs admissibles peuvent utiliser le signe s’ils respectent les conditions et spécifications applicables.' },
    en: { title: 'Collective protection', text: 'Eligible producers may use the sign when they comply with the applicable conditions and product specifications.' },
  },
  {
    icon: GlobeAltIcon,
    fr: { title: 'Développement international', text: 'Étudier les mécanismes de reconnaissance ou de protection dans les marchés visés; les démarches et effets varient selon les territoires.' },
    en: { title: 'International development', text: 'Consider recognition or protection routes in target markets; procedures and effects vary by territory.' },
  },
] as const;

const processSteps = [
  {
    number: '01',
    icon: MapPinIcon,
    fr: { title: 'Étude', text: 'Documenter le produit, son aire géographique et le lien entre son origine, sa qualité, sa réputation ou ses caractéristiques.' },
    en: { title: 'Assessment', text: 'Document the product, its geographical area and the link between origin and its quality, reputation or characteristics.' },
  },
  {
    number: '02',
    icon: DocumentTextIcon,
    fr: { title: 'Cahier des charges', text: 'Définir le produit, les méthodes et les conditions d’utilisation du signe, ainsi que les modalités de contrôle.' },
    en: { title: 'Product specification', text: 'Define the product, methods and conditions for using the sign, together with appropriate compliance checks.' },
  },
  {
    number: '03',
    icon: ArrowUpRightIcon,
    fr: { title: 'Dépôt', text: "Identifier la voie et l'autorité compétentes, puis préparer le dépôt selon le régime applicable au territoire visé.", },
    en: { title: 'Filing', text: 'Identify the competent route and authority, then prepare the filing under the rules applicable in the target territory.' },
  },
  {
    number: '04',
    icon: ArrowPathIcon,
    fr: { title: 'Gestion', text: 'Organiser la gouvernance collective, le respect du cahier des charges et le suivi de la protection.' },
    en: { title: 'Management', text: 'Organise collective governance, compliance with the product specification and ongoing protection.' },
  },
] as const;

const reasons = [
  {
    fr: { title: 'Expertise territoriale', text: 'Une attention portée aux terroirs, produits et communautés de producteurs malgaches.' },
    en: { title: 'Territorial expertise', text: 'A focus on Madagascar’s regions, products and producer communities.' },
  },
  {
    fr: { title: 'Accompagnement global', text: 'Un appui de l’étude du lien au terroir à l’examen des voies de protection à l’étranger.' },
    en: { title: 'End-to-end guidance', text: 'Support from assessing the product-origin link to considering protection routes abroad.' },
  },
  {
    fr: { title: 'Support aux groupements', text: 'Une aide pour structurer les échanges et le projet commun des producteurs concernés.' },
    en: { title: 'Producer-group support', text: 'Help structure discussions and the shared project of the producers concerned.' },
  },
  {
    fr: { title: 'Valorisation commerciale', text: 'Réfléchir à la présentation et à la stratégie marketing du produit, sans promesse de résultat économique.' },
    en: { title: 'Commercial development', text: 'Consider product presentation and marketing, without promising a particular commercial outcome.' },
  },
] as const;

export default function GeographicalIndicationsSection({ isFr, pageContent }: { isFr: boolean; pageContent: ExpertiseContentItem }) {
  const title = isFr ? pageContent.titleFr : pageContent.titleEn;
  const intro = isFr ? pageContent.introFr : pageContent.introEn;
  return (
    <article id="indications-geographiques" className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-sm">
      <div className="p-7 sm:p-10 lg:p-12">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-surface text-brand-accent">
            <GlobeAltIcon className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">06 · {isFr ? 'Terroir & réputation' : 'Terroir & reputation'}</p>
            <p className="mt-1 text-xs font-medium text-gray-400">C.IP · Madagascar & international</p>
          </div>
        </div>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h1 className="text-3xl font-light leading-tight sm:text-4xl">{title}</h1>
            <h3 className="mt-7 text-xl">{isFr ? "Qu'est-ce qu'une indication géographique ?" : 'What is a geographical indication?'}</h3>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {intro}
            </p>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              {isFr
                ? "Les indications géographiques peuvent contribuer à valoriser l'authenticité et la réputation de produits malgaches sur les marchés locaux et internationaux, lorsque les conditions de protection sont réunies."
                : 'Geographical indications can help promote the authenticity and reputation of Malagasy products in local and international markets when the requirements for protection are met.'}
            </p>
          </div>
          <aside className="rounded-2xl border-l-2 border-brand-accent bg-brand-surface p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">{isFr ? 'Un lien à démontrer' : 'A link to establish'}</p>
            <p className="mt-3 text-sm leading-7 text-gray-700">
              {isFr
                ? "Le dossier doit étayer le lien entre le produit et son origine géographique. Le périmètre, les spécifications, les producteurs concernés et le mécanisme de protection dépendent du droit applicable."
                : 'The application should support the link between the product and its geographical origin. Scope, specifications, eligible producers and the protection mechanism depend on applicable law.'}
            </p>
          </aside>
        </div>

        <div className="mt-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Deux notions complémentaires' : 'Two related concepts'}</p>
              <h3 className="mt-2 text-2xl">{isFr ? 'Types d’indications géographiques' : 'Types of geographical indication'}</h3>
            </div>
            <p className="max-w-lg text-sm leading-6 text-gray-500">{isFr ? 'Les appellations et leurs critères précis varient selon les systèmes juridiques.' : 'Appellations and their precise requirements vary between legal systems.'}</p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {indicationTypes.map((type) => {
              const copy = isFr ? type.fr : type.en;
              const Icon = type.icon;
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

        <div className="mt-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Un outil collectif de valorisation' : 'A collective tool for recognition'}</p>
              <h3 className="mt-2 text-2xl">{isFr ? 'Avantages des IG' : 'Benefits of GIs'}</h3>
            </div>
            <p className="max-w-lg text-sm leading-6 text-gray-500">{isFr ? 'La protection suppose un lien établi avec l’origine et le respect des règles d’utilisation.' : 'Protection depends on an established link to origin and compliance with the applicable rules of use.'}</p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const copy = isFr ? benefit.fr : benefit.en;
              const Icon = benefit.icon;
              return (
                <section key={copy.title} className="rounded-2xl border border-brand-border bg-[#f8f7f3] p-5">
                  <div className="flex items-center justify-between"><span className="font-display text-sm text-brand-accent">0{index + 1}</span><Icon className="h-5 w-5 text-brand-accent" aria-hidden="true" /></div>
                  <h4 className="mt-4 text-base font-semibold">{copy.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{copy.text}</p>
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
                <div key={copy.title} className="rounded-2xl border border-brand-border bg-white p-5">
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
              À Madagascar, le régime d’enregistrement et l’autorité compétente doivent être confirmés pour chaque dossier : le cadre national évolue et un projet de loi sur la propriété industrielle figure au suivi parlementaire. Une reconnaissance ou un enregistrement dans un territoire ne confère pas automatiquement une protection mondiale.{' '}
              <a href="https://parlement.mg/fr/textes/projet-de-loi-n-0022026-du-15-janvier-2026-portant-regime-de-protection-de-la-propriete-industrielle-a-madagascar-1/" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">Consulter le suivi du projet de loi</a>.
            </>
          ) : (
            <>
              In Madagascar, the applicable registration regime and competent authority should be confirmed for each matter: the national framework is evolving and an industrial-property bill appears in parliamentary tracking. Recognition or registration in one territory does not automatically create worldwide protection.{' '}
              <a href="https://parlement.mg/fr/textes/projet-de-loi-n-0022026-du-15-janvier-2026-portant-regime-de-protection-de-la-propriete-industrielle-a-madagascar-1/" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">View the bill’s parliamentary status</a>.
            </>
          )}
        </p>
      </div>

      <div className="border-t border-brand-border bg-brand-surface px-7 py-8 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Contactez-nous' : 'Get in touch'}</p>
            <h3 className="mt-2 text-2xl">{isFr ? 'Valorisez l’authenticité de votre terroir.' : 'Recognise the authenticity of your terroir.'}</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">{isFr ? 'Contactez-nous pour étudier les possibilités de protection adaptées à votre produit et à votre groupement.' : 'Contact us to review protection options suited to your product and producer group.'}</p>
            <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a href="tel:+261340948961" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">+261 34 09 489 61</a>
              <a href="mailto:contact@rabemananjara.mg" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">contact@rabemananjara.mg</a>
              <span className="text-gray-600">Antananarivo, Madagascar</span>
            </div>
          </div>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent">
            {isFr ? 'Étudier mon projet' : 'Discuss my project'} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
