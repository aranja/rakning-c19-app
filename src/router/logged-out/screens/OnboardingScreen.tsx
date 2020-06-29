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

const OnboardingScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const imageDimensions = { width: 375, height: 335 };

  const screens = [
    {
      ...(t('onboarding-1', { returnObjects: true }) as Object),
      image: IcelandMap,
      imageAlignment: 'right',
      imageDimensions,
    },
    {
      ...(t('onboarding-2', { returnObjects: true }) as Object),
      image: OnboardingPhoneIcon,
      imageDimensions,
    },
    {
      ...(t('onboarding-3', { returnObjects: true }) as Object),
      image: OnboardingCardIcon,
      imageDimensions,
    },
    {
      ...(t('onboarding-4', { returnObjects: true }) as Object),
      image: OnboardingChatIcon,
      imageDimensions,
    },
  ];
  return (
    <>
      <StatusBar barStyle="light-content" />
      <TutorialView screens={screens} navigation={navigation} />
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
