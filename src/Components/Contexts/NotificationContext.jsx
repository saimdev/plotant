import React, { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationsToast, setNotificationsToast] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState("");
  const updateNotifications = async () => {
    try {
      const getNotifications = await fetch("/analysis/getNotifications", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const notificationsData = await getNotifications.json();
      console.log(notificationsData);
      // if (notificationsData) {
      //   setBellStatus(1);
      // }
      setNotifications(notificationsData.bell);
      setNotificationsToast(notificationsData.toaster);
      console.log(notificationsData.unread_count);
      setNotificationsCount(notificationsData.unread_count);
      console.log(notificationsData.toaster);
      notificationsData.toaster.forEach((notification) => {
        console.log(notification);
        toast(notification.message, {
          type: "info",
          autoClose: 6000,
        });
        // console.log(bellStatus);
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, notificationsToast, updateNotifications, notificationsCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
