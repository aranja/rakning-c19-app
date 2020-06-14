import ApiClient from '../ApiClient';

export const getUser = async () => {
  const data = await ApiClient.get(`/user`);
  return (
    data && {
      dataRequested: data.dataRequested,
      requiresKennitala: data.requiresKennitala,
      testResult: data.testResult,
    }
  );
};

export const verifyToken = async () => {
  return !!(await getUser());
};

export const updatePushToken = async pushToken => {
  return ApiClient.put(`/user`, {
    pushToken,
  });
};

export const ignoreDataRequest = async () => {
  return ApiClient.delete('/user/data-request');
};

export const deleteTestResults = async () => {
  return ApiClient.delete('/user/test-result');
};
