import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { format } from 'date-fns';
import * as WebBrowser from 'expo-web-browser';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppState, Platform } from 'react-native';
import { getAnnouncements } from '../../../api/Announcements';
import { AuthenticationError } from '../../../api/ApiClient';
import Announcements from '../../../components/Announcements';
import AppShell, { Content, Header } from '../../../components/AppShell';
import { AppShellBackgroundType } from '../../../components/AppShell/AppShell';
import { ButtonGroup } from '../../../components/Button';
import { CtaButton, UrlButton } from '../../../components/Button/Button';
import Card from '../../../components/Card';
import Footer from '../../../components/Footer';
import {
  ChatIcon,
  InfoIcon,
  QuestionsIcon,
  TracingIcon,
  SuccessIcon,
  TestResultsIcon,
} from '../../../components/Icons';
import TestResults from '../../../components/TestResultsModal/TestResultsModal';
import { Vertical } from '../../../components/ui/Spacer';
import Text from '../../../components/ui/Text';
import Colors from '../../../constants/Colors';
import { useAuth } from '../../../context/authentication';
import { UserContext } from '../../../context/user';
import { languages } from '../../../i18n';
import { registerPushNotifications } from '../../../push-notifications';
import {
  checkLocationStatus,
  initBackgroundTracking,
  LocationPermission,
  stopBackgroundTracking,
} from '../../../tracking';
import { scale } from '../../../utils';
import { resetStack } from '../../../utils/navigation';
import Alert from '../../../components/Alert';
import { storage } from '../../../utils';

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
  const [hasTestResults, setHasTestResults] = useState(false);
  const [testResultsDate, setTestResultsDate] = useState(null);
  const [showDataReceived, setShowDataReceived] = useState(
    navigation?.state?.params?.showDataRecievedAlert || false,
  );

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
        storage.save('testResultsDate', user.testResultsUpdatedAt);
        setTestResultsDate(new Date(user.testResultsUpdatedAt));
        setIsTestResultsModalOpen(true);
      }

      const testResultsDate = await storage.get('testResultsDate');
      setTestResultsDate(new Date(testResultsDate));
      setHasTestResults(Boolean(testResultsDate));

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

  useEffect(() => {
    let timer;
    if (showDataReceived) {
      timer = setTimeout(() => setShowDataReceived(false), 10000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showDataReceived]);

  return (
    <AppShell circles={AppShellBackgroundType.Small}>
      <Content>
        <Header title={t('trackingTitle')} subtitle={t('trackingSubtitle')} />
        {showDataReceived ? (
          <Alert
            title={t('recievedDataTitle')}
            subtitle={t('recievedDataSubitle')}
            icon={<SuccessIcon />}
            bgColor="#3E6D00"
            onClose={() => setShowDataReceived(false)}
          />
        ) : (
          <Text color={Colors.orange} marginBottom={0} bold center>
            {`${t('trackingAlert')}  `}
            <TracingIcon />
          </Text>
        )}
        <Vertical unit={1} />

        {hasTestResults && (
          <>
            <Alert
              title={t('testResultsModalKicker')}
              icon={<TestResultsIcon />}
              bgColor="#263343"
              onPress={() => setIsTestResultsModalOpen(true)}
            />
            <Vertical unit={1} />
          </>
        )}

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
          date={testResultsDate}
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
