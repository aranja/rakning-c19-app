import React, { useEffect, useState, ReactNode } from 'react';
import {
  Platform,
  ScrollView,
  Linking,
  AppState,
  AppStateStatus,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import { CtaButton } from '../../../components/Button/Button';
import { useTranslation, withTranslation } from 'react-i18next';
import { AuthConsumer } from '../../../context/authentication';
import { initBackgroundTracking } from '../../../tracking';
import AppShell, { Content, SlimContent } from '../../../components/AppShell';
import Text, { Heading } from '../../../components/ui/Text';
import LoadingScreen from '../../../components/LoadingScreen';
import { resetStack } from '../../../utils/navigation';
import { Vertical } from '../../../components/ui/Spacer';
import Footer from '../../../components/Footer';
import { scale, verticalScale } from '../../../utils';

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
  <AppShell>
    <ScrollView>
      <Content style={{ paddingBottom: verticalScale(200) }}>
        {children}
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
        onPress={ctaAction}
        image={covidIcon}
        imageDimensions={{ height: scale(28), width: scale(24) }}
      >
        {ctaTitle}
      </CtaButton>
    </SlimContent>
  </AppShell>
);

const AllowLocationScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [permissionStatus, setPermission] = useState<
    Permissions.PermissionStatus
  >(Status.UNDETERMINED);

  async function handlePermission({
    permissions: { location: locationPermission },
  }: Permissions.PermissionResponse) {
    const hasScopeAlways = isIOS && locationPermission.ios?.scope === 'always';

    if (locationPermission.granted) {
      if (hasScopeAlways) {
        await initBackgroundTracking(
          t('trackingTitle'),
          t('trackingNotification'),
        );

        return resetStack(navigation, 'Home');
      }

      setPermission(Status.DENIED);
    } else {
      setPermission(locationPermission.status);
    }

    setLoading(false);
  }

  function getPermission() {
    if (isIOS && permissionStatus === Status.DENIED) {
      return Linking.openSettings();
    }

    Permissions.askAsync(Permissions.LOCATION).then(handlePermission);
  }

  function onAppStateChange(state: AppStateStatus) {
    if (state === 'active') {
      Permissions.getAsync(Permissions.LOCATION).then(handlePermission);
    }
  }

  useEffect(() => {
    Permissions.getAsync(Permissions.LOCATION).then(handlePermission);
    AppState.addEventListener('change', onAppStateChange);

    return () => {
      AppState.removeEventListener('change', onAppStateChange);
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (isIOS && permissionStatus === Status.DENIED) {
    return (
      <ContentView
        ctaAction={getPermission}
        ctaTitle={t('changeLocationSettings')}
      >
        <Heading level={1}>{t('changeLocationAllow')}</Heading>
        <Text>
          <Trans i18nKey={'changeLocationDescriptionIOS'}>
            <Text bold>„Always“</Text>
          </Trans>
        </Text>
      </ContentView>
    );
  }

  return (
    <ContentView ctaAction={getPermission} ctaTitle={t('enableLocationButton')}>
      <Heading level={1}>{t('enableLocationAllow')}</Heading>
      <Text>
        <Trans
          i18nKey={
            isIOS
              ? 'enableLocationDescriptionIOS'
              : 'enableLocationDescriptionAndroid'
          }
        >
          <Text bold>„Allow while using app“</Text>
        </Trans>
      </Text>
      {isIOS && (
        <Text>
          <Trans i18nKey="enableLocationMessageIOS">
            <Text bold>„Change to Always Allow“</Text>
          </Trans>
        </Text>
      )}

      {isIOS && (
        <Text marginBottom={1}>{t('enableNotificationDescription')}</Text>
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

const Screen = withTranslation()(({ ...props }) => (
  <AuthConsumer>
    {({ logout }) => <AllowLocationScreen {...props} logout={logout} />}
  </AuthConsumer>
));

Screen.navigationOptions = {
  header: null,
};

export default Screen;
