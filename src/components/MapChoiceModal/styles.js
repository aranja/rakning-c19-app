import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import { verticalScale, scale } from '../../utils';
import Text, { Heading } from '../ui/Text';
import { CirclesMedium } from '../Icons';

export const Content = styled.View`
  position: relative;
  background-color: ${Colors.white};
  padding: ${verticalScale(32)}px ${scale(8)}px ${verticalScale(8)}px;
  border-radius: ${scale(12)};
  overflow: hidden;
`;

export const Background = styled(CirclesMedium)`
  position: absolute;
  top: ${verticalScale(-130)}px;
  right: ${scale(-80)}px;
`;

export const Kicker = styled(Heading)`
  font-size: ${scale(20)}px;
  text-transform: uppercase;
  color: ${Colors.orange};
  text-align: center;
  margin: 0px ${verticalScale(20)}px ${scale(8)}px;
  line-height: ${scale(28)}px;
`;

export const Title = styled(Heading)`
  line-height: ${scale(24)}px;
  font-size: ${scale(21)}px;
  margin: ${verticalScale(10)}px ${scale(20)}px;
`;

export const MapButton = styled.TouchableOpacity`
  padding: ${verticalScale(10)}px ${scale(14)}px;
  border-width: 1px;
  border-radius: ${scale(12)}px;
  border-color: ${Colors.border};
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ButtonLabel = styled(Text)`
  font-size: ${scale(14)}px;
  text-align: center;
`;

export const Description = styled(Text)`
  font-size: ${scale(13)}px;
  text-align: center;
  padding: 0 ${verticalScale(12)}px;
  line-height: ${scale(18)}px;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
