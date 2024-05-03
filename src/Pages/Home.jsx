import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Home.css";
import { Header } from "../Components/Header";
import LandingPageLoader from "../Components/Loaders/LandingPageLoader";
import HomeSectionLoader from "../Components/Loaders/HomeSectionLoader";
import UploadAndFetch from "../Components/DataUpload/UploadAndFetch";
import Footer from "../Components/Footer";

export function Home() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (loader) {
    return (
      <div className="loader d-flex text-center flex-column justify-content-center align-items-center">
        <LandingPageLoader />
        <h1>PlotAnt</h1>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="homebg"></div>
      <Header />
      <section className="home-section d-flex flex-row align-items-center justify-content-center">
        <div className="home-left-section d-flex flex-column justify-content-start mx-3">
          {/* <h1 className="home-left-section-heading">PlotAnt</h1> */}
          <div className="version-control d-flex flex-row justify-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M13 6C12.8011 6 12.6103 5.92098 12.4697 5.78033C12.329 5.63968 12.25 5.44891 12.25 5.25C12.25 4.85218 12.092 4.47064 11.8107 4.18934C11.5294 3.90804 11.1478 3.75 10.75 3.75C10.5511 3.75 10.3603 3.67098 10.2197 3.53033C10.079 3.38968 10 3.19891 10 3C10 2.80109 10.079 2.61032 10.2197 2.46967C10.3603 2.32902 10.5511 2.25 10.75 2.25C11.1478 2.25 11.5294 2.09196 11.8107 1.81066C12.092 1.52936 12.25 1.14782 12.25 0.75C12.25 0.551088 12.329 0.360322 12.4697 0.21967C12.6103 0.0790176 12.8011 0 13 0C13.1989 0 13.3897 0.0790176 13.5303 0.21967C13.671 0.360322 13.75 0.551088 13.75 0.75C13.75 1.14782 13.908 1.52936 14.1893 1.81066C14.4706 2.09196 14.8522 2.25 15.25 2.25C15.4489 2.25 15.6397 2.32902 15.7803 2.46967C15.921 2.61032 16 2.80109 16 3C16 3.19891 15.921 3.38968 15.7803 3.53033C15.6397 3.67098 15.4489 3.75 15.25 3.75C14.8522 3.75 14.4706 3.90804 14.1893 4.18934C13.908 4.47064 13.75 4.85218 13.75 5.25C13.75 5.44891 13.671 5.63968 13.5303 5.78033C13.3897 5.92098 13.1989 6 13 6Z"
                fill="#15589c"
              />
              <path
                d="M6 16C5.73478 16 5.48043 15.8946 5.29289 15.7071C5.10536 15.5196 5 15.2652 5 15C5 13.9391 4.57857 12.9217 3.82843 12.1716C3.07828 11.4214 2.06087 11 1 11C0.734784 11 0.48043 10.8946 0.292893 10.7071C0.105357 10.5196 0 10.2652 0 10C0 9.73478 0.105357 9.48043 0.292893 9.29289C0.48043 9.10536 0.734784 9 1 9C2.06087 9 3.07828 8.57857 3.82843 7.82843C4.57857 7.07828 5 6.06087 5 5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4C6.26522 4 6.51957 4.10536 6.70711 4.29289C6.89464 4.48043 7 4.73478 7 5C7 6.06087 7.42143 7.07828 8.17157 7.82843C8.92172 8.57857 9.93913 9 11 9C11.2652 9 11.5196 9.10536 11.7071 9.29289C11.8946 9.48043 12 9.73478 12 10C12 10.2652 11.8946 10.5196 11.7071 10.7071C11.5196 10.8946 11.2652 11 11 11C9.93913 11 8.92172 11.4214 8.17157 12.1716C7.42143 12.9217 7 13.9391 7 15C7 15.2652 6.89464 15.5196 6.70711 15.7071C6.51957 15.8946 6.26522 16 6 16Z"
                fill="#15589c"
              />
            </svg>
            <p className="mx-3">Beta Version released</p>
            <Link to="">Learn more</Link>
          </div>
          <h1 className="mt-2">Your data with real-time analytics</h1>
          <p className="mt-4">
            Elevate your data analysis with advanced statistics and AI.
            Effortlessly create, analyze, and interpret complex data plots for
            academic and commercial insights.
          </p>
          <Link to="" className="mt-4 py-2 px-3 text-center">
            Get Started
          </Link>
        </div>
        <div className="home-right-section text-center mx-3">
          <HomeSectionLoader />
        </div>
      </section>
      <section
        className="features-section d-flex flex-column align-items-center justify-content-center px-5 mx-5"
        style={{ height: "65vh" }}
      >
        <div className="d-flex flex-row justify-content-center align-items-center features-starter">
          <div className="d-flex flex-row justify-content-around align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="18"
              viewBox="0 0 27 18"
              fill="none"
            >
              <path
                d="M26.232 8.34696C25.0487 5.97793 23.2331 3.98243 20.986 2.58128C18.739 1.18013 16.1481 0.427949 13.5 0.407959C10.852 0.428174 8.26124 1.18045 6.01421 2.58158C3.76719 3.9827 1.95151 5.97807 0.768028 8.34696C0.665726 8.54943 0.612427 8.77311 0.612427 8.99996C0.612427 9.22681 0.665726 9.45049 0.768028 9.65296C1.95133 12.022 3.76696 14.0175 6.01403 15.4186C8.26109 16.8198 10.852 17.572 13.5 17.592C16.148 17.5717 18.7388 16.8195 20.9858 15.4183C23.2329 14.0172 25.0485 12.0218 26.232 9.65296C26.3343 9.45049 26.3876 9.22681 26.3876 8.99996C26.3876 8.77311 26.3343 8.54943 26.232 8.34696ZM13.5 15.447C12.2255 15.447 10.9796 15.069 9.91993 14.3609C8.86022 13.6529 8.03428 12.6465 7.54655 11.469C7.05882 10.2915 6.9312 8.99581 7.17985 7.7458C7.42849 6.49578 8.04222 5.34757 8.94343 4.44636C9.84464 3.54515 10.9929 2.93142 12.2429 2.68278C13.4929 2.43414 14.7886 2.56175 15.966 3.04948C17.1435 3.53721 18.1499 4.36315 18.858 5.42286C19.5661 6.48257 19.944 7.72846 19.944 9.00296C19.9432 10.7115 19.264 12.3498 18.0556 13.5576C16.8472 14.7655 15.2086 15.444 13.5 15.444V15.447ZM13.5 4.70696C13.1164 4.71241 12.7353 4.76959 12.367 4.87696C12.6714 5.28934 12.8177 5.79722 12.7794 6.30831C12.7411 6.8194 12.5207 7.29979 12.1583 7.66219C11.7959 8.0246 11.3155 8.24498 10.8044 8.28329C10.2933 8.3216 9.78541 8.17529 9.37303 7.87096C9.13812 8.73617 9.18045 9.65326 9.49405 10.4932C9.80765 11.3331 10.3767 12.0535 11.1212 12.553C11.8657 13.0525 12.7481 13.306 13.6441 13.2778C14.5402 13.2496 15.4049 12.9411 16.1165 12.3958C16.8281 11.8504 17.3507 11.0956 17.6109 10.2377C17.871 9.3797 17.8556 8.46176 17.5667 7.61304C17.2779 6.76431 16.7302 6.02753 16.0006 5.5064C15.2711 4.98527 14.3966 4.70602 13.5 4.70796V4.70696Z"
                fill="#15589c"
              />
            </svg>
            <p className="mx-2">Why PlotAnt</p>
          </div>
        </div>
        <h3 className="mt-4 text-center">
          Get actionable insights from Big Data in 3 steps
        </h3>
        <p
          className="text-center mt-3 mb-1"
          style={{ color: "gray", fontSize: "1.2rem" }}
        >
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <div className="d-flex flex-row justify-content-around align-items-center my-5">
          <div className="text-center d-flex flex-column justify-content-center align-items-center px-5">
            <img
              src={require("../assets/imgs/insight.png")}
              alt=""
              className="insight-img"
            />
            <h4 className="my-3" style={{ fontSize: "1.2rem" }}>
              Valuable business insights
            </h4>
            <p style={{ color: "gray", fontSize: "0.9rem" }}>
              Collect processed & cleansed data that is ready to be analyzed to
              gather valuable business insights.
            </p>
          </div>
          <div className="text-center d-flex flex-column justify-content-center align-items-center px-4">
            <img
              src={require("../assets/imgs/algorithm.png")}
              alt=""
              className="insight-img"
              style={{ background: "#FFF1F0" }}
            />
            <h4 className="my-3" style={{ fontSize: "1.2rem" }}>
              Powerful Algorithms
            </h4>
            <p style={{ color: "gray", fontSize: "0.9rem" }}>
              With the help of powerful algorithms, quality rules & techniques,
              obtain simplified & enriched data.{" "}
            </p>
          </div>
          <div className="text-center d-flex flex-column justify-content-center align-items-center px-4">
            <img
              src={require("../assets/imgs/flowchart.png")}
              alt=""
              className="insight-img"
              style={{ background: "#F6FFED" }}
            />
            <h4 className="my-3" style={{ fontSize: "1.2rem" }}>
              Data in real-time
            </h4>
            <p style={{ color: "gray", fontSize: "0.9rem" }}>
              Collect data in real-time from multiple channels and move it into
              a data lake, in its original format.
            </p>
          </div>
        </div>
      </section>
      <UploadAndFetch />
      <div className="my-5 py-4"></div>
      <Footer />
    </div>
  );
}

export default Home;
