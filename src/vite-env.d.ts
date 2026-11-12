/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CMS_MODE?: 'demo' | 'api';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
