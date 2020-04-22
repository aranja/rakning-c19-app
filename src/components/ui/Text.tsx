import React, { ReactText, ReactNode } from 'react';
import styled, { css } from 'styled-components/native';
import { scale } from '../../utils/index';
import Colors from '../../constants/Colors';
import { StyleProp, TextStyle } from 'react-native';
import { isRTL } from '../../i18n';

interface FontProps {
  marginBottom?: 0 | 0.25 | 0.5 | 1 | 1.5 | 2;
  invert?: boolean;
  center?: boolean;
  children?: ReactText | ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
}

type Level = 1 | 2 | 3;

const headingSize = {
  1: 30,
  2: 24,
  3: 16,
};

const font = (
  size: number,
  lineHeight = 1.5,
  bottomMargin = 0.5,
  center = false,
) => css`
  color: ${({ invert, color = invert ? Colors.white : Colors.text }) => color};
  font-size: ${scale(size)};
  line-height: ${scale(size * lineHeight)};
  margin-bottom: ${scale(size * lineHeight * bottomMargin)};
  text-align: ${center ? 'center' : isRTL() ? 'right' : 'left'};
`;

export const Paragraph = styled.Text<FontProps & { bold?: boolean }>`
  ${({ marginBottom, center }) => font(15, 1.5, marginBottom, center)};
  font-family: 'OpenSans${({ bold }) => (bold ? 'Bold' : '')};
`;

export const Heading = styled.Text<FontProps & { level: Level }>`
  ${({ marginBottom, level = 1, center }) =>
    font(headingSize[level], 1.2, marginBottom, center)};
  font-weight: 900;
  font-family: 'OpenSansExtraBold';

  ${({ level = 1 }) =>
    level > 1
      ? null
      : css`
          letter-spacing: -0.5px;
        `};
`;

type Props =
  | {
      type?: 'paragraph';
      bold?: boolean;
    }
  | {
      type: 'heading';
      level?: Level;
    };

const Text = ({ type, children, ...props }: FontProps & Props) => {
  const Component = type === 'heading' ? Heading : Paragraph;
  return <Component {...props}>{children}</Component>;
};

export default Text;
