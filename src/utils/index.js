import { AsyncStorage } from 'react-native';

export {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from './scale';
export { secondsToTime, secondsToTimeString } from './time';
export { metersToDistanceString } from './distance';
export { getToastMessageFromErrorCode } from './error-codes';

export const composeFn = (...fns) => (...args) => fns.map(fn => fn(...args));

export const storage = {
  async get(key, defaultValue = null) {
    try {
      const trip = await AsyncStorage.getItem(key);
      return trip ? JSON.parse(trip) : defaultValue;
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
