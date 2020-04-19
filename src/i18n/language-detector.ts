import AsyncStorage from '@react-native-community/async-storage';
import * as Localization from 'expo-localization';
import { LanguageDefinition } from './index';

const storageKey = 'covid/user-language';

const languageDetector = (languages: LanguageDefinition[]) => ({
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async callback => {
    try {
      const language = await AsyncStorage.getItem(storageKey);

      if (language) {
        return callback(language);
      }
    } catch (e) {
      // Ignored
    }

    let defaultLanguage = Localization.locale.split('-')[0];
    const isSupported = languages.find(
      language => language.code === defaultLanguage,
    );

    // Most English language devices in Iceland belong to Icelanders
    // since Icelandic is rarely supported.
    if (defaultLanguage === 'en') {
      defaultLanguage = 'is';
    } else if (!isSupported) {
      defaultLanguage = 'en';
    }

    callback(defaultLanguage);
  },
  cacheUserLanguage: async language => {
    try {
      await AsyncStorage.setItem(storageKey, language);
    } catch {
      // Ignore error.
    }
  },
});

export default languageDetector;
