import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { verticalScale, scale } from '../../utils/scale';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    color: Colors.greenThunder,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  phoneNumber: {
    color: Colors.text,
    fontSize: scale(16),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  btn: {
    padding: 32,
    paddingBottom: 16,
    width: '100%',
  },
  noPinBtn: {
    color: Colors.placeholder,
  },
});

export { styles };
