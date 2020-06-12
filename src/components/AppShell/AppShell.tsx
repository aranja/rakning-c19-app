import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { scale, verticalScale } from '../../utils/index';
import { withNavigation } from 'react-navigation';
import Colors from '../../constants/Colors';
import color from 'color';
import {
  SafeAreaView,
  Platform,
  StatusBar,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';

import Text, { Heading } from '../ui/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { useWindowDimensions } from '../../utils/hooks';
import { CirclesSmall, TracingIcon } from '../../components/Icons';

const Wrap = styled.View`
  background: ${({ bgColor }) => bgColor || Colors.background};
  flex-grow: 1;
`;

const Header = styled.View`
  align-items: center;
  padding: 0 ${scale(20)}px ${verticalScale(20)}px;
`;

const Circles = styled(CirclesSmall)`
  position: absolute;
  top: ${verticalScale(-30)}px;
  right: ${scale(30)}px;
`;

const Back = styled.View`
  position: absolute;
  top: ${verticalScale(35)}px;
  left: ${scale(20)}px;
  z-index: 10;
`;

const Main = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-top: ${verticalScale(90)};
  padding-bottom: ${({ bottomPadding }) =>
    bottomPadding ? verticalScale(200) : 0};
`;

export const Content = styled.View`
  padding-left: ${scale(20)}px;
  padding-right: ${scale(20)}px;
  padding-bottom: ${verticalScale(28)}px;
`;

export const SlimContent = ({ children }: { children: ReactNode }) => (
  <LinearGradient
    colors={[color(Colors.background).alpha(0), Colors.background]}
    start={[0, 0]}
    end={[0, 0.4]}
    style={{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingBottom: verticalScale(32),
      paddingTop: verticalScale(70),
      paddingHorizontal: scale(32),
    }}
  >
    {children}
  </LinearGradient>
);

interface Props {
  title?: string | ReactNode;
  subtitle?: string;
  bgColor?: string;
  fixedHeader?: boolean;
  children: ReactNode;
  alt?: boolean;
  circles?: boolean;
  footer?: ReactNode;
  backButton?: ReactNode;
  scrollContainerStyles?: StyleProp<ViewStyle>;
}

function AppShell({
  title,
  subtitle,
  children,
  alt,
  footer,
  scrollContainerStyles,
  bgColor,
  circles,
  backButton,
}: Props) {
  const { fontScale } = useWindowDimensions();

  const isFixed = isNaN(fontScale) || fontScale < 2;

  return (
    <Wrap bgColor={bgColor}>
      {circles && <Circles />}
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={scrollContainerStyles}
        >
          <Main bottomPadding={footer && isFixed}>
            {backButton && <Back>{backButton}</Back>}
            {(title || subtitle) && (
              <Header>
                {typeof title === 'string' ? (
                  <Heading
                    color={alt ? Colors.white : Colors.textDark}
                    level={1}
                    center
                    marginBottom={0.1}
                  >
                    {title}
                  </Heading>
                ) : (
                  title
                )}
                {subtitle && (
                  <Text
                    color={alt ? Colors.white : Colors.textDark}
                    marginBottom={0}
                    bold
                    center
                  >
                    {subtitle}
                  </Text>
                )}
              </Header>
            )}
            {children}
          </Main>
          {footer && !isFixed ? <Content>{footer}</Content> : null}
        </ScrollView>
      </KeyboardAvoidingView>

      {footer && isFixed ? <SlimContent>{footer}</SlimContent> : null}
    </Wrap>
  );
}

export default withNavigation(AppShell);
