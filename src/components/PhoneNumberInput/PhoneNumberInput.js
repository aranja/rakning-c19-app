import * as WebBrowser from 'expo-web-browser';
import libPhoneNumber from 'google-libphonenumber';
import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { getPin } from '../../api/Login';
import covidIcon from '../../assets/images/covid-icon.png';
import Colors from '../../constants/Colors';
import { useAlert } from '../../context/alert';
import { isRTL } from '../../i18n';
import { scale } from '../../utils';
import { useWindowDimensions } from '../../utils/hooks';
import { CtaButton } from '../Button';
import PhoneInput from '../PhoneInput';
import Checkbox from '../ui/Checkbox';
import { Vertical } from '../ui/Spacer';
import { styles, TOSLink } from './styles';

const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();
const linkTouchPadding = 12;

const initialState = {
  cca2: 'IS',
  callingCode: '354',
  phoneNumber: '',
};

const privacyUrls = {
  en: 'https://www.covid.is/app/privacystatement',
  pl: 'https://www.covid.is/app/privacystatement-po',
  is: 'https://www.covid.is/app/personuverndarstefna',
};

function isValid(countryCode, phoneNumber) {
  const fullPhoneNumber = `+${countryCode}${phoneNumber}`;

  // For testing purposes
  if (fullPhoneNumber === '+3541337' || fullPhoneNumber === '+3541338') {
    return true;
  }

  try {
    return phoneUtil.isValidNumber(phoneUtil.parse(fullPhoneNumber));
  } catch (error) {
    return false;
  }
}

const reducer = (state, { phoneNumber, cca2, callingCode, type } = {}) => {
  switch (type) {
    case 'updateLocation':
      return {
        ...state,
        cca2,
        callingCode,
      };
    case 'updateCallingCode':
      return {
        ...state,
        callingCode,
      };
    case 'updatePhoneNumber':
      return {
        ...state,
        phoneNumber,
      };
    default:
      return state;
  }
};

const PhoneNumberInput = forwardRef(({ onSendPin, onPressFlag }, ref) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { createAlert } = useAlert();
  const phoneInputRef = useRef();
  const numberInputRef = useRef();

  const [tosAccepted, setTosAccepted] = useState(false);
  const dimensions = useWindowDimensions();
  const fontScale = isNaN(dimensions.fontScale) ? 1 : dimensions.fontScale;
  const inputHeight = scale(fontScale <= 1 ? 50 : 50 * Math.min(fontScale, 2));
  const { t, i18n } = useTranslation();

  useImperativeHandle(ref, () => ({
    onSelectCountry,
    phoneNumberInputFocus,
    cca2,
  }));

  const onChangePhoneNumber = phoneNumber => {
    dispatch({ type: 'updatePhoneNumber', phoneNumber });
  };

  const onChangeCallingCode = callingCode => {
    dispatch({ type: 'updateCallingCode', callingCode });
  };

  function onSelectCountry({ cca2, callingCode }) {
    phoneInputRef.current.selectCountry(cca2.toLowerCase());
    dispatch({ type: 'updateLocation', cca2, callingCode });
  }

  const phoneNumberInputFocus = () => {
    numberInputRef?.current?.focus();
  };

  const cca2 = () => state.cca2;

  const acceptTOS = () => {
    setTosAccepted(!tosAccepted);
  };

  const openPP = () => {
    WebBrowser.openBrowserAsync(privacyUrls[i18n.language] || privacyUrls.en);
  };

  const getPinNumber = async () => {
    const { phoneNumber } = state;
    const countryCode = phoneInputRef.current;

    if (!isValid(countryCode.getCountryCode(), phoneNumber)) {
      createAlert({
        message: t('phoneValidationMessage'),
        type: 'error',
      });
      return;
    }

    try {
      const pinToken = await getPin(countryCode.getCountryCode(), phoneNumber);
      onSendPin(countryCode.getCountryCode(), phoneNumber, pinToken);
    } catch (error) {
      createAlert({
        message: t('genericErrorMessage'),
        type: 'error',
      });
    }
  };

  const linkHitSlop = {
    top: linkTouchPadding,
    right: linkTouchPadding,
    bottom: linkTouchPadding,
    left: linkTouchPadding,
  };

  const Link = ({ children, onPress }) => {
    return (
      <TouchableWithoutFeedback onPress={onPress} hitSlop={linkHitSlop}>
        <TOSLink>{children[0]}</TOSLink>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <>
      <Vertical unit={1} />
      <View
        style={{
          ...styles.phoneInputContainer,
          ...(fontScale <= 1 && {
            flexDirection: 'row',
          }),
        }}
      >
        <PhoneInput
          ref={phoneInputRef}
          onPressFlag={onPressFlag}
          initialCountry="is"
          style={{
            ...styles.phoneViewStyle,
            minHeight: inputHeight,
            width: fontScale <= 1 ? '40%' : '100%',
          }}
          textStyle={{
            ...styles.codeTextStyle,
            minHeight: inputHeight,
            textAlign: isRTL() ? 'right' : 'left',
          }}
          flagStyle={styles.flag}
          offset={6}
          onChangePhoneNumber={onChangeCallingCode}
        />
        <TextInput
          ref={numberInputRef}
          placeholder={t('phoneNr')}
          keyboardType="phone-pad"
          returnKeyType="done"
          autoCapitalize="none"
          placeholderTextColor={Colors.placeholder}
          autoCorrect={false}
          style={{
            ...styles.phoneViewStyle,
            ...styles.phoneTextStyle,
            minHeight: inputHeight,
            textAlign: isRTL() ? 'right' : 'left',
            width: fontScale <= 1 ? '60%' : '100%',
          }}
          onChangeText={onChangePhoneNumber}
        />
      </View>
      <Vertical unit={1} />
      <Checkbox checked={tosAccepted} onPress={acceptTOS}>
        <Trans i18nKey="tosAcceptance">
          I agree to the <Link onPress={openPP}>Privacy Policy</Link>.
        </Trans>
      </Checkbox>
      <Vertical fill />
      <CtaButton
        disabled={!tosAccepted || state.phoneNumber.length <= 0}
        onPress={getPinNumber}
        image={covidIcon}
        imageDimensions={{ height: scale(28), width: scale(24) }}
      >
        {t('next')}
      </CtaButton>
    </>
  );
});

PhoneNumberInput.propTypes = {
  onSendPin: PropTypes.func.isRequired,
};

export default PhoneNumberInput;
