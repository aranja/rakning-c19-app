import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { scale, verticalScale } from '../../utils';

const Item = styled.View`
  color: ${Colors.orange};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const Text = styled.Text`
  color: ${Colors.textGray};
  font-size: ${scale(14)};
  font-weight: 400;
  line-height: ${scale(21)};
  margin-bottom: ${scale(5)};
`;

const Bullet = styled.View`
  background-color: ${Colors.textGray};
  border-radius: ${scale(2)};
  width: ${scale(4)};
  height: ${scale(4)};
  margin-top: ${verticalScale(10)};
  margin-right: ${scale(16)};
`;

const BulletPoints = ({ items = [], bulletColor, textColor }) =>
  items.map((item, i) => (
    <Item key={`bullet-${i + 1}`}>
      <Bullet />
      <Text>{item}</Text>
    </Item>
  ));

export default BulletPoints;
