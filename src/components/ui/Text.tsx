import React, { ReactText, ReactNode } from 'react';
import styled, { css } from 'styled-components/native';
import { scale } from '../../utils/index';
import Colors from '../../constants/Colors';
import { StyleProp, TextStyle, Dimensions } from 'react-native';
import { isRTL } from '../../i18n';

const { width, fontScale: fs } = Dimensions.get('window');
const fontScale = isNaN(fs) ? 1 : fs;
const smallScreen = width <= 375;

console.log('fontScale', fontScale);

interface FontProps {
  marginBottom?: 0 | 0.25 | 0.5 | 1 | 1.5 | 2;
  invert?: boolean;
  center?: boolean;
  children?: ReactText | ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
}

type Level = 1 | 2 | 3 | 4;

const headingSize = {
  1: smallScreen ? 45 : 53,
  2: 34,
  3: 24,
  4: 16,
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
  font-family: 'OpenSansBold';

  ${({ level = 1 }) =>
    level > 1
      ? null
      : css`
          letter-spacing: -0.5px;
        `};
`;

Heading.defaultProps = {
  maxFontSizeMultiplier: 2,
  adjustsFontSizeToFit: true,
  numberOfLines: 3,
};

Paragraph.defaultProps = {
  adjustsFontSizeToFit: true,
};

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
