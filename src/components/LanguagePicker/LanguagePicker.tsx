import React from 'react';
import styled from 'styled-components/native';
import Text from '../ui/Text';
import { changeLanguage, languages } from '../../i18n/index';
import Colors from '../../constants/Colors';
import { ButtonGroup, CtaButton } from '../Button/index';
import { verticalScale, scale } from '../../utils/index';
import { withNavigation } from 'react-navigation';
import { Content } from '../AppShell';

const AllLanguages = styled.View`
  flex: 1;
`;

const Language = styled<{ index: number }>(Content)`
  background: ${({ index }) =>
    index % 2 ? Colors.backgroundAlt : 'transparent'};
  flex: 1;
`;

const LanguageContent = styled.View`
  justify-content: space-between;
  flex: 1;
  padding-vertical: ${verticalScale(8)};
`;

interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}

function LanguagePicker({ navigation }: Props) {
  const changeLocale = (locale: string) => () => {
    changeLanguage(locale);
    navigation.navigate('Welcome');
  };

  return (
    <AllLanguages>
      {languages.map(({ code, title, description, button, flag }, index) => (
        <Language index={index} key={code}>
          <LanguageContent>
            <Text type="heading" level={2} marginBottom={0.25}>
              {title}
            </Text>
            <Text
              style={{
                fontSize: verticalScale(16),
                lineHeight: verticalScale(16 * 1.4),
                marginBottom: verticalScale((16 * 1.4) / 2),
              }}
            >
              {description}
            </Text>
            <ButtonGroup>
              <CtaButton
                align="left"
                justify="start"
                onPress={changeLocale(code)}
                image={flag}
                imageDimensions={{
                  width: scale(28),
                  height: scale(19),
                }}
              >
                {button}
              </CtaButton>
            </ButtonGroup>
          </LanguageContent>
        </Language>
      ))}
    </AllLanguages>
  );
}

export default withNavigation(LanguagePicker);
