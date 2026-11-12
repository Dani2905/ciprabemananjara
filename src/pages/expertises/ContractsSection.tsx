import { Link } from 'react-router-dom';
import type { ExpertiseContentItem } from '../../data/expertiseContent';
import {
  ArrowUpRightIcon,
  DocumentDuplicateIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const supportItems = {
  fr: [
    'Recenser les marques, créations, innovations et accords existants.',
    'Examiner les éléments disponibles sur la création et la titularité des droits.',
    'Clarifier les conditions d’utilisation, de licence, de cession ou de confidentialité.',
    'Identifier les sujets à négocier dans les partenariats, prestations ou projets communs.',
  ],
  en: [
    'Catalogue existing trademarks, creations, innovations and agreements.',
    'Review available records about creation and ownership.',
    'Clarify terms for use, licensing, assignment and confidentiality.',
    'Identify points to negotiate in partnerships, services or joint projects.',
  ],
} as const;

const preparationItems = {
  fr: [
    'Contrats de travail, de prestation, de licence ou de partenariat.',
    'Liste des personnes ayant contribué aux créations ou innovations.',
    'Supports et dates de création, de livraison ou de mise en service.',
    'Les usages prévus, territoires concernés et objectifs de la collaboration.',
  ],
  en: [
    'Employment, contractor, licence or partnership agreements.',
    'Names of people who contributed to creations or innovations.',
    'Materials and dates for creation, delivery or first use.',
    'Planned uses, territories and goals for the collaboration.',
  ],
} as const;

export default function ContractsSection({ isFr, pageContent }: { isFr: boolean; pageContent: ExpertiseContentItem }) {
  const support = isFr ? supportItems.fr : supportItems.en;
  const preparation = isFr ? preparationItems.fr : preparationItems.en;

  const title = isFr ? pageContent.titleFr : pageContent.titleEn;
  const intro = isFr ? pageContent.introFr : pageContent.introEn;
  return (
    <article id="contrats" className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-sm">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-7 sm:p-10 lg:p-12">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-surface text-brand-accent"><DocumentDuplicateIcon className="h-7 w-7" aria-hidden="true" /></span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">05 · {isFr ? 'Actifs & partenariats' : 'Assets & partnerships'}</p>
              <p className="mt-1 text-xs font-medium text-gray-400">C.IP · Madagascar & international</p>
            </div>
          </div>
          <h1 className="mt-7 max-w-2xl text-3xl font-light leading-tight sm:text-4xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600">
              {intro}
            </p>
          <div className="mt-7 rounded-2xl border-l-2 border-brand-accent bg-brand-surface p-5 sm:p-6">
            <h2 className="text-base font-semibold">{isFr ? 'Mettre les règles au clair avant de collaborer' : 'Set clear terms before working together'}</h2>
            <p className="mt-2 text-sm leading-7 text-gray-600">
              {isFr
                ? 'Les contrats, les contributions de chacun et les usages autorisés méritent une lecture cohérente. Un audit peut aussi aider à repérer les actifs, les documents manquants et les points à traiter avant une transaction ou un nouveau partenariat.'
                : 'Contracts, each party’s contribution and permitted uses should be reviewed consistently. An audit can also help identify assets, missing records and issues to address before a transaction or new partnership.'}
            </p>
          </div>
        </div>

        <div className="bg-[#f8f7f3] p-7 sm:p-10 lg:p-12">
          <h2 className="text-xl">{isFr ? 'De la cartographie à la rédaction contractuelle' : 'From asset mapping to agreements'}</h2>
          <ul className="mt-5 space-y-3">
            {support.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-gray-700"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />{item}</li>)}
          </ul>
          <div className="mt-8 border-t border-brand-border pt-7">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-brand-accent">{isFr ? 'À réunir pour un premier échange' : 'Useful material for a first discussion'}</h3>
            <ul className="mt-4 space-y-2.5">
              {preparation.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-gray-600"><span className="mt-1 text-brand-accent">✓</span>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-5 border-t border-brand-border px-7 py-6 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
        <details className="group max-w-4xl">
          <summary className="flex cursor-pointer list-none items-start gap-3 text-sm font-semibold text-brand-black marker:hidden">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-border font-display text-xs text-brand-accent group-open:bg-brand-black group-open:text-white">?</span>
            <span className="pt-0.5">{isFr ? 'Le fait de payer une création transfère-t-il automatiquement les droits ?' : 'Does paying for a creation automatically transfer the rights?'}</span>
          </summary>
          <p className="ml-9 mt-3 text-sm leading-7 text-gray-600">
            {isFr
              ? 'Il ne faut pas le présumer. Les effets dépendent du contrat et du droit applicable. Vérifier par écrit les droits concernés, les usages autorisés, les territoires et les modalités de rémunération aide à éviter les malentendus.'
              : 'Do not assume that it does. The result depends on the contract and applicable law. Confirming in writing which rights are involved, permitted uses, territories and payment terms can help prevent misunderstandings.'}
          </p>
        </details>
        <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent">
          {isFr ? 'Discuter de vos contrats' : 'Discuss your agreements'} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="border-t border-brand-border bg-brand-surface px-7 py-8 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Organiser et protéger vos actifs' : 'Organise and protect your assets'}</p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">{isFr ? 'Les droits, formalités, contrats et territoires applicables varient selon le projet. Un examen du dossier permet de déterminer les documents et démarches à envisager.' : 'Rights, formalities, agreements and relevant territories vary by project. Reviewing the matter helps identify documents and steps to consider.'}</p>
            <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a href="tel:+261340948961" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">+261 34 09 489 61</a>
              <a href="mailto:contact@rabemananjara.mg" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">contact@rabemananjara.mg</a>
              <span className="text-gray-600">Antananarivo, Madagascar</span>
            </div>
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-accent"><ShieldCheckIcon className="h-6 w-6" aria-hidden="true" /></span>
        </div>
      </div>
    </article>
  );
}
