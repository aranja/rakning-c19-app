import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Linking, Platform } from 'react-native';
import Colors from '../../constants/Colors';
import { Clinic } from '../../router/logged-in/screens/ClinicsScreen';
import { useWindowDimensions } from '../../utils/hooks';
import { Marker } from '../Icons';
import MapChoiceModal, { MapApplication } from '../MapChoiceModal';
import Text from '../ui/Text';
import * as ui from './styles';

interface ClinicsListProps {
  data: Clinic[];
  header: React.ReactElement;
  loading: boolean;
}

const ClinicsList = ({ data, header, loading }: ClinicsListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pressedItem, setPressedItem] = useState<Clinic>(null);
  const { t, i18n } = useTranslation();
  const { fontScale } = useWindowDimensions();

  const onMapButtonPressed = (
    { name, latitude, longitude }: Clinic,
    app?: MapApplication,
  ) => {
    const scheme = Platform.select({
      ios:
        app === MapApplication.GOOGLE
          ? 'https://maps.google.com/?q='
          : 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({
      ios:
        app === MapApplication.GOOGLE
          ? `${scheme}${latLng}`
          : `${scheme}${name}@${latLng}`,
      android: `${scheme}${latLng}(${name})`,
    });

    Linking.openURL(url);
  };

  const renderItem = ({ item }: { item: Clinic }) => {
    const { name, address, distanceInKm } = item;
    return (
      <ui.Row
        key={item.name}
        onPress={() => {
          if (Platform.OS === 'ios') {
            setPressedItem(item);
            setIsModalOpen(true);
          } else {
            onMapButtonPressed(item);
          }
        }}
      >
        <ui.Content>
          <Text marginBottom={0}>{name}</Text>
          <ui.Subtitle marginBottom={0} color={Colors.textGray}>
            {address}, {distanceInKm} km
          </ui.Subtitle>
        </ui.Content>
        <Marker />
      </ui.Row>
    );
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          color="black"
          size="small"
          style={{ position: 'absolute', height: '100%', width: '100%' }}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          ListHeaderComponent={
            <ui.Header fontScale={fontScale}>{header}</ui.Header>
          }
        />
      )}
      <MapChoiceModal
        isVisible={isModalOpen}
        title={pressedItem?.name}
        kicker={t('chooseMap')}
        description={`${pressedItem?.address}, ${pressedItem?.distanceInKm} km`}
        buttonText={t('cancel')}
        onPress={app => {
          setIsModalOpen(false);
          onMapButtonPressed(pressedItem, app);
        }}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ClinicsList;
