import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { scale, verticalScale } from '../../utils/scale';
import Text, { Heading } from '../ui/Text';

export const Wrapper = styled.TouchableOpacity`
  padding-top: ${verticalScale(18)}px;
  padding-bottom: ${verticalScale(18)}px;
  padding-left: ${scale(20)}px;
  padding-right: ${scale(20)}px;
  border-radius: ${scale(12)};
  background: ${Colors.white};
  shadow-opacity: 0.15;
  shadow-radius: 7px;
  shadow-color: #000;
  shadow-offset: 0px 0px;
`;

export const ActionWrapper = styled.View`
  padding-top: ${verticalScale(18)}px;
  padding-bottom: ${verticalScale(10)}px;
  padding-left: ${scale(18)}px;
  padding-right: ${scale(18)}px;
  border-radius: ${scale(12)};
  background: ${Colors.white};
  border-width: 1px;
  border-color: #c8b7b0;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const Header = styled.Text`
  font-weight: 400;
  font-family: 'OpenSansBold';
  letter-spacing: -0.2px;
  font-size: ${scale(14)};
`;

export const Description = styled.Text`
  color: ${Colors.textGray};
  font-family: 'OpenSans';
  font-weight: 400;
  letter-spacing: -0.19px;
  font-size: ${scale(14)};
  margin-left: ${scale(30)}px;
  line-height: ${scale(18)}px;
`;

export const Action = styled.View`
  margin-left: ${scale(-10)};
  margin-right: ${scale(-10)};
`;

export const Icon = styled.View`
  width: ${scale(18)};
  margin-right: ${scale(14)};
`;
