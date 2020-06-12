import * as React from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import AppShell, { Content } from '../../../components/AppShell';
import Colors from '../../../constants/Colors';
import Button, {
  CtaButton,
  UrlButton,
  BackButton,
} from '../../../components/Button/Button';
import { Vertical } from '../../../components/ui/Spacer';
import Text, { Heading } from '../../../components/ui/Text';
import { ButtonGroup } from '../../../components/Button';
import Footer from '../../../components/Footer';
import { scale, verticalScale } from '../../../utils';
import { languages } from '../../../i18n';
import { useAlert } from '../../../context/alert';

interface LocaleLinks {
  primary?: string[];
  secondary?: string[];
}

interface QuestionsScreenProps {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
}

const privacyUrls = {
  en: 'https://www.covid.is/app/privacystatement',
  pl: 'https://www.covid.is/app/privacystatement-po',
  is: 'https://www.covid.is/app/personuverndarstefna',
};

const smallBtnStyle = {
  width: '48.5%',
};

const QuestionsScreen = ({ navigation }: QuestionsScreenProps) => {
  const { t, i18n } = useTranslation();
  const links = t('links', { returnObjects: true }) as LocaleLinks;
  const selectedLanguage = languages.find(lang => lang.code === i18n.language);
  const { createAlert } = useAlert();

  return (
    <AppShell
      title={t('questionsTitle')}
      subtitle={t('questionsSubtitle')}
      bgColor={Colors.white}
      backButton={
        <BackButton onPress={() => navigation.goBack()}>{t('back')}</BackButton>
      }
    >
      <ScrollView>
        <Content
          style={{
            paddingLeft: verticalScale(30),
            paddingRight: verticalScale(30),
          }}
        >
          <ButtonGroup>
            {(links.primary ?? []).map(link => (
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

          <Vertical unit={2} />
          <Heading center level={4}>
            {t('otherOptions')}
          </Heading>

          <ButtonGroup row>
            {(links.secondary ?? []).map(link => (
              <UrlButton
                key={link}
                href={t(`${link}Link`)}
                bgColor={Colors.orange}
                style={smallBtnStyle}
                color={Colors.white}
                small
              >
                {t(`${link}Label`)}
              </UrlButton>
            ))}
          </ButtonGroup>
          <ButtonGroup>
            <UrlButton bgColor={Colors.backgroundAlt} href={t('covidLink')}>
              <Text center>
                {t('covidLabel')}{' '}
                <Text bold color={Colors.blue}>
                  covid.is
                </Text>
              </Text>
            </UrlButton>

            <UrlButton
              bgColor={Colors.backgroundAlt}
              href={privacyUrls[i18n.language] || privacyUrls.en}
            >
              <Text center>{t('privacyPolicy')}</Text>
            </UrlButton>

            <CtaButton
              onPress={() => navigation.navigate('ChangeLanguage')}
              image={selectedLanguage.flag}
              bgColor={Colors.backgroundAlt}
              imageDimensions={{
                width: scale(28),
                height: scale(19),
              }}
            >
              <Text center>{selectedLanguage.name}</Text>
            </CtaButton>

            <CtaButton
              bgColor={Colors.backgroundAlt}
              onPress={() => {
                createAlert({
                  type: 'info',
                  message: t('uninstallAppToast'),
                });
              }}
            >
              <Text center>{t('stopTracking')}</Text>
            </CtaButton>
          </ButtonGroup>
        </Content>
        <Footer bgColor={Colors.white} />
      </ScrollView>
    </AppShell>
  );
};

export default QuestionsScreen;
