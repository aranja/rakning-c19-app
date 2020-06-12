import styled from 'styled-components';

import Colors from '../../constants/Colors';
import { scale } from '../../utils';
import Text from '../ui/Text';

export const LinkContainer = styled.TouchableOpacity`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const LinkIcon = styled.View``;

export const Label = styled(Text)`
  color: ${Colors.black};
  font-size: ${scale(16)}px;
  text-transform: uppercase;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;
