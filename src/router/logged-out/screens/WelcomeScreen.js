import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CtaButton } from '../../../components/Button/Button';
import AppShell, { Content, SlimContent } from '../../../components/AppShell';
import Footer from '../../../components/Footer';
import Text from '../../../components/ui/Text';
import covidIcon from '../../../assets/images/covid-icon.png';
import { scale, verticalScale } from '../../../utils';
import { Vertical } from '../../../components/ui/Spacer';

const WelcomeScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <AppShell
      title={t('welcomeTitle')}
      subtitle={t('welcomeSubtitle')}
      footer={
        <>
          <Footer />
          <Vertical unit={0.5} />
          <CtaButton
            onPress={() => navigation.navigate('Login')}
            image={covidIcon}
            imageDimensions={{ height: scale(28), width: scale(24) }}
          >
            {t('welcomeRegisterButton')}
          </CtaButton>
        </>
      }
    >
      <Content>
        <Text bold>{t('welcomeHowTitle')}</Text>
        <Text>{t('welcomeHowDescription')}</Text>
        <Text bold>{t('welcomeInfoTitle')}</Text>
        <Text>{t('welcomeInfoDescription')}</Text>
      </Content>
    </AppShell>
  );
};
WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default WelcomeScreen;
