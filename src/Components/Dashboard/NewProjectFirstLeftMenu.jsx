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
  onAccessType,
  onProjectName,
  graphHistory,
  onGraphHistoryClick
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
  const [access_type, setAccessType] = useState("");

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
          console.log('jsonData', data.data);
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
          setAccessType(data.files[0].access_type);
          onAccessType(data.files[0].access_type);
          onProjectName(data.files[0].project_name);
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
    <div className={`newprojectfirstmenu pb-5 d-flex flex-column `}>
      <div
        className={`w-100 d-flex flex-row align-items-center jsutify-content-between px-2 py-1 ${access_type === "read" ? "disabled-component" : ""}`}
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
      <div className="d-flex flex-column w-100" style={{ borderTop: '1px solid lightgray' }}>
        <h5 style={{ fontSize: '0.9rem', fontWeight: 'bold', borderBottom: '1px solid lightgray' }} className="p-2">Project Files</h5>

        <div className="d-flex flex-column" style={{minHeight:'40vh', height:'40vh', overflowY:'auto'}}>
          <div className="d-flex flex-row align-items-center justify-content-center py-1 plotted-graph-name">
            {allFilesName.map((file, index) => (
              <Link
                key={file.id}
                onClick={() => getData(file.id, file.name)}
                className="file-names-link"
                style={{
                  display: file ? "flex" : "none",
                  fontSize: '0.8rem'
                }}
              >
                <p><span className="index-filename">{index + 1}.</span> {file ? file.name : ""}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex flex-column w-100 mt-5" style={{ borderTop: '1px solid lightgray', minHeight:'50vh', height:'50vh', overflowY:'auto' }}>
        <h5 style={{ fontSize: '0.9rem', fontWeight: 'bold', borderBottom: '1px solid lightgray' }} className="p-2">Plotted Graphs</h5>
        <div className="d-flex flex-column">
          {graphHistory.map((graph, index) => (
            <Link
              key={index}
              className="plotted-graph-name px-2 py-2"
              style={{
                display: graph ? "flex" : "none",
                fontSize: '0.8rem'
              }}
              onClick={()=>onGraphHistoryClick(index)}
            >
              <span style={{ background: 'var(--primary-color)' }} className="p-1 plotted-span"></span>
              <p style={{ fontSize: '0.8rem', textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }} className="mx-2 plotted-graph-name-p" title={graph[14]+', '+graph[0]+' Graph'}>{graph[14]}, {graph[0]}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewProjectFirstLeftMenu;
