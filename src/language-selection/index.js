import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EnTranslations from "../locales/en/translation.json"
import FiTranslations from "../locales/fi/translation.json"
import SvTranslations from "../locales/sv/translation.json"
import {getLanguageFromLocalStorage} from "../services/local-storage";

i18n.use(initReactI18next).init({
    lng: getLanguageFromLocalStorage() || 'en', // default
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EnTranslations
        },
        fi: {
            translation: FiTranslations
        },
        sv: {
            translation: SvTranslations
        }
    }
});

export default i18n;
