import { useEffect, useRef } from 'react';

export function useUpdatedProp(prop) {
  const ref = useRef(prop);

  useEffect(() => {
    ref.current = prop;
  }, [prop]);

  return ref;
}
