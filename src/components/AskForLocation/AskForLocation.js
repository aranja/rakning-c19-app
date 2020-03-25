import React from 'react';
import PropTypes from 'prop-types';
import * as Permissions from 'expo-permissions';
import { Trans } from 'react-i18next';

import { CtaButton } from '../Button';
import LocationIcon from '../../assets/images/locationWhite.png';
import { AskContainer, Icon, Title, Description, AskText } from './styles';
import covidIcon from '../../assets/images/covid-icon.png';

class AskForLocation extends React.Component {
  getPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.props.onFinish(status);
  };

  render() {
    return (
      <AskContainer>
        <Icon source={LocationIcon} />
        <Title>
          <Trans>enableLocation</Trans>
        </Title>
        <Description>
          <Trans>enableLocationMessage</Trans>
        </Description>
        <CtaButton
          onPress={this.getPermission}
          image={covidIcon}
          imageDimensions={{ height: 31, width: 27 }}
        >
          <AskText>
            <Trans>enableLocationAllow</Trans>
          </AskText>
        </CtaButton>
      </AskContainer>
    );
  }
}

AskForLocation.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default AskForLocation;
