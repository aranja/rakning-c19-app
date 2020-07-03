import styled, { css } from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../utils/scale';
import Colors from '../../constants/Colors';
import Text from '../ui/Text';

const wrapperStyles = css`
  border-radius: ${scale(12)};
  padding: ${verticalScale(15)}px ${scale(20)}px;
`;

export const Wrapper = styled.View`
  ${wrapperStyles}
`;

export const TouchableWrapper = styled.TouchableOpacity`
  ${wrapperStyles}
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled(Text)`
  font-size: ${scale(17)};
  color: ${Colors.white};
  line-height: ${scale(18)};
  margin-bottom: 0;
`;

export const Subitle = styled(Text)`
  font-size: ${scale(14)};
  color: ${Colors.white};
  line-height: ${scale(15)};
  margin-top: ${verticalScale(5)}px;
  margin-bottom: 0;
`;

export const IconWrapper = styled.View`
  margin-right: ${scale(15)}px;
`;

export const Content = styled.View`
  justify-content: center;
  flex: 1;
`;

export const Close = styled.TouchableOpacity`
  position: absolute;
  top: ${scale(9)};
  right: ${scale(9)};
`;
