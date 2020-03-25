import { AsyncStorage } from 'react-native';
import * as Localization from 'expo-localization';

const storageKey = 'hopp/user-language';

const languageDetector = {
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

    callback(Localization.locale.split('-')[0]);
  },
  cacheUserLanguage: async language => {
    try {
      await AsyncStorage.setItem(storageKey, language);
    } catch {
      // Ignore error.
    }
  },
};

export default languageDetector;
