import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CtaButton } from '../../../components/Button/Button';
import AppShell, { Content, SlimContent } from '../../../components/AppShell';
import Text from '../../../components/ui/Text';
import { ScrollView } from 'react-native';
import covidIcon from '../../../assets/images/covid-icon.png';
import { scale } from '../../../utils';

const WelcomeScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <AppShell title={t('welcomeTitle')} subtitle={t('welcomeSubtitle')}>
      <ScrollView>
        <Content>
          <Text bold>{t('welcomeHowTitle')}</Text>

          <Text>{t('welcomeHowDescription')}</Text>
          <Text bold>{t('welcomeInfoTitle')}</Text>
          <Text>{t('welcomeInfoDescription')}</Text>

          <Text bold marginBottom={1}>
            {t('welcomeDisclaimer')}
          </Text>
        </Content>
      </ScrollView>
      <SlimContent>
        <CtaButton
          onPress={() => navigation.navigate('Login')}
          image={covidIcon}
          imageDimensions={{ height: scale(28), width: scale(24) }}
        >
          {t('welcomeRegisterButton')}
        </CtaButton>
      </SlimContent>
    </AppShell>
  );
};
WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default WelcomeScreen;
