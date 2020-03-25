import { createSwitchNavigator } from 'react-navigation';

import LoggedOutModule from './logged-out';
import LoggedInModule from './logged-in';

function createRootNavigator(signedIn) {
  return createSwitchNavigator(
    {
      LoggedOut: {
        screen: LoggedOutModule,
      },
      LoggedIn: {
        screen: LoggedInModule,
      },
    },
    {
      initialRouteName: signedIn ? 'LoggedIn' : 'LoggedOut',
    },
  );
}

export default createRootNavigator;
