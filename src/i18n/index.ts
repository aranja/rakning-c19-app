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
import lt from '../locales/lt.json';

import isFlag from '../assets/flags/is.png';
import enFlag from '../assets/flags/gb.png';
import plFlag from '../assets/flags/pl.png';
import esFlag from '../assets/flags/es.png';
import frFlag from '../assets/flags/fr.png';
import thFlag from '../assets/flags/th.png';
import ruFlag from '../assets/flags/ru.png';
import jpFlag from '../assets/flags/jp.png';
import phFlag from '../assets/flags/ph.png';
import arFlag from '../assets/flags/ma.png';

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
  lt,
};
const namespace = 'translation';

export interface LanguageDefinition {
  code: string;
  name: string;
  rtl?: boolean;
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
  {
    code: 'jp',
    name: '日本語',
    flag: jpFlag,
  },
  {
    code: 'ph',
    name: 'Filipino',
    flag: phFlag,
  },
  {
    code: 'ar',
    name: 'عربي',
    rtl: true,
    flag: arFlag,
  },
  {
    code: 'fa',
    name: 'فارسی',
    rtl: true,
    flag: arFlag, // TODO update flag
  },
  {
    code: 'lt',
    name: 'Lietuviškai',
    flag: arFlag, // TODO update flag
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
