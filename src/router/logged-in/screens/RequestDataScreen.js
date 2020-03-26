import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { CtaButton } from '../../../components/Button/Button';
import { getPoints } from '../../../tracking';
import AppShell, { Content } from '../../../components/AppShell';
import Text from '../../../components/ui/Text';
import { logPoints } from '../../../api/Point';
import Input from '../../../components/ui/TextInput';
import { Vertical } from '../../../components/ui/Spacer';
import Colors from '../../../constants/Colors';
import covidIcon from '../../../assets/images/covid-icon.png';
import { scale } from '../../../utils';
import KeyboardAvoid from '../../../components/KeyboardAvoid';
import { resetStack } from '../../../utils/navigation';
import { useAlert } from '../../../context/alert';
import { ignoreDataRequest } from '../../../api/User/user';
import { UserContext } from '../../../context/user';

const AllowLocationScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [kennitala, setKennitala] = useState('');
  const { createAlert } = useAlert();
  const { requiresKennitala } = useContext(UserContext);
  const { t } = useTranslation();

  async function shareData() {
    setLoading(true);

    try {
      const points = await getPoints();
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
    <AppShell
      scrollable
      alt
      title={t('requestDataTitle')}
      subtitle={t('requestDataSubTitle')}
      scrollContainerStyles={{ flexGrow: 1 }}
    >
      <Content style={{ flex: 1 }}>
        <KeyboardAvoid>
          {requiresKennitala && (
            <>
              <Text>{t('requestDataKennitalaInfo')}</Text>
              <Input
                value={kennitala}
                onChangeText={setKennitala}
                keyboardType="number-pad"
                placeholder={t('requestDataKennitala')}
              />
              <Vertical unit={0.5} />
            </>
          )}

          <CtaButton
            justify
            bgColor={Colors.green}
            loading={loading}
            onPress={shareData}
            image={covidIcon}
            imageDimensions={{ height: scale(28), width: scale(24) }}
          >
            {t('requestDataButton')}
          </CtaButton>
        </KeyboardAvoid>

        <Vertical fill />

        <CtaButton transparent loading={loading} onPress={confirmExit}>
          <Text color={Colors.gray}>{t('requestDataExitButton')}</Text>
        </CtaButton>
      </Content>
    </AppShell>
  );
};

AllowLocationScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AllowLocationScreen;
