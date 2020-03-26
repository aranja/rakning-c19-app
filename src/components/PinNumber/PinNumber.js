import React, { useState, useEffect, useRef } from 'react';
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
import { CtaButton } from '../Button';
import { Vertical } from '../ui/Spacer';

const PinNumber = ({
  phoneNumber,
  pinToken,
  countryCode,
  resetPin,
  onVerified,
  t,
}) => {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResetBtn, setShowResetBtn] = useState(false);
  const timeOutRef = useRef(null);
  const { createAlert } = useAlert();

  const startTimeout = () => {
    timeOutRef.current = setTimeout(() => {
      setShowResetBtn(true);
    }, 7000);
  };

  const cancelTimeout = () => {
    clearTimeout(timeOutRef.current);
  };

  const onVerifyPin = async pinNumber => {
    setIsLoading(true);
    cancelTimeout();

    try {
      const { token, isNewUser } = await verifyPin(
        pinNumber,
        pinToken,
        countryCode,
        phoneNumber,
      );
      return onVerified(token, isNewUser);
    } catch (error) {
      startTimeout();

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

  useEffect(() => {
    startTimeout();
    return cancelTimeout;
  }, []);

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
      <Vertical fill />

      <CtaButton transparent disabled={!showResetBtn} onPress={resetPin}>
        <Text color={showResetBtn ? Colors.gray : 'transparent'}>
          {t('pinResendBtn')}
        </Text>
      </CtaButton>
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
