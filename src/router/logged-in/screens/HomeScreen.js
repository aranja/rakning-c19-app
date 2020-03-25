import React, { useEffect, useState, useContext } from 'react';
import { AppState, Modal, ScrollView } from 'react-native';
import * as Permissions from 'expo-permissions';
import { UserContext } from '../../../context/user';
import PropTypes from 'prop-types';
import AskForLocation from '../../../components/AskForLocation';
import Colors from '../../../constants/Colors';
import { CtaButton, UrlButton } from '../../../components/Button/Button';
import { useTranslation, withTranslation } from 'react-i18next';
import { updatePushToken, getUser } from '../../../api/User';
import { AuthConsumer } from '../../../context/authentication';
import {
  getPoints,
  initBackgroundTracking,
  stopBackgroundTracking,
} from '../../../tracking'
import AppShell, { Content } from '../../../components/AppShell';
import Text, { Heading } from '../../../components/ui/Text';
import { ButtonGroup } from '../../../components/Button';
import bullHorn from '../../../assets/images/bullhorn.png';
import { scale } from '../../../utils';
import { resetStack } from '../../../utils/navigation';
import { Vertical } from '../../../components/ui/Spacer';

const links = {
  en: {
    primary: ['avoidInfection', 'possibleInfection', 'isolation', 'quarantine'],
    secondary: [
      'groupsAtRisk',
      'seniorCitizens',
      'childrenAndTeens',
      'worriesAndAnxiety',
      'workplaces',
      'travel',
      'foodPetsAndAnimals',
      'tourists',
      'riskAreas',
    ],
  },
  is: {
    primary: ['avoidInfection', 'possibleInfection', 'isolation', 'quarantine'],
    secondary: [
      'groupsAtRisk',
      'seniorCitizens',
      'childrenAndTeens',
      'worriesAndAnxiety',
      'workplaces',
      'travel',
      'foodPetsAndAnimals',
      'riskAreas',
    ],
  },
  pl: {
    primary: ['avoidInfection', 'possibleInfection', 'isolation', 'quarantine'],
    secondary: [
      'groupsAtRisk',
      'seniorCitizens',
      'childrenAndTeens',
      'worriesAndAnxiety',
      'workplaces',
      'travel',
      'foodPetsAndAnimals',
      'riskAreas',
    ],
  },
};

const smallBtnStyle = {
  width: '48.5%',
};

const HomeScreen = ({ navigation, logout }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [locationPermission, setLocationPermission] = useState(false);
  const { clearUserData } = useContext(UserContext);

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    );
    let finalStatus = existingStatus;
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // // Get the token that uniquely identifies this device
    // const token = await Notifications.getExpoPushTokenAsync();
    //
    // // POST the token to your backend server from where you can retrieve it to send push notifications.
    // try {
    //   await updatePushToken(token);
    // } catch (error) {
    //   console.log(error); // eslint-disable-line no-console
    // }
  };

  const onUpdatedLocationPermission = newPermission => {
    setLocationPermission(newPermission);
  };

  const onPressLogout = () => {
    navigation.navigate({ routeName: 'LoggedOut' });
    logout();
    clearUserData();
  };

  useEffect(() => {
    getPoints().then(points => {
      console.log((points || []).map(point => new Date(point.time)));
    });
    initBackgroundTracking();
    registerForPushNotificationsAsync();

    return () => {
      stopBackgroundTracking();
    };
  }, []);

  const onChange = async () => {
    const user = await getUser();
    if (user && user.dataRequested) {
      resetStack(navigation, 'RequestData');
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', onChange);

    return () => {
      AppState.removeEventListener('change', onChange);
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
              href="https://www.covid.is/tilkynningar"
              image={bullHorn}
              imageDimensions={{ height: scale(26), width: scale(26) }}
            >
              {t('announcements')}
            </UrlButton>
            {links[language].primary.map(link => (
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
            {links[language].secondary.map(link => (
              <UrlButton
                key={link}
                href={t(`${link}Link`)}
                bgColor={Colors.orange}
                style={smallBtnStyle}
                small
              >
                {t(`${link}Label`)}
              </UrlButton>
            ))}
          </ButtonGroup>

          <Vertical unit={2.5} />

          <UrlButton transparent href="https://covid.is">
            <Text center>
              Meira á{' '}
              <Text bold color={Colors.blue}>
                covid.is
              </Text>
            </Text>
          </UrlButton>

          <Vertical unit={2.5} />

          {__DEV__ && (
            <CtaButton bgColor={Colors.gray} onPress={onPressLogout}>
              Dev only log out
            </CtaButton>
          )}

          <Modal
            visible={locationPermission === 'undetermined'}
            animationType="none"
            transparent={false}
          >
            <AskForLocation onFinish={onUpdatedLocationPermission} />
          </Modal>
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

const Screen = withTranslation()(({ ...props }) => (
  <AuthConsumer>
    {({ logout }) => <HomeScreen {...props} logout={logout} />}
  </AuthConsumer>
));

Screen.navigationOptions = {
  header: null,
};

export default Screen;
