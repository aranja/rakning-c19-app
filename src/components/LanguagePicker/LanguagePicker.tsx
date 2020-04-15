import React from 'react';
import styled from 'styled-components/native';
import Text from '../ui/Text';
import { changeLanguage, languages } from '../../i18n/index';
import Colors from '../../constants/Colors';
import { ButtonGroup, CtaButton } from '../Button/index';
import { verticalScale, scale } from '../../utils/index';
import { withNavigation } from 'react-navigation';
import { Content } from '../AppShell';
import covidIcon from '../../assets/images/covid-icon.png';

const LanguageScreen = styled.View``;

const Title = styled(Content)`
  height: ${verticalScale(150)};
`;

const LanguageList = styled(Content)``;

const Continue = styled(Content)``;

interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}

function LanguagePicker({ navigation }: Props) {
  const [locale, setLocale] = React.useState('is');
  const selectedLanguage = languages.find(lang => lang.code === locale);

  const changeLocale = (locale: string) => () => {
    changeLanguage(locale);
    navigation.navigate('Welcome');
  };

  return (
    <LanguageScreen>
      <Title>
        <Text type="heading" level={2} marginBottom={0.25}>
          {selectedLanguage.title}
        </Text>
        <Text
          style={{
            fontSize: verticalScale(16),
            lineHeight: verticalScale(16 * 1.4),
            marginBottom: verticalScale((16 * 1.4) / 2),
          }}
        >
          {selectedLanguage.description}
        </Text>
      </Title>

      <LanguageList>
        {languages.map(({ code, name, flag }, index) => (
          <CtaButton
            index={index}
            key={code}
            align="left"
            justify="start"
            onPress={() => setLocale(code)}
            image={flag}
            bgColor={locale === code ? Colors.blue : Colors.backgroundAlt}
            color={locale === code ? Colors.almostWhite : Colors.gray}
            imageDimensions={{
              width: scale(28),
              height: scale(19),
            }}
          >
            {name}
          </CtaButton>
        ))}
      </LanguageList>

      <Continue>
        <ButtonGroup>
          <CtaButton
            align="center"
            justify="center"
            onPress={changeLocale(selectedLanguage.code)}
            image={covidIcon}
            imageDimensions={{
              height: scale(28),
              width: scale(24),
            }}
          >
            {selectedLanguage.button}
          </CtaButton>
        </ButtonGroup>
      </Continue>
    </LanguageScreen>
  );
}

export default withNavigation(LanguagePicker);
