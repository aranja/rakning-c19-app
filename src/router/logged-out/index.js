import { createStackNavigator } from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import LanguageScreen from './screens/LanguageScreen';

const LoggedOut = createStackNavigator(
  {
    Locale: LanguageScreen,
    Welcome: WelcomeScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Locale',
    headerMode: 'none',
  },
);

export default LoggedOut;
