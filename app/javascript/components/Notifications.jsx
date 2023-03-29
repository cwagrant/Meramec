import React from "react";
import useNotifications from "./useNotifications";
import { Alert, Snackbar } from "@mui/material";

const Notifications = () => {
  const { notifications, removeNotification } = useNotifications();

  React.useEffect(() => {
  }, [notifications]);

  return (
    <>
      {notifications &&
        Object.keys(notifications).map((key) => {
          let notification = notifications[key];

          return (
            <Snackbar
              open={true}
              key={key}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                id={key}
                sx={{ my: 1 }}
                severity={notification.severity}
                onClose={(event) => {
                  removeNotification(key);
                }}
              >
                {notification.message}
              </Alert>
            </Snackbar>
          );
        })}
    </>
  );
};

export default Notifications;
