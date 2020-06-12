import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { scale, verticalScale } from '../../utils/scale';
import Text, { Heading } from '../ui/Text';

export const Circle = styled.View<{ color?: string; x: number; y: number }>`
  background: ${({ color }) => color ?? 'rgba(255, 255, 255, 0.25)'};
  border-radius: ${scale(70)};
  position: absolute;
  height: ${scale(80)};
  right: ${({ x }) => scale(x)}px;
  top: ${({ y }) => scale(y)}px;
  width: ${scale(80)};
`;

export const Circles = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;
