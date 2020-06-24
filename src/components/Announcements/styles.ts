import styled, { css } from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../utils/scale';
import Colors from '../../constants/Colors';
import Text from '../ui/Text';

export const Container = styled.View`
  background: ${Colors.white};
  border-radius: ${scale(12)};
  shadow-opacity: 0.15;
  shadow-radius: 7px;
  shadow-color: #000;
  shadow-offset: 0px 0px;
`;

export const Spinner = styled.ActivityIndicator`
  position: absolute;
  top: ${scale(20)}px;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const SlideWrapper = styled.View`
  min-height: ${verticalScale(150)}px;
`;

export const Content = styled.TouchableOpacity`
  padding-left: ${scale(20)}px;
  padding-right: ${scale(20)}px;
  padding-bottom: ${scale(40)}px;
`;

export const Title = styled(Text)`
  letter-spacing: -0.2px;
  font-size: ${scale(14)};
  line-height: ${scale(18)}px;
  margin-bottom: ${verticalScale(4)}px;
`;

export const Subtitle = styled(Text)`
  letter-spacing: -0.15px;
  font-size: ${scale(11)};
  line-height: ${scale(13)}px;
  margin-bottom: ${verticalScale(4)}px;
`;

export const Description = styled.View`
  background: green;
`;

export const Alert = styled(Text)`
  color: ${Colors.white};
  letter-spacing: -0.23px;
  font-size: ${scale(17)};
  line-height: ${scale(18)}px;
  margin-left: ${verticalScale(12)}px;
  margin-bottom: -5px;
`;

export const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background: ${Colors.orange};
  margin-bottom: ${verticalScale(18)}px;
  border-top-left-radius: ${scale(12)};
  border-top-right-radius: ${scale(12)};
  padding: ${verticalScale(19)}px ${scale(23)}px ${verticalScale(19)}px;
`;

export const Dot = styled.View`
  margin-bottom: 0px;
  height: 7px;
  width: 7px;
  opacity: 0.3;
  border-radius: 3.5;
  margin-right: ${scale(4.5)}px;
  margin-left: ${scale(4.5)}px;
  background-color: ${Colors.black};
`;

export const ActiveDot = styled(Dot)`
  opacity: 1;
`;

export const Dots = styled.View`
  position: absolute;
  bottom: 20;
  left: 0;
  right: 0;
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
