import React from 'react';
import { ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

import * as ui from './ui';

const LoadingScreen = () => {
  return (
    <ui.Container>
      <ActivityIndicator color={Colors.white} />
    </ui.Container>
  );
};

export default LoadingScreen;
