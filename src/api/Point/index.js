import ApiClient from '../ApiClient';

export const logPoints = points => {
  return ApiClient.post(`/points`, {
    points,
  });
};
