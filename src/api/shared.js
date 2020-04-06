import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const userAgent = [
  `CovidApp/${Constants.nativeAppVersion}`,
  `Build/${Constants.nativeBuildVersion}`,
  `(${Platform.OS}/${Platform.Version})`,
].join(' ');
