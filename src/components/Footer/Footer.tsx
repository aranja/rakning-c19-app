import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import almannavarnirSrc from '../../assets/images/almannavarnir.png';
import landlaeknirSrc from '../../assets/images/landlaeknir.png';
import { scale, verticalScale } from '../../utils';
import Colors from '../../constants/Colors';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: ${verticalScale(40)};
  background-color: ${({ bgColor }) => bgColor || Colors.background};
`;

interface FooterProps {
  bgColor?: string;
}

const Footer = ({ bgColor }: FooterProps) => (
  <Wrapper bgColor={bgColor}>
    <Image
      accessible={true}
      accessibilityRole="image"
      accessibilityLabel="Embætti landlæknir - Sóttvarnalæknir"
      resizeMode="contain"
      source={landlaeknirSrc}
      style={{ height: scale(36), width: '35%' }}
    />
    <Image
      accessible={true}
      accessibilityRole="image"
      accessibilityLabel="Ríkislögreglustjórinn - Almannavarnadeild"
      resizeMode="contain"
      source={almannavarnirSrc}
      style={{ height: scale(36), width: '50%' }}
    />
  </Wrapper>
);

export default Footer;
