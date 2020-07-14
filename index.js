import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Client } from 'bugsnag-react-native';

const bugsnag = new Client('45e8cb028cbb468b2aae59b1d5266f1b');

AppRegistry.registerComponent(appName, () => App);
