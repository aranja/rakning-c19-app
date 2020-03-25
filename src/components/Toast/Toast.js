import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import * as ui from './ui';
import { Close } from '../Icons';
import Colors from '../../constants/Colors';

const Toast = ({ type, message, isVisible, onClose }) => {
  const translateY = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    const delayedAnimation = setTimeout(() => {
      Animated.spring(translateY, {
        toValue: isVisible ? 0 : -300,
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
