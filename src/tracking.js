import * as Permissions from 'expo-permissions';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const LOCATION_AGE_LIMIT = 1000 * 60 * 60 * 24 * 14;
const trimLocation = value => Number(value.toFixed(5));

export function getPoints() {
  return new Promise((resolve, reject) => {
    BackgroundGeolocation.getLocations(
      locations => {
        const timeCutoff = Date.now() - LOCATION_AGE_LIMIT;
        const filtered = locations.filter(
          location => location.time > timeCutoff,
        );

        const cleaned = filtered.map(location => ({
          lat: trimLocation(location.latitude),
          lon: trimLocation(location.longitude),
          acc: Math.round(location.accuracy),
          time: Math.round(location.time),
        }));
        resolve(cleaned);
      },
      error => reject(error),
    );
  });
}

export async function stopBackgroundTracking() {
  BackgroundGeolocation.stop();
}

export async function initBackgroundTracking(title, text) {
  try {
    await Permissions.askAsync(Permissions.LOCATION);
    await restartBackgroundTracking(title, text);
    return true;
  } catch (error) {
    return false;
  }
}

async function restartBackgroundTracking(title, text) {
  try {
    await stopBackgroundTracking();

    // Start a new background task
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: title,
      notificationText: text,
      debug: false,
      startOnBoot: true,
      stopOnTerminate: false,
      startForeground: true,
      interval: 1000 * 60,
      stopOnStillActivity: false,
      saveBatteryOnBackground: true,
    });
    BackgroundGeolocation.start();

    return true;
  } catch (error) {
    return false;
  }
}
