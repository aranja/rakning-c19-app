import React, { useEffect, useState } from 'react';
import { Platform, ScrollView } from 'react-native';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import { CtaButton } from '../../../components/Button/Button';
import { useTranslation, withTranslation } from 'react-i18next';
import { AuthConsumer } from '../../../context/authentication';
import { initBackgroundTracking } from '../../../tracking';
import AppShell, { Content } from '../../../components/AppShell';
import Text, { Heading } from '../../../components/ui/Text';
import LoadingScreen from '../../../components/LoadingScreen';
import { resetStack } from '../../../utils/navigation';

const isIOS = Platform.OS === 'ios';

const AllowLocationScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLocationPermission = async () => {
      const { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status === 'granted') {
        await initBackgroundTracking();
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
      await initBackgroundTracking();
      resetStack(navigation, 'Home');
    }
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <AppShell>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Content>
          <Heading level={1}>{t('enableLocationAllow')}</Heading>
          <Text>
            {isIOS ? (
              <Trans i18nKey="enableLocationDescriptionIOS">
                Appið mun óska eftir heimild til að skrá ferðir/staðsetningu
                þína. Það er mjög mikilvægt að velja í ferlinu möguleikann{' '}
                <Text bold>„Allow while using app“</Text>.
              </Trans>
            ) : (
              t('enableLocationDescriptionAndroid')
            )}
          </Text>
          {isIOS && (
            <Text>
              <Trans i18nKey="enableLocationMessageIOS">
                Nokkru eftir að appið hefur verið sett upp í tækinu þínu mun það
                biðja þig um leyfi til að vista staðsetningar á meðan appið er
                ekki í notkun. Þá er mikilbægt að velja{' '}
                <Text bold>„Change to Always Allow“</Text>. Það er skilyrði
                fyrir að appið gegni hlutverki sínu.
              </Trans>
            </Text>
          )}
          <Text>{t('enableNotificationDescription')}</Text>
          <CtaButton onPress={getPermission}>
            {t('enableLocationButton')}
          </CtaButton>
        </Content>
      </ScrollView>
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
