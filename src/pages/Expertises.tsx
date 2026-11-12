import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  BuildingStorefrontIcon,
  DocumentDuplicateIcon,
  GlobeAltIcon,
  PaintBrushIcon,
  ScaleIcon,
  SparklesIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { getExpertiseContent, type ExpertiseContentItem } from '../data/expertiseContent';
import { getSitePagesContent, type SitePagesContent } from '../data/sitePages';

const expertiseAreas = [
  { slug: 'marques', number: '01', icon: TagIcon, frCategory: 'Identité', enCategory: 'Identity' },
  { slug: 'brevets', number: '02', icon: SparklesIcon, frCategory: 'Innovation', enCategory: 'Innovation' },
  { slug: 'dessins', number: '03', icon: PaintBrushIcon, frCategory: 'Création', enCategory: 'Creation' },
  { slug: 'contentieux', number: '04', icon: ScaleIcon, frCategory: 'Défense', enCategory: 'Dispute resolution' },
  { slug: 'contrats', number: '05', icon: DocumentDuplicateIcon, frCategory: 'Valorisation', enCategory: 'Commercialisation' },
  { slug: 'indications-geographiques', number: '06', icon: GlobeAltIcon, frCategory: 'Terroir', enCategory: 'Origin & place' },
  { slug: 'noms-commerciaux', number: '07', icon: BuildingStorefrontIcon, frCategory: 'Entreprise', enCategory: 'Business' },
] as const;

export default function Expertises() {
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const [expertiseContent, setExpertiseContent] = useState<ExpertiseContentItem[]>(getExpertiseContent);
  const [sitePages, setSitePages] = useState<SitePagesContent>(getSitePagesContent);
  const [activeSlug, setActiveSlug] = useState<string>(expertiseAreas[0].slug);

  useEffect(() => {
    const refreshContent = () => setExpertiseContent(getExpertiseContent());
    const refreshSitePages = () => setSitePages(getSitePagesContent());
    window.addEventListener('storage', refreshContent);
    window.addEventListener('storage', refreshSitePages);
    window.addEventListener('expertiseContentUpdated', refreshContent);
    window.addEventListener('sitePagesUpdated', refreshSitePages);
    return () => {
      window.removeEventListener('storage', refreshContent);
      window.removeEventListener('storage', refreshSitePages);
      window.removeEventListener('expertiseContentUpdated', refreshContent);
      window.removeEventListener('sitePagesUpdated', refreshSitePages);
    };
  }, []);

  const activeArea = expertiseAreas.find((area) => area.slug === activeSlug) ?? expertiseAreas[0];
  const activePageContent = expertiseContent.find((item) => item.slug === activeArea.slug) ?? expertiseContent[0];
  const activeCopy = {
    title: isFr ? activePageContent.titleFr : activePageContent.titleEn,
    description: isFr ? activePageContent.summaryFr : activePageContent.summaryEn,
    category: sitePages.expertiseOverview.categories.find((item) => item.slug === activeArea.slug)?.[isFr ? 'fr' : 'en'] ?? (isFr ? activeArea.frCategory : activeArea.enCategory),
  };
  const overview = sitePages.expertiseOverview;
  const ActiveIcon = activeArea.icon;

  return (
    <main className="bg-[#f7f6f2] px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <section className="relative isolate overflow-hidden rounded-[2rem] bg-brand-black text-white sm:rounded-[2.75rem]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.08] sm:-right-20 sm:-top-64 sm:h-[42rem] sm:w-[42rem]">
            <div className="absolute inset-10 rounded-full border border-white/[0.07] sm:inset-16" />
            <div className="absolute inset-24 rounded-full border border-white/[0.06] sm:inset-32" />
          </div>
          <div className="relative grid gap-10 px-7 py-9 sm:px-12 sm:py-12 lg:grid-cols-[1fr_300px] lg:items-end lg:px-16 lg:py-16">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-light" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">C.IP <span className="mx-1.5 text-white/30">/</span> {overview.brandLabel[isFr ? 'fr' : 'en']}</span>
              </div>
              <p className="mt-9 text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent-light">{overview.heroEyebrow[isFr ? 'fr' : 'en']}</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl">{overview.title[isFr ? 'fr' : 'en']}</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">{overview.intro[isFr ? 'fr' : 'en']}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-black transition hover:bg-brand-accent-light">
                  {overview.contactCta[isFr ? 'fr' : 'en']} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href="#domaines" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white/85 transition hover:border-white/50 hover:bg-white/[0.06]">
                  {overview.exploreCta[isFr ? 'fr' : 'en']} <ArrowDownIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="relative flex min-h-44 flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 sm:min-h-52 sm:p-7">
              <span aria-hidden="true" className="absolute -right-5 -top-10 font-display text-[11rem] font-light leading-none text-white/[0.035]">IP</span>
              <div className="relative flex items-start justify-between gap-4">
                <p className="max-w-[9rem] text-[10px] font-semibold uppercase leading-5 tracking-[0.2em] text-white/55">{overview.featureLabel[isFr ? 'fr' : 'en']}</p>
                <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-white/60">C.IP</span>
              </div>
              <div className="relative mt-7 flex items-end justify-between">
                <div>
                  <p className="font-display text-6xl font-light leading-none">{String(expertiseContent.length).padStart(2, '0')}</p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-accent-light">{overview.featureTitle[isFr ? 'fr' : 'en']}</p>
                </div>
                <div className="max-w-28 text-right"><p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/30">{overview.domainCountLabel[isFr ? 'fr' : 'en']}</p><p className="mt-1 text-xs leading-5 text-white/45">{overview.geography[isFr ? 'fr' : 'en']}</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="domaines" className="scroll-mt-24 pt-16 sm:pt-20">
          <div className="mb-7 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">{overview.indexEyebrow[isFr ? 'fr' : 'en']}</p>
              <h2 className="mt-3 text-3xl font-light sm:text-4xl">{overview.indexTitle[isFr ? 'fr' : 'en']}</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-gray-500">{overview.indexIntro[isFr ? 'fr' : 'en']}</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-8">
            <div className="order-2 space-y-3 lg:order-1">
              {expertiseAreas.map((area) => {
                const pageContent = expertiseContent.find((item) => item.slug === area.slug);
                if (!pageContent) return null;
                const title = isFr ? pageContent.titleFr : pageContent.titleEn;
                const description = isFr ? pageContent.summaryFr : pageContent.summaryEn;
                const category = sitePages.expertiseOverview.categories.find((item) => item.slug === area.slug)?.[isFr ? 'fr' : 'en'] ?? (isFr ? area.frCategory : area.enCategory);
                const Icon = area.icon;
                const isActive = area.slug === activeArea.slug;
                return (
                  <Link
                    key={area.slug}
                    to={`/expertises/${area.slug}`}
                    onMouseEnter={() => setActiveSlug(area.slug)}
                    onFocus={() => setActiveSlug(area.slug)}
                    className={`group block rounded-[1.4rem] border p-4 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 sm:p-5 ${isActive ? 'border-brand-black bg-brand-black text-white shadow-lg shadow-brand-black/10' : 'border-brand-border bg-white text-brand-black hover:-translate-y-0.5 hover:border-brand-accent/60 hover:shadow-md'}`}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <span className={`w-8 shrink-0 font-display text-xs ${isActive ? 'text-brand-accent-light' : 'text-gray-400'}`}>{area.number}</span>
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${isActive ? 'bg-white/10 text-brand-accent-light' : 'bg-brand-surface text-brand-accent group-hover:bg-brand-black group-hover:text-white'}`}><Icon className="h-5 w-5" aria-hidden="true" /></span>
                      <div className="min-w-0 flex-1">
                        <span className={`text-[9px] font-bold uppercase tracking-[0.16em] ${isActive ? 'text-white/45' : 'text-brand-accent'}`}>{category}</span>
                        <h3 className="mt-1 text-sm font-semibold leading-snug sm:text-base">{title}</h3>
                      </div>
                      <ArrowUpRightIcon className={`h-5 w-5 shrink-0 transition ${isActive ? 'text-brand-accent-light' : 'text-gray-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-accent'}`} aria-hidden="true" />
                    </div>
                    <p className={`ml-[3.65rem] mt-3 max-w-xl text-xs leading-6 sm:ml-16 sm:text-sm ${isActive ? 'text-white/65' : 'text-gray-500'}`}>{description}</p>
                  </Link>
                );
              })}
            </div>

            <aside className="order-1 lg:order-2 lg:sticky lg:top-28" aria-label={isFr ? 'Aperçu du domaine sélectionné' : 'Selected area preview'}>
              <div className="relative isolate min-h-[390px] overflow-hidden rounded-[2rem] bg-[#1b1b18] p-7 text-white sm:min-h-[430px] sm:p-9">
                <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full border border-white/[0.07]">
                  <div className="absolute inset-8 rounded-full border border-white/[0.06]" />
                  <div className="absolute inset-16 rounded-full border border-white/[0.05]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">{overview.focusLabel[isFr ? 'fr' : 'en']}</span>
                  <span className="font-display text-sm text-brand-accent-light">{activeArea.number} <span className="text-white/25">/ 07</span></span>
                </div>
                <div className="relative mt-12 sm:mt-16">
                  <span aria-hidden="true" className="absolute -right-2 -top-14 font-display text-[10rem] font-light leading-none text-white/[0.035] sm:-right-4 sm:-top-20 sm:text-[13rem]">{activeArea.number}</span>
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.08] text-brand-accent-light"><ActiveIcon className="h-7 w-7" aria-hidden="true" /></div>
                  <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-accent-light">{activeCopy.category}</p>
                  <h3 className="relative mt-3 max-w-lg text-3xl font-light leading-tight sm:text-4xl">{activeCopy.title}</h3>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-white/60">{activeCopy.description}</p>
                  <Link to={`/expertises/${activeArea.slug}`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-black transition hover:bg-brand-accent-light">
                    {overview.previewCta[isFr ? 'fr' : 'en']} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="absolute inset-x-7 bottom-6 flex items-center justify-between border-t border-white/10 pt-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30 sm:inset-x-9 sm:bottom-7">
                  <span>C.IP</span><span>{isFr ? 'Antananarivo · Madagascar' : 'Antananarivo · Madagascar'}</span>
                </div>
              </div>
              <p className="mt-4 px-1 text-xs leading-6 text-gray-500">{overview.disclaimer[isFr ? 'fr' : 'en']}</p>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
