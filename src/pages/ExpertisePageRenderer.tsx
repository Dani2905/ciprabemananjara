import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import type { ExpertiseContentBlock, ExpertiseContentItem } from '../data/expertiseContent';

interface Props {
  page: ExpertiseContentItem;
  isFr: boolean;
  number: string;
}

interface MarkdownGroup { heading: string; body: string }

function splitGroups(markdown: string): MarkdownGroup[] {
  const groups: MarkdownGroup[] = [];
  let heading = '';
  let lines: string[] = [];
  const flush = () => {
    if (heading || lines.some((line) => line.trim())) groups.push({ heading, body: lines.join('\n').trim() });
    heading = '';
    lines = [];
  };
  for (const line of markdown.split(/\r?\n/)) {
    const match = line.match(/^###\s+(.+)$/);
    if (match) { flush(); heading = match[1].trim(); }
    else lines.push(line);
  }
  flush();
  return groups;
}

function MarkdownBody({ text, dark = false }: { text: string; dark?: boolean }) {
  const paragraphs = text.replace(/\n(?=(?:Tags|Mots-clés)\s*:)/gi, '\n\n').split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  const textColor = dark ? 'text-white/70' : 'text-gray-600';
  return <div className="space-y-3">
    {paragraphs.map((paragraph, index) => {
      const lines = paragraph.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (lines.length > 0 && lines.every((line) => /^[-*]\s/.test(line))) {
        return <ul key={index} className={`space-y-2 pl-5 text-sm leading-7 ${textColor}`}>{lines.map((line, lineIndex) => <li key={lineIndex} className="list-disc">{line.slice(2)}</li>)}</ul>;
      }
      if (/^(Tags|Mots-clés)\s*:/i.test(paragraph)) {
        const values = paragraph.replace(/^(Tags|Mots-clés)\s*:/i, '').split('|').map((tag) => tag.trim()).filter(Boolean);
        return <div key={index} className="flex flex-wrap gap-2 pt-1">{values.map((tag) => <span key={tag} className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${dark ? 'bg-white/10 text-white/70' : 'bg-brand-surface text-gray-600'}`}>{tag}</span>)}</div>;
      }
      if (paragraph.startsWith('## ')) return <h3 key={index} className="pt-1 text-xl font-semibold">{paragraph.slice(3)}</h3>;
      if (paragraph.startsWith('### ')) return <h4 key={index} className="pt-1 text-base font-semibold">{paragraph.slice(4)}</h4>;
      if (paragraph.startsWith('> ')) return <blockquote key={index} className={`border-l-2 border-brand-accent pl-4 text-sm italic leading-7 ${textColor}`}>{paragraph.slice(2)}</blockquote>;
      return <p key={index} className={`whitespace-pre-line text-sm leading-7 ${textColor}`}>{paragraph}</p>;
    })}
  </div>;
}

function CardGroups({ block, isFr, dark = false }: { block: ExpertiseContentBlock; isFr: boolean; dark?: boolean }) {
  const body = isFr ? block.bodyFr : block.bodyEn;
  const groups = splitGroups(body);
  if (!groups.length) return <MarkdownBody text={body} dark={dark} />;
  const gridColumns = dark
    ? 'sm:grid-cols-2 lg:grid-cols-4'
    : groups.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : groups.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2';
  return <div className={`grid gap-4 ${gridColumns}`}>
    {groups.map((group, index) => {
      const stepMatch = group.heading.match(/^(\d{2})\s*[—-]\s*(.*)$/);
      return <section key={`${block.id}-${index}`} className={`rounded-2xl border p-5 sm:p-6 ${dark ? 'border-white/15 bg-white/5' : 'border-brand-border bg-white transition hover:-translate-y-0.5 hover:shadow-md'}`}>
        {stepMatch ? <div className="mb-3 flex items-center justify-between gap-3"><span className={`font-display text-sm ${dark ? 'text-brand-accent-light' : 'text-brand-accent'}`}>{stepMatch[1]}</span><h3 className={`text-base font-semibold ${dark ? 'text-white' : 'text-brand-black'}`}>{stepMatch[2]}</h3></div> : <h3 className={`text-base font-semibold ${dark ? 'text-white' : 'text-brand-black'}`}>{group.heading}</h3>}
        {group.body && <div className="mt-3"><MarkdownBody text={group.body} dark={dark} /></div>}
      </section>;
    })}
  </div>;
}

function ExpertiseBlock({ block, isFr }: { block: ExpertiseContentBlock; isFr: boolean }) {
  const eyebrow = isFr ? block.eyebrowFr : block.eyebrowEn;
  const heading = isFr ? block.headingFr : block.headingEn;
  const description = isFr ? block.descriptionFr : block.descriptionEn;
  const body = isFr ? block.bodyFr : block.bodyEn;
  const button = isFr ? block.buttonFr : block.buttonEn;
  const sourceLabel = isFr ? block.sourceLabelFr : block.sourceLabelEn;

  if (block.kind === 'cta') return <section className="mt-14 overflow-hidden rounded-[1.75rem] border border-brand-border bg-brand-surface px-7 py-8 sm:px-10 lg:px-12">
    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div>
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{eyebrow}</p>}
      {heading && <h2 className="mt-2 text-2xl font-semibold text-brand-black">{heading}</h2>}
      {body && <div className="mt-3 max-w-3xl"><MarkdownBody text={body} /></div>}
      <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
        <a href="tel:+261340948961" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">+261 34 09 489 61</a>
        <a href="mailto:contact@rabemananjara.mg" className="font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4">contact@rabemananjara.mg</a>
        <span className="text-gray-600">Antananarivo, Madagascar</span>
      </div>
    </div><Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent">{button || (isFr ? 'Nous contacter' : 'Contact us')} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" /></Link></div>
  </section>;

  if (block.kind === 'note') return <aside className="mt-8 rounded-2xl bg-[#f8f7f3] px-5 py-5 sm:px-6">
    {heading && <h2 className="text-sm font-semibold text-brand-black">{heading}</h2>}
    <div className={heading ? 'mt-2' : ''}><MarkdownBody text={body} /></div>
    {block.sourceUrl && sourceLabel && <a href={block.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs font-semibold text-brand-black underline underline-offset-2">{sourceLabel}</a>}
  </aside>;

  if (block.kind === 'steps') return <section className="mt-14 rounded-[1.75rem] bg-brand-black p-7 text-white sm:p-9">
    {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent-light">{eyebrow}</p>}
    {heading && <h2 className="mt-2 text-2xl">{heading}</h2>}
    {description && <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65">{description}</p>}
    <div className="mt-7"><CardGroups block={block} isFr={isFr} dark /></div>
  </section>;

  if (block.kind === 'cards') return <section className="mt-14">
    {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{eyebrow}</p>}
    {heading && <h2 className="mt-2 text-2xl font-light text-brand-black">{heading}</h2>}
    {description && <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500">{description}</p>}
    <div className="mt-5"><CardGroups block={block} isFr={isFr} /></div>
  </section>;

  if (block.kind === 'faq') {
    const groups = splitGroups(body);
    return <section className="mt-12 rounded-2xl border border-brand-border bg-white p-6 sm:p-8">
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{eyebrow}</p>}
      {heading && <h2 className="mt-2 text-xl font-semibold">{heading}</h2>}
      <div className="mt-4 divide-y divide-brand-border">{groups.map((group, index) => <details key={`${block.id}-${index}`} className="group py-4" open={groups.length === 1}><summary className="cursor-pointer list-none pr-8 text-sm font-semibold text-brand-black marker:hidden">{group.heading}</summary><div className="mt-3"><MarkdownBody text={group.body} /></div></details>)}{!groups.length && <MarkdownBody text={body} />}</div>
    </section>;
  }

  if (block.kind === 'list') return <section className="mt-12 rounded-2xl border border-brand-border bg-[#f8f7f3] p-6 sm:p-8">
    {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{eyebrow}</p>}
    {heading && <h2 className="mt-2 text-xl font-semibold text-brand-black">{heading}</h2>}
    {description && <p className="mt-3 text-sm leading-6 text-gray-500">{description}</p>}
    <div className="mt-4"><MarkdownBody text={body} /></div>
  </section>;

  if (block.kind === 'text') return <section className="mt-12 rounded-2xl border border-brand-border bg-white p-6 sm:p-8">
    {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{eyebrow}</p>}
    {heading && <h2 className="mt-2 text-xl font-semibold text-brand-black">{heading}</h2>}
    {description && <p className="mt-3 text-sm leading-6 text-gray-500">{description}</p>}
    <div className="mt-4"><MarkdownBody text={body} /></div>
  </section>;

  return <aside className="mt-8 rounded-2xl border-l-2 border-brand-accent bg-brand-surface p-6">
    {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">{eyebrow}</p>}
    {heading && <h2 className="mt-2 text-base font-semibold text-brand-black">{heading}</h2>}
    <div className="mt-2"><MarkdownBody text={body} /></div>
  </aside>;
}

export default function ExpertisePageRenderer({ page, isFr, number }: Props) {
  const title = isFr ? page.titleFr : page.titleEn;
  const eyebrow = isFr ? page.eyebrowFr : page.eyebrowEn;
  const introHeading = isFr ? page.introHeadingFr : page.introHeadingEn;
  const intro = isFr ? page.introFr : page.introEn;
  const introExtra = isFr ? page.introExtraFr : page.introExtraEn;
  const calloutHeading = isFr ? page.calloutHeadingFr : page.calloutHeadingEn;
  const callout = isFr ? page.calloutFr : page.calloutEn;
  return <article className="overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-sm">
    <div className="p-7 sm:p-10 lg:p-12">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-surface text-brand-accent"><DocumentTextIcon className="h-7 w-7" aria-hidden="true" /></span>
        <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">{number} · {eyebrow}</p><p className="mt-1 text-xs font-medium text-gray-400">C.IP · Madagascar & international</p></div>
      </div>
      <div className="mt-9 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div><h1 className="text-3xl font-light leading-tight text-brand-black sm:text-4xl">{title}</h1>
          {introHeading && <h2 className="mt-7 text-xl font-medium text-brand-black">{introHeading}</h2>}
          {intro && <p className="mt-3 text-sm leading-7 text-gray-600">{intro}</p>}
          {introExtra && <p className="mt-4 text-sm leading-7 text-gray-600">{introExtra}</p>}
        </div>
        {(calloutHeading || callout) && <aside className="rounded-2xl border-l-2 border-brand-accent bg-brand-surface p-6">{calloutHeading && <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">{calloutHeading}</p>}{callout && <p className="mt-3 text-sm leading-7 text-gray-700">{callout}</p>}</aside>}
      </div>
      {page.sections.map((section) => <ExpertiseBlock key={section.id} block={section} isFr={isFr} />)}
    </div>
  </article>;
}
