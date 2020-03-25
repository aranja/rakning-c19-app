import React, { useEffect, createContext, useContext } from 'react';
import { AppState } from 'react-native';
import { useMachine } from '@xstate/react';
import appStateMachine from './state-machine';

export const appStateContext = createContext({
  appState: AppState.currentState,
  onWakeUpAfterLongInactivity: () => {},
});

export const AppStateProvider = ({ children }) => {
  const [current, send] = useMachine(appStateMachine);

  function onChange(nextState) {
    send(nextState === 'active' ? 'FOCUS' : 'BLUR');
  }

  function onWakeUpAfterLongInactivity(fn) {
    send('ADD_REACTIVATE_FUNCTION', { fn });

    return () => {
      send('REMOVE_REACTIVATE_FUNCTION', { fn });
    };
  }

  useEffect(() => {
    AppState.addEventListener('change', onChange);

    return () => {
      AppState.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <appStateContext.Provider
      value={{
        onWakeUpAfterLongInactivity,
        appState: current.value,
      }}
    >
      {children}
    </appStateContext.Provider>
  );
};

export const useAppState = () => useContext(appStateContext);

export default useAppState;
