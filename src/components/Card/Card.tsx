import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as ui from './styles';
import { Heading } from '../ui/Text';

interface CardProps {
  label: string;
  description: string;
  icon: React.ReactChild;
  onPress?: () => void;
  action?: React.ReactChild;
}

const Card = ({ onPress, label, description, icon, action }: CardProps) => {
  const content = (
    <>
      <ui.Row>
        <ui.Icon>{icon}</ui.Icon>
        <ui.Header>{label}</ui.Header>
      </ui.Row>
      <ui.Description>{description}</ui.Description>
    </>
  );

  return action ? (
    <ui.ActionWrapper>
      {content}
      <ui.Action>{action}</ui.Action>
    </ui.ActionWrapper>
  ) : (
    <ui.Wrapper
      style={{}}
      onPress={onPress}
      activeOpacity={1}
      accessibilityLabel={label}
      accessibilityRole="link"
    >
      {content}
    </ui.Wrapper>
  );
};

export default Card;
