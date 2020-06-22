import * as React from 'react';
import { View, Image } from 'react-native';
import Modal from 'react-native-modal';
import { format } from 'date-fns';
import * as ui from './styles';
import { CtaButton } from '../Button/Button';
import { GoogleMaps, AppleMaps } from '../Icons';
import Colors from '../../constants/Colors';
import { scale } from '../../utils';
import AppleMapsI from '../../assets/images/ios-maps.png';
import GoogleMapsI from '../../assets/images/google-maps.png';
import { Clinic } from '../../router/logged-in/screens/ClinicsScreen';
import { MapApplication } from '../ClinicsList/ClinicsList';

interface MapChoiceModalProps {
  isVisible: boolean;
  buttonText: string;
  onPress: (app: MapApplication) => void;
  onClose: () => void;
  kicker: string;
  title: string;
  description: string;
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
