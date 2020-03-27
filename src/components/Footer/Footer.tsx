import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import almannavarnirSrc from '../../assets/images/almannavarnir.png';
import landlaeknirSrc from '../../assets/images/landlaeknir.png';
import { scale } from '../../utils';

const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const Footer = () => (
  <Wrapper>
    <Image
      resizeMode="contain"
      source={landlaeknirSrc}
      style={{ height: scale(46), width: '38%' }}
    />
    <Image
      resizeMode="contain"
      source={almannavarnirSrc}
      style={{ height: scale(39), width: '50%' }}
    />
  </Wrapper>
);

export default Footer;
