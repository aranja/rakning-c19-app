import React, { Suspense } from 'react';
import { Platform, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import PropTypes from 'prop-types';
import { createAppContainer } from 'react-navigation';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

import createRootNavigator from './router';
import AuthProvider, { AuthConsumer } from './context/authentication';
import { AlertProvider } from './context/alert';
import LoadingScreen from './components/LoadingScreen';
import initI18n from './i18n';
import fixTextCutoff from './utils/fix-text-cutoff';
import { AppStateProvider } from './context/app-state';

initI18n();
fixTextCutoff();

const Root = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

class App extends React.Component {
  Router = null;

  state = {
    hasCheckedToken: false,
  };

  async componentDidMount() {
    const [validToken] = await Promise.all([
      this.props.checkLoggedInState(),

      // Load theme fonts
      Font.loadAsync({
        OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
        OpenSansSemiBold: require('./assets/fonts/OpenSans-SemiBold.ttf'),
        OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
        OpenSansExtraBold: require('./assets/fonts/OpenSans-ExtraBold.ttf'),
      }),
    ]);

    this.startRouter(validToken);
  }

  startRouter(shouldStartLoggedOut) {
    this.Router = createAppContainer(createRootNavigator(shouldStartLoggedOut));
    this.setState({
      hasCheckedToken: true,
    });
  }

  render() {
    const { hasCheckedToken } = this.state;

    return (
      <Root>
        <Suspense fallback={<LoadingScreen />}>
          {hasCheckedToken && (
            <this.Router onNavigationStateChange={() => {}} />
          )}
        </Suspense>
      </Root>
    );
  }
}

App.propTypes = {
  checkLoggedInState: PropTypes.func.isRequired,
};

export default () => (
  <>
    {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
    <AppStateProvider>
      <AlertProvider>
        <AuthProvider>
          <AuthConsumer>
            {({ init }) => <App checkLoggedInState={init} />}
          </AuthConsumer>
        </AuthProvider>
      </AlertProvider>
    </AppStateProvider>
  </>
);
