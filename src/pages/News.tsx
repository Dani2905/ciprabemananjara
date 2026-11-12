import { useEffect, useState } from 'react';
import { ArrowUpRightIcon, CalendarDaysIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getNews, type NewsItem } from '../data/news';
import { getSitePagesContent, type SitePagesContent } from '../data/sitePages';

export default function News() {
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const language = isFr ? 'fr' : 'en';
  const [items, setItems] = useState<NewsItem[]>(getNews);
  const [pages, setPages] = useState<SitePagesContent>(getSitePagesContent);
  const copy = pages.newsPage;

  useEffect(() => {
    const refreshNews = () => setItems(getNews());
    const refreshPages = () => setPages(getSitePagesContent());
    window.addEventListener('appNewsUpdated', refreshNews);
    window.addEventListener('storage', refreshNews);
    window.addEventListener('sitePagesUpdated', refreshPages);
    window.addEventListener('storage', refreshPages);
    return () => {
      window.removeEventListener('appNewsUpdated', refreshNews);
      window.removeEventListener('storage', refreshNews);
      window.removeEventListener('sitePagesUpdated', refreshPages);
      window.removeEventListener('storage', refreshPages);
    };
  }, []);

  return (
    <main className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">{copy.eyebrow[language]}</p>
        <div className="mt-5 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h1 className="max-w-3xl text-5xl font-light leading-[1.05] sm:text-6xl lg:text-7xl">{copy.title[language]}</h1>
          <p className="max-w-md text-base font-light leading-7 text-gray-600">{copy.intro[language]}</p>
        </div>
      </section>

      {items.length > 0 ? (
        <section className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label={copy.listLabel[language]}>
          {items.map((item) => {
            const title = isFr ? item.title : item.titleEn || item.title;
            const date = isFr ? item.date : item.dateEn || item.date;
            const description = isFr ? item.desc : item.descEn || item.desc;
            const imageAlt = isFr ? item.imageAlt || title : item.imageAltEn || item.imageAlt || title;
            const detailPath = `/actualites/${encodeURIComponent(item.id)}`;
            return (
              <article key={item.id} className="flex min-h-[350px] flex-col overflow-hidden rounded-[1.75rem] border border-brand-border bg-white transition hover:-translate-y-1 hover:shadow-lg">
                {item.image?.trim() && (
                  <Link to={detailPath} tabIndex={-1} aria-hidden="true" className="block aspect-[16/10] overflow-hidden bg-brand-surface">
                    <img src={item.image} alt={imageAlt} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" />
                  </Link>
                )}
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent"><CalendarDaysIcon className="h-[14px] w-[14px]" aria-hidden="true" /> {date}</div>
                  <h2 className="mt-5 text-2xl leading-snug">
                    <Link to={detailPath} className="transition hover:text-brand-accent">{title}</Link>
                  </h2>
                  <p className="mt-4 line-clamp-4 text-sm leading-7 text-gray-600">{description}</p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">C.IP · {copy.itemType[language]}</span>
                    <Link to={detailPath} className="inline-flex items-center gap-2 rounded-full bg-brand-black px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-brand-accent" aria-label={`${copy.readMore[language]} : ${title}`}>
                      {copy.readMore[language]} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center rounded-[1.75rem] border border-dashed border-brand-border bg-brand-surface px-6 py-16 text-center">
          <NewspaperIcon className="h-7 w-7 text-brand-accent" aria-hidden="true" />
          <p className="mt-4 text-lg font-medium">{copy.emptyTitle[language]}</p>
          <p className="mt-2 text-sm text-gray-500">{copy.emptyText[language]}</p>
        </div>
      )}

      <p className="mx-auto mt-8 max-w-6xl text-xs leading-6 text-gray-500">{copy.publicationNote[language]}</p>
    </main>
  );
}
