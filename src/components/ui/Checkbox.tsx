import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent, TouchableWithoutFeedback } from 'react-native';
import { CheckIcon } from '../Icons/Icons';
import { scale, verticalScale } from '../../utils';
import { isRTL } from '../../i18n';

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
  direction: ${() => (isRTL() ? 'rtl' : 'ltr')};
`;

const Checkmark = styled.View`
  margin-right: ${scale(10)};
  width: ${scale(22)};
  height: ${scale(22)};
  margin-top: ${verticalScale(2)}px;
`;

const Content = styled.Text<{ checked: boolean }>`
  line-height: 20;
  opacity: ${({ checked }) => (checked ? 1 : 0.75)};
  margin-right: ${scale(20)};
`;

interface CheckBoxProps {
  checked: boolean;
  children?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

const Checkbox = ({ checked, children, onPress }: CheckBoxProps) => (
  <TouchableWithoutFeedback
    onPress={onPress}
    hitSlop={{
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    }}
  >
    <Wrapper>
      <Checkmark>
        <CheckIcon isChecked={checked} />
      </Checkmark>
      <Content
        checked={checked}
        maxFontSizeMultiplier={1.5}
        adjustsFontSizeToFit
        numberOfLines={3}
      >
        {children}
      </Content>
    </Wrapper>
  </TouchableWithoutFeedback>
);

export default Checkbox;
