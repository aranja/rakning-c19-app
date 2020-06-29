import { createStackNavigator } from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import LanguageScreen from './screens/LanguageScreen';
import OnboardingScreen from './screens/OnboardingScreen';

const LoggedOut = createStackNavigator(
  {
    Locale: LanguageScreen,
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    Onboarding: OnboardingScreen,
  },
  {
    initialRouteName: 'Locale',
    headerMode: 'none',
  },
);

export default LoggedOut;
