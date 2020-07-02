import color from 'color';
import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import { CirclesBig, CirclesSmall } from '../../components/Icons';
import Colors from '../../constants/Colors';
import { useWindowDimensions } from '../../utils/hooks';
import { scale, verticalScale } from '../../utils/index';
import Text, { Heading } from '../ui/Text';

const Wrap = styled.View`
  background: ${({ bgColor }) => bgColor || Colors.background};
  flex-grow: 1;
`;

const HeaderWrapper = styled.View`
  align-items: center;
  padding: 0 ${scale(20)}px ${verticalScale(20)}px;
`;

const CirclesWrapperSmall = styled(CirclesSmall)`
  position: absolute;
  top: ${verticalScale(-30)}px;
  right: ${scale(30)}px;
`;

const CirclesWrapperBig = styled(CirclesBig)`
  position: absolute;
  top: ${verticalScale(-80)}px;
  right: ${scale(-110)}px;
`;

const Back = styled.View`
  position: absolute;
  top: ${({ fontScale }) =>
    verticalScale(fontScale <= 1 ? -55 : -55 * (fontScale * 0.5))}px;
  left: 0;
  z-index: 10;
`;

const Main = styled.View`
  flex: 1;
  padding-top: ${({ fontScale }) =>
    verticalScale(fontScale <= 1 ? 90 : 90 * (fontScale * 0.5))};
  padding-bottom: ${({ bottomPadding }) =>
    bottomPadding ? verticalScale(200) : 0};
`;

export const Content = styled.View`
  padding-left: ${scale(20)}px;
  padding-right: ${scale(20)}px;
  padding-bottom: ${verticalScale(28)}px;
`;

export const Header = ({ title, subtitle, backButton }: any) => {
  const { fontScale } = useWindowDimensions();

  return (
    <>
      <HeaderWrapper accessibilityRole="header">
        {backButton && <Back fontScale={fontScale}>{backButton}</Back>}
        {typeof title === 'string' ? (
          <Heading color={Colors.textDark} level={1} center marginBottom={0.1}>
            {title}
          </Heading>
        ) : (
          title
        )}
        {typeof subtitle === 'string' ? (
          <Text color={Colors.textDark} marginBottom={0} bold center>
            {subtitle}
          </Text>
        ) : (
          subtitle
        )}
      </HeaderWrapper>
    </>
  );
};

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
  subtitle?: string | ReactNode;
  bgColor?: string;
  fixedHeader?: boolean;
  children: ReactNode;
  alt?: boolean;
  circles?: AppShellBackgroundType;
  footer?: ReactNode;
  backButton?: ReactNode;
  scrollContainerStyles?: any;
  mainStyles?: any;
}

export enum AppShellBackgroundType {
  Small,
  Large,
}

function AppShell({
  title,
  subtitle,
  children,
  alt,
  footer,
  scrollContainerStyles,
  mainStyles,
  bgColor,
  circles,
  backButton,
}: Props) {
  const { fontScale } = useWindowDimensions();

  const isFixed = isNaN(fontScale) || fontScale < 2;

  return (
    <Wrap bgColor={bgColor}>
      {circles === AppShellBackgroundType.Small && <CirclesWrapperSmall />}
      {circles === AppShellBackgroundType.Large && <CirclesWrapperBig />}
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1, ...scrollContainerStyles }}
      >
        <Main bottomPadding={footer && isFixed} fontScale={fontScale}>
          {children}
        </Main>
        {footer && !isFixed ? <Content>{footer}</Content> : null}
      </ScrollView>

      {footer && isFixed ? <SlimContent>{footer}</SlimContent> : null}
    </Wrap>
  );
}

export default withNavigation(AppShell);
