import React, { ReactNode, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
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
} from 'react-native';
import Text, { Heading } from '../ui/Text';
import { LinearGradient } from 'expo-linear-gradient';

const Wrap = styled.View`
  background: ${Colors.background};
  flex-grow: 1;
`;

const Header = styled.View<{ alt: boolean }>`
  background: ${({ alt = false }) => Colors[alt ? 'blue' : 'orange']};
  min-height: ${Platform.OS === 'android'
    ? StatusBar.currentHeight
    : verticalScale(71)};
`;

const overScrollHeight = 200;
const HeaderOverScroll = styled.View`
  height: ${overScrollHeight};
`;

const Circle = styled.View<{ color?: string; x: number; y: number }>`
  background: ${({ color }) => color ?? 'rgba(255, 255, 255, 0.25)'};
  border-radius: ${scale(70)};
  position: absolute;
  height: ${scale(70)};
  right: ${({ x }) => scale(x)}px;
  top: ${({ y }) => scale(y)}px;
  width: ${scale(70)};
`;

const Circles = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;

const Main = styled.View`
  flex: 1;
  padding-bottom: ${({ bottomPadding }) =>
    bottomPadding ? verticalScale(200) : 0};
`;

export const Content = styled.View`
  padding: ${verticalScale(28)}px ${scale(32)}px;
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
  title?: string;
  subtitle?: string;
  children: ReactNode;
  alt?: boolean;
  footer?: ReactNode;
  scrollContainerStyles?: StyleProp<ViewStyle>;
}

function AppShell({
  title,
  subtitle,
  children,
  alt,
  footer,
  scrollContainerStyles,
}: Props) {
  const { fontScale } = useWindowDimensions();
  const showHeader = title || subtitle;
  const isFixed = isNaN(fontScale) || fontScale < 2;
  const headerColor = Colors[alt ? 'blue' : 'orange'];

  return (
    <Wrap>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView behavior="height">
        <ScrollView
          contentContainerStyle={scrollContainerStyles}
          contentInset={{ top: -overScrollHeight }}
          contentOffset={{ x: 0, y: overScrollHeight }}
        >
          {Platform.OS === 'ios' && (
            <HeaderOverScroll style={{ backgroundColor: headerColor }} />
          )}

          <Header
            alt={alt}
            style={
              (showHeader && {
                paddingTop: verticalScale(64),
                paddingHorizontal: scale(32),
                paddingBottom: verticalScale(32),
              }) || { zIndex: 1 }
            }
          >
            {showHeader && (
              <>
                <Circles>
                  <Circle x={90} y={-10} />
                  <Circle
                    color={alt ? Colors.orange : Colors.blue}
                    x={15}
                    y={-30}
                  />
                  <Circle x={-25} y={35} />
                </Circles>
                <SafeAreaView>
                  <Heading invert>{title}</Heading>
                  <Text invert marginBottom={0}>
                    {subtitle}
                  </Text>
                </SafeAreaView>
              </>
            )}
          </Header>
          <Main bottomPadding={footer && isFixed}>{children}</Main>
          {footer && !isFixed ? <Content>{footer}</Content> : null}
        </ScrollView>
      </KeyboardAvoidingView>

      {footer && isFixed ? <SlimContent>{footer}</SlimContent> : null}
    </Wrap>
  );
}

export default withNavigation(AppShell);
