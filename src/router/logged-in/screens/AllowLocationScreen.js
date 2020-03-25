import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import { CtaButton } from '../../../components/Button/Button';
import { useTranslation, withTranslation } from 'react-i18next';
import { AuthConsumer } from '../../../context/authentication';
import { initBackgroundTracking } from '../../../tracking';
import AppShell, { Content } from '../../../components/AppShell';
import Text, { Heading } from '../../../components/ui/Text';
import LoadingScreen from '../../../components/LoadingScreen';
import { resetStack } from '../../../utils/navigation';

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
          <Text>{t('enableLocationDescription')}</Text>
          <Text>{t('enableNotificationDescription')}</Text>
          <Text>{t('allowWhileUsingAppInstruction')}</Text>
          <CtaButton onPress={getPermission}>
            {t('welcomeRegisterButton')}
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
