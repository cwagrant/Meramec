import React from "react";
import useNotifications from "./useNotifications";
import { Alert } from "@mui/material";

const Notifications = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <>
      {notifications &&
        Object.keys(notifications).map((key) => {
          let notification = notifications[key];

          return (
            <Alert
              key={key}
              id={key}
              sx={{ my: 1 }}
              severity={notification.severity}
              onClose={(event) => {
                removeNotification(key);
              }}
            >
              {notification.message}
            </Alert>
          );
        })}
    </>
  );
};

export default Notifications;
