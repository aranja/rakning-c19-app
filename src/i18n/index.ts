import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import is from '../locales/is.json';
import pl from '../locales/pl.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import th from '../locales/th.json';
import ru from '../locales/ru.json';
import jp from '../locales/jp.json';
import ph from '../locales/ph.json';
import ar from '../locales/ar.json';
import fa from '../locales/fa.json';

import languageDetector from './language-detector';

const resources = {
  en,
  is,
  pl,
  es,
  fr,
  th,
  ru,
  jp,
  ph,
  ar,
  fa,
};
const namespace = 'translation';

export interface LanguageDefinition {
  code: string;
  name: string;
  rtl?: boolean;
}

export const languages: LanguageDefinition[] = [
  {
    code: 'is',
    name: 'Íslenska',
  },
  {
    code: 'pl',
    name: 'Polski',
  },
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'es',
    name: 'Español',
  },
  {
    code: 'fr',
    name: 'Français',
  },
  {
    code: 'th',
    name: 'ภาษาไทย',
  },
  {
    code: 'ru',
    name: 'Русский',
  },
  {
    code: 'jp',
    name: '日本語',
  },
  {
    code: 'ph',
    name: 'Filipino',
  },
  {
    code: 'ar',
    name: 'عربي',
    rtl: true,
  },
  {
    code: 'fa',
    name: 'فارسی',
    rtl: true,
  },
];

/**
 * We use content as keys and have no namespace.
 */
export default function initI18n() {
  i18next
    .use(languageDetector(languages))
    .use(initReactI18next)
    .init({
      debug: false,
      resources,
      whitelist: Object.keys(resources),
      fallbackLng: 'en',
      saveMissing: true,
      missingKeyHandler: (locale, ns, key) => {
        if (__DEV__) {
          console.log(
            `Translations: Missing key '${key}' in locale ${locale}.`,
          );
        }
      },
      ns: namespace,
      defaultNS: namespace,
      keySeparator: false,
      nsSeparator: false,
      interpolation: {
        escapeValue: false,
      },
    });
}

export const changeLanguage = lang => {
  i18next.changeLanguage(lang);
  i18next.dir(lang);
};

export const getLanguage = () => i18next.language;
export const isRTL = () =>
  languages.find(lang => lang.code === i18next.language).rtl;
