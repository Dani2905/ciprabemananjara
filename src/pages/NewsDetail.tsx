import { useEffect, useState } from 'react';
import { ArrowLeftIcon, ArrowUpRightIcon, CalendarDaysIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getNews, type NewsItem } from '../data/news';
import NotFound from './NotFound';
import { getSitePagesContent, type SitePagesContent } from '../data/sitePages';

function ArticleBody({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  return <div className="space-y-5">
    {blocks.map((block, index) => {
      const lines = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (lines.length && lines.every((line) => /^[-*]\s/.test(line))) {
        return <ul key={index} className="space-y-2 pl-6 text-base leading-8 text-gray-700">{lines.map((line, lineIndex) => <li key={lineIndex} className="list-disc">{line.slice(2)}</li>)}</ul>;
      }
      if (block.startsWith('## ')) return <h2 key={index} className="pt-4 text-2xl font-medium text-brand-black">{block.slice(3)}</h2>;
      if (block.startsWith('### ')) return <h3 key={index} className="pt-3 text-xl font-semibold text-brand-black">{block.slice(4)}</h3>;
      if (block.startsWith('> ')) return <blockquote key={index} className="border-l-2 border-brand-accent pl-5 text-base italic leading-8 text-gray-600">{block.slice(2)}</blockquote>;
      return <p key={index} className="whitespace-pre-line text-base leading-8 text-gray-700">{block}</p>;
    })}
  </div>;
}

export default function NewsDetail() {
  const { id } = useParams();
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

  const article = items.find((item) => item.id === id);
  if (!article) return <NotFound />;

  const title = isFr ? article.title : article.titleEn || article.title;
  const date = isFr ? article.date : article.dateEn || article.date;
  const description = isFr ? article.desc : article.descEn || article.desc;
  const fullContent = isFr ? article.content || '' : article.contentEn || article.content || '';
  const hasFullContent = Boolean(fullContent.trim() && fullContent.trim() !== description.trim());
  const imageAlt = isFr ? article.imageAlt || title : article.imageAltEn || article.imageAlt || title;
  const related = items.filter((item) => item.id !== article.id).slice(0, 2);

  return <main className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
    <article className="mx-auto max-w-4xl">
      <Link to="/actualites" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-brand-accent"><ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />{copy.backToNews[language]}</Link>
      <header className="mt-8">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent"><CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />{date}</p>
        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">C.IP · {copy.articleEyebrow[language]}</p>
        <h1 className="mt-3 text-4xl font-light leading-tight text-brand-black sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">{description}</p>
      </header>

      {article.image?.trim() && <figure className="mt-10 overflow-hidden rounded-[1.75rem] border border-brand-border bg-brand-surface">
        <img src={article.image} alt={imageAlt} className="max-h-[620px] w-full object-cover" />
      </figure>}

      {hasFullContent && <div className="mt-10 rounded-[1.75rem] border border-brand-border bg-white p-6 sm:p-10">
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent"><NewspaperIcon className="h-4 w-4" aria-hidden="true" />{copy.articleDetail[language]}</div>
        <ArticleBody content={fullContent} />
      </div>}

      <section className="mt-10 flex flex-col gap-5 rounded-[1.75rem] bg-brand-black p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent-light">{copy.contactEyebrow[language]}</p><h2 className="mt-2 text-2xl font-light">{copy.contactTitle[language]}</h2><p className="mt-2 text-sm leading-6 text-white/65">{copy.contactIntro[language]}</p></div>
        <Link to="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-black transition hover:bg-brand-accent-light">{copy.contactCta[language]} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
      </section>
    </article>

    {related.length > 0 && <section className="mx-auto mt-16 max-w-6xl">
      <div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">{copy.relatedEyebrow[language]}</p><h2 className="mt-2 text-2xl font-light">{copy.relatedTitle[language]}</h2></div><Link to="/actualites" className="text-sm font-semibold text-brand-black underline underline-offset-4 hover:text-brand-accent">{copy.relatedLink[language]}</Link></div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {related.map((item) => <Link key={item.id} to={`/actualites/${encodeURIComponent(item.id)}`} className="group rounded-2xl border border-brand-border bg-white p-5 transition hover:border-brand-accent hover:shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">{isFr ? item.date : item.dateEn || item.date}</p>
          <h3 className="mt-3 text-lg font-semibold text-brand-black group-hover:text-brand-accent">{isFr ? item.title : item.titleEn || item.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">{isFr ? item.desc : item.descEn || item.desc}</p>
        </Link>)}
      </div>
    </section>}
  </main>;
}
