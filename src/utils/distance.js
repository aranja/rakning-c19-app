import { distance, point } from '@turf/turf';

export const metersToDistanceString = (totalMeters = 0, locale = 'en-US') => {
  if (totalMeters >= 1000) {
    const kilometers = Math.round(totalMeters / 100) / 10;
    return `${kilometers.toLocaleString(locale)} km`;
  }
  return `${totalMeters} m`;
};

export const getClosestVehicle = ({ longitude, latitude }, vehicles) => {
  const userPosition = point([longitude, latitude]);

  return vehicles.reduce(
    (closest, vehicle) => {
      const currentDistance = distance(
        userPosition,
        point([vehicle.longitude, vehicle.latitude]),
      );

      if (closest.distance < currentDistance) {
        return closest;
      }

      return {
        distance: currentDistance,
        vehicle,
      };
    },
    { distance: Number.MAX_VALUE, vehicle: null },
  );
};
