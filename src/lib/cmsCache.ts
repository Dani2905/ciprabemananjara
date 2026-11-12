import type { CmsDocuments } from './cmsApi';

const documentStorage = {
  'site-content': { storageKey: 'appSiteContent', eventName: 'appSiteContentUpdated' },
  'hero-images': { storageKey: 'heroImages', eventName: 'heroImagesUpdated' },
  'site-pages': { storageKey: 'sitePagesContentV1', eventName: 'sitePagesUpdated' },
  banner: { storageKey: 'appBanner', eventName: 'appBannerUpdated' },
  news: { storageKey: 'appNews', eventName: 'appNewsUpdated' },
} as const;

const hardcodedStorageKeys = ['expertisePageContentV3', 'legalNoticeContentV1', 'privacyPolicyContentV1'] as const;
const hardcodedEvents = ['expertiseContentUpdated', 'legalNoticeUpdated', 'privacyPolicyUpdated'] as const;

export function clearCmsContentCache(): void {
  if (typeof window === 'undefined') return;
  try {
    for (const { storageKey } of Object.values(documentStorage)) window.localStorage.removeItem(storageKey);
    for (const storageKey of hardcodedStorageKeys) window.localStorage.removeItem(storageKey);
  } catch {
    // The app can still render its compiled defaults if storage is disabled.
  }
}

export function applyCmsDocuments(documents: CmsDocuments): void {
  if (typeof window === 'undefined') return;
  try {
    for (const storageKey of hardcodedStorageKeys) window.localStorage.removeItem(storageKey);
    for (const [key, { storageKey }] of Object.entries(documentStorage) as [keyof typeof documentStorage, { storageKey: string; eventName: string }][]) {
      if (Object.prototype.hasOwnProperty.call(documents, key)) {
        window.localStorage.setItem(storageKey, JSON.stringify(documents[key]));
      } else {
        // An absent database record means the application should show its bundled default, not an old local demo draft.
        window.localStorage.removeItem(storageKey);
      }
    }
    for (const { eventName } of Object.values(documentStorage)) window.dispatchEvent(new Event(eventName));
    for (const eventName of hardcodedEvents) window.dispatchEvent(new Event(eventName));
  } catch (error) {
    console.error('Unable to refresh the local display cache from the CMS API.', error);
  }
}
