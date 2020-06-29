import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from 'react-native';
import styled from 'styled-components/native';
import { logPoints } from '../../../api/Point';
import { ignoreDataRequest } from '../../../api/User/user';
import covidIcon from '../../../assets/images/covid-icon.png';
import { Content } from '../../../components/AppShell';
import { CtaButton } from '../../../components/Button/Button';
import Footer from '../../../components/Footer';
import { CirclesSmall } from '../../../components/Icons';
import { Vertical } from '../../../components/ui/Spacer';
import Text, { Heading } from '../../../components/ui/Text';
import Input from '../../../components/ui/TextInput';
import Colors from '../../../constants/Colors';
import { useAlert } from '../../../context/alert';
import { UserContext } from '../../../context/user';
import { getPoints } from '../../../tracking';
import { scale, verticalScale } from '../../../utils';
import { resetStack } from '../../../utils/navigation';

const Wrap = styled.View`
  background: ${({ bgColor }) => bgColor || Colors.background};
  flex-grow: 1;
`;

const Header = styled.View`
  align-items: center;
  padding: 0 ${scale(20)}px ${verticalScale(20)}px;
`;

const CirclesWrapperSmall = styled(CirclesSmall)`
  position: absolute;
  top: ${verticalScale(-30)}px;
  right: ${scale(30)}px;
`;

const AllowLocationScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [kennitala, setKennitala] = useState('');
  const { createAlert } = useAlert();
  const { requiresKennitala } = useContext(UserContext);
  const { t } = useTranslation();

  async function shareData() {
    setLoading(true);

    try {
      // Get geolocation data from the internal database.
      const points = await getPoints();

      // Send geolocation data to the API.
      await logPoints(points, kennitala);

      createAlert({
        type: 'success',
        message: t('requestDataThanks'),
      });

      resetStack(navigation, 'Home');
    } catch (error) {
      const message =
        error.status === 403
          ? t('requestDataWrongKennitala')
          : t('genericErrorMessage');
      createAlert({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  }

  async function doNotSendData() {
    setLoading(true);

    try {
      await ignoreDataRequest();
      resetStack(navigation, 'Home');
    } catch (error) {
      createAlert({
        type: 'error',
        message: t('genericErrorMessage'),
      });
    } finally {
      setLoading(false);
    }
  }

  function confirmExit() {
    Alert.alert(
      t('requestDataExitTitle'),
      t('requestDataExitDescription'),
      [
        {
          text: t('requestDataExitNo'),
          style: 'cancel',
        },
        {
          text: t('requestDataExitYes'),
          onPress: doNotSendData,
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <Wrap>
      <StatusBar translucent barStyle="light-content" />
      <CirclesWrapperSmall />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView
          behavior="height"
          style={{
            flex: 1,
          }}
        >
          <Content
            style={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              marginTop: verticalScale(90),
            }}
          >
            <Header>
              <Heading level={2} center>
                {t('requestDataTitle')}
              </Heading>
              <Text center>{t('requestDataSubTitle')}</Text>
            </Header>
            {requiresKennitala ? (
              <>
                <Text center>{t('requestDataKennitalaInfo')}</Text>
                <Vertical unit={1.5} />
                <Input
                  value={kennitala}
                  onChangeText={setKennitala}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  placeholder={t('requestDataKennitala')}
                />
                <Vertical unit={0.5} />
              </>
            ) : null}

            <CtaButton
              justify
              bgColor={Colors.blue}
              color={Colors.white}
              loading={loading}
              onPress={shareData}
              image={covidIcon}
              disabled={requiresKennitala && isEmpty(kennitala)}
              imageDimensions={{ height: scale(28), width: scale(24) }}
            >
              {t('requestDataButton')}
            </CtaButton>
          </Content>
        </KeyboardAvoidingView>
        <Content
          style={{
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        >
          <CtaButton loading={loading} onPress={confirmExit} bgColor="#FAB18F">
            <Text center bold color={Colors.breidholtAtNight}>
              {t('requestDataExitButton')}
            </Text>
          </CtaButton>
          <Vertical unit={1.5} />
          <Footer />
        </Content>
      </ScrollView>
    </Wrap>
  );
};

AllowLocationScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AllowLocationScreen;
