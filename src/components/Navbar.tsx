import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowUpRightIcon,
  Bars3Icon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  NewspaperIcon,
  RectangleGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { getSitePagesContent, type SitePagesContent } from '../data/sitePages';

const links = [
  { to: '/', key: 'home', end: true, icon: HomeIcon },
  { to: '/cabinet', key: 'about', end: false, icon: RectangleGroupIcon },
  { to: '/expertises', key: 'services', end: false, icon: ChatBubbleLeftRightIcon },
  { to: '/actualites', key: 'news', end: false, icon: NewspaperIcon },
  { to: '/contact', key: 'contact', end: false, icon: ChatBubbleLeftRightIcon },
] as const;

export default function Navbar() {
  const { i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pages, setPages] = useState<SitePagesContent>(getSitePagesContent);
  const location = useLocation();
  const contactEmail = pages.contact.email.trim() || 'contact@rabemananjara.mg';
  const language = i18n.language.startsWith('en') ? 'en' : 'fr';
  const isFr = language === 'fr';

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 12);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  useEffect(() => {
    const refresh = () => setPages(getSitePagesContent());
    window.addEventListener('sitePagesUpdated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('sitePagesUpdated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileOpen]);

  if (location.pathname.startsWith('/admin')) return null;

  const closeMenu = () => setMobileOpen(false);
  const setLanguage = (nextLanguage: 'fr' | 'en') => void i18n.changeLanguage(nextLanguage);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label={isFr ? 'Fermer le menu de navigation' : 'Close navigation menu'}
          tabIndex={-1}
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-brand-black/30 backdrop-blur-[3px] xl:hidden"
        />
      )}
      <header className="fixed inset-x-0 top-3 z-50 px-3 transition-all duration-300 sm:top-4 sm:px-6">
        <div className={`mx-auto flex h-[66px] max-w-7xl items-center justify-between rounded-full border px-2.5 transition-all duration-300 sm:px-4 ${scrolled || mobileOpen ? 'border-brand-border bg-brand-white/95 shadow-[0_14px_45px_rgba(21,21,19,0.12)] backdrop-blur-2xl' : 'border-brand-border/80 bg-brand-white/90 shadow-[0_8px_32px_rgba(21,21,19,0.07)] backdrop-blur-xl'}`}>
          <NavLink to="/" onClick={closeMenu} className="group flex min-w-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2" aria-label={isFr ? 'Cabinet Rabemananjara — accueil' : 'Cabinet Rabemananjara — home'}>
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-black font-display text-[13px] font-bold tracking-tight text-brand-accent-light shadow-sm transition duration-300 group-hover:rotate-[-5deg] group-hover:scale-105">C.IP</span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[8px] font-bold uppercase tracking-[0.2em] text-brand-accent">{pages.footer.descriptor[language]}</span>
              <span className="mt-0.5 block truncate font-display text-[15px] font-semibold tracking-tight text-brand-black sm:text-base">Rabemananjara</span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-1 xl:flex" aria-label={isFr ? 'Navigation principale' : 'Main navigation'}>
            {links.map(({ to, key, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `group relative rounded-full px-3.5 py-2.5 text-[11px] font-semibold transition-colors duration-200 2xl:px-4 2xl:text-xs ${isActive ? 'text-brand-black' : 'text-gray-500 hover:text-brand-black'}`}
              >
                {({ isActive }) => (
                  <>
                    <span>{pages.navigation[key][language]}</span>
                    <span aria-hidden="true" className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-accent transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 xl:flex">
            <LanguageSwitch language={language} setLanguage={setLanguage} />
            <NavLink to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-brand-black py-2 pl-4 pr-2 text-[11px] font-semibold text-white transition hover:bg-brand-accent 2xl:text-xs">
              <span>{pages.navigation.contactCta[language]}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:rotate-45"><ArrowUpRightIcon className="h-[15px] w-[15px]" aria-hidden="true" /></span>
            </NavLink>
          </div>

          <div className="ml-auto flex items-center gap-2 xl:hidden">
            <LanguageSwitch language={language} setLanguage={setLanguage} compact />
            <button
              type="button"
              aria-label={mobileOpen ? (isFr ? 'Fermer le menu' : 'Close menu') : (isFr ? 'Ouvrir le menu' : 'Open menu')}
              aria-expanded={mobileOpen}
              aria-controls="mobile-site-nav"
              onClick={() => setMobileOpen((open) => !open)}
              className={`group flex h-10 w-10 items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 ${mobileOpen ? 'border-brand-black bg-brand-black text-white' : 'border-brand-border bg-white text-brand-black hover:border-brand-black hover:bg-brand-black hover:text-white'}`}
            >
              {mobileOpen ? <XMarkIcon className="h-5 w-5" aria-hidden="true" /> : <Bars3Icon className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <section id="mobile-site-nav" className="fixed inset-x-3 top-[84px] z-50 mx-auto max-h-[calc(100dvh-96px)] max-w-xl overflow-y-auto rounded-[2rem] border border-brand-border bg-brand-white p-4 shadow-[0_28px_80px_rgba(21,21,19,0.22)] sm:inset-x-6 sm:top-[92px] sm:p-5 xl:hidden" aria-label={isFr ? 'Menu de navigation' : 'Navigation menu'}>
            <div className="flex items-start justify-between gap-4 border-b border-brand-border px-1 pb-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-accent">C.IP <span className="mx-1 text-gray-300">/</span> {isFr ? 'Navigation' : 'Navigation'}</p>
                <p className="mt-1.5 font-display text-lg font-semibold text-brand-black">Cabinet Rabemananjara</p>
              </div>
              <span className="rounded-full bg-brand-surface px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-brand-accent">{pages.navigation.country[language]}</span>
            </div>

            <nav className="mt-3 grid gap-1.5" aria-label={isFr ? 'Pages du site' : 'Site pages'}>
              {links.map(({ to, key, end, icon: Icon }, index) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={closeMenu}
                  className={({ isActive }) => `group flex items-center gap-3.5 rounded-2xl border px-3 py-3 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 sm:px-4 ${isActive ? 'border-brand-border bg-brand-surface' : 'border-transparent hover:border-brand-border hover:bg-[#faf9f6]'}`}
                >
                  {({ isActive }) => (
                    <>
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${isActive ? 'bg-brand-black text-brand-accent-light' : 'bg-white text-gray-500 shadow-sm group-hover:text-brand-accent'}`}><Icon className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-sm font-semibold ${isActive ? 'text-brand-black' : 'text-gray-700 group-hover:text-brand-black'}`}>{pages.navigation[key][language]}</span>
                        <span className="mt-0.5 block truncate text-[10px] text-gray-500">{pages.navigation.navDescriptions[key][language]}</span>
                      </span>
                      <span className={`font-display text-[10px] ${isActive ? 'text-brand-accent' : 'text-gray-300'}`}>0{index + 1}</span>
                      <ArrowUpRightIcon className={`h-4 w-4 shrink-0 transition ${isActive ? 'text-brand-accent' : 'text-gray-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-accent'}`} aria-hidden="true" />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 rounded-[1.5rem] bg-brand-black p-4 text-white sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-accent-light"><ChatBubbleLeftRightIcon className="h-5 w-5" aria-hidden="true" /></span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-accent-light">{pages.navigation.contactQuestion[language]}</p>
                    <a href={`mailto:${contactEmail}`} className="mt-1.5 block break-all text-xs font-medium text-white/75 transition hover:text-white">{contactEmail}</a>
                  </div>
                </div>
                <NavLink to="/contact" onClick={closeMenu} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-brand-black transition hover:bg-brand-accent-light">
                  {pages.navigation.contactCta[language]} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
                </NavLink>
              </div>
            </div>
          </section>
        )}
      </header>
    </>
  );
}

function LanguageSwitch({ language, setLanguage, compact = false }: { language: 'fr' | 'en'; setLanguage: (language: 'fr' | 'en') => void; compact?: boolean }) {
  const isFr = language === 'fr';
  return (
    <div className={`inline-flex items-center rounded-full border border-brand-border bg-white p-1 ${compact ? 'gap-0' : ''}`} role="group" aria-label={isFr ? 'Langue du site' : 'Site language'}>
      {(['fr', 'en'] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-label={option === 'fr' ? 'Français' : 'English'}
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
          className={`rounded-full px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${language === option ? 'bg-brand-surface text-brand-black' : 'text-gray-400 hover:text-brand-black'}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
