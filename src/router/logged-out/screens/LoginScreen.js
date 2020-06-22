import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
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

  state = {
    countryCode: '',
    phoneNumber: '',
    pinToken: null,
  };

  onOpen = () => {
    this.modalizeRef.current?.open();
  };

  onClose = () => {
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
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
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
                  <BackButton onPress={this.onOpen}>
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
                  <PhoneNumberInput onSendPin={this.onSendPin} />
                </>
              )}
            </Content>
          </KeyboardAvoidingView>
          {/* </TouchableWithoutFeedback> */}
        </AppShell>
        <Modalize
          ref={this.modalizeRef}
          HeaderComponent={
            <Heading
              level={3}
              center
              marginBottom={1}
              style={{ marginTop: verticalScale(25) }}
            >
              <Trans i18nKey={'selectLanguage'} />
            </Heading>
          }
          FooterComponent={
            <View
              style={{
                position: 'relative',
                paddingBottom: verticalScale(44),
                paddingLeft: scale(20),
                paddingRight: scale(20),
              }}
            >
              <LinearGradient
                colors={[color(Colors.white).alpha(0), Colors.white]}
                start={[0, 0]}
                end={[0, 1]}
                style={{
                  position: 'absolute',
                  top: verticalScale(-60),
                  left: 0,
                  right: 0,
                  height: verticalScale(60),
                }}
              />
              <CtaButton onPress={this.onClose}>
                <Trans i18nKey={'languageContinue'} />
              </CtaButton>
            </View>
          }
        >
          <Content>
            <CountryPicker
              withCallingCode
              withFilter
              withModal={false}
              visible={true}
              onSelect={() => {}}
              onClose={() => {}}
              translation="eng"
              countryCode={'IS'}
              renderFlagButton={() => <View />}
            />
          </Content>
        </Modalize>
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
