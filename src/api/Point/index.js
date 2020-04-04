import ApiClient from '../ApiClient';

export const sendData = (data, kennitala = '') => {
  return ApiClient.post(`/points`, {
    ...data,
    kennitala,
  });
};
