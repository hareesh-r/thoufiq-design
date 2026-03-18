/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Firebase HTTPS function URL for enquiry form → Google Sheet */
  readonly VITE_ENQUIRY_SUBMIT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
