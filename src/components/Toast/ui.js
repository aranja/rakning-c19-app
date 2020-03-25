import { Animated, Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';

const statusBarOffsett =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const backgrounds = {
  error: Colors.text,
  success: Colors.green,
  neutral: Colors.orange,
};

export const Wrap = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ type }) => backgrounds[type] || backgrounds.neutral};
  z-index: 100;
`;

export const Inner = styled.SafeAreaView`
  padding-top: ${8 + statusBarOffsett};
`;

export const Toast = styled.View`
  padding: 8px 24px 21px;
  flex-direction: row-reverse;
  align-items: center;
`;

export const Message = styled.Text`
  flex: 1;
  color: ${Colors.white};
  font-size: 16px;
  font-weight: bold;
  line-height: 21px;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 16px;
`;

export const CloseButtonText = styled.Text`
  color: white;
`;
