import React from 'react';
import PropTypes from 'prop-types';
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
        <Content style={{ marginBottom: 0 }}>
          <Heading>
            <Trans>{pinToken ? 'pinNumberTitle' : 'phoneNumberTitle'}</Trans>
          </Heading>
          <Text marginBottom={0}>
            <Trans
              i18nKey={
                pinToken ? 'pinNumberDescription' : 'phoneNumberDescription'
              }
              values={{ phoneNumber: `+${countryCode} ${phoneNumber}` }}
            />
          </Text>
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
