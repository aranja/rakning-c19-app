import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

const KeyboardAvoid = ({ children, style = {}, ...props }) => (
  <KeyboardAvoidingView
    style={{
      flex: 1,
      ...style,
    }}
    contentContainerStyle={{
      flex: 1,
    }}
    enabled
    behavior="padding"
    {...props}
  >
    {children}
  </KeyboardAvoidingView>
);

export default KeyboardAvoid;
