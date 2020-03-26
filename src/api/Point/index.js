import ApiClient from '../ApiClient';

export const logPoints = (points, kennitala = '') => {
  return ApiClient.post(`/points`, {
    points,
    kennitala,
  });
};
