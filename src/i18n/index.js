import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import isFlag from '../assets/flags/is.png';
import enFlag from '../assets/flags/gb.png';
import plFlag from '../assets/flags/pl.png';

import en from '../locales/en.json';
import is from '../locales/is.json';
import pl from '../locales/pl.json';

import languageDetector from './language-detector';

const resources = {
  en,
  is,
  pl,
};
const namespace = 'translation';

export const languages = [
  {
    code: 'is',
    name: 'Íslenska',
    title: 'Rakning COVID-19',
    description:
      'Hjálpum rakningarteymi Almannavarna að rekja hugsanleg COVID-19 smit á Íslandi',
    button: 'Áfram á íslensku',
    flag: isFlag,
  },
  {
    code: 'pl',
    name: 'Polski',
    title: 'Śledzenie COVID-19',
    description:
      'Pomoc Obronie Cywilnej w śledzeniu potencjalnych infekcji COVID-19 na Islandii',
    button: 'Prześlij do polskiego',
    flag: plFlag,
  },
  {
    code: 'en',
    name: 'English',
    title: 'Tracking COVID-19',
    description:
      'Help the Civil Protection Team to track potential COVID-19 infections in Iceland',
    button: 'Continue in English',
    flag: enFlag,
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
      defaultNs: namespace,

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
