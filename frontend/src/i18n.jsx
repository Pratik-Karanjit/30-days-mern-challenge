import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';

const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // Set the default language here
    fallbackLng: 'en', // Fallback language if a translation is missing
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
