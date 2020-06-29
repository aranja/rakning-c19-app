import color from 'color';
// eslint-disable-next-line import/default
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, View } from 'react-native';
import Swiper from 'react-native-swiper';
import forward from '../../assets/images/forward.png';
import Colors from '../../constants/Colors';
import { useWindowDimensions } from '../../utils/hooks';
import { moderateVerticalScale, scale, verticalScale } from '../../utils/scale';
import { BackButton, CtaButton } from '../Button';
import Footer from '../Footer';
import * as ui from './ui';

const TutorialView = ({ screens, navigation }) => {
  const scrollY = new Animated.Value(0);
  const [index, updateIndex] = useState(0);
  const [offset, setOffset] = useState(1);
  const isLastScreen = index === screens.length - 1;
  let swiper = useRef(null);
  const { t } = useTranslation();
  const { height: screenHeight } = useWindowDimensions();

  const back = () => {
    if (index > 0) {
      swiper.current.scrollBy(-1);
    } else {
      navigation.goBack();
    }
  };

  const onNext = () => {
    if (isLastScreen) {
      navigation.navigate('Login');
      return;
    }

    swiper.current.scrollBy(1);
  };

  let imageHeightPercentage = 40;
  if (screenHeight < 800) imageHeightPercentage = 34;

  const renderFooter = (activePageIndex, total) => (
    <>
      <ui.Footer>
        <LinearGradient
          colors={[color(Colors.background).alpha(0), Colors.background]}
          start={[0, 0]}
          end={[0, 1]}
          style={{
            position: 'absolute',
            top: verticalScale(-40),
            left: 0,
            right: 0,
            height: verticalScale(30),
          }}
        />
        <CtaButton
          onPress={onNext}
          image={forward}
          imageDimensions={{ height: scale(24), width: scale(27) }}
        >
          {t('continue')}
        </CtaButton>
        <ui.Dots
          accessible={true}
          pointerEvents="none"
          accessibilityRole="adjustable"
          accessibilityLabel="page indicator"
          accessibilityValue={{
            text: `Page: ${activePageIndex + 1} of ${total}`,
          }}
          accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
          onAccessibilityAction={e => {
            switch (e.nativeEvent.actionName) {
              case 'increment':
                if (activePageIndex + 1 === total) return;
                updateIndex(activePageIndex + 1);
                break;
              case 'decrement':
                if (activePageIndex - 1 === 1) return;
                updateIndex(activePageIndex - 1);
                break;

              default:
                break;
            }
          }}
        >
          {screens.map((_, i) =>
            i === activePageIndex ? (
              <ui.ActiveDot key={i} />
            ) : (
              <ui.Dot key={i} />
            ),
          )}
        </ui.Dots>
        <Footer />
      </ui.Footer>
      <ui.CloseIconContainer
        as={Animated.View}
        style={{
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 100],
                outputRange: [0, -100],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <BackButton onPress={back}>{t('back')}</BackButton>
      </ui.CloseIconContainer>
    </>
  );

  return (
    <ui.Container>
      <Swiper
        ref={swiper}
        index={index}
        loop={false}
        onIndexChanged={i => updateIndex(i)}
        containerStyle={{ flex: 1 }}
        scrollEnabled={true}
        // Always render the first screen immediately.
        // Default value is true for performance reasons when
        // there are many sub views, which we don't have.
        removeClippedSubviews={false}
        renderPagination={renderFooter}
      >
        {screens.map(
          (
            {
              title,
              description,
              image: ImageEl,
              imageAlignment = 'center',
              imageDimensions: { height: originalHeight },
            },
            pageIndex,
          ) => (
            <View
              style={{ flex: 1 }}
              key={`screen-${pageIndex + 1}`}
              accessibilityElementsHidden={index !== pageIndex}
            >
              <Animated.ScrollView
                bounces={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  // backgroundColor: '#f90',
                }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: true },
                )}
              >
                <View
                  style={{
                    height:
                      (moderateVerticalScale(imageHeightPercentage, 0.3) /
                        100) *
                      screenHeight,
                    maxHeight: originalHeight,
                    width: '100%',
                    alignItems: 'center',
                  }}
                  onLayout={({
                    nativeEvent: {
                      layout: { width, height },
                    },
                  }) => {
                    const imageOffset =
                      ((1 - height / originalHeight) * width) / 2;
                    setOffset(-imageOffset);
                  }}
                >
                  <ImageEl
                    style={{
                      alignSelf:
                        imageAlignment === 'right' ? 'flex-end' : 'center',
                      marginRight: imageAlignment === 'right' ? offset : 0,
                      opacity: offset <= 0 ? 1 : 0,
                    }}
                  />
                </View>

                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    paddingBottom: verticalScale(20),
                  }}
                >
                  <ui.Title level={2}>{title}</ui.Title>
                  <ui.Description center>{description}</ui.Description>
                </View>
              </Animated.ScrollView>
              <View style={{ marginTop: 10, opacity: 0, flexGrow: 0 }}>
                {renderFooter(0, 0)}
              </View>
            </View>
          ),
        )}
      </Swiper>
    </ui.Container>
  );
};

TutorialView.propTypes = {
  screens: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.func,
      imagePosition: PropTypes.oneOf(['center', 'right']),
    }),
  ).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default TutorialView;
