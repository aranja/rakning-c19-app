import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import isFlag from '../assets/flags/is.png';
import enFlag from '../assets/flags/gb.png';
import plFlag from '../assets/flags/pl.png';
import esFlag from '../assets/flags/es.png';
import thFlag from '../assets/flags/th.png';

import en from '../locales/en.json';
import is from '../locales/is.json';
import pl from '../locales/pl.json';
import es from '../locales/es.json';
import th from '../locales/th.json';

import languageDetector from './language-detector';

const resources = {
  en,
  is,
  pl,
  es,
  th,
};
const namespace = 'translation';

export const languages = [
  {
    code: 'is',
    name: 'Íslenska',
    title: 'Rakning COVID-19',
    description:
      'Hjálpum rakningateymi Almannavarna að rekja hugsanleg COVID-19 smit á Íslandi',
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
  {
    code: 'es',
    name: 'Español',
    title: 'Rastreo COVID-19',
    description:
      'Ayuda al Equipo de Protección Civil a rastrear posibles infecciones de COVID-19 en Islandia',
    button: 'Continuar en español',
    flag: esFlag,
  },
  {
    code: 'th',
    name: 'ภาษาไทย',
    title: 'ติดตาม COVID-19',
    description: 'ช่วยเหลือทีมติดตามของกรมพลเรือนและเหตุฉุกเฉินในการติดตาม COVID-19 ในประเทศไอซ์แลนด์i',
    button: 'ดูต่อในภาษาไทย',
    flag: thFlag,
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
