import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { verifyPin } from '../../api/Login';
import Colors from '../../constants/Colors';
import { scale } from '../../utils';
import { CtaButton } from '../Button';
import PinCode from '../PinCode';
import { Vertical } from '../ui/Spacer';
import Text from '../ui/Text';
import { styles } from './styles';

const PinNumber = ({
  phoneNumber,
  pinToken,
  countryCode,
  resetPin,
  onVerified,
}) => {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResetBtn, setShowResetBtn] = useState(false);
  const [error, setError] = useState('');
  const timeOutRef = useRef(null);
  const { t } = useTranslation();

  const startTimeout = () => {
    timeOutRef.current = setTimeout(() => {
      setShowResetBtn(true);
    }, 12000);
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

      setIsLoading(false);
      return onVerified(token, isNewUser);
    } catch (error) {
      setShowResetBtn(true);
      setIsLoading(false);
      setPin('');

      if (error.status === 400) {
        setError(t('incorrentPINMessage'));
      } else {
        setError(t('genericErrorMessage'));
      }
    }
  };

  const updatePin = value => {
    setError(false);
    setPin(value);
  };

  const textColor = isLoading ? Colors.placeholder : Colors.text;

  useEffect(() => {
    startTimeout();
    return cancelTimeout;
  }, []);

  return (
    <View style={styles.container}>
      <Vertical unit={2} />
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
        error={!!error}
      />
      <Vertical unit={1} />
      <Text
        center
        color={Colors.error}
        numberOfLines={2}
        adjustsFontSizeToFit
        maxFontSizeMultiplier={2}
      >
        {error}
      </Text>
      <Vertical fill />
      <CtaButton disabled={pin.length < 6} onPress={() => onVerifyPin(pin)}>
        {t('continue')}
      </CtaButton>
      <CtaButton transparent onPress={resetPin}>
        <Text
          marginBottom={0}
          color={Colors.breidholtAtNight}
          center
          bold
          style={{ opacity: showResetBtn ? 1 : 0.3 }}
        >
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

export default PinNumber;
