import ApiClient from '../ApiClient';
import { getLanguage } from '../../i18n';

export const getPin = async (countryCode, phoneNumber) => {
  const { token } = await ApiClient.post(`/user/requestpin`, {
    phone: `+${countryCode}${phoneNumber}`,
  });
  return token;
};

export const verifyPin = (pin, requestToken, countryCode, phoneNumber) => {
  return ApiClient.post(`/user/pin`, {
    pin,
    locale: getLanguage(),
    token: requestToken,
    phone: `+${countryCode}${phoneNumber}`,
  });
};
