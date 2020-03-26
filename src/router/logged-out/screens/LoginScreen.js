import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { withTranslation } from 'react-i18next';
import { AuthConsumer } from '../../../context/authentication';
import PhoneNumberInput from '../../../components/PhoneNumberInput';
import PinNumber from '../../../components/PinNumber';
import AppShell, { Content } from '../../../components/AppShell';
import Text, { Heading } from '../../../components/ui/Text';
import { Trans } from 'react-i18next';

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
        <ScrollView
          centerContent={true}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View
            style={{
              marginTop: 30,
            }}
          >
            <Content>
              <Heading>
                <Trans>
                  {pinToken ? 'pinNumberTitle' : 'phoneNumberTitle'}
                </Trans>
              </Heading>
              <Text>
                <Trans
                  i18nKey={
                    pinToken ? 'pinNumberDescription' : 'phoneNumberDescription'
                  }
                  values={{ phoneNumber }}
                />
              </Text>
            </Content>
            <View>
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
            </View>
          </View>
        </ScrollView>
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
