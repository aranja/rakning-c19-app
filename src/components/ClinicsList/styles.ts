import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { scale, verticalScale } from '../../utils/scale';
import Text from '../ui/Text';

export const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${verticalScale(8)}px ${scale(20)}px;
  border-bottom-width: 1px;
  border-color: #f1f2f3;
`;

export const Header = styled.View`
  padding-top: ${({ fontScale }) =>
    verticalScale(fontScale <= 1 ? 90 : 90 * (fontScale * 0.5))};
`;

export const Content = styled.View`
  padding-right: ${scale(20)}px;
`;

export const Subtitle = styled(Text)`
  font-size: ${scale(12)}px;
`;
