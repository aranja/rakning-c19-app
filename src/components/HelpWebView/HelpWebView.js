import React from 'react';
import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

const HelpWebView = ({ link }) => {
  function handleStateChange({ url }) {
    if (!url) {
      return;
    }

    const isEmail = url.startsWith('mailto:');
    const isDifferent = !url.startsWith(link);
    const isSecure = url.startsWith('https:');

    if (isEmail || (isDifferent && isSecure)) {
      Linking.openURL(url);
    }
  }

  return (
    <WebView
      source={{ uri: link }}
      onNavigationStateChange={handleStateChange}
    />
  );
};

HelpWebView.propTypes = {
  link: PropTypes.string.isRequired,
};

export default HelpWebView;
