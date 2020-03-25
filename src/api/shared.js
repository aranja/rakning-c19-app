import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const userAgent = [
  //`CovidApp/${Constants.manifest.version}`,
  `(${Platform.OS}/${Platform.Version})`,
  //`App/${Constants.nativeAppVersion}`,
  //`Build/${Constants.nativeBuildVersion}`,
].join(' ');
