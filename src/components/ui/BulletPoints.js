import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { scale, verticalScale } from '../../utils';
import { useWindowDimensions } from '../../utils/hooks';

const Item = styled.View`
  color: ${Colors.orange};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const Bullet = styled.View`
  background-color: ${Colors.textGray};
  border-radius: ${({ fontScale }) => scale(2) * fontScale};
  width: ${({ fontScale }) => scale(4) * fontScale};
  height: ${({ fontScale }) => scale(4) * fontScale};
  margin-top: ${({ fontScale }) => verticalScale(10) * fontScale};
  margin-right: ${scale(16)};
`;

const BulletPoints = ({ items = [] }) => {
  const dimensions = useWindowDimensions();
  const fontScale = isNaN(dimensions.fontScale) ? 1 : dimensions.fontScale;

  return items.map((item, i) => (
    <Item key={`bullet-${i + 1}`}>
      <Bullet fontScale={fontScale} />
      {item}
    </Item>
  ));
};

export default BulletPoints;
