import React, { useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'react-native';
import color from 'color';

import LanguagePicker from '../../../components/LanguagePicker';
import AppShell, { Content } from '../../../components/AppShell';
import { Vertical } from '../../../components/ui/Spacer';
import { CtaButton } from '../../../components/Button/Button';
import covidIcon from '../../../assets/images/covid-icon.png';
import { scale } from '../../../utils/index';
import { useTranslation } from 'react-i18next';
import Text, { Heading } from '../../../components/ui/Text';
import Colors from '../../../constants/Colors';
import Footer from '../../../components/Footer';
import { AppShellBackgroundType } from '../../../components/AppShell/AppShell';
import { View } from 'react-native-animatable';
import LanguageButton from '../../../components/LanguageButton';
import { languages } from '../../../i18n';
import { verticalScale } from '../../../utils/scale';

interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const LanguageScreen = ({ navigation }: Props) => {
  const { t, i18n } = useTranslation();
  const modalizeRef = useRef<Modalize>(null);
  const selectedLanguage = languages.find(lang => lang.code === i18n.language);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onContinue = () => {
    modalizeRef.current?.close();
    navigation.navigate('Onboarding');
  };

  return (
    <>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <AppShell circles={AppShellBackgroundType.Large}>
        <Content
          style={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Heading color={Colors.textDark} level={1} center marginBottom={0.4}>
            {t('welcomeTitle')}
          </Heading>
          <Text
            color={Colors.textDark}
            marginBottom={0}
            bold
            center
            style={{ marginLeft: 25, marginRight: 25 }}
          >
            {t('languageDescription')}
          </Text>
          <Vertical unit={3} />
          <LanguageButton
            onPress={onOpen}
            language={selectedLanguage}
            label={t('language')}
          />
          <Vertical unit={3} />
          <CtaButton
            onPress={() => navigation.navigate('Onboarding')}
            image={covidIcon}
            imageDimensions={{ height: scale(28), width: scale(24) }}
          >
            {t('languageContinue')}
          </CtaButton>
          <Vertical unit={2} />
          <Footer />
        </Content>
      </AppShell>
      <Modalize
        ref={modalizeRef}
        HeaderComponent={
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Colors.background,
            }}
          >
            <Heading
              level={3}
              center
              marginBottom={0.5}
              style={{
                marginTop: verticalScale(25),
                marginLeft: scale(10),
                marginRight: scale(10),
              }}
            >
              {t('selectLanguage')}
            </Heading>
          </View>
        }
        FooterComponent={
          <View
            style={{
              position: 'relative',
              paddingBottom: verticalScale(44),
              paddingLeft: scale(20),
              paddingRight: scale(20),
            }}
          >
            <LinearGradient
              colors={[color(Colors.white).alpha(0), Colors.white]}
              start={[0, 0]}
              end={[0, 1]}
              style={{
                position: 'absolute',
                top: verticalScale(-60),
                left: 0,
                right: 0,
                height: verticalScale(60),
              }}
            />
            <CtaButton onPress={onContinue}>{t('languageContinue')}</CtaButton>
          </View>
        }
      >
        <LanguagePicker />
      </Modalize>
    </>
  );
};

export default LanguageScreen;
