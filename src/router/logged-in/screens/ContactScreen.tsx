import * as React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

import AppShell, { Content, Header } from '../../../components/AppShell';
import Card from '../../../components/Card';
import {
  Close,
  InfoIcon,
  ChatIcon,
  PhoneIcon,
  List,
} from '../../../components/Icons';
import Colors from '../../../constants/Colors';
import Button, {
  CtaButton,
  UrlButton,
  BackButton,
} from '../../../components/Button/Button';
import { Vertical } from '../../../components/ui/Spacer';
import Text, { Heading } from '../../../components/ui/Text';
import BulletPoints from '../../../components/ui/BulletPoints';
import HelplineOptions from '../../../components/HelplineOptions/HelplineOptions';

interface ContactScreenProps {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
}

const ContactScreen = ({ navigation }: ContactScreenProps) => {
  const { t } = useTranslation();
  return (
    <AppShell bgColor={Colors.white}>
      <Content>
        <Header
          title={t('symptomsTitle')}
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
