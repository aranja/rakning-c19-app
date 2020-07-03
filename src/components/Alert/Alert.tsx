import * as React from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import * as ui from './styles';
import { SmallCloseIcon as CloseIcon, ForwardIcon } from '../Icons';

interface AlertProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  bgColor: string;
  onClose?: () => void;
  onPress?: () => void;
}

const Alert = ({
  title,
  subtitle,
  icon,
  bgColor,
  onClose,
  onPress,
}: AlertProps) => {
  const WrapperComponent = onPress ? ui.TouchableWrapper : ui.Wrapper;
  const [fadeAnim] = React.useState(new Animated.Value(1));

  const close = () => {
    Animated.spring(fadeAnim, {
      toValue: 0,
      tension: 25,
    }).start(() => {
      onClose();
    });
  };

  const opacityStyles = {
    opacity: fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <Animated.View style={[opacityStyles]}>
      <WrapperComponent
        style={{ backgroundColor: bgColor }}
        onPress={onPress}
        activeOpacity={1}
      >
        <ui.Row>
          <ui.IconWrapper>{icon}</ui.IconWrapper>
          <ui.Content>
            <ui.Title bold>{title}</ui.Title>
            {subtitle && <ui.Subitle>{subtitle}</ui.Subitle>}
          </ui.Content>
          {onPress && <ForwardIcon color="#fff" />}
        </ui.Row>
        {onClose && (
          <ui.Close onPress={onClose}>
            <CloseIcon color="#fff" />
          </ui.Close>
        )}
      </WrapperComponent>
    </Animated.View>
  );
};

export default Alert;
