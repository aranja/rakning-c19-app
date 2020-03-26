import ApiClient from '../ApiClient';

export const getUser = async () => {
  const data = await ApiClient.get(`/user`);
  return (
    data && {
      id: data.id,
      phone: data.phone,
      locale: data.locale,
      dataRequested: data.dataRequested,
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

export const switchLocale = async locale => {
  return ApiClient.put(`/user`, {
    locale,
  });
};
