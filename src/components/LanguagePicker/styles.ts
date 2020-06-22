import styled from 'styled-components/native';
import { scale, verticalScale } from '../../utils';
import Colors from '../../constants/Colors';
import Text from '../ui/Text';

export const Container = styled.View`
  background-color: ${Colors.white};
  padding-bottom: ${verticalScale(60)};
`;

export const RadioButton = styled.TouchableOpacity`
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${Colors.background};
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${verticalScale(24)}px ${scale(30)}px;
`;

export const Circle = styled.View`
  width: ${scale(26)}px;
  height: ${scale(26)}px;
  border-radius: ${scale(13)}px;
  border-width: 1px;
  border-color: ${Colors.bulletBorder};
  background-color: ${Colors.bullet};
  align-items: center;
  justify-content: center;
`;

export const CircleInner = styled.View`
  width: ${scale(17)}px;
  height: ${scale(17)}px;
  border-radius: ${scale(8.5)}px;
  background-color: ${Colors.text};
  opacity: ${({ selected }) => (selected ? 1 : 0)};
`;

export const Label = styled(Text)`
  color: ${Colors.textDark};
  margin-bottom: 0;
`;

export const ImageWrap = styled.Image`
  width: ${scale(28)}px;
  height: ${scale(20)}px;
`;
