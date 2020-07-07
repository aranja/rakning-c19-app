import React from 'react';
import AppShell from '../../../components/AppShell';
import LanguagePicker from '../../../components/LanguagePicker';

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
