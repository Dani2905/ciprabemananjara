import { useEffect, useState } from 'react';
import { ArrowUpRightIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSitePagesContent, type SitePagesContent } from '../data/sitePages';

export default function Footer() {
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const language = isFr ? 'fr' : 'en';
  const [pages, setPages] = useState<SitePagesContent>(getSitePagesContent);
  const contactEmail = pages.contact.email.trim() || 'contact@rabemananjara.mg';
  const phone = pages.contact.phone;
  const phoneLink = phone.replace(/[^\d+]/g, '');

  useEffect(() => {
    const refresh = () => setPages(getSitePagesContent());
    window.addEventListener('sitePagesUpdated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('sitePagesUpdated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const footer = pages.footer;
  const navigation = pages.navigation;
  const contact = pages.contact;

  return (
    <footer className="relative mt-auto overflow-hidden bg-[#171714] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-56 h-[34rem] w-[34rem] rounded-full border border-white/[0.045]">
        <div className="absolute inset-12 rounded-full border border-white/[0.04]" />
        <div className="absolute inset-24 rounded-full border border-white/[0.035]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 sm:pt-16 lg:pt-20">
        <div className="grid gap-x-8 gap-y-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_1fr_0.8fr] lg:gap-10 lg:pb-16">
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="group inline-flex items-center gap-3.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-light focus-visible:ring-offset-4 focus-visible:ring-offset-[#171714]">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white font-display text-[13px] font-bold tracking-tight text-brand-black transition group-hover:bg-brand-accent-light">C.IP</span>
              <span className="leading-tight">
                <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">{footer.descriptor[language]}</span>
                <span className="mt-1 block font-display text-lg font-semibold">Cabinet Rabemananjara</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">{footer.note[language]}</p>
            <Link to="/contact" className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-brand-accent-light">
              {footer.cta[language]} <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>

          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">{footer.navigationHeading[language]}</h2>
            <nav className="mt-5 grid gap-3.5 text-sm text-white/65" aria-label={isFr ? 'Liens de navigation du pied de page' : 'Footer navigation'}>
              <Link className="transition hover:translate-x-1 hover:text-white" to="/cabinet">{navigation.about[language]}</Link>
              <Link className="transition hover:translate-x-1 hover:text-white" to="/expertises">{navigation.services[language]}</Link>
              <Link className="transition hover:translate-x-1 hover:text-white" to="/actualites">{navigation.news[language]}</Link>
              <Link className="transition hover:translate-x-1 hover:text-white" to="/contact">{navigation.contact[language]}</Link>
            </nav>
          </div>

          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">{footer.contactHeading[language]}</h2>
            <div className="mt-5 grid gap-4 text-sm">
              <a href={`mailto:${contactEmail}`} className="group flex items-start gap-3 text-white/75 transition hover:text-white">
                <EnvelopeIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-light" aria-hidden="true" />
                <span className="break-all">{contactEmail}</span>
              </a>
              <a href={`tel:${phoneLink}`} className="group flex items-start gap-3 text-white/75 transition hover:text-white">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-light" aria-hidden="true" />
                <span>{phone}</span>
              </a>
              <div className="flex items-start gap-3 text-white/75">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-light" aria-hidden="true" />
                <span>{contact.address[language]}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">{footer.informationHeading[language]}</h2>
            <nav className="mt-5 grid gap-3.5 text-sm text-white/65" aria-label={isFr ? 'Informations légales' : 'Legal information'}>
              <Link className="transition hover:text-white" to="/mentions-legales">{footer.legalNotice[language]}</Link>
              <Link className="transition hover:text-white" to="/politique-confidentialite">{footer.privacyPolicy[language]}</Link>
              <Link className="inline-flex items-center gap-1.5 text-white/40 transition hover:text-white" to="/admin"><span>{footer.adminLink[language]}</span><ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden="true" /></Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[10px] font-medium text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Cabinet Rabemananjara. {footer.rightsReserved[language]}</span>
          <span>{contact.address[language]} <span className="mx-2 text-white/20">/</span> C.IP</span>
        </div>
      </div>
    </footer>
  );
}
