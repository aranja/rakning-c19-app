import React from 'react';
import { WebView } from 'react-native-webview';
import {
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import config from '../../../config';

interface Props {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
}

export const LiveChatScreen = ({ navigation }: Props) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          source={{
            uri: `https://secure.livechatinc.com/licence/${config.liveChatLicence}/v2/open_chat.cgi`,
          }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color="black"
              size="small"
              style={{ position: 'absolute', height: '100%', width: '100%' }}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
};
