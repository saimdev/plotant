import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/DashboardHeader.css";
import HeaderLogo from "./HeaderLogo";
import { useTheme } from "./ThemeContext";

export function DashboardHeader() {
  const { toggleTheme } = useTheme();
  const [theme, setTheme] = useState();

  useEffect(() => {
    console.log(localStorage.getItem("theme"));
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  return (
    <nav
      class="header py-1 container-fluid px-4"
      style={{ background: "#35374B" }}
    >
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="header-heading">
          <Link to="/" className="text-white">
            <HeaderLogo width={45} height={45} />
            <h5 style={{ fontSize: "0.9rem" }}>PlotAnt</h5>
          </Link>
        </div>
        <div className="d-flex flex-row justify-content-around align-items-center nav-links">
          <Link to="">Features & Benefits</Link>
          <Link to="">Templates</Link>
          <Link to="">Plans & Pricing</Link>
          <Link to="">Help</Link>
          <Link to="" className="nav-projects-link">
            Projects
          </Link>
          <select name="" id="" className="nav-account-link">
            <option value="">Account</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default DashboardHeader;
