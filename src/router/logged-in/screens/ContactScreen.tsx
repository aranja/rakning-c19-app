import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import AppShell, { Content, Header } from '../../../components/AppShell';
import { BackButton, CtaButton } from '../../../components/Button/Button';
import Card from '../../../components/Card';
import HelplineOptions from '../../../components/HelplineOptions/HelplineOptions';
import { ChatIcon, List, PhoneIcon } from '../../../components/Icons';
import { Vertical } from '../../../components/ui/Spacer';
import { Heading } from '../../../components/ui/Text';
import Colors from '../../../constants/Colors';
import { useWindowDimensions } from '../../../utils/hooks';

interface ContactScreenProps {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
}

const ContactScreen = ({ navigation }: ContactScreenProps) => {
  const { t } = useTranslation();
  const { fontScale: fs } = useWindowDimensions();
  const fontScale = isNaN(fs) ? 1 : fs;

  return (
    <AppShell bgColor={Colors.white}>
      <Content>
        <Header
          title={
            <Heading
              center
              marginBottom={0.1}
              numberOfLines={fontScale > 1 ? 3 : 2}
            >
              {t('symptomsTitle')}
            </Heading>
          }
          subtitle={t('symptomsSubtitle')}
          backButton={
            <BackButton onPress={() => navigation.goBack()}>
              {t('back')}
            </BackButton>
          }
        />
        <Card
          label={t('liveChatTitle')}
          description={t('liveChatDescription')}
          icon={<ChatIcon />}
          action={
            <CtaButton
              onPress={() => navigation.navigate('LiveChat')}
              bgColor={Colors.orange}
            >
              {t('liveChatAction')}
            </CtaButton>
          }
        />

        <Vertical unit={1} />

        <Card
          label={t('callClinicTitle')}
          description={t('callClinicDescription')}
          icon={<PhoneIcon />}
          action={
            <CtaButton
              onPress={() => Linking.openURL(`tel:+3541700`)}
              bgColor={Colors.orange}
            >
              {t('callClinicAction')}
            </CtaButton>
          }
        />

        <Vertical unit={1} />

        <Card
          label={t('clinicsListCardTitle')}
          icon={<List />}
          action={
            <CtaButton
              onPress={() => navigation.navigate('Clinics')}
              bgColor={Colors.orange}
            >
              {t('clinicsListAction')}
            </CtaButton>
          }
        />
        <Vertical unit={3} />

        <Heading center level={4}>
          {t('otherOptions')}
        </Heading>

        <Vertical unit={2} />

        <HelplineOptions
          title={t('helplineTitle')}
          bulletPoints={t('helplineBullets', { returnObjects: true })}
        />
        <Vertical unit={2} />
      </Content>
    </AppShell>
  );
};

export default ContactScreen;
