import { Link } from 'react-router-dom';
import type { ExpertiseContentItem } from '../../data/expertiseContent';
import {
  ArrowPathIcon,
  ArrowUpRightIcon,
  ChatBubbleLeftRightIcon,
  DocumentMagnifyingGlassIcon,
  ScaleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';

const disputeServices = [
  {
    icon: DocumentMagnifyingGlassIcon,
    fr: {
      title: 'Opposition & contestations',
      text: "Examiner un dépôt de tiers, vos droits antérieurs et les voies de contestation disponibles. Une opposition formelle n'est envisageable que si le régime et la procédure applicables la prévoient.",
      tags: ['Dépôts de tiers', 'Droits antérieurs', 'Délais à vérifier'],
    },
    en: {
      title: 'Oppositions & challenges',
      text: 'Review a third-party filing, prior rights and available challenge routes. A formal opposition is an option only where the applicable regime and procedure provide for it.',
      tags: ['Third-party filings', 'Prior rights', 'Check deadlines'],
    },
  },
  {
    icon: ShieldExclamationIcon,
    fr: {
      title: 'Actions en contrefaçon',
      text: 'Évaluer les droits invoqués, préserver les éléments de preuve et examiner les mesures administratives ou judiciaires à envisager avec les conseils compétents.',
      tags: ['Preuves', 'Mise en demeure', 'Juridictions compétentes'],
    },
    en: {
      title: 'Infringement actions',
      text: 'Assess the rights involved, preserve evidence and consider administrative or judicial measures with the appropriate counsel.',
      tags: ['Evidence', 'Notices', 'Competent courts'],
    },
  },
  {
    icon: ChatBubbleLeftRightIcon,
    fr: {
      title: 'Négociation & médiation',
      text: 'Étudier une voie amiable lorsque le contexte s’y prête, afin d’évaluer les options de résolution avant ou pendant une procédure.',
      tags: ['Dialogue', 'Accord', 'Selon le dossier'],
    },
    en: {
      title: 'Negotiation & mediation',
      text: 'Consider an amicable route where appropriate, and assess settlement options before or during proceedings.',
      tags: ['Dialogue', 'Settlement', 'Matter-dependent'],
    },
  },
] as const;

const strengths = [
  {
    fr: { title: 'Expertise spécialisée', text: 'Une analyse des titres, des démarches OMAPI et des juridictions compétentes selon le dossier.' },
    en: { title: 'Specialised expertise', text: 'Review of rights, OMAPI procedures and competent jurisdictions for the matter.' },
  },
  {
    fr: { title: 'Réactivité', text: 'Repérer les échéances et préserver les éléments utiles dès les premiers échanges.' },
    en: { title: 'Responsiveness', text: 'Identify deadlines and help preserve relevant material from the outset.' },
  },
  {
    fr: { title: 'Accompagnement complet', text: 'Un suivi coordonné de l’analyse initiale aux prochaines étapes du dossier.' },
    en: { title: 'End-to-end support', text: 'Coordinated guidance from the initial review through the next steps in the matter.' },
  },
  {
    fr: { title: 'Stratégie personnalisée', text: 'Une approche tenant compte des preuves, des objectifs et des risques propres à votre situation.' },
    en: { title: 'Tailored approach', text: 'An approach informed by the evidence, objectives and risks specific to your situation.' },
  },
] as const;

const approachSteps = [
  {
    number: '01', icon: DocumentMagnifyingGlassIcon,
    fr: { title: 'Analyse', text: 'Examiner les droits, les faits, les preuves disponibles et les échéances.' },
    en: { title: 'Review', text: 'Examine the rights, facts, available evidence and deadlines.' },
  },
  {
    number: '02', icon: ScaleIcon,
    fr: { title: 'Stratégie', text: 'Comparer les options amiables, administratives et judiciaires selon le droit applicable.' },
    en: { title: 'Strategy', text: 'Consider amicable, administrative and judicial options under applicable law.' },
  },
  {
    number: '03', icon: ArrowUpRightIcon,
    fr: { title: 'Action', text: 'Préparer les démarches retenues et coordonner, si nécessaire, avec les professionnels habilités.' },
    en: { title: 'Action', text: 'Prepare the selected steps and coordinate, where needed, with appropriately qualified professionals.' },
  },
  {
    number: '04', icon: ArrowPathIcon,
    fr: { title: 'Suivi', text: 'Suivre les échanges, décisions et suites à donner jusqu’à la prochaine étape du dossier.' },
    en: { title: 'Follow-up', text: 'Track communications, decisions and next steps as the matter progresses.' },
  },
] as const;

const reasons = [
  {
    fr: { title: 'Accompagnement spécialisé', text: 'Le Cabinet peut examiner les titres, les démarches auprès de l’OMAPI et les options disponibles, puis coordonner avec les professionnels compétents lorsque le dossier le nécessite.' },
    en: { title: 'Specialised support', text: 'The firm can review rights, OMAPI procedures and available options, and coordinate with suitably qualified professionals where the matter requires it.' },
  },
  {
    fr: { title: 'Analyse méthodique', text: 'Une démarche structurée pour analyser les faits, les preuves, les délais applicables et les options à envisager.' },
    en: { title: 'A considered review', text: 'A structured approach to the facts, evidence, applicable deadlines and options to consider.' },
  },
  {
    fr: { title: 'Approche préventive', text: 'Des conseils pour repérer les risques et envisager des mesures de prévention adaptées.' },
    en: { title: 'Preventive approach', text: 'Guidance to identify risks and consider suitable preventive measures.' },
  },
  {
    fr: { title: 'Support continu', text: 'Un accompagnement pendant les échanges et démarches retenus, avec les intervenants compétents.' },
    en: { title: 'Ongoing support', text: 'Support through the selected communications and steps, alongside the appropriate professionals.' },
  },
] as const;

export default function LitigationSection({ isFr, pageContent }: { isFr: boolean; pageContent: ExpertiseContentItem }) {
  const title = isFr ? pageContent.titleFr : pageContent.titleEn;
  const intro = isFr ? pageContent.introFr : pageContent.introEn;
  return (
    <article id="contentieux" className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-sm">
      <div className="p-7 sm:p-10 lg:p-12">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-surface text-brand-accent"><ScaleIcon className="h-7 w-7" aria-hidden="true" /></span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">04 · {isFr ? 'Défense & différends' : 'Enforcement & disputes'}</p>
            <p className="mt-1 text-xs font-medium text-gray-400">C.IP · Madagascar & international</p>
          </div>
        </div>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h1 className="text-3xl font-light leading-tight sm:text-4xl">{title}</h1>
            <h3 className="mt-7 text-xl">{isFr ? 'Pourquoi faire appel à un mandataire ?' : 'Why involve an IP representative?'}</h3>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {intro}
            </p>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              {isFr
                ? "La protection de vos actifs peut contribuer à défendre vos intérêts économiques. Les faits, les preuves, les objectifs et le droit applicable orientent la réponse; aucun résultat ne peut être garanti à l'avance."
                : 'Protecting your assets can help defend your commercial interests. Facts, evidence, objectives and applicable law inform the response; no outcome can be guaranteed in advance.'}
            </p>
          </div>
          <aside className="rounded-2xl border-l-2 border-brand-accent bg-brand-surface p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">{isFr ? 'Agir avec méthode' : 'A considered response'}</p>
            <p className="mt-3 text-sm leading-7 text-gray-700">
              {isFr
                ? "Conservez les éléments utiles et les dates des faits. Une action, une négociation ou une réponse à un dépôt doit être choisie selon les droits en présence, les délais applicables et les conséquences possibles."
                : 'Preserve relevant material and record key dates. An action, negotiation or response to a filing should be chosen in light of the rights involved, applicable deadlines and possible consequences.'}
            </p>
          </aside>
        </div>

        <div className="mt-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Services de contentieux' : 'Dispute services'}</p>
              <h3 className="mt-2 text-2xl">{isFr ? 'Évaluer les voies disponibles' : 'Assess the available routes'}</h3>
            </div>
            <p className="max-w-lg text-sm leading-6 text-gray-500">{isFr ? 'La procédure à privilégier dépend du titre, des faits et du territoire.' : 'The appropriate procedure depends on the right, the facts and the territory.'}</p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {disputeServices.map((service) => {
              const copy = isFr ? service.fr : service.en;
              const Icon = service.icon;
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Les avantages de notre expertise' : 'The value of our support'}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((item, index) => {
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

        <div className="mt-14 rounded-[1.75rem] bg-brand-black p-7 text-white sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent-light">{isFr ? 'Notre approche' : 'Our approach'}</p>
          <h3 className="mt-2 text-2xl">{isFr ? 'Les étapes du dossier' : 'Steps in a matter'}</h3>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((step) => {
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
              La disponibilité d’une procédure d’opposition, les délais et les obligations de représentation dépendent du droit en vigueur, du type de dossier et de la situation des parties. Un avocat peut être nécessaire pour certaines démarches judiciaires; le Cabinet peut coordonner l’intervention des professionnels compétents.{' '}
              <a href="http://www.omapi.mg/application_de_droit.html" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">Informations de l’OMAPI sur la mise en application des droits</a>.
            </>
          ) : (
            <>
              The availability of an opposition procedure, deadlines and representation requirements depend on current law, the type of matter and the parties’ circumstances. A lawyer may be required for certain court proceedings; the firm can coordinate with appropriately qualified professionals.{' '}
              <a href="http://www.omapi.mg/application_de_droit.html" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">OMAPI information on enforcement</a>.
            </>
          )}
        </p>
      </div>

      <div className="border-t border-brand-border bg-brand-surface px-7 py-8 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{isFr ? 'Contactez-nous' : 'Get in touch'}</p>
            <h3 className="mt-2 text-2xl">{isFr ? 'Vos droits sont menacés ?' : 'Are your rights at risk?'}</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">{isFr ? 'Contactez-nous sans tarder pour examiner les faits, les délais et les options adaptées à votre situation.' : 'Contact us promptly to review the facts, deadlines and options suited to your situation.'}</p>
            <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a href="tel:+261340948961" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">+261 34 09 489 61</a>
              <a href="mailto:contact@rabemananjara.mg" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">contact@rabemananjara.mg</a>
              <span className="text-gray-600">Antananarivo, Madagascar</span>
            </div>
          </div>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent">
            {isFr ? 'Parler à un mandataire' : 'Talk to an IP representative'} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
