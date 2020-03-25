/**
 *
 * @param {String} errorCode - An error code constant
 * @returns {String} A translation key for a toast message
 */
export const getToastMessageFromErrorCode = errorCode => {
  switch (errorCode) {
    case 'VEHICLE_NOT_FOUND':
    case 'VEHICLE_UNAVAILABLE':
    case 'VEHICLE_DISCONNECTED':
      return 'vehicleUnavailableMessage';
    case 'HAS_UNPAID_TRIPS':
      return 'unpaidTripsMessage';
    case 'PAYMENT_FAILED':
      return 'authorizationFailedMessage';
    case 'FAILED_RENT':
    default:
      return 'genericErrorMessage';
  }
};
