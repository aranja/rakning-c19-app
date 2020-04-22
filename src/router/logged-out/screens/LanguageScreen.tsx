import React from 'react';
import LanguagePicker from '../../../components/LanguagePicker';
import AppShell from '../../../components/AppShell';
import { Vertical } from '../../../components/ui/Spacer';
import { CtaButton } from '../../../components/Button/Button';
import covidIcon from '../../../assets/images/covid-icon.png';
import { scale } from '../../../utils/index';
import { useTranslation } from 'react-i18next';
import Text from '../../../components/ui/Text';

interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const LanguageScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();

  return (
    <AppShell
      footer={
        <>
          <Vertical unit={0.5} />
          <Text type="heading" level={2} marginBottom={0.25}>
            {t('welcomeTitle')}
          </Text>
          <Text>{t('languageDescription')}</Text>
          <CtaButton
            onPress={() => navigation.navigate('Welcome')}
            image={covidIcon}
            imageDimensions={{ height: scale(28), width: scale(24) }}
          >
            {t('languageContinue')}
          </CtaButton>
        </>
      }
    >
      <LanguagePicker />
    </AppShell>
  );
};

export default LanguageScreen;
