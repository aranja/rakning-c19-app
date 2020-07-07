import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import CountryPicker from 'react-native-country-picker-modal';
import { LinearGradient } from 'expo-linear-gradient';
import color from 'color';

import { AuthConsumer } from '../../../context/authentication';
import PhoneNumberInput from '../../../components/PhoneNumberInput';
import PinNumber from '../../../components/PinNumber';
import AppShell, { Content, Header } from '../../../components/AppShell';
import Text, { Heading } from '../../../components/ui/Text';
import { Trans } from 'react-i18next';
import { BackButton } from '../../../components/Button';
import { scale, verticalScale } from '../../../utils/scale';
import Colors from '../../../constants/Colors';
import { CtaButton } from '../../../components/Button/Button';

class LoginScreen extends React.Component {
  modalizeRef = createRef(null);
  phoneNumberInputRef = createRef(null);

  state = {
    countryCode: '',
    phoneNumber: '',
    pinToken: null,
  };

  onOpenCountryModal = () => {
    this.modalizeRef.current?.open();
  };

  onCloseCountryModal = () => {
    this.modalizeRef.current?.close();
  };

  onSendPin = (countryCode, phoneNumber, pinToken) => {
    this.setState({
      pinToken,
      phoneNumber,
      countryCode,
    });
  };

  onResetPin = () => {
    this.setState({ pinToken: null });
  };

  onSubmitPin = async accessToken => {
    this.props.login(accessToken);

    const { navigation } = this.props;
    navigation.navigate('LoggedIn');
  };

  render() {
    const { pinToken, phoneNumber, countryCode } = this.state;
    const { navigation } = this.props;

    return (
      <>
        <AppShell>
          <KeyboardAvoidingView
            behavior="height"
            style={{
              flex: 1,
            }}
          >
            <Content
              style={{
                marginBottom: 0,
                flexGrow: 1,
                justifyContent: 'flex-end',
              }}
            >
              <Header
                title={
                  <Heading level={2} center>
                    <Trans>
                      {pinToken ? 'pinNumberTitle' : 'phoneNumberTitle'}
                    </Trans>
                  </Heading>
                }
                subtitle={
                  <Text
                    marginBottom={0}
                    bold
                    center
                    maxFontSizeMultiplier={2.5}
                    numberOfLines={4}
                  >
                    <Trans
                      i18nKey={
                        pinToken
                          ? 'pinNumberDescription'
                          : 'phoneNumberDescription'
                      }
                      values={{
                        phoneNumber: `+${countryCode} ${phoneNumber}`,
                      }}
                    />
                  </Text>
                }
                backButton={
                  <BackButton onPress={() => navigation.goBack()}>
                    <Trans>{'back'}</Trans>
                  </BackButton>
                }
              />
              {pinToken ? (
                <PinNumber
                  countryCode={countryCode}
                  phoneNumber={phoneNumber}
                  pinToken={pinToken}
                  resetPin={this.onResetPin}
                  onVerified={this.onSubmitPin}
                />
              ) : (
                <>
                  <PhoneNumberInput
                    onSendPin={this.onSendPin}
                    onPressFlag={this.onOpenCountryModal}
                    ref={this.phoneNumberInputRef}
                  />
                </>
              )}
            </Content>
          </KeyboardAvoidingView>
        </AppShell>
        <Modalize
          ref={this.modalizeRef}
          HeaderComponent={
            <Heading
              level={3}
              center
              marginBottom={1}
              style={{
                marginTop: verticalScale(25),
                marginLeft: scale(10),
                marginRight: scale(10),
              }}
            >
              <Trans i18nKey={'selectLanguage'} />
            </Heading>
          }
          customRenderer={
            <Animated.View
              style={{
                flex: 1,
                paddingLeft: scale(20),
                paddingRight: scale(20),
              }}
            >
              <CountryPicker
                withCallingCode
                withFilter
                withModal={false}
                visible={true}
                onSelect={e => {
                  this.phoneNumberInputRef?.current?.onSelectCountry(e);
                  this.phoneNumberInputRef?.current?.phoneNumberInputFocus(e);
                  this.onCloseCountryModal();
                }}
                onClose={() => {}}
                translation="eng"
                countryCode={this.phoneNumberInputRef?.current?.cca2()}
                renderFlagButton={() => <View />}
              />
            </Animated.View>
          }
        />
      </>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const Screen = withTranslation()(props => (
  <AuthConsumer>
    {({ login }) => <LoginScreen login={login} {...props} />}
  </AuthConsumer>
));

export default Screen;
