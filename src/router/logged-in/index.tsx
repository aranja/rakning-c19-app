import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { RouteProp } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import AllowLocationScreen from './screens/AllowLocationScreen';
import RequestDataScreen from './screens/RequestDataScreen';
import UserProvider from '../../context/user';
import ChangeLanguageScreen from './screens/ChangeLanguageScreen';
import { LiveChatScreen } from './screens/LiveChatScreen';
import ContactScreen from './screens/ContactScreen';
import QuestionsScreen from './screens/QuestionsScreen';

const LoggedIn = createStackNavigator(
  {
    Permission: AllowLocationScreen,
    Home: { screen: HomeScreen },
    RequestData: RequestDataScreen,
    ChangeLanguage: ChangeLanguageScreen,
    LiveChat: LiveChatScreen,
    Contact: ContactScreen,
    Questions: QuestionsScreen,
  },
  {
    initialRouteName: 'Permission',
    headerMode: 'none',
  },
);

const LoggedInNavigator = ({ navigation, ...props }) => {
  return (
    <UserProvider>
      <LoggedIn navigation={navigation} {...props} />
    </UserProvider>
  );
};

LoggedInNavigator.router = {
  ...LoggedIn.router,
};

export default LoggedInNavigator;
