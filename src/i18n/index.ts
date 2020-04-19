import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import isFlag from '../assets/flags/is.png';
import enFlag from '../assets/flags/gb.png';
import plFlag from '../assets/flags/pl.png';
import esFlag from '../assets/flags/es.png';
import frFlag from '../assets/flags/fr.png';
import thFlag from '../assets/flags/th.png';
import ruFlag from '../assets/flags/ru.png';

import en from '../locales/en.json';
import is from '../locales/is.json';
import pl from '../locales/pl.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import th from '../locales/th.json';
import ru from '../locales/ru.json';

import languageDetector from './language-detector';

const resources = {
  en,
  is,
  pl,
  es,
  fr,
  th,
};
const namespace = 'translation';

export interface LanguageDefinition {
  code: string;
  name: string;
  flag: string;
}

export const languages: LanguageDefinition[] = [
  {
    code: 'is',
    name: 'Íslenska',
    flag: isFlag,
  },
  {
    code: 'pl',
    name: 'Polski',
    flag: plFlag,
  },
  {
    code: 'en',
    name: 'English',
    flag: enFlag,
  },
  {
    code: 'es',
    name: 'Español',
    flag: esFlag,
  },
  {
    code: 'fr',
    name: 'Français',
    flag: frFlag,
  },
  {
    code: 'th',
    name: 'ภาษาไทย',
    flag: thFlag,
  },
  {
    code: 'ru',
    name: 'Русский',
    flag: ruFlag,
  },
];

/**
 * We use content as keys and have no namespace.
 */
export default function initI18n() {
  i18next
    .use(languageDetector)
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
};

export const getLanguage = () => i18next.language;
