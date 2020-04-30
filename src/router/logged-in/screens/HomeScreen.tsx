import React, { useEffect, useContext } from 'react';
import { AppState, Platform, ScrollView } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { useTranslation } from 'react-i18next';
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
import AppShell, { Content } from '../../../components/AppShell';
import Text, { Heading } from '../../../components/ui/Text';
import { ButtonGroup } from '../../../components/Button';
import bullHorn from '../../../assets/images/bullhorn.png';
import { scale } from '../../../utils';
import { resetStack } from '../../../utils/navigation';
import { Vertical } from '../../../components/ui/Spacer';
import messaging from '@react-native-firebase/messaging';
import Footer from '../../../components/Footer';
import { AuthenticationError } from '../../../api/ApiClient';
import { useAlert } from '../../../context/alert';
import { languages } from '../../../i18n';

interface LocaleLinks {
  primary?: string[];
  secondary?: string[];
}

const privacyUrls = {
  en: 'https://www.covid.is/app/privacystatement',
  pl: 'https://www.covid.is/app/privacystatement-po',
  is: 'https://www.covid.is/app/personuverndarstefna',
};

const smallBtnStyle = {
  width: '48.5%',
};

const HomeScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const selectedLanguage = languages.find(lang => lang.code === i18n.language);
  const { logout } = useAuth();
  const { fetchUser, clearUserData } = useContext(UserContext);
  const { createAlert } = useAlert();
  const links = t('links', { returnObjects: true }) as LocaleLinks;

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
    const unsubscribePushMessage = messaging().onMessage(checkUser);
    AppState.addEventListener('change', onAppStateChange);

    return () => {
      unsubscribePushMessage();
      AppState.removeEventListener('change', onAppStateChange);
    };
  }, []);

  return (
    <AppShell title={t('trackingTitle')} subtitle={t('trackingSubtitle')}>
      <ScrollView>
        <Content>
          <Heading level={3}>{t('aboutCovidTitle')}</Heading>
          <Text>{t('aboutCovidDescription')}</Text>

          <ButtonGroup>
            <UrlButton
              align="left"
              justify="start"
              href={t('announcementsLink')}
              image={bullHorn}
              imageDimensions={{ height: scale(26), width: scale(26) }}
            >
              {t('announcements')}
            </UrlButton>

            {(links.primary ?? []).map(link => (
              <UrlButton
                key={link}
                justify="start"
                href={t(`${link}Link`)}
                align="left"
                bgColor={Colors.text}
              >
                {t(`${link}Label`)}
              </UrlButton>
            ))}
          </ButtonGroup>

          <Vertical unit={0.5} />

          <ButtonGroup row>
            {(links.secondary ?? []).map(link => (
              <UrlButton
                key={link}
                href={t(`${link}Link`)}
                bgColor={Colors.orange}
                style={smallBtnStyle}
                color={Colors.textDark}
                small
              >
                {t(`${link}Label`)}
              </UrlButton>
            ))}
          </ButtonGroup>

          <Vertical unit={1} />

          <ButtonGroup>
            <UrlButton bgColor={Colors.backgroundAlt} href={t('covidLink')}>
              <Text center>
                {t('covidLabel')}{' '}
                <Text bold color={Colors.blue}>
                  covid.is
                </Text>
              </Text>
            </UrlButton>

            <UrlButton
              bgColor={Colors.backgroundAlt}
              href={privacyUrls[i18n.language] || privacyUrls.en}
            >
              <Text center>{t('privacyPolicy')}</Text>
            </UrlButton>

            <CtaButton
              onPress={() => navigation.navigate('ChangeLanguage')}
              image={selectedLanguage.flag}
              bgColor={Colors.backgroundAlt}
              imageDimensions={{
                width: scale(28),
                height: scale(19),
              }}
            >
              <Text center>{selectedLanguage.name}</Text>
            </CtaButton>

            <CtaButton
              bgColor={Colors.backgroundAlt}
              onPress={() => {
                createAlert({
                  type: 'info',
                  message: t('uninstallAppToast'),
                });
              }}
            >
              <Text center>{t('stopTracking')}</Text>
            </CtaButton>
          </ButtonGroup>

          <Vertical unit={2} />

          <Footer />

          <Vertical unit={1} />

          {__DEV__ && (
            <CtaButton bgColor={Colors.gray} onPress={logoutUser}>
              Dev only log out
            </CtaButton>
          )}
        </Content>
      </ScrollView>
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
