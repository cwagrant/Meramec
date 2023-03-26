import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const NotificationContext = React.createContext({
  notifications: null,
  pushNotifications: () => {},
  removeNotifications: () => {},
});

export default NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(null);

  const removeNotification = (key) => {
    outgoing = { ...notifications };
    delete outgoing[key];

    setNotifications(outging);
  };

  const contextValue = {
    notifications,
    pushNotification: useCallback(
      (message, severity) => {
        let newNotification = {};
        newNotification[uuidv4()] = { message: message, severity: severity };
        setNotifications((notifications) =>
          Object.assign(newNotification, notifications)
        );
      },
      [],
    ),
    removeNotification: useCallback(
      (key) => {
        setNotifications((notifications) => {
          const oldNotifications = {};
          Object.assign(oldNotifications, notifications);
          delete oldNotifications[key];

          return oldNotifications;
        });
      },
      [],
    ),
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
