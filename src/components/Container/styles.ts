import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { scale } from '../../utils/scale';

export const Wrapper = styled.View`
  padding-horizontal: ${({ noHorizontalPadding }) =>
    noHorizontalPadding ? '0px' : scale(24)};
  background-color: ${Colors.background};
  flex: 1;
`;
