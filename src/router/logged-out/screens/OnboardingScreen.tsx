import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'react-native';

import TutorialView from '../../../components/TutorialView';

import {
  IcelandMap,
  OnboardingPhoneIcon,
  OnboardingCardIcon,
  OnboardingChatIcon,
} from '../../../components/Icons';
import Footer from '../../../components/Footer';

const OnboardingScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const screens = [
    {
      ...(t('onboarding-1', { returnObjects: true }) as Object),
      image: IcelandMap,
      imagePosition: 'right',
    },
    {
      ...(t('onboarding-2', { returnObjects: true }) as Object),
      image: OnboardingPhoneIcon,
    },
    {
      ...(t('onboarding-3', { returnObjects: true }) as Object),
      image: OnboardingCardIcon,
    },
    {
      ...(t('onboarding-4', { returnObjects: true }) as Object),
      image: OnboardingChatIcon,
    },
  ];
  return (
    <>
      <StatusBar barStyle="light-content" />
      <TutorialView screens={screens} navigation={navigation} />
      <Footer />
    </>
  );
};

OnboardingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

OnboardingScreen.navigationOptions = {
  header: null,
};

export default OnboardingScreen;
