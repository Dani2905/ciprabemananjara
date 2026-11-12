export interface BannerItem {
  id: string;
  fr: string;
  en: string;
}

export const defaultBannerItems: BannerItem[] = [
  { id: '1', fr: 'Propriété Intellectuelle', en: 'Intellectual Property' },
  { id: '2', fr: 'Marques', en: 'Trademarks' },
  { id: '3', fr: 'Brevets', en: 'Patents' },
  { id: '4', fr: 'Dessins & Modèles', en: 'Designs' },
  { id: '5', fr: 'Madagascar', en: 'Madagascar' },
  { id: '6', fr: 'OMAPI', en: 'OMAPI' },
  { id: '7', fr: 'OAPI', en: 'OAPI' },
  { id: '8', fr: 'ARIPO', en: 'ARIPO' },
];

export const getBannerItems = (): BannerItem[] => {
  if (typeof window === 'undefined') return defaultBannerItems;
  const saved = window.localStorage.getItem('appBanner');
  if (saved === null) return defaultBannerItems;

  try {
    const parsed: unknown = JSON.parse(saved);
    // Preserve an intentionally empty banner instead of resurrecting sample values.
    if (Array.isArray(parsed)) return parsed as BannerItem[];
  } catch (error) {
    console.error('Failed to parse banner from localStorage', error);
  }
  return defaultBannerItems;
};

export const saveBannerItems = (items: BannerItem[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('appBanner', JSON.stringify(items));
  window.dispatchEvent(new Event('appBannerUpdated'));
};
