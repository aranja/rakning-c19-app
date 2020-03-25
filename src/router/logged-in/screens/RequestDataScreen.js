import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CtaButton } from '../../../components/Button/Button';
import { getPoints } from '../../../tracking';
import AppShell, { Content } from '../../../components/AppShell';
import Text, { Heading } from '../../../components/ui/Text';
import { logPoints } from '../../../api/Point';
import Input from '../../../components/ui/TextInput';
import { Vertical } from '../../../components/ui/Spacer';
import Colors from '../../../constants/Colors';
import covidIcon from '../../../assets/images/covid-icon.png';
import { scale, storage } from '../../../utils';
import KeyboardAvoid from '../../../components/KeyboardAvoid';
import { resetStack } from '../../../utils/navigation';
import { useAlert } from '../../../context/alert';
import { useTranslation } from 'react-i18next';

const SECURE_STORE_KEY = 'rakning-kennitala';

const AllowLocationScreen = ({ navigation }) => {
  const [state, setState] = useState('ready');
  const [kennitala, setKennitala] = useState('');
  const { createAlert } = useAlert();
  const { t } = useTranslation();

  const shareData = async () => {
    setState('sending');
    storage.save(SECURE_STORE_KEY, { kennitala });
    createAlert({
      type: 'success',
      message: t('requestDataThanks'),
    });

    try {
      const points = await getPoints();
      await logPoints(points);
    } finally {
      setState('ready');
    }

    resetStack(navigation, 'Home');
  };

  useEffect(() => {
    storage.get(SECURE_STORE_KEY).then(data => {
      if (data && data.kennitala) {
        setKennitala(data.kennitala);
      }
    });
  }, []);

  return (
    <AppShell
      alt
      title={t('requestDataTitle')}
      subtitle={t('requestDataSubTitle')}
    >
      <Content style={{ justifyContent: 'flex-end', flex: 1 }}>
        <Heading level={3}>{t('requestDataKennitala')}</Heading>
        <Text>{t('requestDataKennitalaInfo')}</Text>
        <KeyboardAvoid>
          <Input
            value={kennitala}
            onChangeText={setKennitala}
            keyboardType="number-pad"
            placeholder={t('requestDataKennitala')}
            autoFocus
          />
          <Vertical unit={0.5} />
          <CtaButton
            justify
            bgColor={Colors.green}
            loading={state === 'sending'}
            onPress={shareData}
            image={covidIcon}
            imageDimensions={{ height: scale(28), width: scale(24) }}
          >
            {t('requestDataButton')}
          </CtaButton>
        </KeyboardAvoid>
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
