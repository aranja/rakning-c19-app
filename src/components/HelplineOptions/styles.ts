import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { scale, verticalScale } from '../../utils';
import Text, { Heading } from '../ui/Text';

export const Wrapper = styled.View`
  padding-left: ${scale(20)}px;
  padding-right: ${scale(20)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  margin-bottom: ${verticalScale(12)}px;
`;

export const Title = styled(Text)`
  margin-left: ${scale(14)}px;
  font-size: ${scale(16)};
`;

export const Bullets = styled.View`
  padding-left: ${scale(45)}px;
`;

export const Phone = styled(Text)`
  color: ${Colors.orange};
`;

export const BulletText = styled(Text)`
  color: ${Colors.textGray};
  font-size: ${scale(14)};
  font-weight: 400;
  line-height: ${scale(21)};
  margin-bottom: ${scale(5)};
`;
