import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { defaultExpertiseContent, getExpertiseContent, type ExpertiseContentItem } from '../data/expertiseContent';
import ExpertisePageRenderer from './ExpertisePageRenderer';
import NotFound from './NotFound';

const navigationLabels = [
  { slug: 'marques', number: '01', fr: 'Marques', en: 'Trademarks' },
  { slug: 'brevets', number: '02', fr: 'Brevets', en: 'Patents' },
  { slug: 'dessins', number: '03', fr: 'Dessins & modèles', en: 'Designs' },
  { slug: 'contentieux', number: '04', fr: 'Contentieux', en: 'Disputes' },
  { slug: 'contrats', number: '05', fr: 'Audits & contrats', en: 'Audits & agreements' },
  { slug: 'indications-geographiques', number: '06', fr: 'Indications géographiques', en: 'Geographical indications' },
  { slug: 'noms-commerciaux', number: '07', fr: 'Noms commerciaux', en: 'Trade names' },
];

export default function ExpertiseDetail() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const [pageContents, setPageContents] = useState<ExpertiseContentItem[]>(getExpertiseContent);

  useEffect(() => {
    const refreshContent = () => setPageContents(getExpertiseContent());
    window.addEventListener('storage', refreshContent);
    window.addEventListener('expertiseContentUpdated', refreshContent);
    return () => {
      window.removeEventListener('storage', refreshContent);
      window.removeEventListener('expertiseContentUpdated', refreshContent);
    };
  }, []);

  const index = navigationLabels.findIndex((item) => item.slug === slug);
  const navigationPage = navigationLabels[index];
  if (!navigationPage) return <NotFound />;

  const page = pageContents.find((item) => item.slug === navigationPage.slug) ?? defaultExpertiseContent.find((item) => item.slug === navigationPage.slug);
  if (!page) return <NotFound />;

  const previous = navigationLabels[index - 1];
  const next = navigationLabels[index + 1];
  const pageTitle = isFr ? page.titleFr : page.titleEn;
  const navigationTitle = (item: (typeof navigationLabels)[number]) => {
    const saved = pageContents.find((content) => content.slug === item.slug);
    if (saved) return isFr ? saved.titleFr : saved.titleEn;
    return isFr ? item.fr : item.en;
  };

  return <main className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/expertises" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-brand-accent">
          <span aria-hidden="true">←</span> {isFr ? 'Toutes les expertises' : 'All expertise areas'}
        </Link>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-accent">{isFr ? 'Expertise' : 'Practice area'} {navigationPage.number} · {pageTitle}</p>
      </div>

      <ExpertisePageRenderer page={page} isFr={isFr} number={navigationPage.number} />

      <nav className="mt-8 grid gap-3 sm:grid-cols-2" aria-label={isFr ? 'Navigation entre les expertises' : 'Navigate between expertise areas'}>
        {previous ? <Link to={`/expertises/${previous.slug}`} className="group rounded-2xl border border-brand-border bg-white p-5 transition hover:border-brand-accent hover:shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">{isFr ? 'Expertise précédente' : 'Previous expertise'}</span>
          <span className="mt-2 block text-sm font-semibold text-brand-black group-hover:text-brand-accent">← {navigationTitle(previous)}</span>
        </Link> : <div />}
        {next ? <Link to={`/expertises/${next.slug}`} className="group rounded-2xl border border-brand-border bg-white p-5 text-right transition hover:border-brand-accent hover:shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">{isFr ? 'Expertise suivante' : 'Next expertise'}</span>
          <span className="mt-2 block text-sm font-semibold text-brand-black group-hover:text-brand-accent">{navigationTitle(next)} →</span>
        </Link> : <div />}
      </nav>
    </div>
  </main>;
}
