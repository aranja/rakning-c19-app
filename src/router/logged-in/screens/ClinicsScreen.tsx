import React, { useEffect, useState, useRef } from 'react';
import { getClinics } from '../../../api/Clinics';
import { Header, Content } from '../../../components/AppShell';
import { useTranslation } from 'react-i18next';
import Button, { BackButton } from '../../../components/Button/Button';
import { View, SafeAreaView } from 'react-native';
import { getCurrentLocation } from '../../../tracking';
import { calculateDistance } from '../../../utils/distance';
import ClinicsList from '../../../components/ClinicsList/ClinicsList';

interface Props {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
}

export interface Clinic {
  name: string;
  address: string;
  distanceInKm: number;
  latitude: number;
  longitude: number;
}

const ClinicsScreen = ({ navigation }: Props) => {
  const [clinics, setClinics] = useState<Clinic[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        const currentLocation = await getCurrentLocation();
        const data = await getClinics();
        const dataWithDistance = data
          .map(x => {
            const distance = calculateDistance(currentLocation, {
              latitude: x.Lat,
              longitude: x.Lng,
            });
            return {
              name: x.Name,
              address: x.Address,
              latitude: x.Lat,
              longitude: x.Lng,
              distanceInMeters: distance,
              distanceInKm: parseFloat((distance / 1000).toFixed(1)),
            };
          })
          .sort((a, b) => a.distanceInMeters - b.distanceInMeters);
        console.log(dataWithDistance);
        setClinics(dataWithDistance);
        setIsLoading(false);
      } catch (error) {
        setClinics([]);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <ClinicsList
      data={clinics}
      loading={isLoading}
      header={
        <Content>
          <Header
            title={t('clinicsListTitle')}
            subtitle={t('clinicsListSubtitle')}
            backButton={
              <BackButton onPress={() => navigation.goBack()}>
                {t('back')}
              </BackButton>
            }
          />
        </Content>
      }
    />
  );
};

export default ClinicsScreen;
