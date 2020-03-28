import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { scale, verticalScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  flag: {
    borderWidth: 0,
    height: 16,
    width: 24,
  },
  phoneInputCountry: {
    width: '45%',
    backgroundColor: '#f6e7de',
    height: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(19),
  },
  callingCode: {
    color: Colors.breidholtAtNight,
    fontSize: scale(22),
    fontFamily: 'OpenSansBold',
    height: scale(50),
    padding: 0,
  },
  phoneInputNumber: {
    color: Colors.breidholtAtNight,
    backgroundColor: '#f6e7de',
    fontSize: scale(22),
    fontWeight: 'bold',
    height: scale(50),
    width: '50%',
    paddingHorizontal: scale(19),
    paddingVertical: scale(10),
  },
  btn: {
    textTransform: 'uppercase',
  },
});

export const coutryPickerTheme = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.greenThunder,
  },
  contentContainer: {
    backgroundColor: Colors.breidholtAtNight,
  },
  header: {
    backgroundColor: Colors.greenThunder,
    paddingBottom: 10,
    paddingTop: 10,
  },
  itemCountryName: {
    borderBottomWidth: 0,
    height: 30,
    paddingTop: 6,
  },
  itemCountryFlag: {
    display: 'none',
  },
  countryName: {
    fontFamily: 'Lato',
    color: Colors.breidholtAtNight,
  },
  letterText: {
    color: Colors.breidholtAtNight,
  },
  input: {
    fontWeight: '900',
    color: Colors.breidholtAtNight,
    fontSize: 20,
  },
});

export const TOSLink = styled.Text`
  color: ${Colors.blue};
`;
