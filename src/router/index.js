import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { AuthContext } from '../context/authentication';
import LoggedOutModule from './logged-out';
import LoggedInModule from './logged-in';
import { useContext, useEffect } from 'react';

function AuthLoading({ navigation }) {
  const { init: checkLoggedInState } = useContext(AuthContext);
  useEffect(() => {
    checkLoggedInState().then(isLoggedIn => {
      navigation.navigate(isLoggedIn ? 'LoggedIn' : 'LoggedOut');
    });
  }, []);
  return null;
}

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      LoggedOut: LoggedOutModule,
      LoggedIn: LoggedInModule,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
