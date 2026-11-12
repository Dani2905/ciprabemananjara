import { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { getLegalNoticeContent, type LegalNoticeContent } from '../data/legalNotice';

function formatUpdateDate(value: string, isFr: boolean): string {
  const date = new Date(`${value}T12:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(isFr ? 'fr-FR' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(date);
}

function expandTokens(body: string, content: LegalNoticeContent, language: 'fr' | 'en'): string {
  const values: Record<string, string> = {
    '{{email}}': content.email.trim() || '—',
    '{{accreditation}}': content.accreditation[language],
    '{{contact}}': content.contact[language],
    '{{hostingProvider}}': content.hostingProvider[language],
    '{{hostingPhone}}': content.hostingPhone || '—',
    '{{hostingWebsite}}': content.hostingWebsite || '—',
  };
  return Object.entries(values).reduce((text, [token, value]) => text.replaceAll(token, value), body);
}

function renderTextWithLinks(text: string): ReactNode[] {
  const expression = /(https?:\/\/[^\s]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\+?\d[\d\s().-]{6,}\d)/gi;
  return text.split(expression).map((part, index) => {
    if (/^https?:\/\//i.test(part)) {
      try {
        const url = new URL(part);
        if (url.protocol === 'http:' || url.protocol === 'https:') return <a key={index} className="break-all font-medium text-brand-accent underline underline-offset-2" href={url.href} target="_blank" rel="noreferrer">{part}</a>;
      } catch { /* Render malformed URLs as plain text. */ }
    }
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(part)) {
      return <a key={index} className="break-all font-medium text-brand-accent underline underline-offset-2" href={`mailto:${part}`}>{part}</a>;
    }
    if (/^\+?\d[\d\s().-]{6,}\d$/.test(part)) {
      const phone = part.replace(/[^+\d]/g, '');
      return <a key={index} className="font-medium text-brand-accent underline underline-offset-2" href={`tel:${phone}`}>{part}</a>;
    }
    return <span key={index}>{part}</span>;
  });
}

export default function MentionsLegales() {
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const language = isFr ? 'fr' : 'en';
  const [content, setContent] = useState<LegalNoticeContent>(getLegalNoticeContent);

  useEffect(() => {
    const refresh = () => setContent(getLegalNoticeContent());
    window.addEventListener('legalNoticeUpdated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('legalNoticeUpdated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const updateDate = formatUpdateDate(content.updatedAt, isFr);

  return (
    <main className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <article className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">{content.pageEyebrow[language]}</p>
        <h1 className="mt-5 text-5xl font-light sm:text-6xl">{content.pageTitle[language]}</h1>
        <p className="mt-4 text-sm text-gray-500">{content.updatedLabel[language]} {updateDate}</p>
        <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-7 text-amber-950">{content.draftNotice[language]}</div>
        <div className="mt-8 divide-y divide-brand-border">
          {content.blocks.map((block) => (
            <section key={block.id} className="py-6">
              <h2 className="text-xl">{isFr ? block.titleFr : block.titleEn || block.titleFr}</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">{renderTextWithLinks(expandTokens(isFr ? block.bodyFr : block.bodyEn || block.bodyFr, content, language))}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
