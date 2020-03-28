import React, { useEffect, useState } from 'react';
import { Platform, ScrollView } from 'react-native';
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
import covidIcon from '../../../assets/images/covid-icon.png';

const isIOS = Platform.OS === 'ios';

const AllowLocationScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLocationPermission = async () => {
      const { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status === 'granted') {
        await initBackgroundTracking(
          t('trackingTitle'),
          t('trackingNotification'),
        );
        resetStack(navigation, 'Home');
      } else {
        setLoading(false);
      }
    };

    checkLocationPermission();
  }, []);

  const getPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      await initBackgroundTracking(
        t('trackingTitle'),
        t('trackingNotification'),
      );
      resetStack(navigation, 'Home');
    }
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <AppShell>
      <ScrollView>
        <Content style={{ paddingBottom: verticalScale(200) }}>
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
          onPress={getPermission}
          image={covidIcon}
          imageDimensions={{ height: scale(28), width: scale(24) }}
        >
          {t('enableLocationButton')}
        </CtaButton>
      </SlimContent>
    </AppShell>
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
