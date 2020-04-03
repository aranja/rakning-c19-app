import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { scale } from '../../utils/scale';

export const styles = StyleSheet.create({
  phoneInputContainer: {
    flexDirection: 'column',
    marginHorizontal: -5,
  },
  flag: {
    borderWidth: 0,
    height: 16,
    width: 24,
  },
  phoneViewStyle: {
    backgroundColor: '#f6e7de',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    marginBottom: 10,
    marginHorizontal: 5,
    width: '100%',
    flexShrink: 1,
  },
  phoneTextStyle: {
    color: Colors.breidholtAtNight,
    fontFamily: 'OpenSansBold',
    fontSize: scale(22),
  },
});

export const TOSLink = styled.Text`
  color: ${Colors.blue};
`;
