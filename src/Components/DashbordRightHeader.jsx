import React, { useContext, useEffect, useState } from "react";
import { NotificationContext } from "./Contexts/NotificationContext";
import SharedNotificationModal from "./Modals/SharedNotificationModal";

const DashboardRightHeader = ({ username, profile }) => {
  const [notificationsDisplay, setNotificationsDisplay] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [sharedProjectName, setSharedProjectName] = useState("");
  const [sharedProjectDate, setSharedProjectDate] = useState("");
  const [sharedPersonName, setSharedPersonName] = useState("");
  const [sharedPersonEmail, setSharedPersonEmail] = useState("");
  const [sharedAccessType, setSharedAccessType] = useState("");
  const [acceptanceStatus, setAcceptanceStatus] = useState("");
  const [previous, setPrevious] = useState("");
  const { notifications, notificationsToast, updateNotifications, notificationsCount } =
    useContext(NotificationContext);

  let renderingCheck = 0;
  useEffect(() => {
    if (renderingCheck === 0) {
      updateNotifications();
    }
    renderingCheck = renderingCheck + 1;
    console.log(notifications);
    // console.log(bellStatus);
  }, []);

  const formateDate = (dateStr) => {
    const dateObj = new Date(dateStr);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""
      }${day}`;

    return formattedDate;
  };

  const showNotifications = () => {
    // setNotifyStatus(0);
    setNotificationsDisplay(notificationsDisplay === "none" ? "block" : "none");
  };

  const deleteNotifcation = async (id) => {
    const res = await fetch("/analysis/deleteNotification", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      credentials: "include",
    });

    const data = await res.json();

    if (data.message) {
      window.alert(data.message);
    } else if (data.error) {
      window.alert(data.error);
    }
    updateNotifications();
  };

  const handleNotificationClick = async (notification, acceptance) => {
    setSelectedNotification(notification);
    setAcceptanceStatus(acceptance);
    const res = await fetch("/analysis/readNotification", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: notification,
      }),
      credentials: "include",
    });

    const data = await res.json();
    console.log(data.message);
    if (data.message) {
      // window.alert(data.message);
      setPrevious(data.sharerInfo.previous);
      setSharedPersonName(data.sharerInfo.username);
      setSharedProjectName(data.sharerInfo.project);
      setSharedProjectDate(formateDate(data.sharerInfo.date));
      setSharedPersonEmail(data.sharerInfo.email);
      setSharedAccessType(data.sharerInfo.accessType);
      console.log(data);
    } else if (data.error) {
      // window.alert(data.error);
      console.log(data.error);
    }
    setShowModal(true);
  };

  const acceptProject = async (id) => {
    const res = await fetch("/analysis/acceptProject", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      credentials: "include",
    });

    const data = await res.json();

    if (data.message) {
      window.alert(data.message);
    } else if (data.error) {
      window.alert(data.error);
    }
    updateNotifications();
    setShowModal(false);
  };

  const declineProject = async (id) => {
    const res = await fetch("/analysis/declineProject", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      credentials: "include",
    });

    const data = await res.json();

    if (data.message) {
      window.alert(data.message);
    } else if (data.error) {
      window.alert(data.error);
    }
    updateNotifications();
    setShowModal(false);
  };

  const markAllAsRead = async (id) => {
    const res = await fetch("/analysis/markAllAsRead", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.message) {
      window.alert(data.message);
    } else if (data.error) {
      window.alert(data.error);
    }
    updateNotifications();
  };

  const markAsRead = async (id) => {
    const res = await fetch("/analysis/markAsRead", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      credentials: "include",
    });

    const data = await res.json();

    if (data.message) {
      window.alert(data.message);
    } else if (data.error) {
      window.alert(data.error);
    }
    updateNotifications();
  };

  return (
    <div className="dashboard-right-section-header d-flex flex-row justify-content-between align-items-center px-3 py-2 w-100">
      <input
        type="search"
        placeholder="Search here...."
        name=""
        id=""
        className="w-25 p-1"
      />

      <div className="dashboard-right-section-header-right d-flex flex-row align-items-center">
        <div className="">
          <div className="mx-5 w-100">
            <svg
              className=""
              width="20"
              height="24"
              viewBox="0 0 46 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={showNotifications}
              style={{
                cursor: "pointer",
                position: "relative",
                top: 0,
                right:-19
              }}
            >
              <g clip-path="url(#clip0_307_323)">
                <path
                  d="M13.8795 45.6045C15.9822 48.2775 19.2855 50 23 50C26.7145 50 30.0178 48.2775 32.1205 45.6045C26.066 46.425 19.934 46.425 13.8795 45.6045Z"
                  fill="#FFA700"
                />
                <path
                  d="M39.8728 17.5V19.2602C39.8728 21.3727 40.4757 23.438 41.6055 25.1955L44.374 29.503C46.903 33.4372 44.9725 38.7848 40.574 40.029C29.0682 43.2835 16.9319 43.2835 5.4259 40.029C1.02763 38.7848 -0.902948 33.4372 1.6259 29.503L4.3945 25.1955C5.5243 23.438 6.12718 21.3727 6.12718 19.2602V17.5C6.12718 7.83503 13.6814 0 23 0C32.3185 0 39.8728 7.83503 39.8728 17.5Z"
                  fill="#FFA700"
                />
              </g>
              <defs>
                <clipPath id="clip0_307_323">
                  <rect width="46" height="50" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {
              notificationsCount != "0" && <span
                style={{
                  // position: "absolute",
                  position: "relative",
                  top: "-10px",
                  right: "-10px",
                  background: "red",
                  border: "none",
                  borderRadius: "9999px",
                  color: "white",
                  textAlign: "center",
                  fontSize: "0.7rem",
                  fontWeight: "bolder",
                  clipPath: "circle()",
                  lineHeight: "7px",
                }}
                className="p-1"
              >
                {notificationsCount}
              </span>
            }
          </div>

          <div
            style={{
              position: "absolute",
              zIndex: 100000,
              top: notificationsCount==="0"?40:60,
              right: 40,
              background: "white",
              border: "1px solid lightgray",
              borderRadius: "4px",
              minHeight: "440px",
              maxHeight: "440px",
              minWidth: "270px",
              maxWidth: "270px",
              display: notificationsDisplay,
              fontSize: "0.9rem",
              overflowY: "auto",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            className="py-1 mt-1 px-2"
          >
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h5 style={{ fontSize: "1.2rem" }} className="mb-1 mt-1">
                Notifications
              </h5>
              <p
                style={{
                  textDecoration: "underline",
                  color: "gray",
                  fontSize: "0.7rem",
                  padding: 0,
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => markAllAsRead()}
              >
                Mark all as read
              </p>
            </div>
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                style={{
                  borderBottom: "1px solid var(--secondary-color)",
                  padding: "5px 1rem",
                  color:
                    notification.status === "0" ? "rgb(55, 134, 241)" : "gray",
                  background:
                    notification.status === "0"
                      ? "rgb(232, 240, 251)"
                      : "transparent",
                  borderRadius: notification.status === "0" ? "4px" : "0",
                }}
                className="d-flex flex-column my-2"
              >
                <p
                  style={{
                    color:
                      notification.status === "0"
                        ? "rgb(55, 134, 241)"
                        : "gray",
                    fontSize: "0.6rem",
                  }}
                >
                  {formateDate(notification.date)}
                </p>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleNotificationClick(
                      notification.id,
                      notification.acceptance
                    )
                  }
                >
                  {notification.message}
                </div>
                <div className="d-flex flex-row my-1 align-items-center">
                  {notification.acceptance === "2" && (
                    <p
                      style={{ fontSize: "0.6rem" }}
                      className="text-danger mx-2"
                    >
                      You rejected this Project
                    </p>
                  )}

                  {notification.acceptance === "1" && (
                    <p
                      style={{ fontSize: "0.6rem" }}
                      className="text-success mx-2"
                    >
                      You accepted this Project
                    </p>
                  )}
                  {
                    notification.acceptance === null &&
                    <div>
                      <button
                        className="btn btn-danger"
                        style={{
                          padding: "0.2rem 0.4rem",
                          fontSize: "0.6rem",
                          cursor: "pointer",
                        }}
                        onClick={() => declineProject(notification.id)}
                      >
                        Reject
                      </button>
                      <button
                        className="btn btn-success mx-3"
                        style={{
                          padding: "0.2rem 0.4rem",
                          fontSize: "0.6rem",
                          cursor: "pointer",
                        }}
                        onClick={() => acceptProject(notification.id)}
                      >
                        Accept
                      </button>
                    </div>
                  }
                  {/* {
                    notification.acceptance==="3" && 
                      ""
                    } */}

                  {/* {notification.acceptance === "2" ? (
                    <p style={{ fontSize: "0.6rem", color: "red" }}>
                      You rejected this Project
                    </p>
                  ) : (
                    <button
                      className="btn btn-danger"
                      style={{
                        padding: "0.2rem 0.4rem",
                        fontSize: "0.6rem",
                        cursor: "pointer",
                      }}
                      onClick={() => declineProject(notification.id)}
                    >
                      Reject
                    </button>
                  )}
                  {notification.acceptance === "1" ? (
                    <p style={{ fontSize: "0.6rem" }} className="text-success">
                      You accepted this Project
                    </p>
                  ) : (
                    <button
                      className="btn btn-success mx-3"
                      style={{
                        padding: "0.2rem 0.4rem",
                        fontSize: "0.6rem",
                        cursor: "pointer",
                      }}
                      onClick={() => acceptProject(notification.id)}
                    >
                      Accept
                    </button>
                  )} */}
                  <p
                    onClick={() => deleteNotifcation(notification.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 40 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.23077 9.77083H2.5V8.41667H14.6154M9.23077 9.77083V35.5H30.7692V9.77083M9.23077 9.77083H30.7692M14.6154 8.41667V3H25.3845V8.41667M14.6154 8.41667H25.3845M30.7692 9.77083H37.5V8.41667H25.3845"
                        stroke="gray"
                        stroke-width="3.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 15.5V30.5"
                        stroke="gray"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20 15.5V30.5"
                        stroke="gray"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M25 15.5V30.5"
                        stroke="gray"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </p>
                  {notification.status === "0" && (
                    <p
                      className="mx-3"
                      onClick={() => markAsRead(notification.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        width="16"
                        height="10"
                        viewBox="0 0 42 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.07279 10.1273C2.36985 9.42431 1.23014 9.42431 0.527202 10.1273C-0.175734 10.8302 -0.175734 11.9698 0.527202 12.6727L3.07279 10.1273ZM11.4 21L10.1272 22.2727C10.8301 22.9757 11.9699 22.9757 12.6728 22.2727L11.4 21ZM31.8727 3.07279C32.5757 2.36985 32.5757 1.23014 31.8727 0.527202C31.1698 -0.175734 30.0302 -0.175734 29.3273 0.527202L31.8727 3.07279ZM12.6728 10.1273C11.9699 9.42431 10.8301 9.42431 10.1272 10.1273C9.42427 10.8302 9.42427 11.9698 10.1272 12.6727L12.6728 10.1273ZM21 21L19.7273 22.2727C20.4302 22.9757 21.5698 22.9757 22.2727 22.2727L21 21ZM41.4727 3.07279C42.1757 2.36985 42.1757 1.23014 41.4727 0.527202C40.7698 -0.175734 39.6302 -0.175734 38.9273 0.527202L41.4727 3.07279ZM0.527202 12.6727L10.1272 22.2727L12.6728 19.7273L3.07279 10.1273L0.527202 12.6727ZM12.6728 22.2727L31.8727 3.07279L29.3273 0.527202L10.1272 19.7273L12.6728 22.2727ZM10.1272 12.6727L19.7273 22.2727L22.2727 19.7273L12.6728 10.1273L10.1272 12.6727ZM22.2727 22.2727L41.4727 3.07279L38.9273 0.527202L19.7273 19.7273L22.2727 22.2727Z"
                          fill="gray"
                        />
                      </svg>
                    </p>
                  )}
                </div>
                {/* <p
                  style={{
                    color:
                      notification.status === "0"
                        ? "rgb(55, 134, 241)"
                        : "gray",
                    fontSize: "0.6rem",
                  }}
                >
                  {formateDate(notification.date)}
                </p> */}
              </div>
            ))}
          </div>
        </div>

        <img src={profile} alt="" className="dashboard-header-profilePic" />
        <p className="mx-1">{username}</p>
      </div>
      <SharedNotificationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        projectName={selectedNotification ? sharedProjectName : ""}
        sharedPerson={selectedNotification ? sharedPersonName : ""}
        sharedDate={selectedNotification ? sharedProjectDate : ""}
        onAccept={() => acceptProject(selectedNotification)}
        onReject={() => declineProject(selectedNotification)}
        sharedEmail={selectedNotification ? sharedPersonEmail : ""}
        sharedAccessType={selectedNotification ? sharedAccessType : ""}
        acceptanceStatus={selectedNotification ? acceptanceStatus : ""}
        previous={selectedNotification ? previous : ""}
      />
    </div>
  );
};

export default DashboardRightHeader;
