import styled from 'styled-components/native';
import { scale, verticalScale } from '../../utils';
import Colors from '../../constants/Colors';
import Text from '../ui/Text';

export const Container = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${verticalScale(5)}px ${scale(20)}px;
  border-color: ${Colors.border};
  border-width: 1px;
`;

export const Language = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Left = styled(Content)`
  width: 40%;
  border-top-left-radius: ${scale(6)};
  border-bottom-left-radius: ${scale(6)};
`;

export const Right = styled(Content)`
  width: 60%;
  border-top-right-radius: ${scale(6)};
  border-bottom-right-radius: ${scale(6)};
  margin-left: -1px;
`;

export const Label = styled(Text)`
  color: ${Colors.textDark};
  font-size: ${scale(14)}px;
  line-height: ${scale(45)}px;
  text-align: right;
  margin-left: ${scale(10)}px;
  margin-bottom: 0px;
`;

export const ImageWrap = styled.Image`
  width: ${scale(28)}px;
  height: ${scale(20)}px;
  border-radius: ${scale(2)};
`;
