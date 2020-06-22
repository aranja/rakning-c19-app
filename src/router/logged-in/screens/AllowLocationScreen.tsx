import React, { useEffect, useState, ReactNode } from 'react';
import { Platform, Linking, AppState, AppStateStatus } from 'react-native';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import { CtaButton } from '../../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import {
  checkLocationStatus,
  LocationStatus,
  openLocationServiceSettings,
  LocationPermission,
} from '../../../tracking';
import AppShell, { Content } from '../../../components/AppShell';
import Text, { Heading } from '../../../components/ui/Text';
import LoadingScreen from '../../../components/LoadingScreen';
import { resetStack } from '../../../utils/navigation';
import { Vertical } from '../../../components/ui/Spacer';
import Footer from '../../../components/Footer';
import { scale } from '../../../utils';

// @ts-ignore
import covidIcon from '../../../assets/images/covid-icon.png';

const isIOS = Platform.OS === 'ios';

const Status = Permissions.PermissionStatus;

const ContentView = ({
  ctaTitle,
  ctaAction,
  children,
}: {
  ctaTitle: string;
  ctaAction: () => any;
  children: ReactNode;
}) => (
  <AppShell
    footer={
      <>
        <CtaButton
          onPress={ctaAction}
          image={covidIcon}
          imageDimensions={{ height: scale(28), width: scale(24) }}
        >
          {ctaTitle}
        </CtaButton>
        <Vertical unit={2} />
        <Footer />
      </>
    }
  >
    <Content
      style={{
        marginLeft: scale(8),
        marginRight: scale(8),
        flexGrow: 1,
      }}
    >
      {children}
    </Content>
  </AppShell>
);

const AllowLocationScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState<LocationStatus | null>(
    null,
  );
  const [didAsk, setDidAsk] = useState(false);
  const serviceIssue =
    locationStatus && locationStatus.locationServicesEnabled === false;
  const settingsIssue =
    locationStatus &&
    locationStatus.locationPermission !== LocationPermission.AUTHORIZED &&
    didAsk;

  async function checkStatus() {
    const status = await checkLocationStatus();

    if (
      status.locationPermission === LocationPermission.AUTHORIZED &&
      status.locationServicesEnabled
    ) {
      resetStack(navigation, 'Home');
      return true;
    }

    setLocationStatus(status);
    setLoading(false);
    return false;
  }

  async function getPermission() {
    if (serviceIssue) {
      return openLocationServiceSettings();
    }

    if (settingsIssue) {
      return Linking.openSettings();
    }

    await Permissions.askAsync(Permissions.LOCATION);
    const hasPermission = await checkStatus();

    if (!hasPermission) {
      setDidAsk(true);
    }
  }

  function onAppStateChange(state: AppStateStatus) {
    if (state === 'active') {
      checkStatus();
    }
  }

  useEffect(() => {
    checkStatus();
    AppState.addEventListener('change', onAppStateChange);

    return () => {
      AppState.removeEventListener('change', onAppStateChange);
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (serviceIssue) {
    return (
      <ContentView
        ctaAction={getPermission}
        ctaTitle={t('changeLocationSettings')}
      >
        <Heading level={2} center marginBottom={1.2}>
          {t('enableLocationServices')}
        </Heading>
        <Text center>{t('enableLocationServicesDescription')}</Text>
      </ContentView>
    );
  }

  if (settingsIssue) {
    return (
      <ContentView
        ctaAction={getPermission}
        ctaTitle={t('changeLocationSettings')}
      >
        <Heading level={2} center marginBottom={1.2}>
          {t('changeLocationAllow')}
        </Heading>
        <Text center>
          <Trans i18nKey={'changeLocationDescriptionIOS'}>
            <Text bold>"Always"</Text>
          </Trans>
        </Text>
      </ContentView>
    );
  }

  return (
    <ContentView ctaAction={getPermission} ctaTitle={t('enableLocationButton')}>
      <Heading level={2} center marginBottom={1.2}>
        {t('enableLocationAllow')}
      </Heading>
      <Text center>
        <Trans
          i18nKey={
            isIOS
              ? 'enableLocationDescriptionIOS'
              : 'enableLocationDescriptionAndroid'
          }
        >
          <Text bold>"Allow while using app"</Text>
        </Trans>
      </Text>
      {isIOS && (
        <Text center>
          <Trans i18nKey="enableLocationMessageIOS">
            <Text bold>"Change to Always Allow"</Text>
          </Trans>
        </Text>
      )}

      {isIOS && (
        <Text center marginBottom={1}>
          {t('enableNotificationDescription')}
        </Text>
      )}
    </ContentView>
  );
};

AllowLocationScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

AllowLocationScreen.navigationOptions = {
  header: null,
};

export default AllowLocationScreen;
