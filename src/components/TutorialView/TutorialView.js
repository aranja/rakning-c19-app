import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/default
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';
import color from 'color';

import Colors from '../../constants/Colors';
import * as ui from './ui';
import { CtaButton, BackButton } from '../Button';
import IconLink from '../IconLink';
// import LocalePicker from '../LocalePicker';
import { moderateVerticalScale, scale, verticalScale } from '../../utils/scale';
import { ScrollView, View, Image } from 'react-native';
import forward from '../../assets/images/forward.png';
import { Vertical } from '../ui/Spacer';
import map from '../../assets/images/map.png';
import { useWindowDimensions } from '../../utils/hooks';

const TutorialView = ({ screens, navigation }) => {
  const [index, updateIndex] = useState(0);
  const isLastScreen = index === screens.length - 1;
  let swiper = useRef(null);
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

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
        scrollEnabled={true}
        // Always render the first screen immediately.
        // Default value is true for performance reasons when
        // there are many sub views, which we don't have.
        removeClippedSubviews={false}
      >
        {screens.map(
          ({
            title,
            description,
            image: ImageEl,
            imagePosition = 'center',
          }) => (
            <>
              <ui.Content key={title}>
                <ScrollView
                  bounces={false}
                  contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: 'center',
                    padding: 0,
                  }}
                  style={{
                    width: '100%',
                  }}
                >
                  {/* <Image
                    source={map}
                    resizeMode="cover"
                    style={{
                      width: 375,
                      height: 335,
                    }}
                  /> */}

                  <ImageEl
                    style={{
                      width: '100%',
                    }}
                  />

                  <ui.CloseIconContainer>
                    <BackButton onPress={back}>{t('back')}</BackButton>
                  </ui.CloseIconContainer>
                  {/* <View
                    style={
                      {
                        flex: 1,
                      }
                    }
                  > */}
                  {/* <View
                    style={{
                      width: '100%',
                      // height: `${moderateVerticalScale(100, 0.3)}%`,
                    }}
                  >
                    <ImageEl
                      style={{
                        width: '100%',
                      }}
                    />
                  </View> */}
                  <View
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                      paddingBottom: verticalScale(100),
                    }}
                  >
                    <ui.Title level={2}>{title}</ui.Title>
                    <ui.Description center>{description}</ui.Description>
                  </View>
                  {/* </View> */}
                </ScrollView>
              </ui.Content>
            </>
          ),
        )}
      </Swiper>
      <ui.Footer>
        <LinearGradient
          colors={[color(Colors.background).alpha(0), Colors.background]}
          start={[0, 0]}
          end={[0, 1]}
          style={{
            position: 'absolute',
            top: verticalScale(-30),
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
      </ui.Footer>
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
