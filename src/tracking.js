import * as Permissions from 'expo-permissions';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation'
import { storage } from './utils';

const BACKGROUND_LOCATION_TASK = 'background-location';
const POINTS_BUFFER = 'points-buffer';
const LAST_TIMESTAMP = 'last-timestamp';

BackgroundGeolocation.on('location', onLocation);

export function getPoints() {
  return storage.get(POINTS_BUFFER);
}

// TaskManager.defineTask(BACKGROUND_LOCATION_TASK, handleLocationUpdate);

export async function stopBackgroundTracking() {
  // // Check if task is already registered
  // let isTaskRegistered = await TaskManager.isTaskRegisteredAsync(
  //   BACKGROUND_LOCATION_TASK,
  // );
  //
  // // Remove old task if one is registered
  // if (isTaskRegistered) {
  //   await TaskManager.unregisterTaskAsync(BACKGROUND_LOCATION_TASK);
  // }
  BackgroundGeolocation.stop();
}

export async function initBackgroundTracking() {
  try {
    await Permissions.askAsync(Permissions.LOCATION);
    await restartBackgroundTracking();
    return true;
  } catch (error) {
    return false;
  }
}

async function restartBackgroundTracking() {
  try {
    await stopBackgroundTracking();

    // Start a new background task
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: true,
      stopOnTerminate: false,
      // locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 1000 * 60 * 5,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
    });
    BackgroundGeolocation.start();
    // await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
    //   accuracy: Location.Accuracy.High,
    //   activityType: Location.ActivityType.Other,
    //   timeInterval: 60 * 1000, // Android only
    //   pausesUpdatesAutomatically: true, // iOS only.
    //   showsBackgroundLocationIndicator: false, // iOS only.
    //   distanceInterval: 10, // Avoid tracking events within 10 meters
    //   deferredUpdatesInterval: 3 * 60 * 1000, // Store locations every hour
    // });
    return true;
  } catch (error) {
    return false;
  }
}

function onLocation(location) {
  console.log(new Date(location.time));
}

export async function handleLocationUpdate({ data, error }) {
  const noLocations = !data || !data.locations || data.locations.length === 0;

  if (error || noLocations) {
    return;
  }

  const timeResolution = 1;

  console.log(data.locations.map(location => new Date(location.timestamp)));

  // Get the current buffer (if sending to the server has failed in the past)
  let points;
  try {
    points = (await storage.get(POINTS_BUFFER)) || [];
  } catch (err) {
    // If it fails we ignore it
    points = [];
  }

  // Add new points

  // Reduce the resolution of the points
  const { locations } = data;
  let lastTimestamp = await storage.get(LAST_TIMESTAMP);
  if (!lastTimestamp && points.length > 0) {
    lastTimestamp = points[points.length - 1].timestamp;
  }
  for (const location of locations) {
    if (
      lastTimestamp &&
      location.timestamp - lastTimestamp < timeResolution * 60 * 1000
    ) {
      continue;
    }
    const {
      coords: { longitude, latitude, accuracy },
      timestamp,
    } = location;
    points.push({ longitude, latitude, accuracy, timestamp });
    lastTimestamp = timestamp;
  }

  await storage.save(LAST_TIMESTAMP, lastTimestamp);
  await storage.save(POINTS_BUFFER, points);
}
