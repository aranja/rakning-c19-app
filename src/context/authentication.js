import React from 'react';
import * as SecureStore from 'expo-secure-store';
import ApiClient from '../api/ApiClient';
import { verifyToken, updatePushToken } from '../api/User';

export const AuthContext = React.createContext({
  isLoggedIn: false,
  init: () => {},
  login: () => {},
  logout: () => {},
  checkForValidToken: () => {},
  getToken: () => null,
});

export const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    token: null,
  };

  checkForValidToken = async () => {
    try {
      const token = await ApiClient.getToken();
      if (!token) {
        return false;
      }

      this.setState({ token });
      return verifyToken();
    } catch (error) {
      console.log(error);
    }

    return false;
  };

  init = async () => {
    const hasValidToken = await this.checkForValidToken();
    this.setState({ isLoggedIn: hasValidToken });
    return hasValidToken;
  };

  login = async token => {
    this.setState({ token });
    await ApiClient.setToken(token);
  };

  logout = async () => {
    await updatePushToken(null);
    this.setState({ token: null });
    await ApiClient.clearToken();
  };

  getToken = () => {
    return this.state.token;
  };

  render() {
    const { isLoggedIn } = this.state;
    const { children } = this.props;
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn,
          init: this.init,
          login: this.login,
          logout: this.logout,
          checkForValidToken: this.checkForValidToken,
          getToken: this.getToken,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
