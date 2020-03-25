import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  bounds: {
    bottom: 40,
    horizontal: 15,
  },
  rootFontSize: 16,
  btnMinSize: 44,
  isHighDevice: height >= 812,
  isWideDevice: width >= 375,
  margin: {
    horizontal: 15,
    vertical: 15,
  },
};
