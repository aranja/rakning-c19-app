import * as WebBrowser from 'expo-web-browser';
import { isEmpty } from 'lodash';
import React, { useRef, useState } from 'react';
import { Text } from 'react-native';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import Swiper from 'react-native-swiper';
import Colors from '../../constants/Colors';
import { scale } from '../../utils/scale';
import { InfoIcon } from '../Icons';
import * as ui from './styles';

interface Slide {
  title?: string;
  subtitle?: string;
  description?: string;
  link: string;
}

interface AnnouncementsProps {
  slides: Slide[];
  alertText: string;
  loading: boolean;
  link: string;
}

const Announcements = ({
  alertText,
  slides,
  loading,
  link,
}: AnnouncementsProps) => {
  const swiperRef = useRef(null);
  const [index, updateIndex] = useState(0);

  const textStyles = {
    fontSize: scale(13),
    lineHeight: scale(18),
    color: Colors.textGray,
    margin: 0,
    padding: 0,
  };

  const renderPagination = (activePageIndex, total) => {
    return (
      <ui.Dots
        accessible={true}
        pointerEvents="none"
        accessibilityRole="adjustable"
        accessibilityLabel="page indicator"
        accessibilityValue={{
          text: `Page: ${activePageIndex + 1} of ${total}`,
        }}
        accessabilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={e => {
          switch (e.nativeEvent.actionName) {
            case 'increment':
              if (activePageIndex + 1 === total) return;
              swiperRef?.current?.scrollBy(1, true);
              break;
            case 'decrement':
              if (activePageIndex - 1 === 1) return;
              swiperRef?.current?.scrollBy(-1, true);

              break;

            default:
              break;
          }
        }}
      >
        {slides.map((_, i) =>
          i === activePageIndex ? <ui.ActiveDot key={i} /> : <ui.Dot key={i} />,
        )}
      </ui.Dots>
    );
  };

  return (
    <ui.Container>
      <ui.Header
        onPress={() => WebBrowser.openBrowserAsync(link)}
        activeOpacity={1}
      >
        <InfoIcon color={Colors.white} />
        <ui.Alert bold adjustsFontSizeToFit numberOfLines={2}>
          {alertText}
        </ui.Alert>
      </ui.Header>
      <ui.SlideWrapper>
        {!isEmpty(slides) && (
          <Swiper
            ref={swiperRef}
            loop={false}
            height="100%"
            horizontal={true}
            renderPagination={renderPagination}
            onIndexChanged={x => updateIndex(x)}
            loadMinimal={true}
          >
            {slides.map(({ title, subtitle, description, link }, i) => (
              <ui.Content
                key={`slide-${i + 1}`}
                onPress={() => WebBrowser.openBrowserAsync(link)}
                activeOpacity={1}
                accessibilityElementHidden={index !== i}
              >
                <ui.Title bold numberOfLines={2} ellipsizeMode="tail">
                  {title}
                </ui.Title>
                <ui.Subtitle>{subtitle}</ui.Subtitle>
                <HTML
                  html={`<div>${description}</div>`}
                  allowFontScaling
                  baseFontStyle={textStyles}
                  containerStyle={{
                    padding: 0,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}
                  tagsStyles={{
                    a: {
                      ...textStyles,
                      textDecorationLine: 'none',
                    },
                  }}
                  renderers={{
                    div: (_, children, convertedCSSStyles, passProps) => (
                      <Text
                        {...passProps}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {children}
                      </Text>
                    ),
                  }}
                  ignoredTags={[...IGNORED_TAGS, 'img', 'br']}
                />
              </ui.Content>
            ))}
          </Swiper>
        )}
      </ui.SlideWrapper>
      {loading && <ui.Spinner size="small" color={Colors.black} />}
    </ui.Container>
  );
};

export default Announcements;
