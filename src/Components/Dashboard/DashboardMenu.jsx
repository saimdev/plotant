import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/DashboardMenu.css";
import Draggable from "react-draggable";
// import {DashboardHeader} from "../Components/DashboardHeader";

export function DashboardMenu() {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const handleNewProjectClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleCreateProject = () => {
    // Handle creating new project with project name
    console.log("Creating project with name:", projectName);
    // Reset project name and close modal
    setProjectName("");
    setShowModal(false);
    navigate("/newProject");
  };

  // if(loader){
  //   return (
  //     <div className="loader d-flex text-center flex-column justify-content-center align-items-center">
  //         <LandingPageLoader/>
  //         <h1>PlotAnt</h1>
  //     </div>
  //   )
  // }
  const nodeRef = useRef(null);
  return (
    <div className="dashboardmenu d-flex flex-column py-4">
      <Link
        className="dashboard-menu-newproject mx-3 mb-2"
        onClick={handleNewProjectClick}
      >
        New Project
      </Link>
      <Link>All Project</Link>
      <Link>Your Projects</Link>
      <Link>Shared With You</Link>
      <Link>Archived Projects</Link>
      <Link>Trashed Projects</Link>
      {showModal ? (
        <Draggable nodeRef={nodeRef}>
          <div id="newprojectModal" class="modal w-100" ref={nodeRef}>
            <div className="d-flex flex-row justify-content-between">
              <div className="p-3 w-100">
                <h5 style={{ fontSize: "1rem" }}>Enter Project Name</h5>
                <input
                  type="text"
                  value={projectName}
                  className="w-100 mt-2 mb-3 px-2 py-2"
                  onChange={handleProjectNameChange}
                  style={{ border: "1px solid lightgray", borderRadius: "3px" }}
                />
                <div style={{ alignItems: "end" }}>
                  <button
                    onClick={handleModalClose}
                    className="btn btn-danger"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateProject}
                    className="btn mx-3"
                    style={{
                      background: "var(--primary-color)",
                      fontSize: "0.9rem",
                      color: "white",
                    }}
                  >
                    Create Project
                  </button>
                </div>
              </div>
              <span
                className="close px-2"
                onClick={handleModalClose}
                style={{ cursor: "pointer" }}
              >
                x
              </span>
            </div>
          </div>
        </Draggable>
      ) : (
        ""
      )}
    </div>
  );
}

export default DashboardMenu;
