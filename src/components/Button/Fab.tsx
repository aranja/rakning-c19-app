import styled from 'styled-components/native';
import { scale } from '../../utils/index';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

const size = scale(Layout.btnMinSize);

const Fab = styled.TouchableOpacity`
  align-items: center;
  background-color: ${Colors.white};
  border-radius: ${size / 2};
  justify-content: center;
  height: ${size};
  width: ${size};
`;

export default Fab;
