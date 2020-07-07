import React from 'react';
import { LanguageDefinition } from '../../i18n';
import { DropDown } from '../Icons';
import * as ui from './styles';

interface LanguageButtonProps {
  label: string;
  onPress: () => void;
  language: LanguageDefinition;
}

const LanguageButton = ({ label, language, onPress }: LanguageButtonProps) => {
  return (
    <ui.Container onPress={onPress} activeOpacity={1}>
      <ui.Left>
        <ui.Label
          adjustsFontSizeToFit
          numberOfLines={1}
          maxFontSizeMultiplier={1.5}
        >
          {label}
        </ui.Label>
      </ui.Left>
      <ui.Right>
        <ui.Language>
          <ui.ImageWrap source={language.flag} />
          <ui.Label
            maxFontSizeMultiplier={1.5}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {language.name}
          </ui.Label>
        </ui.Language>
        <DropDown />
      </ui.Right>
    </ui.Container>
  );
};

export default LanguageButton;
