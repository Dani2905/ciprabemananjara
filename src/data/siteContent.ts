export interface SiteContent {
  heroAccentFr: string;
  heroAccentEn: string;
  heroDescriptionFr: string;
  heroDescriptionEn: string;
  aboutIntroFr: string;
  aboutIntroEn: string;
}

export const defaultSiteContent: SiteContent = {
  heroAccentFr: 'Sécurisée & Valorisée.',
  heroAccentEn: 'Secured & Valued.',
  heroDescriptionFr: 'Le Cabinet Rabemananjara vous accompagne dans la protection et la valorisation de vos actifs de propriété industrielle, à Madagascar et dans les territoires concernés.',
  heroDescriptionEn: 'Cabinet Rabemananjara supports the protection and strategic use of your industrial property assets in Madagascar and the relevant territories.',
  aboutIntroFr: "Le Cabinet Rabemananjara accompagne les entreprises, créateurs et organisations dans leurs démarches de propriété industrielle. Notre approche privilégie l'écoute, la clarté et un accompagnement adapté aux enjeux de chaque projet.",
  aboutIntroEn: 'Cabinet Rabemananjara supports businesses, creators and organisations with their industrial property matters. Our approach is built on attentive listening, clarity and guidance tailored to each project.',
};

const STORAGE_KEY = 'appSiteContent';

export const getSiteContent = (): SiteContent => {
  if (typeof window === 'undefined') return defaultSiteContent;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultSiteContent;

  try {
    const parsed = JSON.parse(saved) as Partial<SiteContent>;
    return { ...defaultSiteContent, ...parsed };
  } catch (error) {
    console.error('Failed to parse site content from localStorage', error);
    return defaultSiteContent;
  }
};

export const saveSiteContent = (content: SiteContent) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event('appSiteContentUpdated'));
};

export const defaultHeroImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=82',
  'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=1600&q=82',
  'https://images.unsplash.com/photo-1507208613628-11456284b396?auto=format&fit=crop&w=1600&q=82',
];

const HERO_IMAGES_KEY = 'heroImages';

export const getHeroImages = (): string[] => {
  if (typeof window === 'undefined') return defaultHeroImages;
  const saved = window.localStorage.getItem(HERO_IMAGES_KEY);
  if (saved === null) return defaultHeroImages;

  try {
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.every((value) => typeof value === 'string')
      ? parsed
      : defaultHeroImages;
  } catch (error) {
    console.error('Failed to parse hero images from localStorage', error);
    return defaultHeroImages;
  }
};

export const saveHeroImages = (images: string[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(HERO_IMAGES_KEY, JSON.stringify(images));
  window.dispatchEvent(new Event('heroImagesUpdated'));
};
