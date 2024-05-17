import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/NewProjectTopMenu.css";
import HeaderLogo from "../HeaderLogo";
import { useTheme } from "../ThemeContext";
import ShareModal from "../Modals/ShareModal";

export function NewProjectTopMenu({ projectId, fileId, updateLogs, projectName, accessType }) {
  const { toggleTheme } = useTheme();
  const [theme, setTheme] = useState();
  // const [userEmail, setUserEmail] = useState("");
  const [showModalShare, setShowModalShare] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem("theme"));
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  const shareProject = async ({ userEmail, accessType }) => {
    // if(accessType!=="read")
    console.log(userEmail, accessType);
    const res = await fetch("/analysis/sendNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: projectId,
        userEmail: userEmail,
        accessType: accessType,
      }),
      credentials: "include",
    });

    const data = await res.json();
    if (data.message) {
      window.alert(data.message);
    } else if (data.error) {
      window.alert(data.error);
    }
  };


  const formateDate = (dateStr) => {
    const dateObj = new Date(dateStr);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;

    return formattedDate;
  };

  const openLogs = async ()=>{
    const response = await fetch("/analysis/getLogs",
      {
        headers:{
          "Content-Type": "application/json"
        },
        method:"POST",
        body:JSON.stringify({
          projectId,
          fileId
        })
      }
    );
    const data = await response.json();
    console.log(data);

    updateLogs(data.data);
  }

  // const [accessType, setAccessType] = useState("");

  const handleShareButton = () => {
    console.log("check");
    setShowModalShare(true);
  };

  const closeShareModal = () => {
    setShowModalShare(false);
  };

  return (
    <nav
      class="header px-2"
      style={{ background: "var(--primary-color)", height: "max-content" }}
    >
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <div
            className="header-heading px-2 py-1"
            style={{ borderRight: "1px solid white" }}
          >
            <Link to="/dashboard" className="text-white">
              <HeaderLogo />
            </Link>
          </div>
          <div
            style={{ borderRight: "1px solid white", alignSelf: "center" }}
            className="px-2 py-1"
          >
            <Link to="/dashboard">
              <svg
                width="18"
                height="18"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M46.25 7.5H40C39.3097 7.5 38.75 8.05965 38.75 8.75V8.89727L47.5 15.8973V8.75C47.5 8.05965 46.9405 7.5 46.25 7.5Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M26.875 23.75C26.875 22.0241 28.2743 20.625 30 20.625C31.726 20.625 33.125 22.0241 33.125 23.75C33.125 25.476 31.726 26.875 30 26.875C28.2743 26.875 26.875 25.476 26.875 23.75Z"
                  fill="#1C274C"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M51.875 27.4013L53.8287 28.9643C54.6375 29.611 55.8172 29.48 56.4642 28.6713C57.111 27.8628 56.98 26.6828 56.1712 26.0358L35.8565 9.7841C32.4327 7.04495 27.5675 7.04495 24.1435 9.7841L3.82877 26.0358C3.02015 26.6828 2.88905 27.8628 3.53595 28.6713C4.18282 29.48 5.36275 29.611 6.17137 28.9643L8.12507 27.4013V53.125H5.00007C3.96452 53.125 3.12507 53.9645 3.12507 55C3.12507 56.0355 3.96452 56.875 5.00007 56.875H55C56.0355 56.875 56.875 56.0355 56.875 55C56.875 53.9645 56.0355 53.125 55 53.125H51.875V27.4013ZM23.1251 23.75C23.1251 19.9531 26.203 16.875 30 16.875C33.797 16.875 36.875 19.9531 36.875 23.75C36.875 27.547 33.797 30.625 30 30.625C26.203 30.625 23.1251 27.547 23.1251 23.75ZM30.1235 33.125C31.7857 33.125 33.2177 33.1248 34.3647 33.279C35.5937 33.4443 36.772 33.817 37.7275 34.7725C38.6832 35.7283 39.0557 36.9063 39.221 38.1355C39.3655 39.2105 39.3745 40.5365 39.375 42.0675C39.375 42.1698 39.375 42.2728 39.375 42.3765V53.125H35.625V42.5C35.625 40.6793 35.621 39.5023 35.5045 38.635C35.3952 37.8218 35.2187 37.567 35.076 37.4243C34.9332 37.2815 34.6782 37.105 33.865 36.9955C32.9977 36.879 31.8207 36.875 30 36.875C28.1792 36.875 27.0022 36.879 26.1352 36.9955C25.322 37.105 25.067 37.2815 24.9242 37.4243C24.7815 37.567 24.605 37.8218 24.4956 38.635C24.379 39.5023 24.3751 40.6793 24.3751 42.5V53.125H20.6251V42.3765C20.625 40.7145 20.6249 39.2823 20.7791 38.1355C20.9443 36.9063 21.317 35.7283 22.2726 34.7725C23.2282 33.817 24.4064 33.4443 25.6355 33.279C26.7822 33.1248 28.2145 33.125 29.8767 33.125H30.1235Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M26.875 23.75C26.875 22.0241 28.2743 20.625 30 20.625C31.726 20.625 33.125 22.0241 33.125 23.75C33.125 25.476 31.726 26.875 30 26.875C28.2743 26.875 26.875 25.476 26.875 23.75Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
          <div
            style={{ borderRight: "1px solid white", alignSelf: "center" }}
            className="px-2 py-1"
          >
            <Link
              to="/dashboard"
              style={{
                background: "white",
                fontSize: "0.7rem",
                color: "#15589c",
                borderRadius: "100px",
              }}
              className="px-2"
            >
              Upgrade
            </Link>
          </div>
        </div>
        <p style={{ fontSize: "0.9rem", color: "white" }}>{projectName} ( {accessType==="read"?"Read":"Read & Write"} )</p>
        <div className="d-flex flex-row align-items-center newproject-top-right-links">
          {/* <Link to="" style={{borderRight:'1px solid white', borderLeft:'1px solid white'}} className="px-2 py-1">Review</Link> */}
          <Link
            to=""
            style={{
              borderRight: "1px solid white",
              borderLeft: "1px solid white",
            }}
            className={`px-2 py-1 ${accessType==="read"? "disabled-component":""}`}
            onClick={handleShareButton}
          >
            Share
          </Link>

          {showModalShare && (
            <div className="d-flex flex-row justify-content-center w-100">
              <ShareModal
                show={showModalShare}
                onClose={closeShareModal}
                onSubmit={shareProject}
              />
            </div>
          )}
          <Link
            to=""
            style={{ borderRight: "1px solid white" }}
            className={`px-2 py-1 ${accessType==="read"? "disabled-component":""}`}
          >
            Save
          </Link>
          {
            fileId && <Link
            to=""
            style={{ borderRight: "1px solid white" }}
            className="px-2 py-1"
            onClick={openLogs}
          >
            History
          </Link>
          }
          {/* <Link to="" className="px-2 py-1">Chat</Link> */}
          {/* <Link to="" className="nav-projects-link">Projects</Link>
                <select name="" id="" className="nav-account-link">
                    <option value="">Account</option>
                </select> */}
        </div>
      </div>
    </nav>
  );
}

export default NewProjectTopMenu;
