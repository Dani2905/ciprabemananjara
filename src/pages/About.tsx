import { useEffect, useState } from 'react';
import { ArrowUpRightIcon, EyeIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSiteContent, type SiteContent } from '../data/siteContent';
import { getSitePagesContent, type SitePagesContent } from '../data/sitePages';

const valueIcons = [GlobeAltIcon, EyeIcon, ScaleIcon];

export default function About() {
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const language = isFr ? 'fr' : 'en';
  const [content, setContent] = useState<SiteContent>(getSiteContent);
  const [pages, setPages] = useState<SitePagesContent>(getSitePagesContent);

  useEffect(() => {
    const updateContent = () => setContent(getSiteContent());
    const updatePages = () => setPages(getSitePagesContent());
    const updateFromStorage = () => { updateContent(); updatePages(); };
    window.addEventListener('appSiteContentUpdated', updateContent);
    window.addEventListener('sitePagesUpdated', updatePages);
    window.addEventListener('storage', updateFromStorage);
    return () => {
      window.removeEventListener('appSiteContentUpdated', updateContent);
      window.removeEventListener('sitePagesUpdated', updatePages);
      window.removeEventListener('storage', updateFromStorage);
    };
  }, []);

  const about = pages.about;

  return (
    <main className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">{about.eyebrow[language]}</p>
        <div className="mt-5 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h1 className="max-w-3xl text-5xl font-light leading-[1.06] sm:text-6xl lg:text-7xl">{about.title[language]}</h1>
          <p className="max-w-xl text-lg font-light leading-8 text-gray-600">{about.lead[language]}</p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex min-h-[310px] flex-col justify-between rounded-[2rem] bg-brand-black p-8 text-white sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent-light">{about.cardEyebrow[language]}</span>
            <p className="font-display text-3xl leading-snug sm:text-4xl">{about.cardText[language]}</p>
            <span className="h-px w-20 bg-brand-accent-light/70" />
          </div>
          <div className="flex min-h-[310px] items-center rounded-[2rem] border border-brand-border bg-brand-surface p-8 sm:p-12">
            <p className="max-w-2xl text-xl font-light leading-9 text-gray-700">{isFr ? content.aboutIntroFr : content.aboutIntroEn}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">{about.commitmentEyebrow[language]}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">{about.commitmentTitle[language]}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {about.values.map((value, index) => {
            const Icon = valueIcons[index % valueIcons.length];
            return (
              <article key={value.id} className="rounded-[1.75rem] border border-brand-border bg-white p-7 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-surface text-brand-accent"><Icon className="h-[21px] w-[21px]" aria-hidden="true" /></div>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-brand-accent">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-2xl">{value.title[language]}</h3>
                <p className="mt-4 text-sm leading-7 text-gray-600">{value.text[language]}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-24 flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-brand-surface p-8 sm:p-12 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">{about.ctaEyebrow[language]}</p>
          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">{about.ctaTitle[language]}</h2>
        </div>
        <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-brand-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent">
          {about.ctaButton[language]} <ArrowUpRightIcon className="h-[17px] w-[17px]" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
