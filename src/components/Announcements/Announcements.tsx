import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import * as WebBrowser from 'expo-web-browser';
import { isEmpty } from 'lodash';
import Colors from '../../constants/Colors';
import { InfoIcon } from '../Icons';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';

import { scale } from '../../utils/scale';
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
  const textStyles = {
    fontSize: scale(13),
    lineHeight: scale(18),
    color: Colors.textGray,
    margin: 0,
    padding: 0,
  };

  return (
    <ui.Container>
      <ui.Header
        onPress={() => WebBrowser.openBrowserAsync(link)}
        activeOpacity={1}
      >
        <InfoIcon color={Colors.white} />
        <ui.Alert bold>{alertText}</ui.Alert>
      </ui.Header>
      <ui.SlideWrapper>
        {!isEmpty(slides) && (
          <Swiper
            loop={false}
            height="100%"
            dotStyle={ui.styles.dot}
            dotColor={Colors.black}
            activeDotStyle={ui.styles.dotActive}
            activeDotColor={Colors.black}
            paginationStyle={{ bottom: scale(20) }}
          >
            {slides.map(({ title, subtitle, description, link }, i) => (
              <ui.Content
                key={`slide-${i + 1}`}
                onPress={() => WebBrowser.openBrowserAsync(link)}
                activeOpacity={1}
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
