import { useEffect } from 'react';
import { fetchPublicCmsContent } from '../lib/cmsApi';
import { applyCmsDocuments } from '../lib/cmsCache';

export default function CmsBootstrap() {
  useEffect(() => {
    if (import.meta.env.VITE_CMS_MODE !== 'api') return;
    let active = true;
    fetchPublicCmsContent()
      .then(({ documents }) => {
        if (active) applyCmsDocuments(documents);
      })
      .catch((error) => {
        console.error('Le contenu centralisé n’a pas pu être chargé; les valeurs intégrées au site restent affichées.', error);
      });
    return () => { active = false; };
  }, []);

  return null;
}
