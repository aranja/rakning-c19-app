import { useEffect, useState, useRef } from 'react';
import { Dimensions, Keyboard } from 'react-native';

export function useUpdatedProp(prop) {
  const ref = useRef(prop);

  useEffect(() => {
    ref.current = prop;
  }, [prop]);

  return ref;
}

// Source: https://github.com/facebook/react-native/blob/3ed1b1f4ff155d092025fbb679e009cf52821f97/Libraries/Utilities/useWindowDimensions.js
export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));

  useEffect(() => {
    function handleChange({ window }) {
      if (
        dimensions.width !== window.width ||
        dimensions.height !== window.height ||
        dimensions.scale !== window.scale ||
        dimensions.fontScale !== window.fontScale
      ) {
        setDimensions(window);
      }
    }

    Dimensions.addEventListener('change', handleChange);
    // We might have missed an update between calling `get` in render and
    // `addEventListener` in this handler, so we set it here. If there was
    // no change, React will filter out this update as a no-op.
    handleChange({ window: Dimensions.get('window') });

    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, [dimensions]);

  return dimensions;
}

export function useKeyboard(config) {
  const { useWillShow = false, useWillHide = false } = config;
  const [visible, setVisible] = useState(false);
  const showEvent = useWillShow ? 'keyboardWillShow' : 'keyboardDidShow';
  const hideEvent = useWillHide ? 'keyboardWillHide' : 'keyboardDidHide';

  function dismiss() {
    Keyboard.dismiss();
    setVisible(false);
  }

  useEffect(() => {
    function onKeyboardShow() {
      setVisible(true);
    }

    function onKeyboardHide() {
      setVisible(false);
    }

    Keyboard.addListener(showEvent, onKeyboardShow);
    Keyboard.addListener(hideEvent, onKeyboardHide);

    return () => {
      Keyboard.removeListener(showEvent, onKeyboardShow);
      Keyboard.removeListener(hideEvent, onKeyboardHide);
    };
  }, [useWillShow, useWillHide]);

  return [visible, dismiss];
}
