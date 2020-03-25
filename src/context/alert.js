import React, { createContext, useState, useEffect, useContext } from 'react';
import Toast from '../components/Toast';

const allowedNotifications = ['TRIP_OUTSIDE_BOUNDS', 'TRIP_INACTIVE_WARNING'];

export const AlertContext = createContext({
  createAlert: _newAlert => {},
  dismissAlert: () => {},
  alert: null,
});

export const AlertConsumer = AlertContext.Consumer;

export const AlertProvider = ({ children }) => {
  const [visible, showAlert] = useState(false);
  const [alert, setAlert] = useState(null);
  let timeout;

  const dismissAlert = () => {
    showAlert(false);
  };

  const createAlert = newAlert => {
    setAlert(newAlert);
    showAlert(true);
    timeout = setTimeout(dismissAlert, 6000);
  };

  const handleNotification = notification => {
    const { type, body: message } = notification.data;
    if (allowedNotifications.includes(type) && !!message) {
      createAlert({ message });
    }
  };

  useEffect(() => {
    // const listener = Notifications.addListener(handleNotification);
    return () => {
      clearTimeout(timeout);
      // listener.remove(handleNotification);
    };
  }, []);

  const alertState = {
    createAlert,
    dismissAlert,
    visible,
    alert,
  };

  return (
    <AlertContext.Provider value={alertState}>
      {children}
      <Toast
        type={alert && alert.type}
        message={alert && alert.message}
        onClose={dismissAlert}
        isVisible={visible}
      />
    </AlertContext.Provider>
  );
};

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}

export function useAsyncErrorHandling(fn) {
  const { createAlert } = useAlert();
  return async (...args) => {
    try {
      await fn(...args);
    } catch (error) {
      createAlert({
        message: (error.body && error.body.message) || error.message,
        type: 'error',
      });
    }
  };
}
