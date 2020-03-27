import AsyncStorage from '@react-native-community/async-storage';

export {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from './scale';
export { secondsToTime, secondsToTimeString } from './time';

export const composeFn = (...fns) => (...args) => fns.map(fn => fn(...args));

export const storage = {
  async get(key, defaultValue = null) {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },
  async save(key, json) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(json));
    } catch (error) {
      // Ignore Error
    }
  },
  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      // Ignore Error
    }
  },
};
