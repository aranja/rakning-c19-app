import { Linking, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

export enum LocationPermission {
  NOT_AUTHORIZED = BackgroundGeolocation.NOT_AUTHORIZED,
  AUTHORIZED = BackgroundGeolocation.AUTHORIZED,
  AUTHORIZED_FOREGROUND = BackgroundGeolocation.AUTHORIZED_FOREGROUND,
}

export interface LocationStatus {
  locationPermission: LocationPermission;
  locationServicesEnabled: boolean;
}

function getConfiguration(title, text) {
  const configuration = {
    // Accept a 100 meter accuracy.
    desiredAccuracy: BackgroundGeolocation.MEDIUM_ACCURACY,

    // When the app is active, we update the location less often when it's stationary inside this radius.
    stationaryRadius: 50,

    // Only log a new location that is at least this distance from the previous location.
    distanceFilter: 50,

    // Run a foreground service on Android that shows up as a notification. This gives us
    // more reliability in monitoring the location when the app is closed.
    startForeground: true,
    notificationTitle: title,
    notificationText: text,

    // Restart the foreground service on Android when the device boots.
    startOnBoot: true,

    // Keep monitoring location after the app terminates.
    // - On Android, this works using a foreground service.
    // - On iOS it switches to the Significant-Change Location Service which wakes up the
    //   app when the device moves 500 meters or more.
    stopOnTerminate: false,

    // Only iOS: Try and get more location data in the rare cases when the app wakes in the background.
    saveBatteryOnBackground: false,

    // When enabled, the plugin will emit sounds for life-cycle events of background-geolocation!
    debug: false,
  };

  if (Platform.OS === 'android') {
    Object.assign(configuration, {
      // Switch to ACTIVITY_PROVIDER on android, which uses a Google Play api to check if
      // the user is stationary or moving.
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,

      // How often to check the current activity.
      activitiesInterval: 1000 * 90,

      // Only Android: The minimum time interval between location updates when not stationary.
      // - iOS ignores this and only posts location updates based on the `distanceFilter` above.
      interval: 1000 * 60 * 2,

      // Only Android: Allow more location updates. Only happens if other apps are requesting location.
      fastestInterval: 1000 * 30,
    });
  }

  return configuration;
}

export async function stopBackgroundTracking() {
  BackgroundGeolocation.stop();
}

async function startBackgroundTracking(title, text) {
  try {
    await stopBackgroundTracking();

    BackgroundGeolocation.configure(getConfiguration(title, text));
    BackgroundGeolocation.start();

    return true;
  } catch (error) {
    return false;
  }
}

export async function initBackgroundTracking(title, text) {
  try {
    await Permissions.askAsync(Permissions.LOCATION);
    await startBackgroundTracking(title, text);
    return true;
  } catch (error) {
    return false;
  }
}

export async function checkLocationStatus(): Promise<LocationStatus> {
  return new Promise((resolve, reject) => {
    BackgroundGeolocation.checkStatus(
      ({ authorization: locationPermission, locationServicesEnabled }) => {
        resolve({ locationPermission, locationServicesEnabled });
      },
      error => reject(error),
    );
  });
}

export async function openLocationServiceSettings() {
  if (Platform.OS === 'android') {
    BackgroundGeolocation.showLocationSettings();
  } else {
    Linking.openURL('App-Prefs:Privacy');
  }
}

// Filter points older than 14 days old.
const LOCATION_AGE_LIMIT = 1000 * 60 * 60 * 24 * 14;

// Trim lat/lon to 5 digits (1 meter accuracy).
const trimLocation = value => Number(value.toFixed(5));

export function getPoints() {
  return new Promise((resolve, reject) => {
    BackgroundGeolocation.getLocations(
      locations => {
        const timeCutoff = Date.now() - LOCATION_AGE_LIMIT;
        const filtered = locations.filter(
          location => location.time > timeCutoff,
        );

        // Minify point data before network upload.
        const cleaned = filtered.map(location => ({
          lat: trimLocation(location.latitude),
          lon: trimLocation(location.longitude),
          acc: Math.round(location.accuracy),
          time: Math.round(location.time),
          speed: Math.round(location.speed || 0),
        }));
        resolve(cleaned);
      },
      error => reject(error),
    );
  });
}

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    BackgroundGeolocation.getCurrentLocation(
      location => {
        resolve({
          latitude: trimLocation(location.latitude),
          longitude: trimLocation(location.longitude),
        });
      },
      error => reject(error),
    );
  });
}
