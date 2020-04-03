import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import * as ui from './ui';
import { Close } from '../Icons';
import Colors from '../../constants/Colors';
import { useWindowDimensions } from '../../utils/hooks';

const Toast = ({ type, message, isVisible, onClose }) => {
  const dimensions = useWindowDimensions();
  const fontScale = isNaN(dimensions.fontScale) ? 1 : dimensions.fontScale;
  const offset = -300 * fontScale;
  const translateY = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    const delayedAnimation = setTimeout(() => {
      Animated.spring(translateY, {
        toValue: isVisible ? 0 : offset,
        friction: 10,
        tension: 11,
      }).start();
    }, 200);
    return () => clearTimeout(delayedAnimation);
  }, [isVisible]);

  return (
    <ui.Wrap type={type} style={{ transform: [{ translateY }] }}>
      <ui.Inner>
        <ui.Toast>
          <ui.CloseButton onPress={onClose}>
            <Close color={Colors.white} />
          </ui.CloseButton>
          <ui.Message type={type}>{message}</ui.Message>
        </ui.Toast>
      </ui.Inner>
    </ui.Wrap>
  );
};

export default Toast;
