import styled from 'styled-components/native';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import Colors from '../../constants/Colors';
import { scale, verticalScale } from '../../utils/scale';
import Text, { Heading } from '../ui/Text';

const isAndroid = Platform.OS === 'android';
const statusBarOffsett =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export const SafeArea = styled.View`
  background-color: ${Colors.background};
  flex: 1;
`;

export const ImageWrap = styled.View`
  width: 100%;
`;

export const Container = styled.View``;

export const Content = styled.View`
  align-items: center;
  flex: 1;
`;

export const Footer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: ${verticalScale(20)}px;
  padding-left: ${scale(32)}px;
  padding-right: ${scale(32)}px;
`;

export const Title = styled(Heading)`
  text-align: center;
  margin: 0px ${scale(8)}px ${verticalScale(20)}px;
  line-height: ${scale(38)}px;
`;

export const Description = styled(Text)`
  text-align: center;
  line-height: ${scale(22)}px;
  margin: 0 ${scale(28)}px;
`;

export const CloseIconContainer = styled.View`
  position: absolute;
  top: ${verticalScale(40)}px;
  left: ${scale(20)}px;
  z-index: 100;
`;

export const LocaleToggleContainer = styled.View`
  position: absolute;
  top: ${verticalScale(49)}px;
  right: ${scale(18)}px;
`;

export const styles = StyleSheet.create({
  dot: {
    marginBottom: 0,
    borderColor: Colors.bulletBorder,
    borderWidth: 1,
    height: 11,
    width: 11,
    borderRadius: 5.5,
    marginRight: verticalScale(6),
    marginLeft: verticalScale(6),
  },
  dotActive: {
    marginBottom: 0,
    height: 11,
    width: 11,
    borderRadius: 5.5,
    borderColor: Colors.bulletBorder,
    borderWidth: 1,
    marginRight: verticalScale(6),
    marginLeft: verticalScale(6),
  },
});
