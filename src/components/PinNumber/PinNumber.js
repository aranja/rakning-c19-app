import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Text from '../ui/Text';

import { useAlert } from '../../context/alert';
import { verifyPin } from '../../api/Login';
import PinCode from '../PinCode';

import { styles } from './styles';
import Colors from '../../constants/Colors';
import { scale } from '../../utils';

const PinNumber = ({ phoneNumber, pinToken, countryCode, onVerified, t }) => {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { createAlert } = useAlert();

  const onVerifyPin = async pinNumber => {
    setIsLoading(true);

    try {
      const { token, isNewUser } = await verifyPin(
        pinNumber,
        pinToken,
        countryCode,
        phoneNumber,
      );
      return onVerified(token, isNewUser);
    } catch (error) {
      if (error.status === 400) {
        createAlert({
          message: t('incorrentPINMessage'),
          type: 'error',
        });
      } else {
        createAlert({
          message: t('genericErrorMessage'),
          type: 'error',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updatePin = value => {
    setPin(value);

    if (value.length === 6) {
      onVerifyPin(value);
    }
  };

  const textColor = isLoading ? Colors.placeholder : Colors.text;

  return (
    <View style={styles.container}>
      <PinCode
        autoFocus
        value={pin}
        onTextChange={updatePin}
        codeLength={6}
        cellSpacing={scale(2)}
        textStyle={{
          color: textColor,
          fontSize: 36,
        }}
      />
    </View>
  );
};

PinNumber.propTypes = {
  onVerified: PropTypes.func.isRequired,
  pinToken: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

export default withTranslation()(PinNumber);
