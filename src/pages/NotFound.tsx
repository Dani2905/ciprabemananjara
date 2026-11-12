import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { getSitePagesContent, type SitePagesContent } from '../data/sitePages';

export default function NotFound() {
  const { i18n } = useTranslation();
  const language = i18n.language.startsWith('fr') ? 'fr' : 'en';
  const [pages, setPages] = useState<SitePagesContent>(getSitePagesContent);

  useEffect(() => {
    const refresh = () => setPages(getSitePagesContent());
    window.addEventListener('sitePagesUpdated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('sitePagesUpdated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const copy = pages.notFound;
  return (
    <main className="flex min-h-[70vh] items-center px-5 py-24 md:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">{copy.eyebrow[language]}</p>
        <h1 className="mt-4 text-5xl font-light sm:text-6xl">{copy.title[language]}</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-600">{copy.text[language]}</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent">
          <ArrowLeftIcon className="h-[17px] w-[17px]" aria-hidden="true" /> {copy.back[language]}
        </Link>
      </div>
    </main>
  );
}
