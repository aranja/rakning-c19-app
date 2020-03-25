import React from "react";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import AllowLocationScreen from "./screens/AllowLocationScreen";
import RequestDataScreen from "./screens/RequestDataScreen";
import UserProvider from "../../context/user";

const LoggedIn = createStackNavigator(
  {
    Permission: AllowLocationScreen,
    Home: { screen: HomeScreen },
    RequestData: RequestDataScreen,
  },
  {
    initialRouteName: "Permission",
    headerMode: "none",
  }
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
