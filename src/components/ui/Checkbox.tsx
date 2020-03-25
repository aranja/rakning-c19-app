import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent, TouchableWithoutFeedback } from 'react-native';
import { CheckIcon } from '../Icons/Icons';

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
  margin-right: 24px;
`;

const Checkmark = styled.View`
  margin-right: 16px;
`;

const Content = styled.Text<{ checked: boolean }>`
  line-height: 20;
  opacity: ${({ checked }) => (checked ? 1 : 0.75)};
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
      <Content checked={checked}>{children}</Content>
    </Wrapper>
  </TouchableWithoutFeedback>
);

export default Checkbox;
