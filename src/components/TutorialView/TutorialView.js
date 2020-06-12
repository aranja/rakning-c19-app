import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/default
import Swiper from 'react-native-swiper';
import Colors from '../../constants/Colors';
import * as ui from './ui';
import { CtaButton, BackButton } from '../Button';
import IconLink from '../IconLink';
// import LocalePicker from '../LocalePicker';
import { moderateVerticalScale, scale } from '../../utils/scale';
import { ScrollView, View, Image } from 'react-native';
import forward from '../../assets/images/forward.png';

const TutorialView = ({ screens, navigation }) => {
  const [index, updateIndex] = useState(0);
  const isLastScreen = index === screens.length - 1;
  let swiper = useRef(null);
  const { t } = useTranslation();

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

  return (
    <ui.SafeArea>
      <Swiper
        ref={swiper}
        index={index}
        loop={false}
        dotStyle={ui.styles.dot}
        dotColor={Colors.bullet}
        activeDotStyle={ui.styles.dotActive}
        activeDotColor={Colors.breidholtAtNight}
        onIndexChanged={i => updateIndex(i)}
        containerStyle={{ flex: 1 }}
        scrollEnabled={false}
        // Always render the first screen immediately.
        // Default value is true for performance reasons when
        // there are many sub views, which we don't have.
        removeClippedSubviews={false}
      >
        {screens.map(
          ({ title, description, image: Image, imagePosition = 'center' }) => (
            <ui.Content key={title}>
              {/* <ScrollView
                bounces={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                style={{
                  width: '100%',
                }}
              > */}
              <View
                style={{
                  flexGrow: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                {Image && (
                  <ui.ImageWrap imagePosition={imagePosition}>
                    <Image
                      height={`${moderateVerticalScale(100, 0.3)}%`}
                      style={{ borderColor: '09f', borderWidth: 1 }}
                    />
                  </ui.ImageWrap>
                )}
                <View
                  style={{
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}
                >
                  <ui.Title level={2}>{title}</ui.Title>
                  <ui.Description center>{description}</ui.Description>
                </View>
              </View>
              {/* </ScrollView> */}
              <ui.Container>
                <ui.Footer>
                  <CtaButton
                    onPress={onNext}
                    image={forward}
                    imageDimensions={{ height: scale(24), width: scale(27) }}
                  >
                    {t('continue')}
                  </CtaButton>
                </ui.Footer>
              </ui.Container>
            </ui.Content>
          ),
        )}
      </Swiper>
      <ui.CloseIconContainer>
        <BackButton onPress={back}>{t('back')}</BackButton>
      </ui.CloseIconContainer>
    </ui.SafeArea>
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
