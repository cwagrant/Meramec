import { useContext } from "react";
import { NotificationContext } from "./NotificationProvider";

const useNotifications = () => {
  const { notifications, pushNotification, removeNotification } = useContext(
    NotificationContext,
  );
  return { notifications, pushNotification, removeNotification };
};

export default useNotifications;
