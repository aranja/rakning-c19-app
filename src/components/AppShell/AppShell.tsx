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
  ScrollView,
  View,
} from 'react-native';
import Text, { Heading } from '../ui/Text';
import { LinearGradient } from 'expo-linear-gradient';

const Wrap = styled.View`
  background: ${Colors.background};
  flex: 1;
`;

const Header = styled.View<{ alt: boolean }>`
  background: ${({ alt = false }) => Colors[alt ? 'blue' : 'orange']};
  min-height: ${Platform.OS === 'android'
    ? StatusBar.currentHeight
    : verticalScale(71)};
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
`;

export const Content = styled.View`
  padding: ${verticalScale(28)}px ${scale(32)}px;
`;

export const SlimContent = ({
  children,
  ...props
}: {
  children: ReactNode;
}) => (
  <LinearGradient
    colors={[color(Colors.background).alpha(0), Colors.background]}
    start={[0, 0]}
    end={[0, 0.4]}
    {...props}
  >
    {children}
  </LinearGradient>
);

interface Props {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  alt?: boolean;
  scrollable?: boolean;
}

function AppShell({ title, subtitle, children, alt, scrollable }: Props) {
  const showHeader = title || subtitle;
  return (
    <Wrap as={scrollable ? ScrollView : View}>
      <StatusBar barStyle="light-content" />
      <Header
        alt={alt}
        style={
          showHeader && {
            paddingTop: verticalScale(64),
            paddingHorizontal: scale(32),
            paddingBottom: verticalScale(32),
          }
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
      <Main>{children}</Main>
    </Wrap>
  );
}

export default withNavigation(AppShell);
