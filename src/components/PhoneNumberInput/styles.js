import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { scale } from '../../utils/scale';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
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
    paddingHorizontal: scale(20),
    marginBottom: 10,
    marginHorizontal: 5,
    flexGrow: 1,
    flexShrink: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: scale(6),
  },
  codeTextStyle: {
    color: Colors.breidholtAtNight,
    fontFamily: 'OpenSans',
    fontSize: scale(14),
  },
  phoneTextStyle: {
    color: Colors.breidholtAtNight,
    fontFamily: 'OpenSansExtraBold',
    fontSize: scale(14),
  },
});

export const TOSLink = styled.Text`
  color: ${Colors.orange};
  font-family: 'OpenSansBold';
`;
