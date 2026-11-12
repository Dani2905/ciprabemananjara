import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  ArrowUpRightIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  Bars3Icon,
  DocumentCheckIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  NewspaperIcon,
  PhotoIcon,
  PlusIcon,
  RectangleGroupIcon,
  ShieldExclamationIcon,
  Squares2X2Icon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { getNews, saveNews, type NewsItem } from '../../data/news';
import { compressImageForLocalStorage } from '../../lib/compressImage';
import { getBannerItems, saveBannerItems, type BannerItem } from '../../data/banner';
import { getHeroImages, getSiteContent, saveHeroImages, saveSiteContent, type SiteContent } from '../../data/siteContent';
import { defaultExpertiseContent } from '../../data/expertiseContent';
import { defaultSitePagesContent, getSitePagesContent, saveSitePagesContent, type LocalizedText, type SitePagesContent } from '../../data/sitePages';
import { CmsApiError, fetchAdminCmsContent, fetchAdminSession, loginAdmin, logoutAdmin, saveAdminCmsDocument, saveAdminCmsDocuments, type CmsDocumentKey } from '../../lib/cmsApi';
import { applyCmsDocuments } from '../../lib/cmsCache';

type Panel = 'overview' | 'content' | 'pages' | 'banner' | 'news';
type SitePageSection = 'navigation' | 'home' | 'notFound' | 'newsPage' | 'about' | 'contact' | 'footer';

const navigation: { id: Panel; label: string; icon: typeof Squares2X2Icon }[] = [
  { id: 'overview', label: 'Vue d’ensemble', icon: Squares2X2Icon },
  { id: 'content', label: 'Accueil & images', icon: PhotoIcon },
  { id: 'pages', label: 'Autres pages publiques', icon: DocumentTextIcon },
  { id: 'banner', label: 'Bandeau défilant', icon: DocumentTextIcon },
  { id: 'news', label: 'Actualités', icon: NewspaperIcon },
];

const isApiCmsMode = import.meta.env.VITE_CMS_MODE === 'api';

function cmsErrorMessage(error: unknown): string {
  if (!(error instanceof CmsApiError)) return 'Le service du site est momentanément injoignable. Réessaie plus tard.';
  if (error.code === 'database_not_configured') return 'La base de données n’est pas encore configurée. Aucun changement n’a été enregistré.';
  if (error.code === 'invalid_credentials' || error.code === 'authentication_required') return 'Adresse e-mail ou mot de passe incorrect, ou session expirée.';
  if (error.code === 'too_many_login_attempts') return 'Trop de tentatives. Attends quelques minutes avant de réessayer.';
  if (error.code === 'content_too_large' || error.code === 'request_too_large') return 'Le contenu est trop volumineux pour être enregistré. Réduis la taille des images ou des textes.';
  return 'Le serveur n’a pas pu enregistrer la modification. Vérifie la connexion puis réessaie.';
}

const newArticle = (): NewsItem => {
  const date = new Date();
  return {
    id: `news-${Date.now()}`,
    date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
    dateEn: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    title: '',
    titleEn: '',
    desc: '',
    descEn: '',
    content: '',
    contentEn: '',
    image: '',
    imageAlt: '',
    imageAltEn: '',
  };
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCheckingSession, setIsCheckingSession] = useState(isApiCmsMode);
  const [isApiBusy, setIsApiBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activePanel, setActivePanel] = useState<Panel>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [content, setContent] = useState<SiteContent>(getSiteContent);
  const [heroImages, setHeroImages] = useState<string[]>(getHeroImages);
  const [bannerItems, setBannerItems] = useState<BannerItem[]>(getBannerItems);
  const [news, setNews] = useState<NewsItem[]>(getNews);
  const [sitePages, setSitePages] = useState<SitePagesContent>(getSitePagesContent);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  const refreshCmsState = () => {
    setContent(getSiteContent());
    setHeroImages(getHeroImages());
    setBannerItems(getBannerItems());
    setNews(getNews());
    setSitePages(getSitePagesContent());
  };

  useEffect(() => {
    if (!isApiCmsMode) return;
    let active = true;
    fetchAdminSession()
      .then(async (session) => {
        if (!session.authenticated) return;
        const { documents } = await fetchAdminCmsContent();
        if (!active) return;
        applyCmsDocuments(documents);
        refreshCmsState();
        setIsAuthenticated(true);
      })
      .catch((error) => {
        if (active) setLoginError(cmsErrorMessage(error));
      })
      .finally(() => {
        if (active) setIsCheckingSession(false);
      });
    return () => { active = false; };
  }, []);

  const latestNews = useMemo(() => [...news].sort((a, b) => b.id.localeCompare(a.id)), [news]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isApiCmsMode) {
      setIsApiBusy(true);
      setLoginError('');
      try {
        await loginAdmin(adminEmail, password);
        const { documents } = await fetchAdminCmsContent();
        applyCmsDocuments(documents);
        refreshCmsState();
        setIsAuthenticated(true);
        setPassword('');
      } catch (error) {
        setLoginError(cmsErrorMessage(error));
      } finally {
        setIsApiBusy(false);
      }
      return;
    }

    if (password === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Mot de passe de démonstration incorrect. Utilise « admin » pour cette maquette locale.');
    }
  };

  const handleLogout = async () => {
    if (isApiCmsMode) {
      try { await logoutAdmin(); } catch { /* Clear the local admin view even if the server is temporarily offline. */ }
    }
    setIsAuthenticated(false);
    setPassword('');
    setAdminEmail('');
    setNotice('');
  };

  const persistCmsDocument = async (key: CmsDocumentKey, value: unknown) => {
    if (isApiCmsMode) await saveAdminCmsDocument(key, value);
  };

  const updateLocalCache = (save: () => void) => {
    try {
      save();
    } catch (error) {
      if (!isApiCmsMode) throw error;
      console.warn('The server saved the CMS document, but its browser display cache could not be refreshed.', error);
    }
  };

  const updateSitePageText = (section: SitePageSection, field: string, language: 'fr' | 'en', value: string) => {
    const updatePath = (record: Record<string, unknown>, path: string[]): Record<string, unknown> => {
      const [head, ...rest] = path;
      const currentValue = record[head];
      if (!rest.length) {
        if (!currentValue || typeof currentValue !== 'object' || Array.isArray(currentValue)) return record;
        return { ...record, [head]: { ...(currentValue as Record<string, string>), [language]: value } };
      }
      if (!currentValue || typeof currentValue !== 'object' || Array.isArray(currentValue)) return record;
      return { ...record, [head]: updatePath(currentValue as Record<string, unknown>, rest) };
    };
    setSitePages((current) => ({
      ...current,
      [section]: updatePath(current[section] as unknown as Record<string, unknown>, field.split('.')),
    } as SitePagesContent));
  };

  const updateAboutValue = (valueId: string, field: 'title' | 'text', language: 'fr' | 'en', value: string) => {
    setSitePages((current) => ({
      ...current,
      about: { ...current.about, values: current.about.values.map((item) => item.id === valueId ? { ...item, [field]: { ...item[field], [language]: value } } : item) },
    }));
  };

  const addAboutValue = () => {
    const id = `value-${Date.now()}`;
    setSitePages((current) => ({ ...current, about: { ...current.about, values: [...current.about.values, { id, title: { fr: 'Nouvelle valeur', en: 'New value' }, text: { fr: '', en: '' } }] } }));
  };

  const removeAboutValue = (valueId: string) => {
    setSitePages((current) => ({ ...current, about: { ...current.about, values: current.about.values.filter((item) => item.id !== valueId) } }));
  };

  const saveSitePages = async () => {
    const publicEmail = sitePages.contact.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(publicEmail)) {
      setNotice('Entre une adresse e-mail publique valide dans les réglages de la page Contact avant d’enregistrer.');
      return;
    }
    const cleaned: SitePagesContent = { ...sitePages, contact: { ...sitePages.contact, email: publicEmail } };
    try {
      await persistCmsDocument('site-pages', cleaned);
      updateLocalCache(() => saveSitePagesContent(cleaned));
      setSitePages(cleaned);
      setNotice(isApiCmsMode ? 'Les autres pages ont été enregistrées sur le site.' : 'Les autres pages ont été enregistrées dans ce navigateur.');
    } catch (error) {
      setNotice(isApiCmsMode ? cmsErrorMessage(error) : 'Impossible d’enregistrer les pages générales.');
    }
  };

  const restoreSitePages = async () => {
    if (!window.confirm('Restaurer les textes préremplis des autres pages ? Les modifications actuelles seront remplacées.')) return;
    const defaults = structuredClone(defaultSitePagesContent);
    try {
      await persistCmsDocument('site-pages', defaults);
      updateLocalCache(() => saveSitePagesContent(defaults));
      setSitePages(defaults);
      setNotice(isApiCmsMode ? 'Les textes préremplis ont été restaurés sur le site.' : 'Les textes préremplis ont été restaurés dans ce navigateur.');
    } catch (error) {
      setNotice(isApiCmsMode ? cmsErrorMessage(error) : 'Impossible de restaurer les textes préremplis.');
    }
  };

  const saveContent = async () => {
    const safeImages = heroImages.map((image) => image.trim()).filter(Boolean);
    try {
      if (isApiCmsMode) await saveAdminCmsDocuments({ 'site-content': content, 'hero-images': safeImages });
      updateLocalCache(() => saveSiteContent(content));
      setHeroImages(safeImages);
      updateLocalCache(() => saveHeroImages(safeImages));
      setNotice(isApiCmsMode ? 'Contenu et images enregistrés sur le site.' : 'Contenu et images enregistrés dans ce navigateur.');
    } catch (error) {
      setNotice(isApiCmsMode ? cmsErrorMessage(error) : 'Impossible d’enregistrer dans ce navigateur. Vérifie l’espace de stockage puis réessaie.');
    }
  };

  const saveBanner = async () => {
    const validItems = bannerItems
      .map((item) => ({ ...item, fr: item.fr.trim(), en: item.en.trim() }))
      .filter((item) => item.fr && item.en);
    try {
      await persistCmsDocument('banner', validItems);
      setBannerItems(validItems);
      updateLocalCache(() => saveBannerItems(validItems));
      setNotice(isApiCmsMode ? 'Bandeau enregistré sur le site.' : 'Bandeau enregistré dans ce navigateur.');
    } catch (error) {
      setNotice(isApiCmsMode ? cmsErrorMessage(error) : 'Impossible d’enregistrer le bandeau dans le navigateur.');
    }
  };

  const uploadNewsImage = async (file: File | undefined) => {
    if (!file || !editingNews) return;
    if (isApiCmsMode) {
      setNotice('Pour le mode serveur, utilise une URL d’image pour le moment. Le téléversement sécurisé des fichiers sera ajouté séparément.');
      return;
    }
    try {
      const image = await compressImageForLocalStorage(file);
      setEditingNews((current) => current ? { ...current, image } : current);
      setNotice('Image ajoutée et compressée dans ce navigateur. Enregistre l’actualité pour la conserver.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Impossible de traiter cette image.');
    }
  };

  const saveArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingNews) return;
    if (!editingNews.title.trim() || !editingNews.date.trim() || !editingNews.desc.trim()) {
      setNotice('Complète au minimum le titre, la date et le résumé en français.');
      return;
    }
    const savedArticle: NewsItem = {
      ...editingNews,
      title: editingNews.title.trim(),
      titleEn: editingNews.titleEn?.trim() || '',
      date: editingNews.date.trim(),
      dateEn: editingNews.dateEn?.trim() || '',
      desc: editingNews.desc.trim(),
      descEn: editingNews.descEn?.trim() || '',
      content: editingNews.content?.trim() || '',
      contentEn: editingNews.contentEn?.trim() || '',
      image: editingNews.image?.trim() || '',
      imageAlt: editingNews.imageAlt?.trim() || '',
      imageAltEn: editingNews.imageAltEn?.trim() || '',
    };
    const updated = news.some((item) => item.id === savedArticle.id)
      ? news.map((item) => item.id === savedArticle.id ? savedArticle : item)
      : [savedArticle, ...news];
    try {
      await persistCmsDocument('news', updated);
      updateLocalCache(() => saveNews(updated));
    } catch (error) {
      setNotice(isApiCmsMode ? cmsErrorMessage(error) : 'Le stockage local est plein. Réduis la taille de l’image ou utilise une URL d’image, puis réessaie.');
      return;
    }
    setNews(updated);
    setEditingNews(null);
    setNotice(isApiCmsMode ? 'Actualité enregistrée sur le site.' : 'Actualité enregistrée dans ce navigateur. Ouvre la liste pour prévisualiser son détail.');
  };

  const deleteArticle = async (id: string) => {
    if (!window.confirm(isApiCmsMode ? 'Supprimer cette actualité du site ?' : 'Supprimer cette actualité de la démonstration ?')) return;
    const updated = news.filter((item) => item.id !== id);
    try {
      await persistCmsDocument('news', updated);
      updateLocalCache(() => saveNews(updated));
      setNews(updated);
      setNotice(isApiCmsMode ? 'Actualité supprimée du site.' : 'Actualité supprimée de ce navigateur.');
    } catch (error) {
      setNotice(isApiCmsMode ? cmsErrorMessage(error) : 'Impossible de supprimer cette actualité du navigateur.');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#f6f5f2]">
        <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
          <section className="relative isolate flex min-h-[340px] flex-col justify-between overflow-hidden rounded-b-[2rem] bg-brand-black px-6 py-7 text-white sm:px-10 sm:py-9 lg:min-h-screen lg:rounded-none lg:px-14 lg:py-12">
            <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/[0.09] sm:-right-20 sm:-top-40 sm:h-[34rem] sm:w-[34rem]">
              <div className="absolute inset-8 rounded-full border border-white/[0.07] sm:inset-14" />
              <div className="absolute inset-16 rounded-full border border-white/[0.05] sm:inset-28" />
              <span className="absolute bottom-14 left-10 h-2 w-2 rounded-full bg-brand-accent-light/70" />
            </div>
            <div className="relative flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] font-display text-xs font-bold tracking-tight text-brand-accent-light">C.IP</span>
              <div><p className="text-sm font-semibold">Cabinet Rabemananjara</p><p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/45">Espace d’administration</p></div>
            </div>

            <div className="relative mx-auto w-full max-w-2xl py-10 lg:py-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent-light/25 bg-brand-accent-light/[0.08] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-accent-light"><span className="h-1.5 w-1.5 rounded-full bg-brand-accent-light" /> {isApiCmsMode ? 'Accès serveur' : 'Démonstration locale'}</span>
              <h1 className="mt-6 max-w-xl text-4xl font-light leading-[1.08] sm:text-5xl lg:text-6xl">Le site, <span className="text-brand-accent-light">maîtrisé</span> au même endroit.</h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">Gère les contenus de l’accueil, les actualités et les autres pages prévues dans une interface claire. Le simulateur, les expertises et les pages légales sont intégrés au code.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <LockClosedIcon className="h-5 w-5 text-brand-accent-light" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold">{isApiCmsMode ? 'Connexion du Cabinet' : 'Accès de démonstration'}</p>
                  <p className="mt-1 text-xs leading-5 text-white/50">{isApiCmsMode ? 'Authentification vérifiée côté serveur.' : 'Connexion locale, sans compte serveur.'}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <RectangleGroupIcon className="h-5 w-5 text-brand-accent-light" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold">Contenus bilingues</p>
                  <p className="mt-1 text-xs leading-5 text-white/50">Accueil, actualités et pages gérées FR / EN.</p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-[10px] font-medium uppercase tracking-[0.15em] text-white/35">
              <span>Antananarivo · Madagascar</span><span className="hidden sm:inline">C.IP · Administration</span>
            </div>
          </section>

          <section className="relative flex min-h-[520px] items-center justify-center px-5 py-12 sm:px-8 lg:min-h-screen lg:px-12">
            <Link to="/" className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-brand-border bg-white/75 px-4 py-2.5 text-xs font-semibold text-gray-600 backdrop-blur transition hover:border-brand-black hover:text-brand-black sm:right-8 sm:top-8"><ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> Retour au site</Link>
            <div className="w-full max-w-md pt-10 lg:pt-0">
              <div className="rounded-[2rem] border border-brand-border bg-white p-6 shadow-[0_24px_80px_-32px_rgba(18,18,16,0.24)] sm:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-surface text-brand-accent"><Squares2X2Icon className="h-6 w-6" aria-hidden="true" /></div>
                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">Connexion · C.IP Admin</p>
                <h2 className="mt-3 text-3xl font-light leading-tight text-brand-black sm:text-4xl">Bienvenue.</h2>
                <p className="mt-3 text-sm leading-6 text-gray-500">{isApiCmsMode ? 'Connecte-toi avec l’adresse e-mail et le mot de passe Admin créés pour le Cabinet.' : 'Entre le mot de passe de démonstration pour accéder à l’espace de gestion.'}</p>

                <form className="mt-7 space-y-5" onSubmit={handleLogin}>
                  {isApiCmsMode && <label className="block text-sm font-semibold text-brand-black">Adresse e-mail Admin
                    <input type="email" autoComplete="username" required value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} placeholder="nom@cabinet.mg" className="mt-2 w-full rounded-xl border border-brand-border bg-[#fbfbfa] px-4 py-3.5 text-sm font-normal outline-none transition placeholder:text-gray-400 focus:border-brand-accent focus:bg-white focus:ring-4 focus:ring-brand-accent/10" />
                  </label>}
                  {isApiCmsMode && isCheckingSession && <p role="status" className="text-xs text-gray-500">Vérification de la session…</p>}
                  <label className="block text-sm font-semibold text-brand-black">Mot de passe
                    <span className="relative mt-2 block">
                      <LockClosedIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                      <input type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Saisir le mot de passe" aria-invalid={Boolean(loginError)} aria-describedby={loginError ? 'login-error' : 'login-hint'} className="w-full rounded-xl border border-brand-border bg-[#fbfbfa] py-3.5 pl-12 pr-12 text-sm font-normal outline-none transition placeholder:text-gray-400 focus:border-brand-accent focus:bg-white focus:ring-4 focus:ring-brand-accent/10" />
                      <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-brand-surface hover:text-brand-black" aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>
                        {showPassword ? <EyeSlashIcon className="h-5 w-5" aria-hidden="true" /> : <EyeIcon className="h-5 w-5" aria-hidden="true" />}
                      </button>
                    </span>
                  </label>
                  {loginError && <p id="login-error" role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">{loginError}</p>}
                  <button type="submit" disabled={isApiBusy || isCheckingSession} className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60">{isApiCmsMode ? (isApiBusy ? 'Connexion…' : 'Se connecter') : 'Accéder à l’administration'} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" /></button>
                </form>

                {!isApiCmsMode ? (
                  <div id="login-hint" className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-brand-surface p-4">
                    <div><p className="text-xs font-semibold text-brand-black">Mot de passe démo</p><p className="mt-1 text-[11px] leading-5 text-gray-500">Cette valeur est publique et réservée à la maquette.</p></div>
                    <kbd className="rounded-lg border border-brand-border bg-white px-3 py-2 font-mono text-sm font-semibold text-brand-black">admin</kbd>
                  </div>
                ) : (
                  <div id="login-hint" className="mt-6 rounded-2xl bg-brand-surface p-4 text-xs leading-5 text-gray-600">L’authentification est vérifiée par le serveur. Ne communique jamais ton mot de passe dans ce chat ou dans un fichier du projet.</div>
                )}
                {!isApiCmsMode && <p className="mt-5 flex items-start gap-2 text-[11px] leading-5 text-gray-400"><ShieldExclamationIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />Les modifications restent dans le navigateur utilisé. Cette connexion n’est pas sécurisée pour un usage en production.</p>}
              </div>
              <p className="mt-5 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-gray-400">© Cabinet Rabemananjara · C.IP</p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const menuCounts: Partial<Record<Panel, { value: number; singular: string; plural: string }>> = {
    content: { value: heroImages.filter((image) => image.trim().length > 0).length, singular: 'image du carrousel', plural: 'images du carrousel' },
    pages: { value: Object.keys(sitePages).filter((key) => key !== 'expertiseOverview').length, singular: 'rubrique éditable', plural: 'rubriques éditables' },
    banner: { value: bannerItems.length, singular: 'élément du bandeau', plural: 'éléments du bandeau' },
    news: { value: news.length, singular: 'actualité', plural: 'actualités' },
  };
  const currentTitle = navigation.find((item) => item.id === activePanel)?.label ?? 'Administration';

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-brand-black">
      <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-brand-border bg-white/95 px-4 backdrop-blur sm:px-6">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="rounded-lg p-2 hover:bg-brand-surface md:hidden" aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
            {mobileMenuOpen ? <XMarkIcon className="h-5 w-5" aria-hidden="true" /> : <Bars3Icon className="h-5 w-5" aria-hidden="true" />}
          </button>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-black font-display text-[10px] font-bold tracking-tight text-brand-accent-light">C.IP</span>
          <div><p className="font-semibold leading-tight">C.IP Admin</p><p className="text-[10px] uppercase tracking-[0.16em] text-brand-accent">{isApiCmsMode ? 'Mode serveur' : 'Mode démo locale'}</p></div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-brand-border px-3 py-2 text-xs font-semibold transition hover:border-brand-black sm:px-4 sm:text-sm"><span>Voir le site</span><ArrowUpRightIcon className="h-[14px] w-[14px]" aria-hidden="true" /></Link>
          <button type="button" onClick={() => void handleLogout()} className="flex items-center gap-2 rounded-full p-2 text-sm text-gray-600 hover:bg-brand-surface" aria-label="Déconnexion"><ArrowLeftOnRectangleIcon className="h-[17px] w-[17px]" aria-hidden="true" /><span className="hidden sm:inline">Quitter</span></button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        {mobileMenuOpen && <button type="button" aria-label="Fermer le menu" onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-20 bg-black/30 md:hidden" />}
        <aside className={`fixed bottom-0 left-0 top-[68px] z-20 w-72 overflow-y-auto border-r border-brand-border bg-white p-4 transition-transform md:sticky md:top-[68px] md:h-[calc(100vh-68px)] md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <p className="px-3 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Gestion du site</p>
          <nav className="space-y-1" aria-label="Navigation administration">
            {navigation.map(({ id, label, icon: Icon }) => {
              const count = menuCounts[id];
              const countLabel = count ? `${count.value} ${count.value === 1 ? count.singular : count.plural}` : '';
              return (
                <button key={id} type="button" onClick={() => { setActivePanel(id); setMobileMenuOpen(false); setNotice(''); }} aria-label={count ? `${label} : ${countLabel}` : undefined} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${activePanel === id ? 'bg-brand-black text-white' : 'text-gray-600 hover:bg-brand-surface hover:text-brand-black'}`}>
                  <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                  <span className="min-w-0 flex-1">{label}</span>
                  {count && <span aria-hidden="true" title={countLabel} className={`inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full px-2 text-[11px] font-semibold tabular-nums ${activePanel === id ? 'bg-white/15 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-white'}`}>{count.value}</span>}
                </button>
              );
            })}
          </nav>
          <div className={`mt-6 rounded-2xl border p-4 text-xs leading-5 ${isApiCmsMode ? 'border-emerald-200 bg-emerald-50 text-emerald-950' : 'border-amber-200 bg-amber-50 text-amber-950'}`}>
            <div className="flex items-center gap-2 font-semibold">{isApiCmsMode ? <LockClosedIcon className="h-4 w-4" aria-hidden="true" /> : <ShieldExclamationIcon className="h-4 w-4" aria-hidden="true" />}{isApiCmsMode ? 'API connectée' : 'Démonstration uniquement'}</div>
            <p className="mt-2">{isApiCmsMode ? 'Les changements sont enregistrés côté serveur.' : 'Pas de compte réel, de base de données ou de publication serveur.'}</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-7 sm:px-7 sm:py-9 lg:px-10">
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Cabinet Rabemananjara</p>
            <h1 className="mt-2 text-3xl sm:text-4xl">{currentTitle}</h1>
          </div>
          {!isApiCmsMode ? (
            <div className="mb-7 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              <ShieldExclamationIcon className="mt-0.5 h-[19px] w-[19px] shrink-0" aria-hidden="true" />
              <p><strong>Démo non sécurisée.</strong> Les changements restent dans le localStorage de ce navigateur et ne mettent pas à jour le site pour les autres visiteurs.</p>
            </div>
          ) : (
            <div className="mb-7 flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
              <LockClosedIcon className="mt-0.5 h-[19px] w-[19px] shrink-0" aria-hidden="true" />
              <p><strong>Mode serveur.</strong> Les modifications enregistrées sont partagées avec les visiteurs via l’API du site.</p>
            </div>
          )}
          {notice && <p role="status" aria-live="polite" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{notice}</p>}

          {activePanel === 'overview' && (
            <section>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Actualités enregistrées" value={news.length} icon={<NewspaperIcon className="h-5 w-5" aria-hidden="true" />} />
                <StatCard title="Mots du bandeau" value={bannerItems.length} icon={<DocumentTextIcon className="h-5 w-5" aria-hidden="true" />} />
                <StatCard title="Images du carrousel" value={heroImages.length} icon={<PhotoIcon className="h-5 w-5" aria-hidden="true" />} />
                <StatCard title="Expertises intégrées au code" value={defaultExpertiseContent.length} icon={<RectangleGroupIcon className="h-5 w-5" aria-hidden="true" />} />
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-2xl border border-brand-border bg-white p-6 sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-accent">Contenu du site</p>
                  <h2 className="mt-3 text-xl">{isApiCmsMode ? 'Gérer le contenu du site et consulter les pages dédiées' : 'Gérer la démonstration et consulter les pages dédiées'}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">{isApiCmsMode ? 'Modifie ici les textes et images de l’accueil, le bandeau, les actualités et les autres pages prévues dans l’éditeur. Le simulateur, les pages d’expertise, les Mentions légales et la Politique de confidentialité sont codés en dur.' : 'Modifie ici les textes et images de la démonstration pour les pages prévues dans l’éditeur. Le simulateur, les pages d’expertise, les Mentions légales et la Politique de confidentialité sont codés en dur.'}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" onClick={() => setActivePanel('content')} className="rounded-full bg-brand-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent">Modifier l’accueil</button>
                    <Link to="/expertises" target="_blank" rel="noreferrer" className="rounded-full border border-brand-border px-5 py-3 text-sm font-semibold transition hover:border-brand-black hover:bg-brand-surface">Consulter les expertises</Link>
                  </div>
                </div>
                <div className="rounded-2xl border border-brand-border bg-white p-6 sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-accent">Coordonnées publiques</p>
                  <h2 className="mt-3 text-xl">Contact du cabinet</h2>
                  <a href={`mailto:${sitePages.contact.email.trim() || 'contact@rabemananjara.mg'}`} className="mt-4 inline-flex items-center gap-2 break-all text-sm font-semibold text-brand-black underline decoration-brand-accent/50 underline-offset-4"><EnvelopeIcon className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />{sitePages.contact.email.trim() || 'contact@rabemananjara.mg'}</a>
                  <p className="mt-3 text-sm text-gray-600">{sitePages.contact.phone} · {sitePages.contact.address.fr}</p>
                  <p className="mt-4 text-xs leading-5 text-gray-400">L’adresse publique est modifiable dans « Autres pages publiques ». En mode API, vérifie que le destinataire SMTP privé `CONTACT_TO_EMAIL` correspond à l’adresse affichée.</p>
                </div>
              </div>
            </section>
          )}

          {activePanel === 'content' && (
            <section className="space-y-6">
              <div className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7">
                <h2 className="text-xl">Texte principal de l’accueil</h2>
                <p className="mt-2 text-sm text-gray-500">Le titre d’ouverture et les descriptions sont modifiables en français et en anglais.</p>
                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  <TextField label="Accroche (FR)" value={content.heroAccentFr} onChange={(value) => setContent({ ...content, heroAccentFr: value })} />
                  <TextField label="Headline accent (EN)" value={content.heroAccentEn} onChange={(value) => setContent({ ...content, heroAccentEn: value })} />
                  <TextArea label="Description (FR)" value={content.heroDescriptionFr} onChange={(value) => setContent({ ...content, heroDescriptionFr: value })} rows={4} />
                  <TextArea label="Description (EN)" value={content.heroDescriptionEn} onChange={(value) => setContent({ ...content, heroDescriptionEn: value })} rows={4} />
                  <TextArea label="Présentation du cabinet (FR)" value={content.aboutIntroFr} onChange={(value) => setContent({ ...content, aboutIntroFr: value })} rows={5} />
                  <TextArea label="Firm introduction (EN)" value={content.aboutIntroEn} onChange={(value) => setContent({ ...content, aboutIntroEn: value })} rows={5} />
                </div>
              </div>

              <div className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                  <div><h2 className="text-xl">Images du carrousel</h2><p className="mt-2 text-sm text-gray-500">{isApiCmsMode ? 'Une URL par ligne. Les adresses sont enregistrées sur le serveur.' : 'Une URL par ligne. Images stockées localement dans ce navigateur.'}</p></div>
                  <button type="button" onClick={() => setHeroImages([...heroImages, ''])} className="inline-flex items-center gap-2 self-start rounded-full border border-brand-border px-4 py-2 text-sm font-semibold hover:border-brand-black"><PlusIcon className="h-4 w-4" aria-hidden="true" /> Ajouter une image</button>
                </div>
                <div className="mt-5 space-y-3">
                  {heroImages.map((image, index) => (
                    <div key={`${index}-${image}`} className="flex gap-2">
                      <input value={image} onChange={(event) => setHeroImages(heroImages.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} placeholder="https://…" className="min-w-0 flex-1 rounded-xl border border-brand-border px-4 py-3 text-sm outline-none focus:border-brand-accent" aria-label={`URL de l’image ${index + 1}`} />
                      <button type="button" onClick={() => setHeroImages(heroImages.filter((_, itemIndex) => itemIndex !== index))} className="rounded-xl border border-brand-border p-3 text-red-600 hover:bg-red-50" aria-label={`Supprimer l’image ${index + 1}`}><TrashIcon className="h-[17px] w-[17px]" aria-hidden="true" /></button>
                    </div>
                  ))}
                  {heroImages.length === 0 && <p className="rounded-xl bg-brand-surface p-4 text-sm text-gray-600">Aucune image. Tu peux en ajouter une ou laisser le carrousel vide.</p>}
                </div>
              </div>
              <button type="button" onClick={saveContent} className="inline-flex items-center gap-2 rounded-full bg-brand-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-accent"><DocumentCheckIcon className="h-[17px] w-[17px]" aria-hidden="true" /> {isApiCmsMode ? 'Enregistrer sur le site' : 'Enregistrer dans ce navigateur'}</button>
            </section>
          )}

          {activePanel === 'pages' && (
            <section className="space-y-5">
              <div className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-accent">Éditeur bilingue · Pages publiques</p>
                <h2 className="mt-2 text-2xl">Cabinet, Contact, navigation et pages d’information</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">Modifie les champs prévus pour ces pages, séparément en français et en anglais. Les pages d’expertise, le simulateur de procédure, les Mentions légales et la Politique de confidentialité sont intégrés au code et ne sont pas modifiables dans l’Admin.</p>
              </div>

              <details className="rounded-2xl border border-brand-border bg-white" open>
                <summary className="cursor-pointer list-none p-5 font-semibold marker:hidden">Navigation et libellés communs · FR / EN</summary>
                <div className="grid gap-3 border-t border-brand-border p-4 sm:p-5 lg:grid-cols-2">
                  <BilingualEditor label="Accueil" value={sitePages.navigation.home} onChange={(language, value) => updateSitePageText('navigation', 'home', language, value)} />
                  <BilingualEditor label="Le Cabinet" value={sitePages.navigation.about} onChange={(language, value) => updateSitePageText('navigation', 'about', language, value)} />
                  <BilingualEditor label="Actualités" value={sitePages.navigation.news} onChange={(language, value) => updateSitePageText('navigation', 'news', language, value)} />
                  <BilingualEditor label="Contact" value={sitePages.navigation.contact} onChange={(language, value) => updateSitePageText('navigation', 'contact', language, value)} />
                  <BilingualEditor label="Bouton Contact de la navigation" value={sitePages.navigation.contactCta} onChange={(language, value) => updateSitePageText('navigation', 'contactCta', language, value)} />
                  <BilingualEditor label="Question du menu mobile" value={sitePages.navigation.contactQuestion} onChange={(language, value) => updateSitePageText('navigation', 'contactQuestion', language, value)} />
                  <BilingualEditor label="Pays affiché dans le menu" value={sitePages.navigation.country} onChange={(language, value) => updateSitePageText('navigation', 'country', language, value)} />
                  {(['home', 'about', 'news', 'contact'] as const).map((key) => (
                    <BilingualEditor key={key} label={`Description du lien mobile · ${key}`} value={sitePages.navigation.navDescriptions[key]} onChange={(language, value) => updateSitePageText('navigation', `navDescriptions.${key}`, language, value)} />
                  ))}
                </div>
              </details>

              <details className="rounded-2xl border border-brand-border bg-white">
                <summary className="cursor-pointer list-none p-5 font-semibold marker:hidden">Accueil · titres, boutons et sections · FR / EN</summary>
                <div className="grid gap-3 border-t border-brand-border p-4 sm:p-5 lg:grid-cols-2">
                  <BilingualEditor label="Badge du Hero (à valider si c’est une affirmation professionnelle)" value={sitePages.home.heroBadge} onChange={(language, value) => updateSitePageText('home', 'heroBadge', language, value)} />
                  <BilingualEditor label="Titre principal de l’accueil" value={sitePages.home.heroTitle} onChange={(language, value) => updateSitePageText('home', 'heroTitle', language, value)} />
                  <BilingualEditor label="Bouton Contact du Hero" value={sitePages.home.heroContactCta} onChange={(language, value) => updateSitePageText('home', 'heroContactCta', language, value)} />
                  <BilingualEditor label="Titre de la section Actualités" value={sitePages.home.newsTitle} onChange={(language, value) => updateSitePageText('home', 'newsTitle', language, value)} />
                  <BilingualEditor label="Lien vers toutes les actualités" value={sitePages.home.newsLink} onChange={(language, value) => updateSitePageText('home', 'newsLink', language, value)} />
                  <BilingualEditor label="Message si aucune actualité n’est publiée" value={sitePages.home.newsEmpty} onChange={(language, value) => updateSitePageText('home', 'newsEmpty', language, value)} />
                </div>
              </details>

              <details className="rounded-2xl border border-brand-border bg-white">
                <summary className="cursor-pointer list-none p-5 font-semibold marker:hidden">Actualités · liste et page d’article · FR / EN</summary>
                <div className="border-t border-brand-border p-4 sm:p-5">
                  <p className="mb-4 text-xs leading-5 text-gray-500">Ces champs pilotent les titres, libellés et appels à l’action de la liste et des articles. Les dates, titres, résumés, images et corps des articles sont gérés séparément dans le panneau « Actualités ».</p>
                  <div className="grid gap-3 lg:grid-cols-2">
                    <BilingualEditor label="Surtitre de la liste" value={sitePages.newsPage.eyebrow} onChange={(language, value) => updateSitePageText('newsPage', 'eyebrow', language, value)} />
                    <BilingualEditor label="Titre de la liste" value={sitePages.newsPage.title} onChange={(language, value) => updateSitePageText('newsPage', 'title', language, value)} />
                    <BilingualEditor label="Introduction de la liste" value={sitePages.newsPage.intro} multiline rows={3} onChange={(language, value) => updateSitePageText('newsPage', 'intro', language, value)} />
                    <BilingualEditor label="Libellé accessible de la liste" value={sitePages.newsPage.listLabel} onChange={(language, value) => updateSitePageText('newsPage', 'listLabel', language, value)} />
                    <BilingualEditor label="Type d’article sur la carte" value={sitePages.newsPage.itemType} onChange={(language, value) => updateSitePageText('newsPage', 'itemType', language, value)} />
                    <BilingualEditor label="Bouton pour lire un article" value={sitePages.newsPage.readMore} onChange={(language, value) => updateSitePageText('newsPage', 'readMore', language, value)} />
                    <BilingualEditor label="Titre quand la liste est vide" value={sitePages.newsPage.emptyTitle} onChange={(language, value) => updateSitePageText('newsPage', 'emptyTitle', language, value)} />
                    <BilingualEditor label="Message quand la liste est vide" value={sitePages.newsPage.emptyText} onChange={(language, value) => updateSitePageText('newsPage', 'emptyText', language, value)} />
                    <BilingualEditor label="Note sur les contenus à vérifier" value={sitePages.newsPage.publicationNote} multiline rows={3} onChange={(language, value) => updateSitePageText('newsPage', 'publicationNote', language, value)} />
                    <BilingualEditor label="Lien de retour à la liste" value={sitePages.newsPage.backToNews} onChange={(language, value) => updateSitePageText('newsPage', 'backToNews', language, value)} />
                    <BilingualEditor label="Surtitre de l’article" value={sitePages.newsPage.articleEyebrow} onChange={(language, value) => updateSitePageText('newsPage', 'articleEyebrow', language, value)} />
                    <BilingualEditor label="Libellé du corps de l’article" value={sitePages.newsPage.articleDetail} onChange={(language, value) => updateSitePageText('newsPage', 'articleDetail', language, value)} />
                    <BilingualEditor label="Surtitre de l’appel à Contact" value={sitePages.newsPage.contactEyebrow} onChange={(language, value) => updateSitePageText('newsPage', 'contactEyebrow', language, value)} />
                    <BilingualEditor label="Titre de l’appel à Contact" value={sitePages.newsPage.contactTitle} onChange={(language, value) => updateSitePageText('newsPage', 'contactTitle', language, value)} />
                    <BilingualEditor label="Texte de l’appel à Contact" value={sitePages.newsPage.contactIntro} multiline rows={3} onChange={(language, value) => updateSitePageText('newsPage', 'contactIntro', language, value)} />
                    <BilingualEditor label="Bouton de l’appel à Contact" value={sitePages.newsPage.contactCta} onChange={(language, value) => updateSitePageText('newsPage', 'contactCta', language, value)} />
                    <BilingualEditor label="Surtitre des articles liés" value={sitePages.newsPage.relatedEyebrow} onChange={(language, value) => updateSitePageText('newsPage', 'relatedEyebrow', language, value)} />
                    <BilingualEditor label="Titre des articles liés" value={sitePages.newsPage.relatedTitle} onChange={(language, value) => updateSitePageText('newsPage', 'relatedTitle', language, value)} />
                    <BilingualEditor label="Lien vers toutes les actualités" value={sitePages.newsPage.relatedLink} onChange={(language, value) => updateSitePageText('newsPage', 'relatedLink', language, value)} />
                  </div>
                </div>
              </details>

              <details className="rounded-2xl border border-brand-border bg-white">
                <summary className="cursor-pointer list-none p-5 font-semibold marker:hidden">Page d’erreur 404 · FR / EN</summary>
                <div className="grid gap-3 border-t border-brand-border p-4 sm:p-5 lg:grid-cols-2">
                  <BilingualEditor label="Repère" value={sitePages.notFound.eyebrow} onChange={(language, value) => updateSitePageText('notFound', 'eyebrow', language, value)} />
                  <BilingualEditor label="Titre" value={sitePages.notFound.title} onChange={(language, value) => updateSitePageText('notFound', 'title', language, value)} />
                  <BilingualEditor label="Message" value={sitePages.notFound.text} multiline rows={3} onChange={(language, value) => updateSitePageText('notFound', 'text', language, value)} />
                  <BilingualEditor label="Bouton d’accueil" value={sitePages.notFound.back} onChange={(language, value) => updateSitePageText('notFound', 'back', language, value)} />
                </div>
              </details>

              <details className="rounded-2xl border border-brand-border bg-white">
                <summary className="cursor-pointer list-none p-5 font-semibold marker:hidden">Page « Le Cabinet » · FR / EN</summary>
                <div className="grid gap-3 border-t border-brand-border p-4 sm:p-5 lg:grid-cols-2">
                  <BilingualEditor label="Surtitre" value={sitePages.about.eyebrow} onChange={(language, value) => updateSitePageText('about', 'eyebrow', language, value)} />
                  <BilingualEditor label="Titre principal" value={sitePages.about.title} onChange={(language, value) => updateSitePageText('about', 'title', language, value)} />
                  <BilingualEditor label="Texte d’introduction" value={sitePages.about.lead} multiline rows={4} onChange={(language, value) => updateSitePageText('about', 'lead', language, value)} />
                  <BilingualEditor label="Étiquette de la carte Cabinet" value={sitePages.about.cardEyebrow} onChange={(language, value) => updateSitePageText('about', 'cardEyebrow', language, value)} />
                  <BilingualEditor label="Texte de la carte Cabinet" value={sitePages.about.cardText} multiline rows={3} onChange={(language, value) => updateSitePageText('about', 'cardText', language, value)} />
                  <BilingualEditor label="Surtitre de l’engagement" value={sitePages.about.commitmentEyebrow} onChange={(language, value) => updateSitePageText('about', 'commitmentEyebrow', language, value)} />
                  <BilingualEditor label="Titre de l’engagement" value={sitePages.about.commitmentTitle} onChange={(language, value) => updateSitePageText('about', 'commitmentTitle', language, value)} />
                  <div className="space-y-3 lg:col-span-2">
                    <div className="flex items-center justify-between gap-3"><h3 className="font-semibold">Blocs de valeurs</h3><button type="button" onClick={addAboutValue} className="rounded-full border border-brand-border px-4 py-2 text-xs font-semibold hover:border-brand-black">Ajouter une valeur</button></div>
                    {sitePages.about.values.map((item, index) => (
                      <div key={item.id} className="rounded-xl border border-brand-border bg-[#fbfbfa] p-4">
                        <div className="mb-3 flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">Bloc {index + 1}</p><button type="button" onClick={() => removeAboutValue(item.id)} className="text-xs font-semibold text-red-700 hover:underline">Supprimer</button></div>
                        <div className="grid gap-3 lg:grid-cols-2"><BilingualEditor label="Titre" value={item.title} onChange={(language, value) => updateAboutValue(item.id, 'title', language, value)} /><BilingualEditor label="Texte" value={item.text} multiline rows={3} onChange={(language, value) => updateAboutValue(item.id, 'text', language, value)} /></div>
                      </div>
                    ))}
                  </div>
                  <BilingualEditor label="Surtitre de l’appel à l’action" value={sitePages.about.ctaEyebrow} onChange={(language, value) => updateSitePageText('about', 'ctaEyebrow', language, value)} />
                  <BilingualEditor label="Titre de l’appel à l’action" value={sitePages.about.ctaTitle} onChange={(language, value) => updateSitePageText('about', 'ctaTitle', language, value)} />
                  <BilingualEditor label="Bouton de l’appel à l’action" value={sitePages.about.ctaButton} onChange={(language, value) => updateSitePageText('about', 'ctaButton', language, value)} />
                </div>
              </details>


              <details className="rounded-2xl border border-brand-border bg-white">
                <summary className="cursor-pointer list-none p-5 font-semibold marker:hidden">Page Contact · FR / EN</summary>
                <div className="grid gap-3 border-t border-brand-border p-4 sm:p-5 lg:grid-cols-2">
                  <BilingualEditor label="Surtitre" value={sitePages.contact.eyebrow} onChange={(language, value) => updateSitePageText('contact', 'eyebrow', language, value)} />
                  <BilingualEditor label="Titre" value={sitePages.contact.title} onChange={(language, value) => updateSitePageText('contact', 'title', language, value)} />
                  <BilingualEditor label="Introduction" value={sitePages.contact.intro} multiline rows={3} onChange={(language, value) => updateSitePageText('contact', 'intro', language, value)} />
                  <BilingualEditor label="Libellé et adresse" value={sitePages.contact.addressLabel} onChange={(language, value) => updateSitePageText('contact', 'addressLabel', language, value)} />
                  <BilingualEditor label="Adresse affichée" value={sitePages.contact.address} onChange={(language, value) => updateSitePageText('contact', 'address', language, value)} />
                  <BilingualEditor label="Libellé du téléphone" value={sitePages.contact.phoneLabel} onChange={(language, value) => updateSitePageText('contact', 'phoneLabel', language, value)} />
                  <div className="rounded-xl border border-brand-border bg-white p-4"><TextField label="Téléphone affiché (format international)" value={sitePages.contact.phone} onChange={(value) => setSitePages((current) => ({ ...current, contact: { ...current.contact, phone: value } }))} /></div>
                  <div className="rounded-xl border border-brand-border bg-white p-4"><TextField label="Adresse e-mail publique affichée" value={sitePages.contact.email} onChange={(value) => setSitePages((current) => ({ ...current, contact: { ...current.contact, email: value } }))} /></div>
                  <BilingualEditor label="Libellé de l’e-mail public" value={sitePages.contact.emailLabel} onChange={(language, value) => updateSitePageText('contact', 'emailLabel', language, value)} />
                  <BilingualEditor label="Note d’accompagnement" value={sitePages.contact.supportNote} multiline rows={3} onChange={(language, value) => updateSitePageText('contact', 'supportNote', language, value)} />
                  <BilingualEditor label="Note pour les demandes urgentes" value={sitePages.contact.urgentNote} multiline rows={3} onChange={(language, value) => updateSitePageText('contact', 'urgentNote', language, value)} />
                  <div className="lg:col-span-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-950">Cette adresse publique est modifiable ici. Le destinataire réel du formulaire en mode serveur est la variable privée `CONTACT_TO_EMAIL`; garde les deux adresses cohérentes après la création de la boîte e-mail cPanel.</div>
                  <BilingualEditor label="Champ Nom" value={sitePages.contact.formName} onChange={(language, value) => updateSitePageText('contact', 'formName', language, value)} />
                  <BilingualEditor label="Champ Adresse e-mail" value={sitePages.contact.formEmail} onChange={(language, value) => updateSitePageText('contact', 'formEmail', language, value)} />
                  <BilingualEditor label="Champ Sujet" value={sitePages.contact.formSubject} onChange={(language, value) => updateSitePageText('contact', 'formSubject', language, value)} />
                  <BilingualEditor label="Champ Message" value={sitePages.contact.formMessage} onChange={(language, value) => updateSitePageText('contact', 'formMessage', language, value)} />
                  <BilingualEditor label="Bouton d’envoi en mode API" value={sitePages.contact.formSend} onChange={(language, value) => updateSitePageText('contact', 'formSend', language, value)} />
                  <BilingualEditor label="Bouton en mode démo" value={sitePages.contact.formPrepare} onChange={(language, value) => updateSitePageText('contact', 'formPrepare', language, value)} />
                  <BilingualEditor label="Confirmation de l’ouverture du logiciel de messagerie" value={sitePages.contact.formEmailReady} multiline rows={3} onChange={(language, value) => updateSitePageText('contact', 'formEmailReady', language, value)} />
                  <BilingualEditor label="État d’envoi" value={sitePages.contact.formSending} onChange={(language, value) => updateSitePageText('contact', 'formSending', language, value)} />
                  <BilingualEditor label="Confirmation de transmission" value={sitePages.contact.formSent} multiline rows={3} onChange={(language, value) => updateSitePageText('contact', 'formSent', language, value)} />
                  <BilingualEditor label="Erreur si SMTP n’est pas configuré" value={sitePages.contact.formNotConfigured} multiline rows={3} onChange={(language, value) => updateSitePageText('contact', 'formNotConfigured', language, value)} />
                  <BilingualEditor label="Erreur de transmission" value={sitePages.contact.formDeliveryFailed} multiline rows={3} onChange={(language, value) => updateSitePageText('contact', 'formDeliveryFailed', language, value)} />
                  <BilingualEditor label="Limitation anti-abus" value={sitePages.contact.formTooMany} onChange={(language, value) => updateSitePageText('contact', 'formTooMany', language, value)} />
                  <BilingualEditor label="Note de confidentialité — mode API" value={sitePages.contact.formApiNote} multiline rows={3} onChange={(language, value) => updateSitePageText('contact', 'formApiNote', language, value)} />
                  <BilingualEditor label="Note de fonctionnement — mode démo" value={sitePages.contact.formDemoNote} multiline rows={3} onChange={(language, value) => updateSitePageText('contact', 'formDemoNote', language, value)} />
                  <BilingualEditor label="Erreur de validation du formulaire" value={sitePages.contact.formInvalid} multiline rows={3} onChange={(language, value) => updateSitePageText('contact', 'formInvalid', language, value)} />
                </div>
              </details>

              <details className="rounded-2xl border border-brand-border bg-white">
                <summary className="cursor-pointer list-none p-5 font-semibold marker:hidden">Pied de page · FR / EN</summary>
                <div className="grid gap-3 border-t border-brand-border p-4 sm:p-5 lg:grid-cols-2">
                  <BilingualEditor label="Descripteur du Cabinet" value={sitePages.footer.descriptor} onChange={(language, value) => updateSitePageText('footer', 'descriptor', language, value)} />
                  <BilingualEditor label="Note juridique générale" value={sitePages.footer.note} multiline rows={3} onChange={(language, value) => updateSitePageText('footer', 'note', language, value)} />
                  <BilingualEditor label="Bouton Contact" value={sitePages.footer.cta} onChange={(language, value) => updateSitePageText('footer', 'cta', language, value)} />
                  <BilingualEditor label="Titre navigation" value={sitePages.footer.navigationHeading} onChange={(language, value) => updateSitePageText('footer', 'navigationHeading', language, value)} />
                  <BilingualEditor label="Titre Contact" value={sitePages.footer.contactHeading} onChange={(language, value) => updateSitePageText('footer', 'contactHeading', language, value)} />
                  <BilingualEditor label="Titre Informations" value={sitePages.footer.informationHeading} onChange={(language, value) => updateSitePageText('footer', 'informationHeading', language, value)} />
                  <BilingualEditor label="Lien Administration" value={sitePages.footer.adminLink} onChange={(language, value) => updateSitePageText('footer', 'adminLink', language, value)} />
                  <BilingualEditor label="Mention de droits réservés" value={sitePages.footer.rightsReserved} onChange={(language, value) => updateSitePageText('footer', 'rightsReserved', language, value)} />
                </div>
              </details>


              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={saveSitePages} className="inline-flex items-center gap-2 rounded-full bg-brand-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-accent"><DocumentCheckIcon className="h-[17px] w-[17px]" aria-hidden="true" /> {isApiCmsMode ? 'Enregistrer ces pages sur le site' : 'Enregistrer ces pages dans ce navigateur'}</button>
                <button type="button" onClick={restoreSitePages} className="rounded-full border border-brand-border bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-brand-black hover:bg-brand-surface">Restaurer les textes préremplis</button>
              </div>
            </section>
          )}

          {activePanel === 'banner' && (
            <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div><h2 className="text-xl">Contenu du bandeau défilant</h2><p className="mt-2 text-sm text-gray-500">Chaque élément nécessite une version française et anglaise.</p></div>
                <button type="button" onClick={() => setBannerItems([...bannerItems, { id: `banner-${Date.now()}`, fr: '', en: '' }])} className="inline-flex items-center gap-2 self-start rounded-full border border-brand-border px-4 py-2 text-sm font-semibold hover:border-brand-black"><PlusIcon className="h-4 w-4" aria-hidden="true" /> Ajouter un mot</button>
              </div>
              <div className="mt-6 space-y-3">
                {bannerItems.map((item) => (
                  <div key={item.id} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                    <input value={item.fr} onChange={(event) => setBannerItems(bannerItems.map((current) => current.id === item.id ? { ...current, fr: event.target.value } : current))} placeholder="Texte français" className="rounded-xl border border-brand-border px-4 py-3 text-sm outline-none focus:border-brand-accent" />
                    <input value={item.en} onChange={(event) => setBannerItems(bannerItems.map((current) => current.id === item.id ? { ...current, en: event.target.value } : current))} placeholder="English text" className="rounded-xl border border-brand-border px-4 py-3 text-sm outline-none focus:border-brand-accent" />
                    <button type="button" onClick={() => setBannerItems(bannerItems.filter((current) => current.id !== item.id))} className="rounded-xl border border-brand-border p-3 text-red-600 hover:bg-red-50" aria-label="Supprimer cet élément"><TrashIcon className="h-[17px] w-[17px]" aria-hidden="true" /></button>
                  </div>
                ))}
                {bannerItems.length === 0 && <p className="rounded-xl bg-brand-surface p-4 text-sm text-gray-600">Le bandeau est vide. Cette liste vide peut être enregistrée.</p>}
              </div>
              <button type="button" onClick={saveBanner} className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-accent"><DocumentCheckIcon className="h-[17px] w-[17px]" aria-hidden="true" /> Enregistrer le bandeau</button>
            </section>
          )}

          {activePanel === 'news' && (
            <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div><h2 className="text-xl">Actualités & éclairages</h2><p className="mt-2 text-sm text-gray-500">Gère les cartes, les pages de détail, les textes FR/EN et l’image de couverture facultative de chaque actualité.</p></div>
                {!editingNews && <button type="button" onClick={() => setEditingNews(newArticle())} className="inline-flex items-center gap-2 self-start rounded-full bg-brand-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent"><PlusIcon className="h-4 w-4" aria-hidden="true" /> Nouvelle actualité</button>}
              </div>

              {editingNews ? (
                <form onSubmit={saveArticle} className="mt-6 space-y-6">
                  <div className="rounded-2xl border border-brand-border bg-[#fbfbfa] p-5">
                    <div className="flex items-start gap-3">
                      <PhotoIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden="true" />
                      <div><h3 className="font-semibold">Image de couverture (facultative)</h3><p className="mt-1 text-xs leading-5 text-gray-500">{isApiCmsMode ? 'En mode serveur, utilise une URL d’image pour le moment. Le téléversement sécurisé sera ajouté après configuration du stockage des fichiers.' : 'Colle une URL / un chemin local ou choisis un fichier image. Les fichiers sont compressés et stockés dans ce navigateur; utilise de préférence des images légères. L’image apparaît sur la carte et dans le détail.'}</p></div>
                    </div>
                    <div className="mt-4 grid gap-4 lg:grid-cols-2">
                      {editingNews.image?.startsWith('data:') ? <p className="rounded-xl bg-brand-surface p-4 text-sm text-gray-600">Image locale compressée et prête à être enregistrée.</p> : <TextField label="URL de l’image (ou chemin local)" value={editingNews.image ?? ''} onChange={(value) => setEditingNews({ ...editingNews, image: value })} />}
                      <TextField label="Texte alternatif de l’image (FR)" value={editingNews.imageAlt ?? ''} onChange={(value) => setEditingNews({ ...editingNews, imageAlt: value })} />
                      <TextField label="Image alternative text (EN)" value={editingNews.imageAltEn ?? ''} onChange={(value) => setEditingNews({ ...editingNews, imageAltEn: value })} />
                      {!isApiCmsMode && <label className="block text-sm font-medium text-gray-700">Choisir un fichier image
                        <input type="file" accept="image/*" onChange={(event) => { void uploadNewsImage(event.currentTarget.files?.[0]); event.currentTarget.value = ''; }} className="mt-2 block w-full rounded-xl border border-brand-border bg-white px-3 py-2.5 text-sm font-normal file:mr-3 file:rounded-full file:border-0 file:bg-brand-surface file:px-3 file:py-2 file:text-xs file:font-semibold file:text-brand-black" />
                      </label>}
                    </div>
                    {editingNews.image?.trim() && <div className="mt-4 flex flex-wrap items-start gap-3"><img src={editingNews.image} alt={editingNews.imageAlt || editingNews.title || 'Aperçu de l’image'} className="max-h-64 min-w-0 flex-1 rounded-xl border border-brand-border object-cover" /><button type="button" onClick={() => setEditingNews({ ...editingNews, image: '' })} className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-50">Retirer l’image</button></div>}
                  </div>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4 rounded-2xl bg-brand-surface p-5">
                      <h3 className="font-semibold">Français</h3>
                      <TextField label="Titre *" value={editingNews.title} onChange={(value) => setEditingNews({ ...editingNews, title: value })} />
                      <TextField label="Date *" value={editingNews.date} onChange={(value) => setEditingNews({ ...editingNews, date: value })} />
                      <TextArea label="Résumé *" value={editingNews.desc} onChange={(value) => setEditingNews({ ...editingNews, desc: value })} rows={4} />
                      <TextArea label="Contenu détaillé" value={editingNews.content ?? ''} onChange={(value) => setEditingNews({ ...editingNews, content: value })} rows={8} />
                    </div>
                    <div className="space-y-4 rounded-2xl border border-brand-border p-5">
                      <h3 className="font-semibold">English</h3>
                      <TextField label="Title" value={editingNews.titleEn ?? ''} onChange={(value) => setEditingNews({ ...editingNews, titleEn: value })} />
                      <TextField label="Display date" value={editingNews.dateEn ?? ''} onChange={(value) => setEditingNews({ ...editingNews, dateEn: value })} />
                      <TextArea label="Summary" value={editingNews.descEn ?? ''} onChange={(value) => setEditingNews({ ...editingNews, descEn: value })} rows={4} />
                      <TextArea label="Detailed content" value={editingNews.contentEn ?? ''} onChange={(value) => setEditingNews({ ...editingNews, contentEn: value })} rows={8} />
                    </div>
                  </div>
                  <p className="-mt-3 text-xs leading-5 text-gray-500">Dans le contenu détaillé, sépare les paragraphes par une ligne vide. Les titres `##`, les sous-titres `###`, les listes `- élément` et les citations `&gt; texte` sont affichés sur la page dédiée.</p>
                  <div className="flex flex-wrap gap-3">
                    <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-brand-black px-5 py-3 text-sm font-semibold text-white hover:bg-brand-accent"><DocumentCheckIcon className="h-4 w-4" aria-hidden="true" /> Enregistrer</button>
                    <button type="button" onClick={() => setEditingNews(null)} className="rounded-full border border-brand-border px-5 py-3 text-sm font-semibold hover:bg-brand-surface">Annuler</button>
                    {news.some((item) => item.id === editingNews.id) && <Link to={`/actualites/${encodeURIComponent(editingNews.id)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-brand-border px-5 py-3 text-sm font-semibold hover:border-brand-black hover:bg-brand-surface">Prévisualiser l’actualité <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" /></Link>}
                  </div>
                </form>
              ) : (
                <div className="mt-6 space-y-3">
                  {latestNews.map((item) => (
                    <article key={item.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-brand-border p-4 sm:flex-row sm:items-center sm:p-5">
                      <div className="flex min-w-0 items-center gap-4">
                        {item.image?.trim() && <img src={item.image} alt={item.imageAlt || item.title} className="h-16 w-20 shrink-0 rounded-lg border border-brand-border object-cover" />}
                        <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">{item.date}</p><h3 className="mt-2 truncate font-semibold">{item.title || 'Sans titre'}</h3><p className="mt-1 line-clamp-2 text-sm text-gray-600">{item.desc}</p></div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <Link to={`/actualites/${encodeURIComponent(item.id)}`} target="_blank" rel="noreferrer" className="rounded-full border border-brand-border px-4 py-2 text-sm font-medium hover:border-brand-black">Voir</Link>
                        <button type="button" onClick={() => setEditingNews({ ...item })} className="rounded-full border border-brand-border px-4 py-2 text-sm font-medium hover:border-brand-black">Modifier</button>
                        <button type="button" onClick={() => deleteArticle(item.id)} className="rounded-full border border-red-200 p-2 text-red-700 hover:bg-red-50" aria-label={`Supprimer ${item.title}`}><TrashIcon className="h-4 w-4" aria-hidden="true" /></button>
                      </div>
                    </article>
                  ))}
                  {news.length === 0 && <p className="rounded-xl bg-brand-surface p-5 text-sm text-gray-600">Aucune actualité. La liste vide est enregistrable et ne rétablira plus les exemples par défaut.</p>}
                </div>
              )}
            </section>
          )}

          <p className="mt-8 text-xs text-gray-400">{isApiCmsMode ? 'C.IP Admin · session protégée par le serveur' : 'Démo locale · aucune publication serveur · aucune donnée d’administration protégée'}</p>
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: ReactNode }) {
  return (
    <article className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between text-gray-500"><p className="text-sm font-medium">{title}</p><span className="text-brand-accent">{icon}</span></div>
      <p className="mt-5 font-display text-4xl">{value}</p>
    </article>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm font-medium text-gray-700">{label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-brand-accent" />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (value: string) => void; rows?: number }) {
  return (
    <label className="block text-sm font-medium text-gray-700">{label}
      <textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full resize-y rounded-xl border border-brand-border bg-white px-4 py-3 text-sm font-normal leading-6 outline-none transition focus:border-brand-accent" />
    </label>
  );
}

function BilingualEditor({ label, value, onChange, multiline = false, rows = 4 }: { label: string; value: LocalizedText; onChange: (language: 'fr' | 'en', value: string) => void; multiline?: boolean; rows?: number }) {
  return (
    <div className="rounded-xl border border-brand-border bg-white p-4">
      <p className="mb-3 text-sm font-semibold text-brand-black">{label}</p>
      <div className="grid gap-4 lg:grid-cols-2">
        {multiline
          ? <>
              <TextArea label="Français" value={value.fr} onChange={(next) => onChange('fr', next)} rows={rows} />
              <TextArea label="English" value={value.en} onChange={(next) => onChange('en', next)} rows={rows} />
            </>
          : <>
              <TextField label="Français" value={value.fr} onChange={(next) => onChange('fr', next)} />
              <TextField label="English" value={value.en} onChange={(next) => onChange('en', next)} />
            </>}
      </div>
    </div>
  );
}
