import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import { scale, verticalScale } from '../../utils/index';
import {
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInput,
} from 'react-native';

const CustomTextInput = styled.TextInput`
  color: ${Colors.breidholtAtNight};
  background-color: ${({ focused, empty }) =>
    focused || !empty ? Colors.white : Colors.backgroundAlt};
  border: 1px solid ${Colors.backgroundAlt};
  font-size: ${scale(22)};
  font-weight: bold;
  min-height: ${scale(50)};
  width: 100%;
  padding-horizontal: ${scale(32)};
  padding-vertical: ${verticalScale(10)};
  border-radius: 4px;
`;

const Input = ({ onBlur, onFocus, ...props }: TextInputProps) => {
  const [focused, setFocused] = useState(props.autoFocus);
  const inputRef = useRef<TextInput>(null);
  return (
    <CustomTextInput
      ref={inputRef}
      focused={focused}
      empty={inputRef.current?.state ?? true}
      placeholderTextColor={Colors.placeholder}
      onFocus={(event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        if (typeof onFocus === 'function') {
          onFocus(event);
        }
      }}
      onBlur={(event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        if (typeof onBlur === 'function') {
          onBlur(event);
        }
      }}
      {...props}
    />
  );
};

export default Input;
