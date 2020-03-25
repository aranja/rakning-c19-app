import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { scale, verticalScale } from '../../utils';

const Item = styled.View`
  color: ${Colors.white};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const Text = styled.Text`
  color: ${Colors.white};
  font-size: ${scale(16)};
  font-weight: bold;
  line-height: ${scale(19)};
  margin-bottom: ${scale(19)};
`;

const Bullet = styled.View`
  background-color: ${Colors.reykjavikInBlossom};
  border-radius: ${scale(4)};
  width: ${scale(8)};
  height: ${scale(8)};
  margin-top: ${verticalScale(6)};
  margin-right: ${scale(10)};
`;

const BulletPoints = ({ items = [] }) =>
  items.map(item => (
    <Item key={item}>
      <Bullet />
      <Text>{item}</Text>
    </Item>
  ));

export default BulletPoints;
