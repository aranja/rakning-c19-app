import React from 'react';
import LanguagePicker from '../../../components/LanguagePicker';
import AppShell from '../../../components/AppShell';

interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const ChangeLanguageScreen = ({ navigation }: Props) => {
  const onLanguagePress = () => navigation.navigate('Home');

  return (
    <AppShell>
      <LanguagePicker onLanguagePress={onLanguagePress} />
    </AppShell>
  );
};

export default ChangeLanguageScreen;
