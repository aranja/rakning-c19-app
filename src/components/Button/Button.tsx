import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import {
  ButtonContainer,
  CtaButtonContainer,
  ButtonLabel,
  Square,
  ImageWrap,
  Row,
  BackLabel,
} from './styles';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../../constants/Colors';
import { scale, verticalScale } from '../../utils/index';
import { BackIcon } from '../Icons';
import Text from '../ui/Text';
import { useWindowDimensions } from '../../utils/hooks';

type ButtonProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: Function;
};

const Button = ({
  onPress,
  children,
  style,
  disabled = false,
}: ButtonProps) => {
  const onButtonPress = () => {
    if (disabled) {
      return;
    }
    onPress();
  };

  return (
    <ButtonContainer disabled={disabled} onPress={onButtonPress} style={style}>
      {children}
    </ButtonContainer>
  );
};

type CtaButtonProp = ButtonProps & {
  invert?: boolean;
  color?: string;
  loading?: boolean;
  transparent?: boolean;
  small?: boolean;
  align?: 'left' | 'center';
  bgColor?: string;
  image?: ImageSourcePropType | string;
  imageDimensions?: { height: number; width: number };
  justify?: 'start' | 'center';
};

export const CtaButton = ({
  disabled,
  onPress,
  color,
  children,
  style,
  invert = false,
  loading = false,
  transparent = false,
  align = 'center',
  justify = 'center',
  bgColor = Colors.blue,
  small = false,
  image,
  imageDimensions = { height: 20, width: 20 },
}: CtaButtonProp) => (
  <Button onPress={onPress} disabled={loading || disabled} style={style}>
    <CtaButtonContainer
      invert={invert}
      color={color}
      disabled={loading || disabled}
      transparent={transparent}
      align={align}
      justify={justify}
      bgColor={bgColor}
      small={small}
    >
      {loading ? (
        <>
          <ButtonLabel
            invert={invert}
            color={color}
            disabled={loading || disabled}
          >
            {children}
          </ButtonLabel>
          <ActivityIndicator
            size="small"
            color={Colors.white}
            style={{ position: 'absolute', right: scale(16) }}
          />
        </>
      ) : (
        <>
          <ButtonLabel
            invert={invert}
            color={color}
            disabled={loading || disabled}
            maxFontSizeMultiplier={2.2}
          >
            {children}
          </ButtonLabel>
          {image && !disabled && (
            <ImageWrap
              source={image}
              style={{
                width: imageDimensions.width,
                height: imageDimensions.height,
              }}
            />
          )}
        </>
      )}
    </CtaButtonContainer>
  </Button>
);

export const UrlButton = ({
  href,
  children,
  ...props
}: CtaButtonProp & { href: string }) => {
  function onPress() {
    WebBrowser.openBrowserAsync(href);
  }
  return (
    <CtaButton {...props} onPress={onPress}>
      {children}
    </CtaButton>
  );
};

type SquareButtonProps = ButtonProps & {
  large?: boolean;
  transparent?: boolean;
};

export const SquareButton = ({
  disabled,
  onPress,
  large = true,
  transparent = false,
  children,
}: SquareButtonProps) => (
  <Button onPress={onPress} disabled={disabled}>
    <Square large={large} transparent={transparent}>
      {children}
    </Square>
  </Button>
);

export const BackButton = ({ onPress, disabled, children }: ButtonProps) => {
  const dimensions = useWindowDimensions();

  const fontScale = isNaN(dimensions.fontScale) ? 1 : dimensions.fontScale;

  return (
    <Button onPress={onPress} disabled={disabled} style={{ paddingBottom: 10 }}>
      <Row>
        <BackIcon
          width={scale(16) * (fontScale <= 1 ? 1 : 0.5) * fontScale}
          height={verticalScale(14) * (fontScale <= 1 ? 1 : 0.5) * fontScale}
        />
        <BackLabel color={Colors.textDark} maxFontSizeMultiplier={2.5}>
          {children}
        </BackLabel>
      </Row>
    </Button>
  );
};

export default Button;
