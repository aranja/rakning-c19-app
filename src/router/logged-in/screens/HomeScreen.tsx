import React, { useEffect, useContext, useState } from 'react';
import { AppState, Platform, ScrollView } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import * as WebBrowser from 'expo-web-browser';

import { UserContext } from '../../../context/user';
import PropTypes from 'prop-types';
import Colors from '../../../constants/Colors';
import { CtaButton, UrlButton } from '../../../components/Button/Button';
import { useAuth } from '../../../context/authentication';
import {
  checkLocationStatus,
  initBackgroundTracking,
  stopBackgroundTracking,
  LocationPermission,
} from '../../../tracking';
import { registerPushNotifications } from '../../../push-notifications';
import AppShell, { Content, Header } from '../../../components/AppShell';
import Text from '../../../components/ui/Text';
import { ButtonGroup } from '../../../components/Button';
import { scale } from '../../../utils';
import { resetStack } from '../../../utils/navigation';
import { Vertical } from '../../../components/ui/Spacer';
import messaging from '@react-native-firebase/messaging';
import Footer from '../../../components/Footer';
import { AuthenticationError } from '../../../api/ApiClient';
import { languages } from '../../../i18n';
import Card from '../../../components/Card';
import {
  InfoIcon,
  ChatIcon,
  QuestionsIcon,
  TracingIcon,
} from '../../../components/Icons';

import Announcements from '../../../components/Announcements';
import TestResults from '../../../components/TestResultsModal/TestResultsModal';
import { getAnnouncements } from '../../../api/Announcements';
import { AppShellBackgroundType } from '../../../components/AppShell/AppShell';

const privacyUrls = {
  en: 'https://www.covid.is/app/privacystatement',
  pl: 'https://www.covid.is/app/privacystatement-po',
  is: 'https://www.covid.is/app/personuverndarstefna',
};

const HomeScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const selectedLanguage = languages.find(lang => lang.code === i18n.language);
  const { logout } = useAuth();
  const { fetchUser, clearUserData } = useContext(UserContext);
  const [isTestResultsModalOpen, setIsTestResultsModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(false);

  // Check if we still have location access
  const checkLocationPermission = async () => {
    const status = await checkLocationStatus();
    const hasLocationAccess =
      status.locationPermission === LocationPermission.AUTHORIZED &&
      status.locationServicesEnabled;

    if (!hasLocationAccess) {
      resetStack(navigation, 'Permission');
    }
    return hasLocationAccess;
  };

  const logoutUser = () => {
    navigation.navigate({ routeName: 'LoggedOut' });
    stopBackgroundTracking();

    logout();
    clearUserData();
  };

  // Check if user has been requested to share data
  const checkUser = async () => {
    try {
      const user = await fetchUser();

      if (user && user.dataRequested) {
        if (Platform.OS === 'ios') {
          // Reset badge on app icon
          PushNotificationIOS.setApplicationIconBadgeNumber(0);
        }

        resetStack(navigation, 'RequestData');

        return null;
      }

      if (user && user.testResult === false) {
        setIsTestResultsModalOpen(true);
      }

      return user;
    } catch (error) {
      if (error instanceof AuthenticationError) {
        logoutUser();
      } else {
        console.error(error);
      }

      return null;
    }
  };

  async function validateState() {
    if (!(await checkUser())) {
      return;
    }

    if (!(await checkLocationPermission())) {
      return;
    }

    return true;
  }

  /**
   * @param {AppStateStatus} state
   */
  function onAppStateChange(state) {
    if (state === 'active') {
      validateState();
    }
  }

  useEffect(() => {
    (async () => {
      if (await validateState()) {
        initBackgroundTracking(t('trackingTitle'), t('trackingNotification'));
        registerPushNotifications();
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setAnnouncementsLoading(true);
      const res = await getAnnouncements(selectedLanguage.code);
      setAnnouncementsLoading(false);
      setAnnouncements(
        res.reduce((arr, cur) => {
          const inIcelandic = selectedLanguage.code === 'is';
          return [
            ...arr,
            {
              title: inIcelandic ? cur['name'] : cur['name'],
              subtitle: format(
                new Date(cur['published-on']),
                'MMMMMMM d, yyyy',
              ),
              description: inIcelandic
                ? cur['meginmal']
                : cur['meginmal-ensku'],
              link: inIcelandic
                ? cur['linkur-a-frett']
                : cur['read-more-hlekkur-ensku'],
            },
          ];
        }, []),
      );
    })();
  }, []);

  useEffect(() => {
    const unsubscribePushMessage = messaging().onMessage(checkUser);
    AppState.addEventListener('change', onAppStateChange);

    return () => {
      unsubscribePushMessage();
      AppState.removeEventListener('change', onAppStateChange);
    };
  }, []);

  return (
    <AppShell circles={AppShellBackgroundType.Small}>
      <Content>
        <Header title={t('trackingTitle')} subtitle={t('trackingSubtitle')} />
        <Text color={Colors.orange} marginBottom={0} bold center>
          {`${t('trackingAlert')}  `}
          <TracingIcon />
        </Text>
        <Vertical unit={1} />

        <Announcements
          alertText={t('importantAnnouncements')}
          link={t('importantAnnouncementsLink')}
          slides={announcements}
          loading={announcementsLoading}
        />
        <Vertical unit={1} />

        <Card
          label={t('symptomsCardTitle')}
          description={t('symptomsCardSubtitle')}
          onPress={() => navigation.navigate('Contact')}
          icon={<ChatIcon />}
        />
        <Vertical unit={0.5} />
        <Card
          label={t('informationForTouristCardTitle')}
          description={t('informationForTouristCardSubtitle')}
          onPress={() =>
            WebBrowser.openBrowserAsync(t('informationForTouristCardLink'))
          }
          icon={<InfoIcon />}
        />
        <Vertical unit={0.5} />
        <Card
          label={t('questionsCardTitle')}
          description={t('questionsCardSubtitle')}
          // onPress={() => WebBrowser.openBrowserAsync(t('questionsCardLink'))}
          onPress={() => navigation.navigate('Questions')}
          icon={<QuestionsIcon color={Colors.orange} />}
        />
        <Vertical unit={1} />

        <ButtonGroup
          style={{ paddingLeft: scale(20), paddingRight: scale(20) }}
        >
          <UrlButton href={t('covidLink')}>
            {t('covidLabel')}
            {' covid.is'}
          </UrlButton>

          <UrlButton href={privacyUrls[i18n.language] || privacyUrls.en}>
            {t('privacyPolicy')}
          </UrlButton>
        </ButtonGroup>

        <Vertical unit={3} />

        <Footer />

        <TestResults
          isVisible={isTestResultsModalOpen}
          title={t('testResultsModalTitle')}
          kicker={t('testResultsModalKicker')}
          description={t('testResultsModalDescription')}
          buttonText={t('close')}
          onPress={() => setIsTestResultsModalOpen(false)}
        />

        {__DEV__ && (
          <CtaButton bgColor={Colors.gray} onPress={logoutUser}>
            Dev only log out
          </CtaButton>
        )}
      </Content>
    </AppShell>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;
