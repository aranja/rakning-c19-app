import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { StatusBar, SafeAreaView, ActivityIndicator, View } from 'react-native';
import config from '../../../config';
import { useTranslation } from 'react-i18next';
import { BackButton } from '../../../components/Button';
import { scale, verticalScale } from '../../../utils/scale';

interface Props {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
}

export const LiveChatScreen = ({ navigation }: Props) => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const group = i18n.language === 'is' ? '1' : '2'; // Group 1 for Icelandic and group 2 for English

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            opacity: isLoading ? 0 : 1,
            marginLeft: scale(17),
            marginBottom: verticalScale(10),
          }}
        >
          <BackButton onPress={() => navigation.goBack()}>
            {t('back')}
          </BackButton>
        </View>
        <WebView
          source={{
            uri: `https://secure.livechatinc.com/licence/${config.liveChatLicence}/v2/open_chat.cgi?group=${group}`,
          }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color="black"
              size="small"
              style={{ position: 'absolute', height: '100%', width: '100%' }}
            />
          )}
          onLoadEnd={() => {
            setTimeout(() => setIsLoading(false), 1300);
          }}
        />
      </SafeAreaView>
    </>
  );
};
