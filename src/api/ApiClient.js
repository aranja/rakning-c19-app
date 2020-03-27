import * as SecureStore from 'expo-secure-store';
import { userAgent } from './shared';
import { storage } from '../utils';
import config from '../config';

const getData = async res => {
  if (res.status === 401) {
    throw new Error('AUTH_FAILED');
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // returns data as null
  }

  if (!res.ok) {
    const error = new Error(
      (data && data.message) ||
        `Unexpected server error (${res.status} ${res.url})`,
    );
    error.status = res.status;
    error.statusText = res.statusText;
    error.body = data;
    throw error;
  }
  return data;
};

const safeFetch = async (url, token, options) => {
  const fetchOptions = {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-User-Agent': userAgent,
      ...options.headers,
    },
  };
  if (token) {
    fetchOptions.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${config.covidApiUrl}${url}`, fetchOptions);
  return getData(response);
};

/**
 * Call the Hopp API and handle errors.
 */
class ApiClient {
  token = undefined;

  setToken(token) {
    this.token = token;
    return Promise.all([
      SecureStore.setItemAsync('token', token),
      storage.save('isRegistered', true),
    ]);
  }

  clearToken() {
    this.token = undefined;
    return Promise.all([
      SecureStore.deleteItemAsync('token'),
      storage.remove('isRegistered'),
    ]);
  }

  async getToken() {
    const isRegistered = Boolean(await storage.get('isRegistered'));
    this.token = isRegistered
      ? await SecureStore.getItemAsync('token')
      : undefined;
    return this.token;
  }

  get(url) {
    if (!this.getToken()) {
      return;
    }

    return safeFetch(url, this.token, {
      method: 'GET',
    });
  }

  post(url, body) {
    if (!this.getToken()) {
      return;
    }

    return safeFetch(url, this.token, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  delete(url, body) {
    if (!this.getToken()) {
      return;
    }

    return safeFetch(url, this.token, {
      method: 'DELETE',
      body: JSON.stringify(body),
    });
  }

  put(url, body) {
    if (!this.getToken()) {
      return;
    }

    return safeFetch(url, this.token, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }
}

export default new ApiClient();
