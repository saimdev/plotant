import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Header.css";

export function Footer() {
  return (
    <div className="mt-5">
      <footer
        className="text-center text-white"
        style={{ backgroundColor: "#15589c" }}
      >
        <div className="">
          <section className="mt-5">
            <div className="row text-center d-flex justify-content-center pt-5">
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/" className="text-white">
                    Home
                  </Link>
                </h6>
              </div>

              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="#!" className="text-white">
                    Features
                  </Link>
                </h6>
              </div>

              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="#!" className="text-white">
                    Product
                  </Link>
                </h6>
              </div>

              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="#!" className="text-white">
                    API{" "}
                    <span
                      style={{
                        fontSize: "0.3rem",
                        border: "1px solid #dbc0fe",
                        borderRadius: "5px",
                        padding: "2px",
                      }}
                    >
                      Coming Soon
                    </span>
                  </Link>
                </h6>
              </div>

              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="#!" className="text-white">
                    Pricing{" "}
                    <span
                      style={{
                        fontSize: "0.3rem",
                        border: "1px solid #dbc0fe",
                        borderRadius: "5px",
                        padding: "2px",
                      }}
                    >
                      Coming Soon
                    </span>
                  </Link>
                </h6>
              </div>
            </div>
          </section>

          <hr className="my-5" />

          <section className="mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <p>
                  Elevate your data analysis with advanced statistics and AI.
                  Effortlessly create, analyze, and interpret complex data plots
                  for academic and commercial insights.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center mb-5">
            <Link to="" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="" className="text-white me-4">
              <i className="fab fa-google"></i>
            </Link>
            <Link to="" className="text-white me-4">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="" className="text-white me-4">
              <i className="fab fa-linkedin"></i>
            </Link>
            <Link to="" className="text-white me-4">
              <i className="fab fa-github"></i>
            </Link>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024 Copyright:
          <Link
            className="text-white mx-1 footer-web-link"
            to="https://plotant.com/"
          >
            plotant.com
          </Link>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
