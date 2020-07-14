import * as React from 'react';
import { Image, View } from 'react-native';
import Modal from 'react-native-modal';
import GoogleMapsI from '../../assets/images/google-maps.png';
import AppleMapsI from '../../assets/images/ios-maps.png';
import Colors from '../../constants/Colors';
import { scale } from '../../utils';
import { CtaButton } from '../Button/Button';
import * as ui from './styles';

interface MapChoiceModalProps {
  isVisible: boolean;
  buttonText: string;
  onPress: (app: MapApplication) => void;
  onClose: () => void;
  kicker: string;
  title: string;
  description: string;
}

export enum MapApplication {
  APPLE,
  GOOGLE,
}

const MapChoiceModal = ({
  isVisible,
  buttonText,
  kicker,
  title,
  description,
  onPress,
  onClose,
}: MapChoiceModalProps) => {
  return (
    <View>
      <Modal isVisible={isVisible} backdropOpacity={0.5}>
        <ui.Content>
          <ui.Kicker level={2}>{kicker}</ui.Kicker>
          <ui.Title center>{title}</ui.Title>
          <ui.Description center color={Colors.textGray}>
            {description}
          </ui.Description>
          <ui.ButtonWrapper>
            <ui.MapButton
              style={{ marginRight: 6 }}
              onPress={() => onPress(MapApplication.APPLE)}
            >
              <Image
                source={AppleMapsI}
                style={{
                  width: scale(80),
                  height: scale(80),
                }}
              />
              <ui.ButtonLabel bold>Apple Maps</ui.ButtonLabel>
            </ui.MapButton>
            <ui.MapButton
              style={{ marginLeft: 6 }}
              onPress={() => onPress(MapApplication.GOOGLE)}
            >
              <Image
                source={GoogleMapsI}
                style={{
                  width: scale(80),
                  height: scale(80),
                }}
              />
              <ui.ButtonLabel bold>Google Maps</ui.ButtonLabel>
            </ui.MapButton>
          </ui.ButtonWrapper>
          <CtaButton
            onPress={onClose}
            bgColor={Colors.white}
            color={Colors.black}
            style={{
              borderWidth: 1,
              borderColor: Colors.border,
              borderRadius: scale(6),
            }}
          >
            {buttonText}
          </CtaButton>
        </ui.Content>
      </Modal>
    </View>
  );
};

export default MapChoiceModal;
