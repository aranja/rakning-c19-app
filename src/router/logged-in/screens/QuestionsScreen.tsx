import * as React from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import AppShell, { Content, Header } from '../../../components/AppShell';
import Colors from '../../../constants/Colors';
import { UrlButton, BackButton } from '../../../components/Button/Button';
import { Vertical } from '../../../components/ui/Spacer';
import { Heading } from '../../../components/ui/Text';
import { ButtonGroup } from '../../../components/Button';
import Footer from '../../../components/Footer';
import { verticalScale } from '../../../utils';

interface LocaleLinks {
  primary?: string[];
  secondary?: string[];
  tertiary?: string[];
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
  const { t } = useTranslation();
  const links = t('links', { returnObjects: true }) as LocaleLinks;

  return (
    <AppShell bgColor={Colors.white}>
      <ScrollView>
        <Content
          style={{
            paddingLeft: verticalScale(30),
            paddingRight: verticalScale(30),
          }}
        >
          <Header
            title={t('questionsTitle')}
            subtitle={t('questionsSubtitle')}
            backButton={
              <BackButton onPress={() => navigation.goBack()}>
                {t('back')}
              </BackButton>
            }
          />
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

          <Vertical unit={2} />

          <Heading center level={4}>
            {t('additionalInfo')}
          </Heading>

          <ButtonGroup row>
            {(links.tertiary ?? []).map(link => (
              <UrlButton
                key={link}
                href={t(`${link}Link`)}
                bgColor={Colors.blue}
                style={smallBtnStyle}
                color={Colors.white}
                small
              >
                {t(`${link}Label`)}
              </UrlButton>
            ))}
          </ButtonGroup>
        </Content>
        <Footer bgColor={Colors.white} />
      </ScrollView>
    </AppShell>
  );
};

export default QuestionsScreen;
