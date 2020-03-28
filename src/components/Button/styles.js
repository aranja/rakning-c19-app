import styled, { css } from 'styled-components/native';
import Colors from '../../constants/Colors';
import { Image } from 'react-native';
import { scale, verticalScale } from '../../utils';

export const ButtonContainer = styled.TouchableOpacity`
  margin-top: ${verticalScale(12)};
  width: 100%;
`;

export const CtaButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: ${scale(4)};
  justify-content: center;
  width: 100%;
  background-color: ${({ bgColor, transparent }) =>
    transparent ? 'transparent' : bgColor};
  padding: ${verticalScale(16)}px ${({ small }) => scale(small ? 16 : 32)}px;
    
${({ small }) =>
  !small
    ? null
    : css`
        flex: 1;
      `}

  ${({ disabled }) =>
    disabled &&
    css`
      border-color: ${Colors.gray};
      opacity: 0.5;
    `}

  ${({ align }) =>
    align === 'center'
      ? null
      : css`
          align-items: flex-start;
        `}
  
  ${({ justify }) =>
    justify === 'center'
      ? null
      : css`
          justify-content: flex-start;
        `}
`;

export const ButtonLabel = styled.Text`
  color: ${Colors.white};
  font-size: ${scale(16)};
  font-family: 'OpenSansExtraBold';
  text-align: center;

  ${({ invert, color }) =>
    invert &&
    css`
      color: ${
        color === 'pink' ? Colors.reykjavikInBlossom : Colors.greenThunder
      }};
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${Colors.white};
    `}
`;

export const ButtonGroup = styled.View`
  margin-horizontal: ${scale(-10)};

  ${({ row }) =>
    !row
      ? null
      : css`
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: stretch;
        `}
`;

export const Square = styled.View`
  align-items: center;
  align-self: center;
  background-color: transparent;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.35);
  border-radius: 8px;
  height: ${({ large }) => (large ? '135px' : '50px')};
  justify-content: center;
  width: ${({ large }) => (large ? '135px' : '50px')};
`;

export const ImageWrap = styled(Image)`
  position: absolute;
  right: ${scale(16)}px;
  align-self: center;
`;
