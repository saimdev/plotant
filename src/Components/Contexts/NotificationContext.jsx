import React, { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationsToast, setNotificationsToast] = useState([]);
  const updateNotifications = async () => {
    try {
      const getNotifications = await fetch("/analysis/dummy", {
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
      value={{ notifications, notificationsToast, updateNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
