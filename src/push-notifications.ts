import { updatePushToken } from './api/User';
import messaging from '@react-native-firebase/messaging';

export async function initFirebaseConnection() {
  await messaging().registerDeviceForRemoteMessages();
}

export async function registerPushNotifications() {
  try {
    const granted = await messaging().requestPermission();

    if (!granted) {
      return;
    }

    const token = await messaging().getToken();

    await updatePushToken(token);
  } catch (error) {
    // Error?
  }
}
