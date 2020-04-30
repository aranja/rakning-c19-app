import React from 'react';
import styled from 'styled-components/native';
import Text from '../ui/Text';
import {
  changeLanguage,
  languages,
  LanguageDefinition,
} from '../../i18n/index';
import Colors from '../../constants/Colors';
import { CtaButton } from '../Button/index';
import { verticalScale, scale } from '../../utils/index';
import { withNavigation } from 'react-navigation';
import { Content } from '../AppShell';
import { useTranslation } from 'react-i18next';

const LanguageScreen = styled.View``;

const Title = styled(Content)`
  height: ${verticalScale(150)};
`;

const LanguageList = styled(Content)``;

interface Props {
  showTitle?: boolean;
  onLanguagePress?: () => void;
}

function LanguagePicker({ showTitle, onLanguagePress }: Props) {
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = React.useState(i18n.language);

  const changeLocale = (newLocale: string) => () => {
    changeLanguage(newLocale);
    setLocale(newLocale);

    if (onLanguagePress) onLanguagePress();
  };

  const langSorter = (a: LanguageDefinition, b: LanguageDefinition) => {
    if (a.name === 'Íslenska') return -1;
    if (b.name === 'Íslenska') return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  };

  return (
    <LanguageScreen>
      {showTitle && (
        <Title>
          <Text type="heading" level={2} marginBottom={0.25}>
            {t('welcomeTitle')}
          </Text>
          <Text
            style={{
              fontSize: verticalScale(16),
              lineHeight: verticalScale(16 * 1.4),
            }}
          >
            {t('languageDescription')}
          </Text>
        </Title>
      )}

      <LanguageList>
        {languages
          .sort((a, b) => langSorter(a, b))
          .map(({ code, name }, index) => (
            <CtaButton
              index={index}
              key={code}
              align="left"
              justify="start"
              onPress={changeLocale(code)}
              bgColor={locale === code ? Colors.blue : Colors.backgroundAlt}
              color={locale === code ? Colors.almostWhite : Colors.gray}
            >
              {name}
            </CtaButton>
          ))}
      </LanguageList>
    </LanguageScreen>
  );
}

export default withNavigation(LanguagePicker);
