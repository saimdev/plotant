import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/NewProject.css";
import NewProjectTopMenu from "../Components/Dashboard/NewProjectTopMenu";
import DashboardMenu from "../Components/Dashboard/DashboardMenu";
import DashboardHeader from "../Components/DashboardHeader";
import NewProjectFirstLeftMenu from "../Components/Dashboard/NewProjectFirstLeftMenu";
import NewProjectSecondLeftMenu from "../Components/Dashboard/NewProjectSecondLeftMenu";
import SelectChart from "../Components/Charts/SelectChart";
import LabelTable from "../Components/SpreadSheet/LabelTable";
import { useParams } from "react-router-dom";
import Table from "../Components/SpreadSheet/Table";
import UserTable from "../Components/SpreadSheet/UserTable";

export function NewProject() {
  const [loader, setLoader] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [guestId, setGuestId] = useState("");
  const [types, setTypes] = useState(null);
  const [uniqueValues, setUniqueValues] = useState(null);
  const [columnsData, setColumnsData] = useState(null);
  // const [graphName, setGraphName] = useState("");
  const [drag, setDrag] = useState(false);
  const { projectName } = useParams();
  // console.log(decodeURIComponent(projectName));
  // const [parentXAxis, setParentXAxis] = useState("");
  // const [parentYAxis, setParentYAxis] = useState("");
  const [graphName, setGraphName] = useState("");
  const [parameters, setParameters] = useState(null);
  // const [loader, setLoader] = useState(false);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedLegends, setSelectedLegends] = useState([]);
  // const [colorPalette, setColorPalette] = useState([]);
  const [barColors, setBarColors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLegendsOpen, setIsLegendsOpen] = useState(false);
  const [isOpenFilterX, setIsOpenFilterX] = useState(false);
  const [isOpenFilterY, setIsOpenFilterY] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(null);
  const options = ["Option 1", "Option 2", "Option 3"];
  // const [color, setColor] = useColor("#561ecb");
  // const [showFilters, setShowFilters] = useState(true);
  // const [showVisualizations, setShowVisualizations] = useState(true);
  // const [showData, setShowData] = useState(true);
  const [reference, setReference] = useState("");
  const [modalOption, setModalOption] = useState("color");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [xLabelColor, setXLabelColor] = useState("lightgray");
  const [yLabelColor, setYLabelColor] = useState("lightgray");
  const [textureColor, setTextureColor] = useState("#000000");
  const [colorStatesTexture, setColorStatesTexture] = useState([]);
  const [colorStatesBgTexture, setColorStatesBgTexture] = useState([]);
  const [textureBg, setTextureBg] = useState("#ffffff");
  const [borderColor, setBorderColor] = useState("#000000");
  const [graphHeadSize, setGraphHeadSize] = useState(16);
  const [graphHeadWeight, setGraphHeadWeight] = useState("normal");
  const [xLabelSize, setXLabelSize] = useState(12);
  const [xLabelWeight, setXLabelWeight] = useState("normal");
  const [yLabelSize, setYLabelSize] = useState(12);
  const [yLabelWeight, setYLabelWeight] = useState("normal");
  const [isContainerFilterOpen, setIsContainerFilterOpen] = useState(false);
  const [isContainerVisualOpen, setIsContainerVisualOpen] = useState(false);
  const [isContainerDataOpen, setIsContainerDataOpen] = useState(true);
  const [graphHeading, setGraphHeading] = useState("");
  const [fileId, setFileId] = useState("");
  const [stepSize, setStepSize] = useState(1);

  const [barBorders, setBarBoders] = useState(1);
  const [condition, setCondition] = useState([]);
  const [conditionalParameters, setConditionalParameters] = useState([]);
  const [yAxisConditions, setYAxisConditions] = useState([]);
  const [yAxisValue, setYAxisValue] = useState("");
  const [useTexture, setUseTexture] = useState(
    Array(barColors.length).fill(false)
  );
  const [graphHistory, setGraphHistory] = useState([]);
  const [legends, setLegends] = useState("");
  const [dictionaryState, setDictionaryState] = useState({});
  const [dlSize, setDLSize] = useState(12);
  const [dlColor, setDLColor] = useState("#ffffff");
  const [dlWeight, setDLWeight] = useState("normal");
  const [stepped, setStepped] = useState(false);
  const [dataLabelsConfig, setDataLabelsConfig] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [historyIndex, setHistoryIndex] = useState(0);

  const getFileNameWithoutExtension = (fileName) => {
    return fileName.split(".")[0];
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdownLegends = () => {
    setIsLegendsOpen(!isLegendsOpen);
  };

  const toggleDropdownFiltersX = () => {
    setIsOpenFilterX(!isOpenFilterX);
  };

  const toggleDropdownFiltersY = () => {
    setIsOpenFilterY(!isOpenFilterY);
  };

  const handleEditedResponse = (res) => {
    setParameters(res);
    setIsOpenFilterX(false);
    setIsOpenFilterY(false);
    setReference("");
    setIsModalOpen(false);
    setColumnsData(null);
    setCondition([]);
    setConditionalParameters([]);
    setLegends("");
    setDictionaryState([]);
    setColorStatesBgTexture([]);
    setColorStatesTexture([]);
    setStepped(false);
  };

  useEffect(()=>{
    console.log("JSON DATA CHANGED");
  },[jsonData]);

  useEffect(() => {
    handleGraphNameChange("");
    setXAxis("");
    setYAxis("");
    setSelectedLabels([]);
    setIsOpen(false);
    setIsOpenFilterX(false);
    setIsOpenFilterY(false);
    setReference("");
    setModalOption("color");
    setIsModalOpen(false);
    setXLabelColor("lightgray");
    setYLabelColor("lightgray");
    setGraphHeadSize(16);
    setGraphHeadWeight("normal");
    setXLabelSize(12);
    setXLabelWeight("normal");
    setYLabelSize(12);
    setYLabelWeight("normal");
    setIsContainerDataOpen(true);
    setIsContainerFilterOpen(false);
    setIsContainerVisualOpen(false);
    setGraphHeading("");
    // setColumnsData(null);
    setBarBoders(1);
    setCondition([]);
    setConditionalParameters([]);
    setTextureBg("white");
    setTextureColor("black");
    setLegends("");
    setDictionaryState([]);
    setColorStatesBgTexture([]);
    setColorStatesTexture([]);
    setBarBoders(1);
    setBorderColor("#000000");
    setDLSize(12);
    setDLWeight("normal");
    setDLColor("#ffffff");
    setStepped(false);
    setDataLabelsConfig(false);
    setFontFamily("Arial");
    setParameters(null);
  }, [fileId]);

  // const handleGraphNameChange = (newName) => {
  //   setGraphName(newName);
  //   onGraphNameChange(newName);
  // };

  const setLabels = (e, labelCheck) => {
    // console.log(labelCheck===1?e.target.innerText:e.target.value);
    setYAxisValue("");
    setCondition([]);
    setConditionalParameters([]);
    setYAxisConditions([]);
    setColorStatesTexture([]);
    setColorStatesBgTexture([]);
    setTextureBg("#ffffff");
    setTextureColor("#000000");
    setDictionaryState([]);
    // console.log("SAIM")
    setReference("");
    const labelValue = labelCheck === 1 ? e.target.innerText : e.target.value;
    // console.log(labelValue);
    const labelIndex = selectedLabels.indexOf(labelValue);
    // setConditionalParameters(null);
    if (labelIndex === -1) {
      if (xAxis.length === 0) {
        setXAxis(labelValue);
      } else if (yAxis.length === 0) {
        setYAxis(labelValue);
        fetch("/analysis/getLabels", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            x_label: xAxis,
            y_label: labelValue,
            fileId: fileId,
            projectId: projectName,
          }),
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data.x) && Array.isArray(data.y)) {
              setParameters(data);
              // console.log(data);
            } else {
              console.error("Invalid data format");
            }
          })
          .catch((error) => {
            alert(error);
          });
      }

      setSelectedLabels([...selectedLabels, labelValue]);
    } else {
      const updatedLabels = [...selectedLabels];
      updatedLabels.splice(labelIndex, 1);
      setSelectedLabels(updatedLabels);

      if (xAxis === labelValue) {
        setXAxis("");
        setParameters(null);
      } else if (yAxis === labelValue) {
        setYAxis("");
      }
    }
  };

  const handleContainerToggle = (container) => {
    switch (container) {
      case "data":
        setIsContainerDataOpen(true);
        setIsContainerVisualOpen(false);
        setIsContainerFilterOpen(false);
        break;
      case "visual":
        setIsContainerDataOpen(false);
        setIsContainerVisualOpen(true);
        setIsContainerFilterOpen(false);
        break;
      case "filter":
        setIsContainerDataOpen(false);
        setIsContainerVisualOpen(false);
        setIsContainerFilterOpen(true);
        break;
      default:
        setIsContainerDataOpen(false);
        setIsContainerVisualOpen(false);
        setIsContainerFilterOpen(false);
    }
  };
  //   const [loader, setLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 3000);

    return () => clearTimeout(timeout);
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

  const handleColorPaletteClick = (colors) => {
    // console.log("BarColors before", barColors);

    const generatedColorPalette = [];
    for (let i = 0; i < parameters.y.length - 4; i++) {
      generatedColorPalette.push(
        `#${Math.floor(Math.random() * 16777215).toString(16)}`
      );
    }

    const combinedColors = [...colors, ...generatedColorPalette];
    setBarColors(combinedColors);

    // console.log("BarColors After", barColors);
  };

  const options1 = [
    "Pie",
    "Doghnut",
    "Line",
    "Bar",
    "Horizontal",
    "Stepped",
    "Area",
    "Multiple",
    "AreaBar",
  ];

  const handleLinkHover = (linkName, event) => {
    // console.log('entered');
    setHoveredLink(linkName);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const setLegendCondition = (e) => {
    setCondition([]);
    setYAxisValue("");
    setConditionalParameters([]);
    setYAxisConditions([]);
    setColorStatesTexture([]);
    setColorStatesBgTexture([]);
    setTextureBg("#ffffff");
    setTextureColor("#000000");
    setDictionaryState([]);
    const labelValue = e.target.value;
    setLegends(labelValue);
    if (reference.length === 0) {
      setReference(labelValue);
      // console.log(yAxis);
      if (yAxis) {
        fetch("/analysis/getLegends", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            x_label: xAxis,
            y_label: yAxis,
            z: labelValue,
            fileId: fileId,
            projectId: projectName,
          }),
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data.x) && Array.isArray(data.y)) {
              setParameters(data);
              // console.log(data);
            } else {
              console.error("Invalid data format");
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
    } else {
      setColorStatesTexture([]);
      setColorStatesBgTexture([]);
      setTextureBg("#ffffff");
      setTextureColor("#000000");
      setDictionaryState([]);
      setReference("");
      setLegends("");
      fetch("/analysis/getLabels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          x_label: xAxis,
          y_label: yAxis,
          fileId: fileId,
          projectId: projectName,
        }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.x) && Array.isArray(data.y)) {
            setParameters(data);
            // console.log(data);
          } else {
            console.error("Invalid data format");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handlePreviousGraph = (index) => {
    // console.log(index);
    // console.log(graphHistory[index][16]);
    setHistoryIndex(index);
    setGraphName(graphHistory[index][0]);
    setParameters(graphHistory[index][1]);
    setBarColors(graphHistory[index][2]);
    setXAxis(graphHistory[index][3]);
    setYAxis(graphHistory[index][4]);
    setSelectedLabels(graphHistory[index][5]);
    setXLabelColor(graphHistory[index][6]);
    setYLabelColor(graphHistory[index][7]);
    setGraphHeadSize(graphHistory[index][8]);
    setGraphHeadWeight(graphHistory[index][9]);
    setXLabelSize(graphHistory[index][10]);
    setXLabelWeight(graphHistory[index][11]);
    setYLabelSize(graphHistory[index][12]);
    setYLabelWeight(graphHistory[index][13]);
    setGraphHeading(graphHistory[index][14]);
    setBarBoders(graphHistory[index][15]);
    setCondition(graphHistory[index][16]);
    setConditionalParameters(graphHistory[index][17]);
    setYAxisConditions(graphHistory[index][18]);
    setYAxisValue(graphHistory[index][19]);
    setTextureColor(graphHistory[index][20]);
    setTextureBg(graphHistory[index][21]);
    setLegends(graphHistory[index][22]);
    setReference(graphHistory[index][23]);
    setColorStatesTexture(graphHistory[index][24]);
    setColorStatesBgTexture(graphHistory[index][25]);
    setDictionaryState(graphHistory[index][26]);
    setBorderColor(graphHistory[index][27]);
    setDLSize(graphHistory[index][28]);
    setDLWeight(graphHistory[index][29]);
    setDLColor(graphHistory[index][30]);
    setStepped(graphHistory[index][31]);
    setDataLabelsConfig(graphHistory[index][32]);
    setFontFamily(graphHistory[index][33]);
    setStepSize(graphHistory[index][34]);
  };

  const newGraph = () => {
    // console.log(condition);
    // console.log(conditionalParameters);
    // console.log(yAxisConditions);
    const newGraphState = [
      graphName,
      parameters,
      barColors,
      xAxis,
      yAxis,
      selectedLabels,
      xLabelColor,
      yLabelColor,
      graphHeadSize,
      graphHeadWeight,
      xLabelSize,
      xLabelWeight,
      yLabelSize,
      yLabelWeight,
      graphHeading,
      barBorders,
      condition,
      conditionalParameters,
      yAxisConditions,
      yAxisValue,
      textureColor,
      textureBg,
      legends,
      reference,
      colorStatesTexture,
      colorStatesBgTexture,
      dictionaryState,
      borderColor,
      dlSize,
      dlWeight,
      dlColor,
      stepped,
      dataLabelsConfig,
      fontFamily,
      stepSize,
    ];
    setGraphHistory((prevHistory) => [newGraphState, ...prevHistory]);
    handleGraphNameChange("");
    setXAxis("");
    setYAxis("");
    setSelectedLabels([]);
    setIsOpen(false);
    setIsOpenFilterX(false);
    setIsOpenFilterY(false);
    setReference("");
    setModalOption("color");
    setIsModalOpen(false);
    setXLabelColor("lightgray");
    setYLabelColor("lightgray");
    setGraphHeadSize(16);
    setGraphHeadWeight("normal");
    setXLabelSize(12);
    setXLabelWeight("normal");
    setYLabelSize(12);
    setYLabelWeight("normal");
    setIsContainerDataOpen(true);
    setIsContainerFilterOpen(false);
    setIsContainerVisualOpen(false);
    setGraphHeading("");
    // setColumnsData(null);
    setBarBoders(1);
    setCondition([]);
    setConditionalParameters([]);
    setTextureBg("white");
    setTextureColor("black");
    setLegends("");
    setDictionaryState([]);
    setColorStatesBgTexture([]);
    setColorStatesTexture([]);
    setBarBoders(1);
    setBorderColor("#000000");
    setDLSize(12);
    setDLWeight("normal");
    setDLColor("#ffffff");
    setStepped(false);
    setDataLabelsConfig(false);
    setFontFamily("Arial");
    setStepSize(1);
    // setXAxis("");
    // setYAxis("");
    // setSelectedLabels([]);
    // setIsOpen(false);
    // setIsOpenFilterX(false);
    // setIsOpenFilterY(false);
    // setReference('');
    // setModalOption('color');
    // setIsModalOpen(false);
    // setXLabelColor('lightgray');
    // setYLabelColor('lightgray');
    // setGraphHeadSize(16);
    // setGraphHeadWeight('normal');
    // setXLabelSize(12);
    // setXLabelWeight('normal');
    // setYLabelSize(12);
    // setYLabelWeight('normal');
    // setGraphHeading('');
    // setBarBoders(1);
    // setCondition([]);
    // setConditionalParameters(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
    // console.log(barColors);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalOption("color");
  };

  const handleConditionChange = (e, option) => {
    let updatedCondition;
    if (condition.includes(option)) {
      updatedCondition = condition.filter((item) => item !== option);
    } else {
      updatedCondition = [...condition, option];
    }

    setCondition(updatedCondition);

    if (xAxis && yAxis && updatedCondition.length > 0) {
      const yValues = [];
      const filteredZ = {};
      updatedCondition.forEach((opt) => {
        const eIndex = parameters["x"].indexOf(opt);
        if (eIndex !== -1) {
          if (parameters["z"]) {
            filteredZ[opt] = parameters["z"][opt];
            yValues.push(parameters["y"][eIndex]);
          } else {
            yValues.push(parameters["y"][eIndex]);
          }
        }
      });
      if (Object.keys(filteredZ).length !== 0) {
        setConditionalParameters({ x: updatedCondition, z: filteredZ });
      } else {
        setConditionalParameters({ x: updatedCondition, y: yValues });
      }
    } else {
      setConditionalParameters({ x: null, y: null });
      setCondition([]);
    }
  };

  const handleYAxisConditionChange = (option, checked) => {
    // console.log(condition)
    let updatedConditions = { ...yAxisConditions };

    if (checked) {
      updatedConditions[option] = true;
    } else {
      delete updatedConditions[option];
    }
    // console.log(yAxisConditions);
    setYAxisConditions(updatedConditions);

    if (Object.keys(updatedConditions).length > 0 && yAxisValue) {
      const filteredValues = parameters["y"].reduce(
        (accumulator, value, index) => {
          if (updatedConditions.lessThan && value < parseFloat(yAxisValue)) {
            accumulator.indices.push(index);
          }
          if (updatedConditions.greaterThan && value > parseFloat(yAxisValue)) {
            accumulator.indices.push(index);
          }
          if (updatedConditions.equalTo && value === parseFloat(yAxisValue)) {
            accumulator.indices.push(index);
          }
          return accumulator;
        },
        { indices: [] }
      );

      const xValues = filteredValues.indices.map(
        (index) => parameters["x"][index]
      );

      setConditionalParameters({
        x: xValues,
        y: parameters["y"].filter((_, index) =>
          filteredValues.indices.includes(index)
        ),
      });
    } else {
      // setCondition([]);
      setYAxisConditions([]);
      setConditionalParameters({ x: null, y: null });
    }
  };

  const setYAxisFilterValue = (e) => {
    setYAxisValue(e.target.value);
  };

  const handleLinkLeave = () => {
    // console.log('left');
    setHoveredLink(null);
  };

  useEffect(() => {
    if (
      parameters &&
      graphHistory[historyIndex] &&
      parameters === graphHistory[historyIndex][1]
    ) {
      return;
    }

    if (parameters) {
      let generatedColorPalette;
      if (Array.isArray(parameters.y)) {
        generatedColorPalette = parameters.y.map(
          (_) => `#${Math.floor(Math.random() * 16777215).toString(16)}`
        );
      } else {
        generatedColorPalette = [
          `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        ];
      }
      setBarColors(generatedColorPalette);
    }
  }, [parameters, graphHistory, historyIndex]);
  const handleSelectedFile = (file) => {
    setSelectedFile(file);
    console.log("Selected file in parent component:", file);
  };
  const handleFileId = (fileId) => {
    setFileId(fileId);
    console.log("Selected file in parent component:", fileId);
  };
  const handleJsonData = (newJsonData) => {
    console.log(newJsonData);
    setJsonData(newJsonData);
    // setTimeout(() => {
    //   // Reset jsonData to null after 2 seconds
    //   setJsonData(null);
    // }, 2000);
  };
  const handleColumns = (columns) => {
    setColumns(columns);
  };
  const handleColumnsData = (columnsData) => {
    setColumnsData(columnsData);
  };
  const handleTypes = (types) => {
    setTypes(types);
  };
  const handleGuestId = (guestId) => {
    setGuestId(guestId);
  };
  const handleUniqueValues = (uniqueValues) => {
    setUniqueValues(uniqueValues);
  };

  const handleGraphNameChange = (newName) => {
    setGraphName(newName);
  };

  // if(loader){
  //   return (
  //     <div className="loader d-flex text-center flex-column justify-content-center align-items-center">
  //         <LandingPageLoader/>
  //         <h1>PlotAnt</h1>
  //     </div>
  //   )
  // }

  const deleteGraph = (index) => {
    const updatedHistory = [...graphHistory];
    updatedHistory.splice(index, 1);
    setGraphHistory(updatedHistory);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-main d-flex flex-column">
        <NewProjectTopMenu projectId={projectName} />
        <div className="d-flex flex-row">
          <NewProjectFirstLeftMenu
            onFileSelect={handleSelectedFile}
            onFileId={handleFileId}
            onJsonData={handleJsonData}
            onColumns={handleColumns}
            onGuestID={handleGuestId}
            onTypes={handleTypes}
            onUniqueValues={handleUniqueValues}
            onColumnsData={handleColumnsData}
            projectName={decodeURIComponent(projectName)}
          />
          {/* <NewProjectSecondLeftMenu selectedFile={selectedFile} jsonData={jsonData} columns={columns} guestId={guestId} types={types} uniqueValues={uniqueValues} columnsData={columnsData} onGraphNameChange={handleGraphNameChange}/> */}
          <div className="newprojectsecondmenu pb-5 d-flex flex-column">
            <div
              className="w-100 d-flex flex-row align-items-center jsutify-content-between px-2 py-1 newprojectsecondmenu-links"
              style={{ background: "#7c3232" }}
            >
              <div
                className={`d-flex flex-row align-items-center ${isContainerDataOpen
                  ? "custom-home-dashboard-menu-btn-data"
                  : ""
                  }`}
                style={{ borderRadius: "0 !important" }}
              >
                <div
                  className={`w-100 h-100 d-flex flex-row align-items-center py-1 px-2 ${isContainerDataOpen
                    ? "custom-home-dashboard-menu-btn custom-home-dashboard-menu-btn-data"
                    : ""
                    }`}
                  style={{
                    borderRight: "1px solid rgb(167, 167, 167)",
                    borderRadius: "0 !important",
                  }}
                >
                  <p
                    className="mx-1"
                    onClick={() => handleContainerToggle("data")}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Data{" "}
                  </p>
                </div>
                <div
                  className={`w-100 h-100 d-flex flex-row align-items-center py-1 px-2 justify-content-center ${isContainerVisualOpen
                    ? "custom-home-dashboard-menu-btn"
                    : ""
                    }`}
                  style={{
                    borderRight: "1px solid rgb(167, 167, 167)",
                    borderRadius: "0 !important",
                  }}
                >
                  <p
                    className=""
                    onClick={() => handleContainerToggle("visual")}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Visuals{" "}
                  </p>
                </div>
                <div
                  className={`w-100 h-100 d-flex flex-row align-items-center py-1 px-2 justify-content-center ${isContainerFilterOpen
                    ? "custom-home-dashboard-menu-btn"
                    : ""
                    }`}
                  style={{ borderRadius: "0 !important" }}
                >
                  <p
                    className=""
                    onClick={() => handleContainerToggle("filter")}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Filters{" "}
                  </p>
                </div>
              </div>
            </div>

            {selectedFile ? (
              <div>
                {isContainerDataOpen ? (
                  <div
                    className="custom-dropdown w-100 px-2 py-1"
                    style={{ color: "black" }}
                  >
                    <button
                      onClick={toggleDropdown}
                      className="d-flex flex-row justify-content-between align-items-center"
                      style={{ color: "black", border: "1px solid black" }}
                    >
                      {getFileNameWithoutExtension(selectedFile)}
                      {isOpen ? (
                        <img
                          src={require("../assets/imgs/upload.png")}
                          alt=""
                          style={{ width: "12px" }}
                        />
                      ) : (
                        <img
                          src={require("../assets/imgs/down-arrow.png")}
                          alt=""
                          style={{ width: "17px" }}
                        />
                      )}
                    </button>

                    {isOpen && (
                      <div className="custom-dropdown-list data-dropdown-list">
                        {columns.map((option, index) => (
                          <div
                            className="d-flex flex-row align-items-center"
                            id={`checkbox-${index}`}
                          >
                            <input
                              key={index}
                              type="checkbox"
                              name={option}
                              id={`checkbox`}
                              value={option}
                              onClick={(e) => setLabels(e)}
                              disabled={
                                selectedLabels.length >= 2 &&
                                !selectedLabels.includes(option)
                              }
                              checked={selectedLabels.includes(option)}
                            />
                            <label
                              htmlFor={`checkbox-${index}`}
                              className="mx-2"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => setLabels(e, 1)}
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
                {isContainerVisualOpen ? (
                  <div className="px-2 py-1">
                    <div className="graphs-display">
                      <div className="graphs-container d-flex flex-row justify-content-start flex-wrap">
                        {options1.map((option, index) => {
                          return (
                            <img
                              className="graphs-icon m-2 mx-3"
                              onMouseEnter={(e) => handleLinkHover(option, e)}
                              onMouseLeave={handleLinkLeave}
                              key={index}
                              src={require(`../assets/imgs/${option}.png`)}
                              alt={option} // Set alt attribute to graph name for accessibility
                              onClick={
                                parameters || option === "Pie"
                                  ? () => {
                                    if (option === "Stepped") {
                                      handleGraphNameChange(option);
                                      setStepped(true);
                                    } else {
                                      handleGraphNameChange(option);
                                      setStepped(false);
                                    }
                                  }
                                  : undefined
                              }
                              style={{
                                cursor: parameters ? "pointer" : "default",
                              }}
                            />
                          );
                        })}
                        {hoveredLink && (
                          <div
                            style={{
                              position: "fixed",
                              top: position.y - 60,
                              left: position.x - 30,
                              background: "#eee2ff",
                              color: "white !important",
                              padding: "5px",
                              border: "1px solid #eee2ff",
                              borderRadius: "4px",
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                              zIndex: 9999,
                              fontSize: "0.8rem",
                            }}
                          >
                            {hoveredLink}
                          </div>
                        )}
                      </div>
                      <img
                        src={require("../assets/imgs/Table.png")}
                        alt=""
                        onMouseEnter={(e) => handleLinkHover("Table", e)}
                        onMouseLeave={handleLinkLeave}
                        className="mt-1"
                        onClick={() => handleGraphNameChange("")}
                      />
                    </div>
                    <div className="inputs mt-4">
                      <label htmlFor="">X-Axis</label>
                      <input type="text" name="" id="" value={xAxis} />
                    </div>
                    <div className="inputs">
                      <label htmlFor="">Y-Axis</label>
                      <input type="text" name="" id="" value={yAxis} />
                    </div>
                    <div className="inputs">
                      <button
                        onClick={toggleDropdownLegends}
                        className="d-flex flex-row justify-content-between align-items-center"
                      >
                        Legends
                        {!isLegendsOpen ? (
                          <img
                            src={require("../assets/imgs/upload.png")}
                            alt=""
                            style={{ width: "12px" }}
                          />
                        ) : (
                          <img
                            src={require("../assets/imgs/down-arrow.png")}
                            alt=""
                            style={{ width: "17px" }}
                          />
                        )}
                      </button>
                      {!isLegendsOpen && xAxis && yAxis && (
                        <div className="custom-dropdown-list">
                          {columns.map((option, index) => (
                            <div className="d-flex flex-row align-items-center">
                              <input
                                key={index}
                                type="checkbox"
                                name={option}
                                id=""
                                value={option}
                                onClick={(e) => setLegendCondition(e)}
                                disabled={!reference === option}
                                checked={reference === option}
                              />
                              <label htmlFor="" className="mx-2">
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="d-flex flex-row my-1 data-labels-config align-items-center">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        onChange={() => setDataLabelsConfig(!dataLabelsConfig)}
                      />
                      <label htmlFor="" className="mx-2">
                        Display DataLabels
                      </label>
                    </div>
                    {graphName && xAxis && yAxis ? (
                      <>
                        <div className="color-pallettes-graphs d-flex flex-row flex-wrap justify-content-start align-items-center">
                          <img
                            src={require("../assets/imgs/pallettes/pallette1.png")}
                            alt=""
                            className="my-2 mx-1"
                            onClick={() =>
                              handleColorPaletteClick([
                                "#7F27FF",
                                "#9F70FD",
                                "#FDBF60",
                                "#FF8911",
                              ])
                            }
                          />
                          <img
                            src={require("../assets/imgs/pallettes/pallette2.png")}
                            alt=""
                            className="my-2 mx-1"
                            onClick={() =>
                              handleColorPaletteClick([
                                "#211C6A",
                                "#59B4C3",
                                "#74E291",
                                "#EFF396",
                              ])
                            }
                          />
                          <img
                            src={require("../assets/imgs/pallettes/pallette3.png")}
                            alt=""
                            className="my-2 mx-1"
                            onClick={() =>
                              handleColorPaletteClick([
                                "#0C2D57",
                                "#FC6736",
                                "#FFB0B0",
                                "#EFECEC",
                              ])
                            }
                          />
                          <img
                            src={require("../assets/imgs/pallettes/pallette4.png")}
                            alt=""
                            className="my-2 mx-1"
                            onClick={() =>
                              handleColorPaletteClick([
                                "#F28585",
                                "#FFA447",
                                "#FFFC9B",
                                "#B7E5B4",
                              ])
                            }
                          />
                          <img
                            src={require("../assets/imgs/pallettes/pallette5.png")}
                            alt=""
                            className="my-2 mx-1"
                            onClick={() =>
                              handleColorPaletteClick([
                                "#0A1D56",
                                "#492E87",
                                "#37B5B6",
                                "#F2F597",
                              ])
                            }
                          />
                          <img
                            src={require("../assets/imgs/pallettes/pallette6.png")}
                            alt=""
                            className="my-2 mx-1"
                            onClick={() =>
                              handleColorPaletteClick([
                                "#1D2B53",
                                "#7E2553",
                                "#FF004D",
                                "#FAEF5D",
                              ])
                            }
                          />
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center">
                          <Link
                            to="#"
                            onClick={newGraph}
                            className="customize-home-btn customize-home-btn-graph mt-1"
                          >
                            New Graph
                          </Link>
                          <Link
                            to="#"
                            onClick={openModal}
                            className="customize-home-btn mt-1"
                          >
                            Customize Theme
                          </Link>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
                {isContainerFilterOpen ? (
                  <div className="custom-dropdown px-2 py-1">
                    {xAxis && parameters ? (
                      <button
                        onClick={toggleDropdownFiltersX}
                        className="d-flex flex-row justify-content-between align-items-center"
                      >
                        {xAxis}
                        {isOpenFilterX ? (
                          <img
                            src={require("../assets/imgs/upload.png")}
                            alt=""
                            style={{ width: "12px" }}
                          />
                        ) : (
                          <img
                            src={require("../assets/imgs/down-arrow.png")}
                            alt=""
                            style={{ width: "17px" }}
                          />
                        )}
                      </button>
                    ) : (
                      ""
                    )}

                    {parameters && isOpenFilterX && xAxis && (
                      <div className="custom-dropdown-list-filters">
                        {uniqueValues[xAxis].map((option, index) => (
                          <div
                            className="d-flex flex-row align-items-center"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              name={option}
                              id={option}
                              value={option}
                              onClick={(e) => handleConditionChange(e, option)}
                              checked={condition.includes(option)}
                            />
                            <label htmlFor={option} className="mx-2">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    {yAxis && parameters ? (
                      <button
                        onClick={toggleDropdownFiltersY}
                        className="d-flex flex-row justify-content-between align-items-center"
                      >
                        {yAxis}
                        {isOpenFilterY ? (
                          <img
                            src={require("../assets/imgs/upload.png")}
                            alt=""
                            style={{ width: "12px" }}
                          />
                        ) : (
                          <img
                            src={require("../assets/imgs/down-arrow.png")}
                            alt=""
                            style={{ width: "17px" }}
                          />
                        )}
                      </button>
                    ) : (
                      ""
                    )}
                    {parameters && isOpenFilterY && yAxis && (
                      <div className="custom-dropdown-list-filters">
                        <div className="d-flex flex-column align-items-start">
                          <div className="d-flex flex-row">
                            <input
                              type="checkbox"
                              id="lessThan"
                              value="lessThan"
                              onChange={(e) =>
                                handleYAxisConditionChange(
                                  "lessThan",
                                  e.target.checked
                                )
                              }
                              disabled={!yAxisValue}
                              checked={yAxisConditions.lessThan}
                            />
                            <label htmlFor="lessThan" className="mx-2">
                              Less than
                            </label>
                          </div>
                          <div className="d-flex flex-row">
                            <input
                              type="checkbox"
                              id="greaterThan"
                              value="greaterThan"
                              onChange={(e) =>
                                handleYAxisConditionChange(
                                  "greaterThan",
                                  e.target.checked
                                )
                              }
                              disabled={!yAxisValue}
                              checked={yAxisConditions.greaterThan}
                            />
                            <label htmlFor="greaterThan" className="mx-2">
                              Greater than
                            </label>
                          </div>
                          <div className="d-flex flex-row">
                            <input
                              type="checkbox"
                              id="equalTo"
                              value="equalTo"
                              onChange={(e) =>
                                handleYAxisConditionChange(
                                  "equalTo",
                                  e.target.checked
                                )
                              }
                              disabled={!yAxisValue}
                              checked={yAxisConditions.equalTo}
                            />
                            <label htmlFor="equalTo" className="mx-2">
                              Equals to
                            </label>
                          </div>
                          <input
                            type="number"
                            id="valueInput"
                            placeholder="Enter value"
                            onChange={(e) => setYAxisFilterValue(e)}
                            value={yAxisValue}
                            className="mt-2"
                            style={{
                              border: "1px solid lightgray",
                              borderRadius: "3px",
                              padding: "0 4px",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            className="graphs-home-container d-flex flex-row justify-content-center"
            style={{ paddingRight: "14px" }}
          >
            {/* {
                                  graphName && (
                                    <img src={require('../../assets/imgs/Table.png')} alt="" className="" onClick={()=>setGraphName('')}/>
                                  )
                                } */}
            {/* {
                                  xAxis && graphName==='Pie' && !yAxis?
                                  <SelectChart chartName={graphName} parameters={parameters? parameters:uniqueValues} xLabel={xAxis} yLabel={''} barColors={barColors} xLabelColor={xLabelColor} yLabelColor={yLabelColor} graphHeadSize={graphHeadSize} xLabelSize={xLabelSize} yLabelSize={yLabelSize} xLabelWeight={xLabelWeight} yLabelWeight={yLabelWeight} graphHeadWeight={graphHeadWeight} graphHeading={graphHeading} barBorders={barBorders} textureColor={textureColor} textureBg={textureBg} legends={legends} legendCheck={true} borderColor={borderColor} dlSize={dlSize} dlWeight={dlWeight} dlColor={dlColor} stepped={stepped} dataLabelsConfig={dataLabelsConfig} fontFamily={fontFamily} singlePie={true}/>:
                                  yAxis?'':
                                  // <img src={require('../../assets/imgs/graph.png')} alt="" style={{width:'46vw', height:'30vw'}}/>
                                  <h2 style={{alignSelf:'center'}}>PlotAnt- Visualize Your Data</h2>
                                } */}
            {xAxis && !graphName ? (
              <LabelTable
                jsonData={parameters ? parameters : uniqueValues}
                label={xAxis}
                column={"x"}
              />
            ) : yAxis ? (
              ""
            ) : (
              // <img src={require('../../assets/imgs/graph.png')} alt="" style={{width:'46vw', height:'30vw'}}/>
              <h2 style={{ alignSelf: "center" }}>
                PlotAnt- Visualize Your Data
              </h2>
            )}

            {yAxis && !graphName ? (
              parameters ? (
                <LabelTable
                  jsonData={parameters ? parameters : uniqueValues}
                  label={yAxis}
                  column={"y"}
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {/* {
                                  xAxis?
                                  <LabelTable jsonData={columnsData} label={xAxis} column={'u'}/>:''
                                }
                                {
                                  yAxis?
                                  <LabelTable jsonData={columnsData} label={yAxis} column={'u'}/>:''
                                } */}
            {graphName && xAxis && yAxis ? (
              condition.length !== 0 || yAxisConditions.length !== 0 ? (
                <SelectChart
                  chartName={graphName}
                  parameters={conditionalParameters}
                  xLabel={xAxis}
                  yLabel={yAxis}
                  barColors={barColors}
                  xLabelColor={xLabelColor}
                  yLabelColor={yLabelColor}
                  graphHeadSize={graphHeadSize}
                  xLabelSize={xLabelSize}
                  yLabelSize={yLabelSize}
                  xLabelWeight={xLabelWeight}
                  yLabelWeight={yLabelWeight}
                  graphHeadWeight={graphHeadWeight}
                  graphHeading={graphHeading}
                  barBorders={barBorders}
                  textureColor={textureColor}
                  textureBg={textureBg}
                  legends={legends}
                  legendCheck={true}
                  borderColor={borderColor}
                  dlSize={dlSize}
                  dlWeight={dlWeight}
                  dlColor={dlColor}
                  stepped={stepped}
                  dataLabelsConfig={dataLabelsConfig}
                  fontFamily={fontFamily}
                />
              ) : (
                <SelectChart
                  chartName={graphName}
                  parameters={parameters}
                  xLabel={xAxis}
                  yLabel={yAxis}
                  barColors={barColors}
                  xLabelColor={xLabelColor}
                  yLabelColor={yLabelColor}
                  graphHeadSize={graphHeadSize}
                  xLabelSize={xLabelSize}
                  yLabelSize={yLabelSize}
                  xLabelWeight={xLabelWeight}
                  yLabelWeight={yLabelWeight}
                  graphHeadWeight={graphHeadWeight}
                  graphHeading={graphHeading}
                  barBorders={barBorders}
                  textureColor={textureColor}
                  textureBg={textureBg}
                  legends={legends}
                  legendCheck={true}
                  borderColor={borderColor}
                  dlSize={dlSize}
                  dlWeight={dlWeight}
                  dlColor={dlColor}
                  stepped={stepped}
                  dataLabelsConfig={dataLabelsConfig}
                  fontFamily={fontFamily}
                />
              )
            ) : (
              ""
            )}
          </div>
        </div>
        {graphHistory.length !== 0 ? (
          <div className="d-flex flex-row graphs-history-div py-3">
            {graphHistory.map((history, index) => (
              <div
                key={index}
                className="d-flex flex-row align-items-start mx-3"
              >
                {/* {console.log(history[17])} */}
                <div
                  onClick={() => handlePreviousGraph(index)}
                  style={{ cursor: "pointer" }}
                >
                  <SelectChart
                    chartName={history[0]}
                    parameters={
                      history[17] &&
                        ((history[17].x && history[17].y) ||
                          (history[17].x && history[17].z))
                        ? history[17]
                        : history[1]
                    }
                    xLabel={history[3]}
                    yLabel={history[4]}
                    barColors={history[2]}
                    xLabelColor={history[6]}
                    yLabelColor={history[7]}
                    graphHeadSize={history[8]}
                    xLabelSize={history[10]}
                    yLabelSize={history[12]}
                    xLabelWeight={history[11]}
                    yLabelWeight={history[13]}
                    graphHeadWeight={history[9]}
                    graphHeading={history[14]}
                    barBorders={history[15]}
                    textureColor={history[20]}
                    textureBg={history[21]}
                    legends={history[22]}
                    legendCheck={false}
                    borderColor={history[27]}
                    dlSize={history[28]}
                    dlWeight={history[29]}
                    dlColor={history[30]}
                    stepped={history[31]}
                    dataLabelsConfig={history[32]}
                    fontFamily={history[33]}
                    stepSize={history[34]}
                    greyShadeCheck={history[35]}
                    legendPosition={history[36]}
                  />
                </div>
                <img
                  src={require("../assets/imgs/delete.png")}
                  style={{ width: "20px", cursor: "pointer" }}
                  onClick={() => deleteGraph(index)}
                  alt=""
                />
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        {
          jsonData &&<div
            className="row"
            style={{ borderTop: "1px solid rgb(167, 167, 167)" }}
          >
            <div className="col-12">
           <UserTable
                jsonData={jsonData}
                xLabel={xAxis}
                yLabel={yAxis}
                onResponse={handleEditedResponse}
                projectId={projectName}
                fileId={fileId}
              />
           
           
            </div>
          </div>
        }
        {/* Add bottom part of project */}
      </div>
    </div>
  );
}

export default NewProject;
