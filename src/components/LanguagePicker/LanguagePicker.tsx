import React, { useRef } from 'react';
import styled from 'styled-components/native';
import Text from '../ui/Text';
import {
  changeLanguage,
  languages,
  LanguageDefinition,
} from '../../i18n/index';
import Colors from '../../constants/Colors';
import { CtaButton } from '../Button/index';
import { withNavigation } from 'react-navigation';
import { Content } from '../AppShell';
import { useTranslation } from 'react-i18next';
import { Heading } from '../ui/Text';

import * as ui from './styles';

interface Props {
  onLanguagePress?: () => void;
}

function LanguagePicker({ onLanguagePress }: Props) {
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
    <ui.Container>
      {languages
        .sort((a, b) => langSorter(a, b))
        .map(({ code, name, flag }, index) => (
          <ui.RadioButton
            index={index}
            key={code}
            onPress={changeLocale(code)}
            activeOpacity={1}
          >
            <ui.Content>
              <ui.ImageWrap source={flag} />
              <ui.Label bold={locale === code}>{name}</ui.Label>
              <ui.Circle>
                <ui.CircleInner selected={locale === code} />
              </ui.Circle>
            </ui.Content>
          </ui.RadioButton>
        ))}
    </ui.Container>
  );
}

export default withNavigation(LanguagePicker);
