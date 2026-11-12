import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPrivacyPolicy, type PrivacyPolicyDocument } from '../data/privacyPolicy';

function formatUpdateDate(value: string, isFr: boolean): string {
  const date = new Date(`${value}T12:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(isFr ? 'fr-FR' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(date);
}

function PolicyBody({ text }: { text: string }) {
  const paragraphs = text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  return <div className="space-y-4">
    {paragraphs.map((paragraph, index) => {
      const lines = paragraph.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (lines.length > 0 && lines.every((line) => /^[-*]\s/.test(line))) {
        return <ul key={index} className="space-y-2 pl-6 text-sm leading-7 text-gray-600">{lines.map((line, lineIndex) => <li key={lineIndex} className="list-disc">{line.slice(2)}</li>)}</ul>;
      }
      return <p key={index} className="whitespace-pre-line text-sm leading-7 text-gray-600">{paragraph}</p>;
    })}
  </div>;
}

function getSafeHttpUrl(value: string): string {
  try {
    const url = new URL(value.trim());
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
  } catch {
    return '';
  }
}

export default function PolitiqueConfidentialite() {
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const language = isFr ? 'fr' : 'en';
  const [policy, setPolicy] = useState<PrivacyPolicyDocument>(getPrivacyPolicy);

  useEffect(() => {
    const refresh = () => setPolicy(getPrivacyPolicy());
    window.addEventListener('privacyPolicyUpdated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('privacyPolicyUpdated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const safeReferenceUrl = getSafeHttpUrl(policy.referenceUrl);

  return (
    <main className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <article className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">{policy.pageEyebrow[language]}</p>
        <h1 className="mt-5 text-5xl font-light sm:text-6xl">{policy.pageTitle[language]}</h1>
        <p className="mt-4 text-sm text-gray-500">{policy.updatedLabel[language]} {formatUpdateDate(policy.updatedAt, isFr)}</p>
        <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-7 text-amber-950">{policy.draftNotice[language]}</div>
        <div className="mt-8 divide-y divide-brand-border">
          {policy.blocks.map((block) => (
            <section key={block.id} className="py-6">
              <h2 className="text-xl">{isFr ? block.headingFr : block.headingEn || block.headingFr}</h2>
              <div className="mt-3">
                <PolicyBody text={isFr ? block.bodyFr : block.bodyEn || block.bodyFr} />
                {policy.contactEmail.trim() && (block.id === 'controller' || block.id === 'contact') && (
                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    {policy.contactEmailLabel[language]}{' '}
                    <a className="font-semibold underline underline-offset-2" href={`mailto:${policy.contactEmail.trim()}`}>{policy.contactEmail.trim()}</a>
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
        {(policy.referenceTitle.fr.trim() || policy.referenceTitle.en.trim()) && <p className="mt-8 border-t border-brand-border pt-6 text-xs leading-6 text-gray-500">
          {policy.referenceLabel[language]}{' '}
          {safeReferenceUrl
            ? <a className="font-semibold underline underline-offset-2" href={safeReferenceUrl} target="_blank" rel="noreferrer">{policy.referenceTitle[language]}</a>
            : policy.referenceTitle[language]}
        </p>}
      </article>
    </main>
  );
}
