import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/NewProjectFirstLeftMenu.css";
import FileNameModal from "../Modals/FileNameModal";
import FolderNameModal from "../Modals/FolderNameModal";
import Draggable from "react-draggable";
import LandingPageLoader from "../Loaders/LandingPageLoader";
// import {DashboardHeader} from "../Components/DashboardHeader";

export function NewProjectFirstLeftMenu({
  onFileSelect,
  onFileId,
  onJsonData,
  onColumns,
  onGuestID,
  onTypes,
  onUniqueValues,
  onColumnsData,
  projectName,
  onAccessType
}) {
  const [loader, setLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // const [projectName, setProjectName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileId, setFileId] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [guestId, setGuestId] = useState("");
  const [types, setTypes] = useState(null);
  const [uniqueValues, setUniqueValues] = useState(null);
  const [columnsData, setColumnsData] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFolderName, setSelectedFolderName] = useState("");
  const [showFileNameModal, setShowModalFileName] = useState(false);
  const [showFolderNameModal, setShowModalFolderName] = useState(false);
  const [allFilesName, setAllFilesName] = useState([]);

  const handleFileNameLinkClick = () => {
    console.log("check");
    setShowModalFileName(true);
  };

  const closeModal = () => {
    setShowModalFileName(false);
  };

  const handleFileNameSubmit = (fileName) => {
    setSelectedFileName(fileName);
  };

  const handleFolderNameLinkClick = () => {
    console.log("check");
    setShowModalFolderName(true);
  };

  const closeModalFolder = () => {
    setShowModalFolderName(false);
  };

  const handleFolderNameSubmit = (folderName) => {
    setSelectedFolderName(folderName);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    console.log(allFilesName);
    const isFilePresent = allFilesName.some((file) => file.name === fileName);
    console.log(isFilePresent);
    let overwrite = 0;

    if (isFilePresent) {
      console.log("EXISTED FILE");
      // File is present in allFilesName state
      const confirmOverwrite = window.confirm(
        "A file with this name already exists. Do you want to overwrite it?"
      );

      if (!confirmOverwrite) {
        // User clicked cancel, do nothing
        return;
      } else {
        overwrite = 1;
      }
    }

    // Continue with file upload
    setSelectedFile(file);

    if (file) {
      const formData = new FormData();
      console.log(overwrite);
      formData.append("file", file);
      formData.append("projectname", projectName);
      formData.append("overWrite", overwrite);
      fetch("/analysis/saveFile", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.check) {
            console.log("FAWAD");
          }
          if (data.message) {
            window.alert(data.message);
            getAllFiles();
          } else if (data.error) {
            window.alert(data.error);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      getAllFiles(); // Assuming this function fetches all files again
    }
  };

  const getData = (fileId, fileName) => {
    // setJsonData(null);
    setFileId(fileId);
    const formData = new FormData();
    formData.append("fileId", fileId);
    formData.append("projectId", projectName);
    fetch("/analysis/getData", {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          console.log('jsonData',data.data);
          // console.log(data.columns);
          setJsonData(data.data);
          setColumns(data.columns);
          setGuestId(data.guest);
          setTypes(data.type);
          setColumnsData(data.columns_data);
          setUniqueValues(data.columns_unique_data);
          onFileSelect(fileName);
          onJsonData(data.data);
          onColumns(data.columns);
          onFileId(fileId);
          onGuestID(data.guest);
          onTypes(data.type);
          onUniqueValues(data.columns_unique_data);
          onColumnsData(data.columns_data);
          onAccessType(data.access_type);
        } else {
          console.error("Invalid data format");
        }
        // console.log(data);
        setLoader(false);
      })
      .catch((error) => {
      
        console.error(error);
        setLoader(false);
      });
  };

  const deleteFile = async () => {
    console.log(fileId);
    const res = await fetch("/analysis/fileDelete", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        fileId: fileId,
        projectId: projectName,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (data.message) {
      window.alert(data.message);
    } else {
      window.alert(data.error);
    }
    onFileSelect("");
    onJsonData([]);
    onColumns([data.columns]);
    onFileId("");
    onGuestID("");
    onTypes([]);
    onUniqueValues([]);
    onColumnsData([]);
    getAllFiles();
  };

  const renameFile = async (fileName) => {
    console.log(fileName);
    const res = await fetch("/analysis/fileRename", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        fileId: fileId,
        projectId: projectName,
        fileName: fileName,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (data.message) {
      window.alert(data.message);
    } else {
      window.alert(data.error);
    }
    onFileSelect("");
    onJsonData([]);
    onColumns([data.columns]);
    onFileId("");
    onGuestID("");
    onTypes([]);
    onUniqueValues([]);
    onColumnsData([]);
    getAllFiles();
  };

  const getAllFiles = () => {
    setLoader(true);
    // if (selectedFile) {
    // setLoader(true);
    // console.log(selectedFile);
    const formData = new FormData();
    formData.append("projectId", projectName);
    // fetch('/analysis/testing', {
    //   method: 'GET',
    // })
    //   .then(response=>console.log(response))
    //   .catch(error => {
    //     console.error(error);
    //     setLoader(false);
    //   })

    fetch("/analysis/openProject", {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setAllFilesName(data.files);
          console.log(data);
        } else {
          console.error("Invalid data format");
        }
        // console.log(data);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
    // }
    // console.log(loader);
  };

  const handleLinkClick = () => {
    console.log("Clicked");
    document.getElementById("fileInput").click();
  };

  useEffect(() => {
    getAllFiles();
  }, []);

  // const handleNewProjectClick = () => {
  //   setShowModal(true);
  // };

  // const handleModalClose = () => {
  //   setShowModal(false);
  // };

  // const handleProjectNameChange = (event) => {
  //   setProjectName(event.target.value);
  // };

  // const handleCreateProject = () => {
  //   // Handle creating new project with project name
  //   console.log("Creating project with name:", projectName);
  //   // Reset project name and close modal
  //   setProjectName("");
  //   setShowModal(false);
  // };

  if (loader) {
    return "";
  }
  // const nodeRef = useRef(null);
  return (
    <div className="newprojectfirstmenu pb-5 d-flex flex-column">
      <div
        className="w-100 d-flex flex-row align-items-center jsutify-content-between px-2 py-1"
        style={{ background: "#0b2c4e" }}
      >
        <div className="d-flex flex-row align-items-center w-100">
          <Link onClick={handleLinkClick}>
            <svg
              width="12"
              height="22"
              viewBox="0 0 40 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 32.5H25M20 27.5V37.5M22.5 2.5H10.5C7.69975 2.5 6.2996 2.5 5.23005 3.04497C4.28923 3.52432 3.52432 4.28923 3.04497 5.23005C2.5 6.2996 2.5 7.69975 2.5 10.5V39.5C2.5 42.3002 2.5 43.7005 3.04497 44.77C3.52432 45.7108 4.28923 46.4757 5.23005 46.955C6.2996 47.5 7.69975 47.5 10.5 47.5H29.5C32.3003 47.5 33.7005 47.5 34.77 46.955C35.7108 46.4757 36.4757 45.7108 36.955 44.77C37.5 43.7005 37.5 42.3002 37.5 39.5V17.5M22.5 2.5L37.5 17.5M22.5 2.5V13.5C22.5 14.9001 22.5 15.6002 22.7725 16.135C23.0123 16.6054 23.3945 16.9878 23.865 17.2275C24.3997 17.5 25.0998 17.5 26.5 17.5H37.5"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
          {showFileNameModal && (
            <div className="d-flex flex-row justify-content-center w-100">
              <FileNameModal
                show={showFileNameModal}
                onClose={closeModal}
                onSubmit={renameFile}
              />
            </div>
          )}
          {/* <Link className="mx-1" onClick={handleFolderNameLinkClick}>
            <svg
              width="20"
              height="11"
              viewBox="0 0 50 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 22.5H32.5M25 15V30M25.1568 5.15685L24.8432 4.84315C23.9785 3.97838 23.546 3.546 23.0415 3.2368C22.594 2.96265 22.1063 2.76063 21.5963 2.63815C21.0208 2.5 20.4092 2.5 19.1863 2.5H10.5C7.69975 2.5 6.2996 2.5 5.23005 3.04497C4.28923 3.52432 3.52432 4.28923 3.04497 5.23005C2.5 6.2996 2.5 7.69972 2.5 10.5V29.5C2.5 32.3003 2.5 33.7005 3.04497 34.77C3.52432 35.7108 4.28923 36.4757 5.23005 36.955C6.2996 37.5 7.69972 37.5 10.5 37.5H39.5C42.3002 37.5 43.7005 37.5 44.77 36.955C45.7108 36.4757 46.4757 35.7108 46.955 34.77C47.5 33.7005 47.5 32.3003 47.5 29.5V15.5C47.5 12.6997 47.5 11.2996 46.955 10.2301C46.4757 9.28923 45.7108 8.52432 44.77 8.04497C43.7005 7.5 42.3002 7.5 39.5 7.5H30.8137C29.5907 7.5 28.9792 7.5 28.4037 7.36185C27.8937 7.23937 27.406 7.03735 26.9585 6.7632C26.454 6.454 26.0215 6.02162 25.1568 5.15685Z"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
          {showFolderNameModal && (
            <div className="d-flex flex-row justify-content-center w-100">
              <FolderNameModal
                show={showFolderNameModal}
                onClose={closeModalFolder}
                onSubmit={handleFolderNameSubmit}
              />
            </div>
          )} */}
          {/* <Link onClick={handleLinkClick}>
            <svg
              width="18"
              height="14"
              viewBox="0 0 50 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.5 35.5H37.525M34 28H40C42.3298 28 43.4945 28 44.4135 28.3805C45.6385 28.888 46.612 29.8615 47.1195 31.0865C47.5 32.0055 47.5 33.1702 47.5 35.5C47.5 37.8298 47.5 38.9945 47.1195 39.9135C46.612 41.1385 45.6385 42.112 44.4135 42.6195C43.4945 43 42.3298 43 40 43H10C7.6703 43 6.50545 43 5.58658 42.6195C4.36145 42.112 3.38808 41.1385 2.8806 39.9135C2.5 38.9945 2.5 37.8298 2.5 35.5C2.5 33.1702 2.5 32.0055 2.8806 31.0865C3.38808 29.8615 4.36145 28.888 5.58658 28.3805C6.50545 28 7.6703 28 10 28H16M25 30.5V3M25 3L32.5 10.5M25 3L17.5 10.5"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link> */}
        </div>
        <div className="d-flex flex-row align-items-center">
          <Link className="mx-1" onClick={() => setShowModalFileName(true)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.88 10.83L48.7772 20.7269M8.20375 41.13L6.875 53.125L18.8697 51.7963L53.125 17.5228V13.4822L46.5178 6.875H42.4772L8.20375 41.13Z"
                stroke="white"
                stroke-width="3.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M36.7916 23.0991L20.2659 39.6247"
                stroke="white"
                stroke-width="3.75"
                stroke-miterlimit="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
          <Link onClick={() => deleteFile()}>
            <svg
              width="16"
              height="14"
              viewBox="0 0 40 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.23077 9.77083H2.5V8.41667H14.6154M9.23077 9.77083V35.5H30.7692V9.77083M9.23077 9.77083H30.7692M14.6154 8.41667V3H25.3845V8.41667M14.6154 8.41667H25.3845M30.7692 9.77083H37.5V8.41667H25.3845"
                stroke="white"
                stroke-width="3.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 15.5V30.5"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 15.5V30.5"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25 15.5V30.5"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
          <input
            type="file"
            name=""
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
      {/* <Link className="dashboard-menu-newproject mx-3 mb-2" onClick={handleNewProjectClick}>New Project</Link> */}
      {allFilesName.map((file, index) => (
        <Link
          key={file.id}
          onClick={() => getData(file.id, file.name)}
          // to={`/file/${encodeURIComponent(file)}`}
          style={{
            display: file ? "flex" : "none",
            // backgroundColor: file.id === fileId ? "transparent" : "#0f3e6d",
          }}
        >
          {file ? file.name : ""}
        </Link>
      ))}
    </div>
  );
}

export default NewProjectFirstLeftMenu;
