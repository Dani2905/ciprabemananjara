export interface NewsItem {
  id: string;
  date: string;
  dateEn?: string;
  title: string;
  titleEn?: string;
  desc: string;
  descEn?: string;
  content?: string;
  contentEn?: string;
  image?: string;
  imageAlt?: string;
  imageAltEn?: string;
}

// Exemples repris des fichiers fournis. Vérifier et actualiser avant publication.
export const defaultNews: NewsItem[] = [
  {
    id: '1',
    date: '12 Août 2026',
    dateEn: 'Aug 12, 2026',
    title: 'Nouvelle loi sur les brevets à Madagascar',
    titleEn: 'New Patent Law in Madagascar',
    desc: "Le cadre légal s'adapte aux standards internationaux avec la nouvelle réforme sur l'innovation.",
    descEn: 'The legal framework adapts to international standards with the new innovation reform.',
  },
  {
    id: '2',
    date: '05 Août 2026',
    dateEn: 'Aug 05, 2026',
    title: 'Participation au séminaire OMAPI',
    titleEn: 'Participation in OMAPI Seminar',
    desc: 'Notre cabinet a participé à la table ronde annuelle sur la propriété intellectuelle et les enjeux futurs.',
    descEn: 'Our firm participated in the annual roundtable on intellectual property and future challenges.',
  },
  {
    id: '3',
    date: '28 Juil. 2026',
    dateEn: 'Jul 28, 2026',
    title: 'Protection des marques en Afrique',
    titleEn: 'Trademark Protection in Africa',
    desc: "Focus sur l'importance du dépôt de marque à l'échelle régionale avec l'OAPI et l'ARIPO.",
    descEn: 'Focus on the importance of regional trademark registration with OAPI and ARIPO.',
  },
];

export const getNews = (): NewsItem[] => {
  if (typeof window === 'undefined') return defaultNews;
  const saved = window.localStorage.getItem('appNews');
  if (saved === null) return defaultNews;

  try {
    const parsed: unknown = JSON.parse(saved);
    // An empty array is valid: it means the editor intentionally cleared the list.
    if (Array.isArray(parsed)) return parsed as NewsItem[];
  } catch (error) {
    console.error('Failed to parse news from localStorage', error);
  }
  return defaultNews;
};

export const saveNews = (news: NewsItem[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('appNews', JSON.stringify(news));
  window.dispatchEvent(new Event('appNewsUpdated'));
};
