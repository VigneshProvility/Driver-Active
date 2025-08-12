import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../locales/en/translation.json';
import translationFI from '../locales/fi/translation.json';

const resources = {
    en: { translation: translationEN },
    fr: { translation: translationFI }
};

i18n
    .use(LanguageDetector) // Detects browser language
    .use(initReactI18next) // Connects with React
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
