import { useEffect, useState, useRef } from 'react';
import { Dimensions } from 'react-native';

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
