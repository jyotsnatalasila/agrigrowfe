import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import enTranslation from './locales/en/translation.json';
import teTranslation from './locales/te/translation.json';
import mlTranslation from './locales/ml/translation.json';
import bnTranslation from './locales/bn/translation.json';
import paTranslation from './locales/pa/translation.json';
import guTranslation from './locales/gu/translation.json';
import frTranslation from './locales/fr/translation.json';
import esTranslation from './locales/es/translation.json';
import zhCNTranslation from './locales/zh-CN/translation.json';
import jaTranslation from './locales/ja/translation.json';

const resources = {
  en: { translation: enTranslation },
  te: { translation: teTranslation },
  ml: { translation: mlTranslation },
  bn: { translation: bnTranslation },
  pa: { translation: paTranslation },
  gu: { translation: guTranslation },
  fr: { translation: frTranslation },
  es: { translation: esTranslation },
  'zh-CN': { translation: zhCNTranslation },
  ja: { translation: jaTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;