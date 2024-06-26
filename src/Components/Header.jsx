import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Header.css";
import HeaderLogo from "./HeaderLogo";
import { useTheme } from "./ThemeContext";

export function Header() {
  const { toggleTheme } = useTheme();
  const [theme, setTheme] = useState();

  useEffect(() => {
    // console.log(localStorage.getItem('theme'));
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  return (
    <nav class="header py-3 container-fluid">
      <div className="d-flex flex-row align-items-center justify-content-around">
        <div className="header-heading">
          <Link to="/">
            <HeaderLogo />
          </Link>
        </div>
        <div className="header-links">
          <Link to="/">Home</Link>
          <Link to="">Features</Link>
          <Link to="">Product</Link>
          {/* <Link to="">Contact Us</Link> */}
          <Link to="" className="">
            API{" "}
            <span
              style={{
                fontSize: "0.3rem",
                border: "1px solid #15589c",
                borderRadius: "5px",
                padding: "2px",
              }}
            >
              Coming Soon
            </span>
          </Link>
          <Link to="" className="">
            Pricing{" "}
            <span
              style={{
                fontSize: "0.3rem",
                border: "1px solid #15589c",
                borderRadius: "5px",
                padding: "2px",
              }}
            >
              Coming Soon
            </span>
          </Link>
        </div>
        <div className="header-onboarding">
          <button
            className="mx-3"
            onClick={() => {
              toggleTheme();
              setTheme((prevTheme) =>
                prevTheme === "light" ? "dark" : "light"
              );
            }}
          >
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M22.16 12.0801C22.16 17.6471 17.647 22.1601 12.08 22.1601C6.51297 22.1601 2 17.6471 2 12.0801C2 6.51309 6.51297 2.00012 12.08 2.00012C12.8206 1.9964 13.5591 2.08031 14.28 2.25012C11.4268 3.06703 9.55951 5.79948 9.83498 8.75447C10.1104 11.7095 12.4507 14.0497 15.4057 14.3251C18.3606 14.6006 21.0931 12.7333 21.91 9.88012C22.0798 10.601 22.1637 11.3395 22.16 12.0801Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16.75 11.75C16.75 14.5114 14.5114 16.75 11.75 16.75C8.98858 16.75 6.75 14.5114 6.75 11.75C6.75 8.98858 8.98858 6.75 11.75 6.75C14.5114 6.75 16.75 8.98858 16.75 11.75Z"
                  fill="white"
                />
                <path
                  d="M11.75 5.5C12.162 5.49461 12.4946 5.16196 12.5 4.75V1.75C12.5 1.33579 12.1642 1 11.75 1C11.3358 1 11 1.33579 11 1.75V4.75C11.0054 5.16196 11.338 5.49461 11.75 5.5Z"
                  fill="white"
                />
                <path
                  d="M11.75 18C11.338 18.0054 11.0054 18.338 11 18.75V21.75C11 22.1642 11.3358 22.5 11.75 22.5C12.1642 22.5 12.5 22.1642 12.5 21.75V18.75C12.4946 18.338 12.162 18.0054 11.75 18Z"
                  fill="white"
                />
                <path
                  d="M6.27 7.33C6.56282 7.62245 7.03718 7.62245 7.33 7.33C7.62245 7.03718 7.62245 6.56282 7.33 6.27L5.21 4.15C5.02303 3.94935 4.74144 3.86675 4.47571 3.93461C4.20998 4.00248 4.00248 4.20998 3.93461 4.47571C3.86675 4.74144 3.94935 5.02303 4.15 5.21L6.27 7.33Z"
                  fill="white"
                />
                <path
                  d="M17.23 16.17C16.9345 15.8946 16.474 15.9028 16.1884 16.1884C15.9028 16.474 15.8946 16.9345 16.17 17.23L18.29 19.35C18.4299 19.4916 18.6209 19.5709 18.82 19.57C19.0193 19.5721 19.2108 19.4926 19.35 19.35C19.6425 19.0572 19.6425 18.5828 19.35 18.29L17.23 16.17Z"
                  fill="white"
                />
                <path
                  d="M5.5 11.75C5.49461 11.338 5.16196 11.0054 4.75 11H1.75C1.33579 11 1 11.3358 1 11.75C1 12.1642 1.33579 12.5 1.75 12.5H4.75C5.16196 12.4946 5.49461 12.162 5.5 11.75Z"
                  fill="white"
                />
                <path
                  d="M21.75 11H18.75C18.3358 11 18 11.3358 18 11.75C18 12.1642 18.3358 12.5 18.75 12.5H21.75C22.1642 12.5 22.5 12.1642 22.5 11.75C22.5 11.3358 22.1642 11 21.75 11Z"
                  fill="white"
                />
                <path
                  d="M6.27 16.17L4.15 18.29C3.85754 18.5828 3.85754 19.0572 4.15 19.35C4.28923 19.4926 4.48071 19.5721 4.68 19.57C4.87906 19.5709 5.07011 19.4916 5.21 19.35L7.33 17.23C7.60536 16.9345 7.59723 16.474 7.31162 16.1884C7.02601 15.9028 6.56551 15.8946 6.27 16.17Z"
                  fill="white"
                />
                <path
                  d="M16.75 7.55C16.9491 7.55094 17.1401 7.47164 17.28 7.33L19.35 5.21C19.5507 5.02303 19.6332 4.74144 19.5654 4.47571C19.4975 4.20998 19.29 4.00248 19.0243 3.93461C18.7586 3.86675 18.477 3.94935 18.29 4.15L16.17 6.27C15.8775 6.56282 15.8775 7.03718 16.17 7.33C16.3218 7.48474 16.5338 7.56515 16.75 7.55Z"
                  fill="white"
                />
              </svg>
            )}
          </button>
          <Link to="/login">Signin</Link>
          <Link to="/register" className="header-signup-btn p-2">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
