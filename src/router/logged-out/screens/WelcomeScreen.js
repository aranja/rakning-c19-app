import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CtaButton } from '../../../components/Button/Button';
import AppShell, { Content, SlimContent } from '../../../components/AppShell';
import Footer from '../../../components/Footer';
import Text from '../../../components/ui/Text';
import { ScrollView } from 'react-native';
import covidIcon from '../../../assets/images/covid-icon.png';
import { scale, verticalScale } from '../../../utils';
import { Vertical } from '../../../components/ui/Spacer';

const WelcomeScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <AppShell title={t('welcomeTitle')} subtitle={t('welcomeSubtitle')}>
      <ScrollView>
        <Content style={{ paddingBottom: verticalScale(200) }}>
          <Text bold>{t('welcomeHowTitle')}</Text>

          <Text>{t('welcomeHowDescription')}</Text>
          <Text bold>{t('welcomeInfoTitle')}</Text>
          <Text>{t('welcomeInfoDescription')}</Text>
        </Content>
      </ScrollView>
      <SlimContent
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingBottom: verticalScale(32),
          paddingTop: verticalScale(70),
          paddingHorizontal: scale(32),
        }}
      >
        <Footer />
        <Vertical unit={0.5} />
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
