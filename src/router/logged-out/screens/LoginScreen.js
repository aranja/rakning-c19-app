import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { withTranslation } from 'react-i18next';
import { AuthConsumer } from '../../../context/authentication';
import PhoneNumberInput from '../../../components/PhoneNumberInput';
import PinNumber from '../../../components/PinNumber';
import AppShell, { Content } from '../../../components/AppShell';
import Text, { Heading } from '../../../components/ui/Text';
import { Trans } from 'react-i18next';
import { verticalScale } from '../../../utils';
import { Vertical } from '../../../components/ui/Spacer';
import color from 'color';
import Colors from '../../../constants/Colors';

class LoginScreen extends React.Component {
  state = {
    countryCode: '',
    phoneNumber: '',
    pinToken: null,
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

    return (
      <AppShell>
        <Content style={{ marginBottom: 0}}>
          <Heading>
            <Trans>{pinToken ? 'pinNumberTitle' : 'phoneNumberTitle'}</Trans>
          </Heading>
          <Text marginBottom={0}>
            <Trans
              i18nKey={
                pinToken ? 'pinNumberDescription' : 'phoneNumberDescription'
              }
              values={{ phoneNumber }}
            />
          </Text>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={verticalScale(pinToken ? 12 : 32)}
            contentContainerStyle={{
              backgroundColor: color(Colors.background).alpha(0.75),
              paddingTop: verticalScale(32),
            }}
          >
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
          </KeyboardAvoidingView>
        </Content>
      </AppShell>
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
