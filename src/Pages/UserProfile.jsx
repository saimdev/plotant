import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Dashboard.css";
import "../assets/css/AllProjects.css";
import HeaderLogo from "../Components/HeaderLogo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardRightHeader from "../Components/DashbordRightHeader";

export function UserProfile() {
  const imagePaths = ["dp1", "dp2", "dp3"];
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  const randomImagePath = imagePaths[randomIndex];
  const profile = require(`../assets/imgs/${randomImagePath}.jpg`);
  const navigate = useNavigate();

  const [projectDetails, setProjectDetails] = useState([]);
  const [loader, setLoader] = useState(true);
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/account/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: newUsername,
        email: email,
        password: password,
        // currentPassword: currentPassword,
      }),
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
    if (data.message) {
      window.alert(data.message);
    } else if (data.error) {
      window.alert(data.error);
    }
    setPassword("");
  };

  useEffect(() => {
    authentication();
    getProjectDetails();
  }, []);

  const authentication = async () => {
    // e.preventDefault();
    // setLoading(true);
    setLoader(true);
    const res = await fetch("/account/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    console.log(res);
    const data = await res.json();
    console.log(data);
    if (data.error || !data) {
      //   window.alert(data.error);
      //   window.location.reload();
      navigate("/login");
    } else {
      setUsername(data.userName);
      setNewUsername(data.userName);
      setEmail(data.email);
    }
    // setLoading(false);
    setLoader(false);
  };

  const getProjectDetails = async () => {
    const res = await fetch("/analysis/projectsList", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
    setProjectDetails(data.projects);
  };

  const downloadCsvFile = async (projectId, projectname) => {
    try {
      const response = await axios.post(
        "/analysis/fileDownload",
        { projectID: projectId },
        { responseType: "blob" }
      );
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      // setFileUrl(url);

      // Automatically initiate the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${projectname}.zip`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error fetching zip file:", error);
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

  if (loader) {
    return "";
  }

  return (
    <div className="dashboard d-flex flex-row w-100">
      <div className="dashboard-menu d-flex flex-column px-4 py-3">
        <div>
          <div className="dashboard-header-heading header-heading">
            <Link to="/">
              <HeaderLogo />
            </Link>
          </div>
          <div className="d-flex flex-column align-items-start my-5">
            <label htmlFor="">MAIN MENU</label>
            <Link style={{ color: "#808080" }} to="/dashboard">
              <svg
                className="mx-2"
                width="25"
                height="25"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_304_313)">
                  <path
                    d="M32.56 50C35.6928 50 38.381 49.8355 40.627 49.3363C42.9017 48.8308 44.8735 47.9495 46.4115 46.4115C47.9495 44.8735 48.8308 42.9017 49.3363 40.627C49.8355 38.381 50 35.6928 50 32.56V25C50 22.2385 47.7615 20 45 20H25C22.2385 20 20 22.2385 20 25V45C20 47.7615 22.2385 50 25 50H32.56Z"
                    fill="#808080"
                  />
                  <path
                    d="M0 32.56C0 35.6928 0.1646 38.381 0.6638 40.627C1.1693 42.9017 2.05053 44.8735 3.58858 46.4115C5.12663 47.9495 7.09832 48.8308 9.37287 49.3363C9.5907 49.3845 9.80962 49.43 10.0294 49.4725C12.7407 49.9962 15 47.7015 15 44.94V25C15 22.2385 12.7614 20 10 20H5C2.23857 20 0 22.2385 0 25V32.56Z"
                    fill="#808080"
                  />
                  <path
                    d="M17.44 0C14.3072 0 11.619 0.1646 9.37286 0.6638C7.09831 1.1693 5.12661 2.05053 3.58856 3.58858C2.05051 5.12663 1.16928 7.09832 0.663783 9.37287C0.622283 9.55965 0.583233 9.74702 0.546558 9.93495C0.0106084 12.6817 2.34731 15 5.14581 15H44.9401C47.7016 15 49.9963 12.7407 49.4726 10.0294C49.4301 9.80962 49.3846 9.5907 49.3363 9.37287C48.8306 7.09832 47.9496 5.12663 46.4113 3.58858C44.8733 2.05053 42.9016 1.1693 40.6271 0.6638C38.3808 0.1646 35.6928 0 32.5601 0H17.44Z"
                    fill="#808080"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_304_313">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Dashboard
            </Link>
            <Link to="/allProjects">
              <svg
                className="mx-2"
                width="25"
                height="25"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.5 0H41.5C43.7543 0 45.9164 0.895533 47.5104 2.48959C49.1045 4.08365 50 6.24566 50 8.5V41.5C50 43.7543 49.1045 45.9164 47.5104 47.5104C45.9164 49.1045 43.7543 50 41.5 50H8.5C6.24566 50 4.08365 49.1045 2.48959 47.5104C0.895533 45.9164 0 43.7543 0 41.5V8.5C0 6.24566 0.895533 4.08365 2.48959 2.48959C4.08365 0.895533 6.24566 0 8.5 0ZM12.5 7.5C13.163 7.5 13.7989 7.76339 14.2678 8.23223C14.7366 8.70107 15 9.33696 15 10V30C15 30.663 14.7366 31.2989 14.2678 31.7678C13.7989 32.2366 13.163 32.5 12.5 32.5C11.837 32.5 11.2011 32.2366 10.7322 31.7678C10.2634 31.2989 10 30.663 10 30V10C10 9.33696 10.2634 8.70107 10.7322 8.23223C11.2011 7.76339 11.837 7.5 12.5 7.5ZM25 7.5C25.663 7.5 26.2989 7.76339 26.7678 8.23223C27.2366 8.70107 27.5 9.33696 27.5 10V25C27.5 25.663 27.2366 26.2989 26.7678 26.7678C26.2989 27.2366 25.663 27.5 25 27.5C24.337 27.5 23.7011 27.2366 23.2322 26.7678C22.7634 26.2989 22.5 25.663 22.5 25V10C22.5 9.33696 22.7634 8.70107 23.2322 8.23223C23.7011 7.76339 24.337 7.5 25 7.5ZM40 10C40 9.33696 39.7366 8.70107 39.2678 8.23223C38.7989 7.76339 38.163 7.5 37.5 7.5C36.837 7.5 36.2011 7.76339 35.7322 8.23223C35.2634 8.70107 35 9.33696 35 10V35C35 35.663 35.2634 36.2989 35.7322 36.7678C36.2011 37.2366 36.837 37.5 37.5 37.5C38.163 37.5 38.7989 37.2366 39.2678 36.7678C39.7366 36.2989 40 35.663 40 35V10Z"
                  fill="#808080"
                />
              </svg>
              All Projects
            </Link>
            <Link to="/yourProjects">
              <svg
                className="mx-2"
                width="25"
                height="22"
                viewBox="0 0 60 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M33.75 30C33.75 29.3138 33.5531 28.68 33.2306 28.125H26.7694C26.4469 28.68 26.25 29.3138 26.25 30C26.25 32.07 27.93 33.75 30 33.75C32.07 33.75 33.75 32.07 33.75 30ZM37.5 30C37.5 34.1419 34.1419 37.5 30 37.5C25.8581 37.5 22.5 34.1419 22.5 30C22.5 29.3475 22.6013 28.7231 22.7644 28.125H0V48.75C0 52.8919 3.35812 56.25 7.5 56.25H52.5C56.6419 56.25 60 52.8919 60 48.75V28.125H37.2356C37.3987 28.7231 37.5 29.3475 37.5 30ZM37.5 7.5H22.5V5.625C22.5 4.59 23.34 3.75 24.375 3.75H35.625C36.66 3.75 37.5 4.59 37.5 5.625V7.5ZM52.5 7.5H41.25V3.75C41.25 1.68 39.57 0 37.5 0H22.5C20.43 0 18.75 1.68 18.75 3.75V7.5H7.5C3.35812 7.5 0 10.8581 0 15V24.375H60V15C60 10.8581 56.6419 7.5 52.5 7.5Z"
                  fill="#808080"
                />
              </svg>
              Your Projects
            </Link>
            <Link to="/sharedProjects">
              <svg
                className="mx-2"
                width="25"
                height="25"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_526_5539)">
                  <path
                    d="M48.8672 -0.03125C42.6562 -0.03125 37.6172 5.00781 37.6172 11.2188C37.6172 11.6875 37.6465 12.1563 37.7051 12.6104L19.1748 21.8828C17.0801 19.8613 14.2822 18.7334 11.3672 18.7188C5.15625 18.7188 0.117188 23.7578 0.117188 29.9688C0.117188 36.1943 5.15625 41.2188 11.3672 41.2188C14.2676 41.2188 17.0654 40.0762 19.1455 38.0547L37.7051 47.3418C37.6465 47.7959 37.6172 48.2647 37.6172 48.7188C37.6172 54.9443 42.6562 59.9688 48.8672 59.9688C55.0781 59.9688 60.1172 54.9443 60.1172 48.7188C60.1172 42.5078 55.0781 37.4688 48.8672 37.4688C45.9668 37.4834 43.1689 38.626 41.0889 40.6328L22.5146 31.3604C22.5732 30.9063 22.6172 30.4375 22.6172 29.9688C22.6172 29.5146 22.5879 29.0459 22.5146 28.5918L41.0742 19.3047C43.1689 21.3262 45.9668 22.4688 48.8672 22.4688C55.0781 22.4688 60.1172 17.4443 60.1172 11.2188C60.1172 5.00781 55.0781 -0.03125 48.8672 -0.03125Z"
                    fill="#808080"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_526_5539">
                    <rect width="60" height="60" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Shared With You
            </Link>
            <Link to="/archivedProjects">
              <svg
                className="mx-2"
                width="26"
                height="22"
                viewBox="0 0 50 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 5C0 2.64298 1.49012e-07 1.46448 0.732225 0.732225C1.46448 1.49012e-07 2.64298 0 5 0H45C47.357 0 48.5355 1.49012e-07 49.2677 0.732225C50 1.46448 50 2.64298 50 5C50 7.35702 50 8.53552 49.2677 9.26777C48.5355 10 47.357 10 45 10H5C2.64298 10 1.46448 10 0.732225 9.26777C1.49012e-07 8.53552 0 7.35702 0 5Z"
                  fill="#808080"
                />
                <path
                  d="M45.1722 13.7508C45.5252 13.7509 45.8878 13.7511 46.25 13.7461V25.0007C46.25 34.4287 46.25 39.143 43.321 42.0717C40.4575 44.9352 35.888 44.9992 26.875 45.0007V27.3867L31.1063 32.0882C31.799 32.858 32.9845 32.9205 33.7543 32.2277C34.524 31.535 34.5865 30.3495 33.8937 29.5797L26.3937 21.2465C26.038 20.8512 25.5315 20.6257 25 20.6257C24.4685 20.6257 23.962 20.8512 23.6063 21.2465L16.1064 29.5797C15.4136 30.3495 15.476 31.535 16.2457 32.2277C17.0154 32.9205 18.2009 32.858 18.8937 32.0882L23.125 27.3867V45.0007C14.1121 44.9992 9.54242 44.9352 6.67892 42.0717C3.75 39.143 3.75 34.4287 3.75 25.0007V13.7461C4.1122 13.7511 4.47497 13.7509 4.82785 13.7508H45.1722Z"
                  fill="#808080"
                />
              </svg>
              Archived Projects
            </Link>
            <Link to="/trashedProjects">
              <svg
                className="mx-2"
                width="23"
                height="32"
                viewBox="0 0 35 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.89474 40.7018C2.89474 42.1805 5.06579 44.2105 6.51316 44.2105H28.2237C29.6711 44.2105 31.8421 42.1805 31.8421 40.7018V12.6316H2.89474V40.7018ZM34.7368 4.62632H27.0175L23.1579 0H11.5789L7.7193 4.62632H0V9.25263H34.7368V4.62632Z"
                  fill="#808080"
                />
              </svg>
              Trashed Projects
            </Link>
          </div>
        </div>
        <div className="d-flex flex-column align-items-start">
          <label htmlFor="">OTHER</label>
          <Link to="/profile" style={{ color: "#15589c" }}>
            <svg
              className="mx-2"
              width="25"
              height="25"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M49.6876 54H10.3145C8.19535 54 6.63046 51.9089 7.42974 49.9859C11.1383 41.0939 19.8508 36 29.9996 36C40.1514 36 48.8639 41.0939 52.5724 49.9859C53.3717 51.9089 51.8068 54 49.6876 54ZM17.75 18C17.75 11.382 23.247 5.99995 29.9996 5.99995C36.7552 5.99995 42.2491 11.382 42.2491 18C42.2491 24.618 36.7552 30 29.9996 30C23.247 30 17.75 24.618 17.75 18ZM59.867 52.9079C57.6407 42.8309 50.6768 35.3939 41.5111 32.0189C46.368 28.1879 49.2007 21.9928 48.1595 15.2098C46.9529 7.34079 40.2708 1.04393 32.2045 0.125931C21.0696 -1.14307 11.6252 7.34695 11.6252 18C11.6252 23.67 14.3079 28.7219 18.4911 32.0189C9.3223 35.3939 2.36149 42.8309 0.132072 52.9079C-0.676399 56.5709 2.337 60 6.16192 60H53.8372C57.6652 60 60.6786 56.5709 59.867 52.9079Z"
                fill="#15589c"
              />
            </svg>
            Profile
          </Link>
          <Link to="/logout" className="d-flex flex-row">
            <svg
              width="28"
              height="28"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M40.3125 30C40.3125 28.9645 39.473 28.125 38.4375 28.125H11.0061L15.9077 23.9236C16.694 23.2497 16.785 22.066 16.1111 21.2798C15.4372 20.4936 14.2535 20.4025 13.4673 21.0764L4.71727 28.5765C4.30167 28.9325 4.0625 29.4528 4.0625 30C4.0625 30.5473 4.30167 31.0675 4.71727 31.4235L13.4673 38.9235C14.2535 39.5975 15.4372 39.5065 16.1111 38.7203C16.785 37.934 16.694 36.7503 15.9077 36.0765L11.0061 31.875H38.4375C39.473 31.875 40.3125 31.0355 40.3125 30Z"
                fill="#808080"
              />
              <path
                d="M23.4375 20C23.4375 21.7555 23.4375 22.6332 23.8588 23.2638C24.0412 23.5368 24.2756 23.7712 24.5486 23.9536C25.1792 24.3749 26.057 24.3749 27.8125 24.3749H38.4375C41.544 24.3749 44.0625 26.8933 44.0625 30C44.0625 33.1065 41.544 35.625 38.4375 35.625H27.8125C26.057 35.625 25.179 35.625 24.5485 36.0462C24.2756 36.2287 24.0412 36.463 23.8589 36.736C23.4375 37.3665 23.4375 38.2442 23.4375 40C23.4375 47.071 23.4375 50.6065 25.6343 52.8032C27.831 55 31.366 55 38.437 55H40.937C48.008 55 51.5435 55 53.7402 52.8032C55.937 50.6065 55.937 47.071 55.937 40V20C55.937 12.929 55.937 9.3934 53.7402 7.1967C51.5435 5 48.008 5 40.937 5H38.437C31.366 5 27.831 5 25.6343 7.1967C23.4375 9.3934 23.4375 12.9289 23.4375 20Z"
                fill="#808080"
              />
            </svg>
            <p className="mx-2">Logout</p>
          </Link>
        </div>
      </div>
      <div className="dashboard-right-section d-flex flex-column w-100 px-4">
      <DashboardRightHeader username={username} profile={profile} />
        <div className="d-flex flex-column dashboard-right-section-bottom mt-3">
          <div className="d-flex flex-row w-100 justify-content-between align-items-center">
            <h4 className="my-3">Profile</h4>
            <div className="d-flex flex-row align-items-center">
              <p style={{ fontSize: "0.80rem", color: "#344955" }}>
                You're on the{" "}
                <span style={{ fontWeight: "700" }}>free plan</span>{" "}
                <span className="info-badge">i</span>
              </p>
              <Link
                style={{
                  fontSize: "0.9rem",
                  background: "#15589c",
                  borderRadius: "9999px",
                  color: "white",
                  padding: "2px 10px",
                }}
                className="mx-2"
              >
                Upgrade
              </Link>
            </div>
          </div>
          <div className="dashboard-right-section-body w-50">
            <form onSubmit={handleSubmit}>
              <div className="form-group my-2">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              {/* <div className="form-group my-2">
                <label htmlFor="password">Current Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-control"
                />
              </div> */}
              <div className="form-group my-2">
                <label htmlFor="password">Change Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              {/* Add more form fields as needed */}
              <button
                type="submit"
                className="btn btn-primary mt-3"
                style={{ background: "var(--primary-color)" }}
              >
                Update
              </button>
            </form>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center my-5">
            <div className="card-deck mb-3 text-center d-flex flex-row justify-content-around align-items-center w-100 flex-wrap">
              <div className="card shadow-sm w-25">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Free</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    $0 <small className="text-muted">/ mo</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>5 users included</li>
                    <li>2 GB of storage</li>
                    <li>Email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-lg btn-block btn-outline-primary signup-for-free"
                    style={{border:'1px solid #15589c', color:"#15589c"}}
                  >
                    Sign up for free
                  </button>
                </div>
              </div>
              <div className="card shadow-sm w-25">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Pro</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    $25 <small className="text-muted">/ mo</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>20 users included</li>
                    <li>10 GB of storage</li>
                    <li>Priority email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-lg btn-block btn-primary"
                    style={{backgroundColor:"#15589c"}}
                  >
                    Get started
                  </button>
                </div>
              </div>
              <div className="card shadow-sm w-25">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Enterprise</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    $99 <small className="text-muted">/ mo</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>illimited users included</li>
                    <li>50 GB of storage</li>
                    <li>Phone and email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-lg btn-block btn-primary"
                    style={{backgroundColor:"#15589c"}}
                  >
                    Contact us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
