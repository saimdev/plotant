import React, { useState, useEffect, useRef } from "react";
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
import Draggable from "react-draggable";

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
  const [yAxis, setYAxis] = useState(null);
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
  const [legendPosition, setLegendPosition] = useState("right");
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
  const [logsColor, setLogsColor] = useState([]);
  const [logsDisplay, setLogsDisplay] = useState(false);
  const [greyShadeCheck, setGreyShadeCheck] = useState(false);
  const [logs, setLogs] = useState([]);
  const [logsCheck, setLogsCheck] = useState(false);
  const [accessType, setAccessType] = useState("");
  const [project_name, setProject_Name] = useState("");
  const [clickedImageIndex, setClickedImageIndex] = useState(null);
  const [currentGraphId, setCurrentGraphId] = useState(null);

  const nodeRef = useRef(null);

  const updateLogs = (newLogs) => {
    setLogs(newLogs);
    setLogsDisplay(true);
  };

  useEffect(() => {
    // console.log(barColors);
  }, [barColors])

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
    if (xAxis && yAxis) {
      console.log(res);
      setParameters(res);
    }
    else {
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
      setGreyShadeCheck(false);
      setLegendPosition("Top");
      setParameters(null);
    }

  };

  const handleColorChange = (index, newColor) => {
    const updatedColors = [...barColors];
    updatedColors[index] = newColor;
    setBarColors(updatedColors);
  };

  const handleImageClick = (index) => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
      setClickedImageIndex(index);
    }
  };

  const handleTextureChange = (value, index, check = 0, color, bg) => {
    const updatedBarColors = [...barColors];
    // console.log(color);
    // console.log(value, index, check, color);
    if (check === 0) {
      // console.log("Entered");
      setDictionaryState((prevState) => ({
        ...prevState,
        [index]: value,
      }));
    } else if (check === 1) {
      setColorStatesTexture((prevState) => ({
        ...prevState,
        [index]: color,
      }));
      setTextureColor(color);
    } else {
      setColorStatesBgTexture((prevState) => ({
        ...prevState,
        [index]: bg,
      }));
      setTextureBg(bg);
    }
    // const updatedDictionary = { ...dictionaryState };
    // console.log("SAIM");
    switch (value) {
      case "steric":
        updatedBarColors[index] = createAsteriskPattern(color, bg);
        break;
      case "diagnolLeft":
        updatedBarColors[index] = createUpwardDiagonalPattern(color, bg);
        break;
      case "diagnolRight":
        updatedBarColors[index] = createDiagonalPattern(color, bg);
        break;
      case "dash":
        updatedBarColors[index] = createDashPattern(color, bg);
        break;
      case "dots":
        updatedBarColors[index] = createOPattern(color, bg);
        break;
      case "cross":
        updatedBarColors[index] = createStericsPattern(color, bg);
        break;
    }
    setBarColors(updatedBarColors);
    // console.log(updatedDictionary);
    // console.log("SAIM");
  };

  function createDiagonalPattern(color = "black", bgColor = "transparent") {
    let shape = document.createElement("canvas");
    shape.width = 10;
    shape.height = 10;
    let c = shape.getContext("2d");
    c.fillStyle = bgColor;
    c.fillRect(0, 0, shape.width, shape.height);
    c.strokeStyle = color;
    c.beginPath();
    c.moveTo(2, 0);
    c.lineTo(10, 8);
    c.stroke();
    c.beginPath();
    c.moveTo(0, 8);
    c.lineTo(2, 10);
    c.stroke();
    return c.createPattern(shape, "repeat");
  }

  function createStericsPattern(color = "black", bgColor = "transparent") {
    let shape = document.createElement("canvas");
    shape.width = 10;
    shape.height = 10;
    let c = shape.getContext("2d");
    c.fillStyle = bgColor;
    c.fillRect(0, 0, shape.width, shape.height);
    c.strokeStyle = color;
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(10, 10);
    c.stroke();
    c.beginPath();
    c.moveTo(10, 0);
    c.lineTo(0, 10);
    c.stroke();
    return c.createPattern(shape, "repeat");
  }

  function createUpwardDiagonalPattern(
    color = "black",
    bgColor = "transparent"
  ) {
    let shape = document.createElement("canvas");
    shape.width = 10;
    shape.height = 10;
    let c = shape.getContext("2d");
    c.fillStyle = bgColor;
    c.fillRect(0, 0, shape.width, shape.height);
    c.strokeStyle = color;
    c.beginPath();
    c.moveTo(0, 10);
    c.lineTo(10, 0);
    c.stroke();
    return c.createPattern(shape, "repeat");
  }

  function createAsteriskPattern(color = "black", bgColor = "transparent") {
    let shape = document.createElement("canvas");
    shape.width = 10;
    shape.height = 10;
    let c = shape.getContext("2d");
    c.fillStyle = bgColor;
    c.fillRect(0, 0, shape.width, shape.height);
    c.font = "bold 10px Arial";
    c.fillStyle = color;
    c.fillText("*", 0, 10);
    return c.createPattern(shape, "repeat");
  }

  function createDashPattern(color = "black", bgColor = "transparent") {
    let shape = document.createElement("canvas");
    shape.width = 10;
    shape.height = 10;
    let c = shape.getContext("2d");
    c.fillStyle = bgColor;
    c.fillRect(0, 0, shape.width, shape.height);
    c.font = "bold 10px Arial";
    c.fillStyle = color;
    c.fillText("-", 0, 10);
    return c.createPattern(shape, "repeat");
  }

  function createOPattern(color = "black", bgColor = "transparent") {
    let shape = document.createElement("canvas");
    shape.width = 10;
    shape.height = 10;
    let c = shape.getContext("2d");
    c.fillStyle = bgColor;
    c.fillRect(0, 0, shape.width, shape.height);
    c.font = "bold 10px Arial";
    c.fillStyle = color;
    c.fillText("o", 0, 10);
    return c.createPattern(shape, "repeat");
  }

  useEffect(() => {
    // console.log("JSON DATA CHANGED");
  }, [jsonData]);

  useEffect(() => {
    generateColors();
  }, [fileId]);

  // const handleGraphNameChange = (newName) => {
  //   setGraphName(newName);
  //   onGraphNameChange(newName);
  // };
  const setLabels = (e, labelCheck) => {
    console.log(e.target.value, labelCheck);
    console.log(selectedLabels)
    // console.log(labelCheck);
    setYAxisValue("");
    setCondition([]);
    setConditionalParameters([]);
    setYAxisConditions([]);
    setColorStatesTexture([]);
    setColorStatesBgTexture([]);
    setTextureBg("#ffffff");
    setTextureColor("#000000");
    setDictionaryState([]);
    setReference("");

    const labelValue = labelCheck === 1 ? e.target.innerText : e.target.value;
    const labelIndex = selectedLabels.indexOf(labelValue);

    if (labelIndex === -1) {
      // console.log("LABEL INDEX -1");
      if (xAxis.length === 0) {
        console.log(labelIndex);
        // console.log(labelValue);
        setXAxis(labelValue);
        setSelectedLabels([labelValue]);
      } else {
        console.log(xAxis);
        console.log(yAxis);
        // console.log("ELSE", labelValue);
        setYAxis(prevYAxes => [...prevYAxes, labelValue]);
        setSelectedLabels(prevSelectedLabels => [...prevSelectedLabels, labelValue]);
      }
    } else {

      // console.log("LABEL INDEX ELSE");
      const updatedLabels = [...selectedLabels];
      console.log(updatedLabels);
      updatedLabels.splice(labelIndex, 1);
      console.log(updatedLabels);
      setSelectedLabels(updatedLabels);

      if (xAxis === labelValue) {
        setXAxis("");
        setParameters(null);
      } else {
        setYAxis(prevYAxes => prevYAxes.filter(label => label !== labelValue));
      }
    }

    console.log(xAxis);
    console.log([...yAxis, labelValue].filter(label => label !== xAxis))
    // console.log(setYAxis(prevYAxes => prevYAxes.filter(label => label !== labelValue)));
    if (xAxis && (yAxis.length > 0 || labelIndex === -1 && xAxis.length > 0)) {
      fetch("/analysis/getLabels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          x_label: xAxis,
          y_label: [...yAxis, labelValue].filter(label => label !== xAxis),
          fileId: fileId,
          projectId: projectName,
        }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (Array.isArray(data.labels.x) && Array.isArray(data.labels.y)) {
            setParameters(data);
          } else {
            console.error("Invalid data format");
          }
        })
        .catch((error) => {
          alert(error);
        });
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

  // useEffect(() => {

  useEffect(() => {
    // console.log(dictionaryState);
    // console.log(xAxis);
    // console.log(yAxis);
    if (!xAxis || !yAxis) {
      setGraphName("");
    }
    if (xAxis && yAxis) {
      setGraphHeading(`Relationship between ${xAxis} and ${yAxis}`);
    }
  }, [xAxis, yAxis]);

  // }, []);

  const getGraphs = async (fileId) => {
    setGraphHistory([]);
    const response = await fetch("/analysis/getGraph", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        projectId: projectName,
        fileId
      }),
      credentials: "include"
    });

    const data = await response.json();
    // console.log(data.data);
    // if (!data.data===null) {
    // console.log(data.data);

    //  console.log(data.data.length);
    // console.log(data.data[lastIndex].parameters);
    // handleGraphNameChange(data.data[lastIndex].graphName);
    // setXAxis(data.data[lastIndex].xAxis);
    // setYAxis(data.data[lastIndex].yAxis);
    // setParameters(data.data[lastIndex].parameters);
    // setSelectedLabels(data.data[lastIndex].selectedLabels);
    // setIsOpen(data.data[lastIndex].isOpen);
    // setIsOpenFilterX(data.data[lastIndex].isOpenFilterX);
    // setIsOpenFilterY(data.data[lastIndex].isOpenFilterY);
    // setReference(data.data[lastIndex].reference);
    // setModalOption(data.data[lastIndex].modalOption);
    // setIsModalOpen(data.data[lastIndex].isModalOpen);
    // setXLabelColor(data.data[lastIndex].xLabelColor);
    // setYLabelColor(data.data[lastIndex].yLabelColor);
    // setGraphHeadSize(data.data[lastIndex].graphHeadSize);
    // setGraphHeadWeight(data.data[lastIndex].graphHeadWeight);
    // setXLabelSize(data.data[lastIndex].xLabelSize);
    // setXLabelWeight(data.data[lastIndex].xLabelWeight);
    // setYLabelSize(data.data[lastIndex].yLabelSize);
    // setYLabelWeight(data.data[lastIndex].yLabelWeight);
    // setIsContainerDataOpen(data.data[lastIndex].isContainerDataOpen);
    // setIsContainerFilterOpen(data.data[lastIndex].isContainerFilterOpen);
    // setIsContainerVisualOpen(data.data[lastIndex].isContainerVisualOpen);
    // setGraphHeading(data.data[lastIndex].graphHeading);
    // // setColumnsData(null);
    // setBarBoders(data.data[lastIndex].barBorders);
    // setCondition(data.data[lastIndex].condition);
    // setConditionalParameters(data.data[lastIndex].conditionalParameters);
    // setTextureBg(data.data[lastIndex].textureBg);
    // setTextureColor(data.data[lastIndex].textureColor);
    // setLegends(data.data[lastIndex].legends);
    // setDictionaryState(data.data[lastIndex].dictionaryState);
    // setColorStatesBgTexture(data.data[lastIndex].colorStatesBgTexture);
    // setColorStatesTexture(data.data[lastIndex].colorStatesTexture);
    // setBarBoders(data.data[lastIndex].barBorders);
    // setBorderColor(data.data[lastIndex].borderColor);
    // setDLSize(data.data[lastIndex].dlSize);
    // setDLWeight(data.data[lastIndex].dlWeight);
    // setDLColor(data.data[lastIndex].dlColor);
    // setStepped(data.data[lastIndex].stepped);
    // setDataLabelsConfig(data.data[lastIndex].dataLabelsConfig);
    // setFontFamily(data.data[lastIndex].fontFamily);
    // setStepSize(data.data[lastIndex].stepSize);
    // console.log(parameters);
    data.data && data.data.forEach(item => {
      // console.log(item.parameters);
      // console.log(item.conditionalParameters);
      // Do something with yLabelColor
      // handleGraphNameChange(data.data.graphName);
      // console.log("SAIM", item.xAxis);
      const xAxis1 = item.xAxis;
      const graphName1 = item.graphName;
      const barColors1 = item.barColors;
      const yAxis1 = item.yAxis;
      const parameters1 = item.parameters;
      const selectedLabels1 = item.selectedLabels;
      const isOpen1 = item.isOpen;
      const isOpenFilterX1 = item.isOpenFilterX;
      const isOpenFilterY1 = item.isOpenFilterY;
      const reference1 = item.reference;
      const modalOption1 = item.modalOption;
      const isModalOpen1 = item.isModalOpen;
      const xLabelColor1 = item.xLabelColor;
      const yLabelColor1 = item.yLabelColor;
      const graphHeadSize1 = item.graphHeadSize;
      const graphHeadWeight1 = item.graphHeadWeight;
      const xLabelSize1 = item.xLabelSize;
      const xLabelWeight1 = item.xLabelWeight;
      const yLabelSize1 = item.yLabelSize;
      const yAxisConditions1 = item.yAxisConditions;
      const yAxisValue1 = item.yAxisValue;
      const yLabelWeight1 = item.yLabelWeight;
      const isContainerDataOpen1 = item.isContainerDataOpen;
      const isContainerFilterOpen1 = item.isContainerFilterOpen;
      const isContainerVisualOpen1 = item.isContainerVisualOpen;
      const graphHeading1 = item.graphHeading;
      const barBorders1 = item.barBorders;
      const condition1 = item.condition;
      const conditionalParameters1 = item.conditionalParameters;
      const textureBg1 = item.textureBg;
      const textureColor1 = item.textureColor;
      const legends1 = item.legends;
      const dictionaryState1 = item.dictionaryState;
      const colorStatesBgTexture1 = item.colorStatesBgTexture;
      const colorStatesTexture1 = item.colorStatesTexture;
      const borderColor1 = item.borderColor;
      const dlSize1 = item.dlSize;
      const dlWeight1 = item.dlWeight;
      const dlColor1 = item.dlColor;
      const stepped1 = item.stepped;
      const dataLabelsConfig1 = item.dataLabelsConfig;
      const fontFamily1 = item.fontFamily;
      const stepSize1 = item.stepSize;
      const greyShadeCheck1 = item.greyShadeCheck;
      const legendPosition1 = item.legendPosition;
      const graphid = item.id;

      // console.log(parameters);
      const newGraphState = [
        graphName1,
        parameters1,
        barColors1,
        xAxis1,
        yAxis1,
        selectedLabels1,
        xLabelColor1,
        yLabelColor1,
        graphHeadSize1,
        graphHeadWeight1,
        xLabelSize1,
        xLabelWeight1,
        yLabelSize1,
        yLabelWeight1,
        graphHeading1,
        barBorders1,
        condition1,
        conditionalParameters1,
        yAxisConditions1,
        yAxisValue1,
        textureColor1,
        textureBg1,
        legends1,
        reference1,
        colorStatesTexture1,
        colorStatesBgTexture1,
        dictionaryState1,
        borderColor1,
        dlSize1,
        dlWeight1,
        dlColor1,
        stepped1,
        dataLabelsConfig1,
        fontFamily1,
        stepSize1,
        greyShadeCheck1,
        legendPosition1,
        graphid,
        selectedLabels1
      ];
      // console.log("CHECK");
      setGraphHistory((prevHistory) => [newGraphState, ...prevHistory]);
    });
    // }





  }

  const deleteGraph = async (graphId) => {
    // console.log(graphId);
    const res = await fetch("/analysis/deleteGraph", {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fileId,
        projectId: projectName,
        graphId
      }),
      method: "POST"
    });

    const data = await res.json();
    if (data.message) {
      window.alert(data.message);
      getGraphs(fileId);
    }
    else if (data.error) {
      window.alert(data.error);
    }
  }

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
    for (let i = 0; i < parameters.labels.y.length - 4; i++) {
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
    "Stacked"
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
            y_label: selectedLabels.slice(1),
            z: labelValue,
            fileId: fileId,
            projectId: projectName,
          }),
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data.labels.x) && Array.isArray(data.labels.y)) {
              setParameters(data);
              console.log(data);
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

  const handlePreviousGraph = (index, currentGraphHistoryId) => {
    // console.log(index);
    // console.log(graphHistory[index][16]);
    setHistoryIndex(index);
    console.log(graphHistory[index][4]);
    // console.log(graphHistory[index][34], graphHistory[index][35], graphHistory[index][36]);
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
    setLegendPosition(graphHistory[index][35]);
    setGreyShadeCheck(graphHistory[index][36]);
    setCurrentGraphId(currentGraphHistoryId);
  };

  const newGraph = async () => {
    // console.log(condition);
    // console.log(conditionalParameters);
    // console.log(yAxisConditions);

    // console.log(projectName);
    const response = await fetch("/analysis/saveGraph", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
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
        legendPosition,
        greyShadeCheck,
        project_id: projectName,
        file_id: fileId,
        currentGraphId
      }),
      credentials: "include"
    });

    const data = await response.json();
    const graphid = data.id;
    console.log(typeof(yAxis));
    const parsedArray = Object.values(yAxis).flat();
    console.log(parsedArray);
    setYAxis(parsedArray);
    
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
      greyShadeCheck,
      legendPosition,
      graphid,
    ];
    // console.log(data);
    window.alert(data.message);
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
    setGreyShadeCheck(false);
    setLegendPosition("Top");
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
    console.log(selectedLabels);
    setIsModalOpen(true);
    // console.log(barColors);
  };


  function generateGreyShadeColors(check) {
    setGreyShadeCheck(greyShadeCheck ? false : true);
    if (check === true) {
      if (parameters) {
        let generatedColorPalette;
        if (Array.isArray(parameters.labels.y)) {

          generatedColorPalette = parameters.labels.y.map((_) => {
            const greyValue = Math.floor(Math.random() * 256);
            const hex = greyValue.toString(16).padStart(2, "0");
            return `#${hex}${hex}${hex}`;
          });
        } else {

          const greyValue = Math.floor(Math.random() * 256);
          const hex = greyValue.toString(16).padStart(2, "0");
          generatedColorPalette = [`#${hex}${hex}${hex}`];
        }
        // console.log(generatedColorPalette);

        let unique = false;
        while (!unique) {
          unique = true;
          for (let i = 0; i < generatedColorPalette.length - 1; i++) {
            if (generatedColorPalette[i] === generatedColorPalette[i + 1]) {

              const greyValue = Math.floor(Math.random() * 256);
              const hex = greyValue.toString(16).padStart(2, "0");
              generatedColorPalette[i + 1] = `#${hex}${hex}${hex}`; // Use the same value for R, G, and B components
              unique = false;
              break;
            }
          }
        }

        setBarColors(generatedColorPalette);
      }
    } else {
      if (parameters) {
        let generatedColorPalette;
        if (Array.isArray(parameters.labels.y)) {
          generatedColorPalette = parameters.labels.y.map(
            (_) => `#${Math.floor(Math.random() * 16777215).toString(16)}`
          );
        } else {
          generatedColorPalette = [
            `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          ];
        }
        setBarColors(generatedColorPalette);
      }
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setModalOption("color");
  };

  const handleConditionChange = (e, option) => {
    // console.log(selectedLabels);
    let updatedCondition;
    if (condition.includes(option)) {
      updatedCondition = condition.filter((item) => item !== option);
    } else {
      updatedCondition = [...condition, option];
    }

    setCondition(updatedCondition);

    if (xAxis && yAxis && updatedCondition.length > 0) {
      const yValues = {};
      const filteredZ = {};

      updatedCondition.forEach((opt) => {
        const eIndex = parameters.labels["x"].indexOf(opt);
        if (eIndex !== -1) {
          if (parameters["z"]) {
            filteredZ[opt] = parameters["z"][opt];
          }
          // Iterate over all possible y keys
          let yIndex = 0;
          while (`y${yIndex === 0 ? '' : yIndex}` in parameters.labels) {
            const key = `y${yIndex === 0 ? '' : yIndex}`;
            if (!yValues[key]) {
              yValues[key] = [];
            }
            yValues[key].push(parameters.labels[key][eIndex]);
            yIndex++;
          }
        }
      });

      const conditionalLabels = { x: updatedCondition };

      if (Object.keys(filteredZ).length !== 0) {
        conditionalLabels.z = filteredZ;
      }

      Object.keys(yValues).forEach((key) => {
        conditionalLabels[key] = yValues[key];
      });

      setConditionalParameters({ labels: conditionalLabels });
      // console.log(selectedLabels);
    } else {
      setConditionalParameters({ labels: { x: null, y: null } });
      setCondition([]);
    }
  };



  const handleYAxisConditionChange = (option, checked) => {
    let updatedConditions = { ...yAxisConditions };

    if (checked) {
      updatedConditions[option] = true;
    } else {
      delete updatedConditions[option];
    }

    setYAxisConditions(updatedConditions);

    if (Object.keys(updatedConditions).length > 0 && yAxisValue) {
      const yKeys = Object.keys(parameters.labels).filter(key => key.startsWith('y'));

      const filteredValues = yKeys.reduce((accumulator, yKey) => {
        const yValues = parameters.labels[yKey];
        yValues.forEach((value, index) => {
          if (
            (updatedConditions.lessThan && value < parseFloat(yAxisValue)) ||
            (updatedConditions.greaterThan && value > parseFloat(yAxisValue)) ||
            (updatedConditions.equalTo && value === parseFloat(yAxisValue))
          ) {
            if (!accumulator.indices.includes(index)) {
              accumulator.indices.push(index);
            }
            if (!accumulator[yKey]) {
              accumulator[yKey] = [];
            }
            accumulator[yKey].push(value);
          }
        });
        return accumulator;
      }, { indices: [] });

      const xValues = filteredValues.indices.map(
        (index) => parameters.labels["x"][index]
      );

      const conditionalLabels = { x: xValues };

      yKeys.forEach(yKey => {
        conditionalLabels[yKey] = parameters.labels[yKey].filter((_, index) =>
          filteredValues.indices.includes(index)
        );
      });

      setConditionalParameters({ labels: conditionalLabels });
    } else {
      setYAxisConditions([]);
      setConditionalParameters({ labels: { x: null, y: null } });
    }
  };


  const setYAxisFilterValue = (e) => {
    setYAxisValue(e.target.value);
  };

  const handleLinkLeave = () => {
    // console.log('left');
    setHoveredLink(null);
  };

  const formateDate = (dateStr) => {
    const dateObj = new Date(dateStr);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""
      }${day}`;

    return formattedDate;
  };

  useEffect(() => {
    if (
      parameters &&
      graphHistory[historyIndex] &&
      parameters === graphHistory[historyIndex][1]
    ) {
      return;
    }

    if (parameters && logsCheck === false) {
      // console.log("SAIM");
      let generatedColorPalette;
      if (Array.isArray(parameters.labels.y)) {
        generatedColorPalette = parameters.labels.y.map(
          (_) => `#${Math.floor(Math.random() * 16777215).toString(16)}`
        );
      } else {
        generatedColorPalette = [
          `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        ];
      }
      setBarColors(generatedColorPalette);
    }
    else {
      setLogsCheck(false);
      // let generatedColorPalette;
      // if (Array.isArray(parameters.y)) {
      //   generatedColorPalette = parameters.y.map(
      //     (_) => `#${Math.floor(Math.random() * 16777215).toString(16)}`
      //   );
      // } else {
      //   generatedColorPalette = [
      //     `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      //   ];
      // }
      // setBarColors(generatedColorPalette);
    }
  }, [parameters, graphHistory, historyIndex]);
  const handleSelectedFile = (file) => {
    setSelectedFile(file);
    // console.log("Selected file in parent component:", file);
  };

  const handleFileId = (fileId) => {
    // console.log("SAIM");
    setFileId(fileId);
    getGraphs(fileId);
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

    // newGraph();
    // console.log("Selected file in parent component:", fileId);
  };

  const handleJsonData = (newJsonData) => {
    // console.log(newJsonData);
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

  const handleAccessType = (access) => {
    setAccessType(access);
  }

  const handleProjectName = (project) => {
    setProject_Name(project);
  }

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

  const generateColors = () => {
    // console.log("BarColors before", barColors);

    const generatedColorPalette = [];
    for (let i = 0; i < 1; i++) {
      generatedColorPalette.push(
        `#${Math.floor(Math.random() * 16777215).toString(16)}`
      );
    }

    const combinedColors = [...logsColor, ...generatedColorPalette];
    setLogsColor(combinedColors);
    // console.log(combinedColors);
    // console.log("BarColors After", barColors);
  };

  const handleHistoryClick = (index) => {
    handlePreviousGraph(index);
  }

  const getLogsGraph = async (id) => {
    setLogsCheck(true);
    // console.log(id);
    const res = await fetch("/analysis/getLogsGraph", {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        logId: id
      }),
      method: "POST"
    });
    const data = await res.json();
    // console.log(data);
    // console.log(data.data.parameters);
    handleGraphNameChange(data.data.graphName);
    setXAxis(data.data.xAxis);
    setYAxis(data.data.yAxis);
    setParameters(data.data.parameters);
    setSelectedLabels(data.data.selectedLabels);
    setIsOpen(data.data.isOpen);
    setIsOpenFilterX(data.data.isOpenFilterX);
    setIsOpenFilterY(data.data.isOpenFilterY);
    setReference(data.data.reference);
    setModalOption(data.data.modalOption);
    setIsModalOpen(data.data.isModalOpen);
    setXLabelColor(data.data.xLabelColor);
    setYLabelColor(data.data.yLabelColor);
    setGraphHeadSize(data.data.graphHeadSize);
    setGraphHeadWeight(data.data.graphHeadWeight);
    setXLabelSize(data.data.xLabelSize);
    setXLabelWeight(data.data.xLabelWeight);
    setYLabelSize(data.data.yLabelSize);
    setYLabelWeight(data.data.yLabelWeight);
    // setIsContainerDataOpen(data.data.isContainerDataOpen);
    // setIsContainerFilterOpen(data.data.isContainerFilterOpen);
    // setIsContainerVisualOpen(data.data.isContainerVisualOpen);
    setGraphHeading(data.data.graphHeading);
    setYAxisConditions(data.data.yAxisConditions);
    setYAxisValue(data.data.yAxisValue);
    // setColumnsData(null);
    setBarBoders(data.data.barBorders);
    setCondition(data.data.condition);
    setConditionalParameters(data.data.conditionalParameters);
    setTextureBg(data.data.textureBg);
    setTextureColor(data.data.textureColor);
    setLegends(data.data.legends);
    setDictionaryState(data.data.dictionaryState);
    setColorStatesBgTexture(data.data.colorStatesBgTexture);
    setColorStatesTexture(data.data.colorStatesTexture);
    setBarBoders(data.data.barBorders);
    setBorderColor(data.data.borderColor);
    setDLSize(data.data.dlSize);
    setDLWeight(data.data.dlWeight);
    setDLColor(data.data.dlColor);
    setStepped(data.data.stepped);
    setDataLabelsConfig(data.data.dataLabelsConfig);
    setFontFamily(data.data.fontFamily);
    setStepSize(data.data.stepSize);
    setBarColors(data.data.barColors);
    setGreyShadeCheck(data.data.greyShadeCheck);
    setLegendPosition(data.data.legendPosition);
  }

  // if(loader){
  //   return (
  //     <div className="loader d-flex text-center flex-column justify-content-center align-items-center">
  //         <LandingPageLoader/>
  //         <h1>PlotAnt</h1>
  //     </div>
  //   )
  // }



  return (
    <div className="dashboard">
      <div className="dashboard-main d-flex flex-column">
        <NewProjectTopMenu projectId={projectName} fileId={fileId} updateLogs={updateLogs} projectName={project_name} accessType={accessType} />
        <div className="d-flex flex-row">
          <div className="py-3" style={{ height: '100vh', width: '16vw', background: 'white', zIndex: 9999999, position: 'absolute', top: 0, right: 0, boxShadow: 'rgba(21,88,156, 0.50) 0px 3px 8px', display: logsDisplay ? 'block' : 'none', borderRadius: '8px 0 0 8px' }}>
            <div className="d-flex flex-row justify-content-between align-items-center w-100 px-3 pb-2" style={{ borderBottom: '1px solid lightgray' }}>
              <h4>Logs</h4>
              <button style={{ padding: '0.05rem 0.35rem' }} className="btn btn-danger" onClick={() => setLogsDisplay(false)}>x</button>
            </div>
            <div className="d-flex flex-column my-3 px-3 custom-scrollbar" style={{ overflowY: 'auto', height: '88vh' }}>

              {logs && logs.map((log, index) => (

                <button className="d-flex flex-column w-100 pb-1 log-entity p-3" key={index} onClick={() => getLogsGraph(log.logId)}>
                  <div className="d-flex flex-row w-100 justify-content-between align-items-center">
                    <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{log.date} {log.time}</p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 30C5 18.2149 5 12.3223 8.66117 8.66117C12.3223 5 18.2149 5 30 5C41.785 5 47.6777 5 51.3387 8.66117C55 12.3223 55 18.2149 55 30C55 41.785 55 47.6777 51.3387 51.3387C47.6777 55 41.785 55 30 55C18.2149 55 12.3223 55 8.66117 51.3387C5 47.6777 5 41.785 5 30ZM30 15.625C31.0355 15.625 31.875 16.4645 31.875 17.5V30.4732L36.1742 26.1742C36.9065 25.442 38.0935 25.442 38.8258 26.1742C39.558 26.9065 39.558 28.0935 38.8258 28.8258L31.3258 36.3258C30.9743 36.6775 30.4972 36.875 30 36.875C29.5028 36.875 29.0257 36.6775 28.6742 36.3258L21.1742 28.8258C20.442 28.0935 20.442 26.9065 21.1742 26.1742C21.9064 25.442 23.0936 25.442 23.8258 26.1742L28.125 30.4732V17.5C28.125 16.4645 28.9645 15.625 30 15.625ZM20 40.625C18.9645 40.625 18.125 41.4645 18.125 42.5C18.125 43.5355 18.9645 44.375 20 44.375H40C41.0355 44.375 41.875 43.5355 41.875 42.5C41.875 41.4645 41.0355 40.625 40 40.625H20Z"
                        fill="#15589c"
                      />
                    </svg>
                  </div>
                  <p style={{ color: 'gray', fontSize: '0.9rem' }}>{log.message}</p>
                  <div className="d-flex flex-row align-items-center">
                    <div className="p-1 mx-2" style={{ background: logsColor[0], borderRadius: '0.5rem' }}></div>
                    <p style={{ color: 'gray', fontSize: '0.8rem' }}>{log.userName}</p>
                  </div>
                </button>
              ))}

            </div>
          </div>
          <NewProjectFirstLeftMenu
            onFileSelect={handleSelectedFile}
            onFileId={handleFileId}
            onJsonData={handleJsonData}
            onColumns={handleColumns}
            onGuestID={handleGuestId}
            onTypes={handleTypes}
            onUniqueValues={handleUniqueValues}
            onColumnsData={handleColumnsData}
            onAccessType={handleAccessType}
            projectName={decodeURIComponent(projectName)}
            onProjectName={handleProjectName}
            graphHistory={graphHistory}
            onGraphHistoryClick={handleHistoryClick}
          />
          {/* <NewProjectSecondLeftMenu selectedFile={selectedFile} jsonData={jsonData} columns={columns} guestId={guestId} types={types} uniqueValues={uniqueValues} columnsData={columnsData} onGraphNameChange={handleGraphNameChange}/> */}
          <div className={`newprojectsecondmenu pb-5 d-flex flex-column ${accessType === "read" ? "disabled-component" : ""}`}>
            {isModalOpen && (
              <>
                <Draggable nodeRef={nodeRef}>
                  <div id="chargeCompleteModal" class="modal" ref={nodeRef}>
                    <div
                      class="d-flex flex-row justify-content-start align-items-start modal-content-first"
                      style={{ height: "100%", borderRadius: "10px" }}
                    >
                      <div className="modal-menu d-flex flex-column align-items-center">
                      
                          <button
                            onClick={() => setModalOption("color")}
                            style={{
                              background:
                                modalOption === "color" ? "white" : "transparent",
                              color: modalOption === "color" ? "black" : "white",
                              borderRadius: modalOption === "color" ? "5px" : "0",
                              borderBottom:
                                modalOption === "font" ? "0" : "1px solid white",
                            }}
                          >
                            Color Theme
                          </button>
                      
                        <button
                          onClick={() => setModalOption("font")}
                          style={{
                            background:
                              modalOption === "font" ? "white" : "transparent",
                            color: modalOption === "font" ? "black" : "white",
                            borderRadius: modalOption === "font" ? "5px" : "0",
                            borderBottom:
                              modalOption === "dl" ? "0" : "1px solid white",
                          }}
                        >
                          Font Styles
                        </button>
                        <button
                          onClick={() => setModalOption("dl")}
                          style={{
                            background:
                              modalOption === "dl" ? "white" : "transparent",
                            color: modalOption === "dl" ? "black" : "white",
                            borderRadius: modalOption === "dl" ? "5px" : "0",
                            borderBottom:
                              modalOption === "bg" ? "0" : "1px solid white",
                          }}
                        >
                          DataLabels
                        </button>
                        <button
                          onClick={() => setModalOption("bg")}
                          style={{
                            background:
                              modalOption === "bg" ? "white" : "transparent",
                            color: modalOption === "bg" ? "black" : "white",
                            borderRadius: modalOption === "bg" ? "5px" : "0",
                            borderBottom:
                              modalOption === "texture" ? "0" : "1px solid white",
                          }}
                        >
                          Background Color
                        </button>
                       <button
                            onClick={() => setModalOption("texture")}
                            style={{
                              background:
                                modalOption === "texture" ? "white" : "transparent",
                              color: modalOption === "texture" ? "black" : "white",
                              borderRadius: modalOption === "texture" ? "5px" : "0",
                              borderBottom:
                                modalOption === "textureStyles"
                                  ? "0"
                                  : "1px solid white",
                            }}
                          >
                            Texture
                          </button>
                      
                       <button
                            onClick={() => setModalOption("textureStyles")}
                            style={{
                              background:
                                modalOption === "textureStyles"
                                  ? "white"
                                  : "transparent",
                              color:
                                modalOption === "textureStyles" ? "black" : "white",
                              borderRadius:
                                modalOption === "textureStyles" ? "5px" : "0",
                            }}
                          >
                            Texture Styles
                          </button>
                      
                      </div>
                      {modalOption === "color" ? (
                        <div className="modal-right d-flex flex-column justify-content-between align-items-start p-3 w-100">
                          <div style={{ height: "470px", overflowY: "auto" }}>
                            <div className="d-flex flex-row flex-wrap w-100 justify-content-start">
                              {
                              selectedLabels.length<=2?barColors.map((color, index) => (
                                <div
                                  key={index}
                                  className="color-theme-div d-flex flex-column align-items-center my-3 mx-2"
                                >
                                  <p>{parameters.labels.x[index]}</p>
                                  <div className="d-flex flex-column align-items-center">
                                    <label>
                                      <input
                                        type="color"
                                        value={color}
                                        onChange={(e) =>
                                          handleColorChange(index, e.target.value)
                                        }
                                      />
                                    </label>
                                  </div>
                                </div>
                              )):
                              selectedLabels.length>2 && graphName==="Pie" || graphName==="Doghnut" ?barColors.map((color, index) => (
                                <div
                                  key={index}
                                  className="color-theme-div d-flex flex-column align-items-center my-3 mx-2"
                                >
                                  <p>{parameters.labels.x[index]}</p>
                                  <div className="d-flex flex-column align-items-center">
                                    <label>
                                      <input
                                        type="color"
                                        value={color}
                                        onChange={(e) =>
                                          handleColorChange(index, e.target.value)
                                        }
                                      />
                                    </label>
                                  </div>
                                </div>
                              )):
                              selectedLabels.slice(1).map((label, index) => (
                                <div
                                  key={index}
                                  className="color-theme-div d-flex flex-column align-items-center my-3 mx-2"
                                >
                                  <p>{selectedLabels[index+1]}</p>
                                  <div className="d-flex flex-column align-items-center">
                                    <label>
                                      <input
                                        type="color"
                                        value={barColors[index]}
                                        onChange={(e) =>
                                          handleColorChange(index, e.target.value)
                                        }
                                      />
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {modalOption === "bg" ? (
                        <div className="modal-right d-flex flex-column justify-content-between align-items-start p-3 w-100">
                          <div className="d-flex flex-row flex-wrap w-100 justify-content-around">
                            <div className="color-theme-div d-flex flex-column align-items-center my-3 w-100">
                              <h5 className="mb-2">Grids Color</h5>
                              <div className="d-flex flex-row flex-wrap justify-content-around w-100">
                                <div className="d-flex flex-column align-items-center">
                                  <p>X-Axis</p>
                                  <input
                                    type="color"
                                    name=""
                                    id=""
                                    value={xLabelColor}
                                    onChange={(e) => setXLabelColor(e.target.value)}
                                  />
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                  <p>Y-Axis</p>
                                  <input
                                    type="color"
                                    name=""
                                    id=""
                                    value={yLabelColor}
                                    onChange={(e) => setYLabelColor(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {modalOption === "font" ? (
                        <div className="modal-right d-flex flex-column justify-content-between align-items-start p-3 w-100">
                          <div className="d-flex flex-row flex-wrap w-100 justify-content-around">
                            <div className="color-theme-div font-styles d-flex flex-column align-items-center my-3">
                              <div className="d-flex flex-column align-items-center w-25">
                                <p className="my-2">Font Family</p>
                                <select
                                  value={fontFamily}
                                  onChange={(e) => setFontFamily(e.target.value)}
                                  style={{
                                    borderRadius: "6px",
                                    border: "1px solid lightgray",
                                    fontSize: "0.9rem",
                                    padding: "3px 8px",
                                  }}
                                >
                                  <option value="Arial">Arial</option>
                                  <option value="Times New Roman">
                                    Times New Roman
                                  </option>
                                  <option value="Georgia">Georgia</option>
                                </select>
                              </div>
                              <h5 className="my-1 mt-3">Heading</h5>
                              <div className="d-flex flex-row justify-content-around flex-wrap w-100">
                                <div className="d-flex flex-column align-items-center w-100">
                                  <p className="my-2">Text</p>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="w-100"
                                    placeholder={graphHeading}
                                    value={graphHeading}
                                    onChange={(e) => setGraphHeading(e.target.value)}
                                    style={{
                                      borderRadius: "6px",
                                      border: "1px solid lightgray",
                                      fontSize: "0.9rem",
                                      padding: "3px 8px",
                                    }}
                                  />
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                  <p className="my-2">Size</p>
                                  <input
                                    type="number"
                                    name=""
                                    id=""
                                    className="w-75"
                                    value={graphHeadSize}
                                    onChange={(e) => setGraphHeadSize(e.target.value)}
                                    style={{
                                      borderRadius: "6px",
                                      border: "1px solid lightgray",
                                      fontSize: "0.9rem",
                                      padding: "3px 8px",
                                    }}
                                  />
                                </div>
                                <div className="d-flex flex-column align-items-center w-25">
                                  <p className="my-2">Weight</p>
                                  <select
                                    value={graphHeadWeight}
                                    onChange={(e) =>
                                      setGraphHeadWeight(e.target.value)
                                    }
                                  >
                                    <option value="normal">Normal</option>
                                    <option value="bold">Bold</option>
                                    <option value="bolder">Extra-Bold</option>
                                    <option value="medium">Medium</option>
                                  </select>
                                </div>
                              </div>
                              <h5 className="mt-3 mb-1">Labels</h5>
                              <div className="d-flex flex-row justify-content-around flex-wrap w-100">
                                <div className="d-flex flex-column align-items-center">
                                  <p className="my-2">X-Label Size</p>
                                  <input
                                    type="number"
                                    name=""
                                    id=""
                                    className="w-75"
                                    value={xLabelSize}
                                    onChange={(e) => setXLabelSize(e.target.value)}
                                    style={{
                                      borderRadius: "6px",
                                      border: "1px solid lightgray",
                                      fontSize: "0.9rem",
                                      padding: "3px 8px",
                                    }}
                                  />
                                </div>
                                <div className="d-flex flex-column align-items-center w-25">
                                  <p className="my-2">X-Label Weight</p>
                                  <select
                                    value={xLabelWeight}
                                    onChange={(e) => setXLabelWeight(e.target.value)}
                                  >
                                    <option value="normal">Normal</option>
                                    <option value="bold">Bold</option>
                                    <option value="bolder">Extra-Bold</option>
                                    <option value="medium">Medium</option>
                                  </select>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                  <p className="my-2">Y-Label Size</p>
                                  <input
                                    type="number"
                                    name=""
                                    id=""
                                    className="w-75"
                                    value={yLabelSize}
                                    onChange={(e) => setYLabelSize(e.target.value)}
                                    style={{
                                      borderRadius: "6px",
                                      border: "1px solid lightgray",
                                      fontSize: "0.9rem",
                                      padding: "3px 8px",
                                    }}
                                  />
                                </div>
                                <div className="d-flex flex-column align-items-center w-25">
                                  <p className="my-2">Y-Label Weight</p>
                                  <select
                                    value={yLabelWeight}
                                    onChange={(e) => setYLabelWeight(e.target.value)}
                                  >
                                    <option value="normal">Normal</option>
                                    <option value="bold">Bold</option>
                                    <option value="bolder">Extra-Bold</option>
                                    <option value="medium">Medium</option>
                                  </select>
                                </div>
                              </div>
                              {graphName === "Bar" ? (
                                <>
                                  <h5 className="mt-4 mb-1">Bar Chart</h5>
                                  <div className="d-flex flex-row align-items-center justify-content-around flex-wrap w-100">
                                    <div className="d-flex flex-column mt-2 align-items-center">
                                      <label
                                        htmlFor=""
                                        className="text-center"
                                        style={{
                                          color: "rgb(68,68,68)",
                                          fontSize: "0.95rem",
                                        }}
                                      >
                                        Border Width
                                      </label>
                                      <input
                                        type="number"
                                        name=""
                                        className="w-75"
                                        id=""
                                        value={barBorders}
                                        onChange={(e) => setBarBoders(e.target.value)}
                                        style={{
                                          borderRadius: "6px",
                                          border: "1px solid lightgray",
                                          fontSize: "0.9rem",
                                          padding: "3px 8px",
                                        }}
                                      />
                                    </div>
                                    <div className="d-flex flex-column mt-2 align-items-center">
                                      <label
                                        htmlFor=""
                                        className="text-center"
                                        style={{
                                          color: "rgb(68,68,68)",
                                          fontSize: "0.95rem",
                                        }}
                                      >
                                        Border Color
                                      </label>
                                      <input
                                        type="color"
                                        name=""
                                        id=""
                                        value={borderColor}
                                        onChange={(e) =>
                                          setBorderColor(e.target.value)
                                        }
                                        style={{
                                          borderRadius: "0",
                                          border: "0",
                                          fontSize: "0",
                                          padding: "0",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          {/* <button onClick={closeModal} style={{background:'red', color:'white', borderRadius:'5px', padding:'3px 8px', border:'none'}} className="btn btn-danger">Close x</button> */}
                        </div>
                      ) : (
                        ""
                      )}
                      {modalOption === "dl" ? (
                        <div className="modal-right d-flex flex-column justify-content-between align-items-start p-3 w-100">
                          <div className="d-flex flex-row flex-wrap w-100 justify-content-around">
                            <div className="color-theme-div font-styles d-flex flex-column align-items-center my-3">
                              <h5 className="mt-3 mb-1">Labels</h5>
                              <div className="d-flex flex-row justify-content-around flex-wrap w-100">
                                <div className="d-flex flex-column align-items-center">
                                  <p className="my-2">Size</p>
                                  <input
                                    type="number"
                                    name=""
                                    id=""
                                    className="w-50"
                                    value={dlSize}
                                    onChange={(e) => setDLSize(e.target.value)}
                                    style={{
                                      borderRadius: "6px",
                                      border: "1px solid lightgray",
                                      fontSize: "0.9rem",
                                      padding: "3px 8px",
                                    }}
                                  />
                                </div>
                                <div className="d-flex flex-column align-items-center w-25">
                                  <p className="my-2">Weight</p>
                                  <select
                                    value={dlWeight}
                                    onChange={(e) => setDLWeight(e.target.value)}
                                  >
                                    <option value="normal">Normal</option>
                                    <option value="bold">Bold</option>
                                    <option value="bolder">Extra-Bold</option>
                                    <option value="medium">Medium</option>
                                  </select>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                  <p className="my-2">Color</p>
                                  <input
                                    type="color"
                                    name=""
                                    id=""
                                    value={dlColor}
                                    onChange={(e) => setDLColor(e.target.value)}
                                    style={{
                                      borderRadius: "0",
                                      border: "0",
                                      fontSize: "0",
                                      padding: "0",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <button onClick={closeModal} style={{background:'red', color:'white', borderRadius:'5px', padding:'3px 8px', border:'none'}} className="btn btn-danger">Close x</button> */}
                        </div>
                      ) : (
                        ""
                      )}
                      {modalOption === "texture" && (
                        <div className="modal-right d-flex flex-column justify-content-between align-items-start p-3 w-100">
                          <div style={{ height: "470px", overflowY: "auto" }}>
                            <div className="d-flex flex-row flex-wrap w-100 justify-content-start">
                              {selectedLabels.length<=2 ? barColors.map((color, index) => (
                                <div
                                  key={index}
                                  className="color-theme-div d-flex flex-column align-items-center my-3 mx-2"
                                  style={{ position: "relative" }}
                                >
                                  <p>{parameters.labels.x[index]}</p>
                                  <div className="">
                                    <img
                                      src={require("../assets/imgs/diagnol-left.png")}
                                      alt=""
                                      style={{
                                        width: "50px",
                                        height: "30px",
                                        cursor: "pointer",
                                        border: "2px solid gray",
                                        borderRadius: "3px",
                                      }}
                                      onClick={() => handleImageClick(index)}
                                    />
                                  </div>
                                  {showModal && clickedImageIndex === index && (
                                    <div
                                      className="textures-options mt-2 p-2"
                                      style={{
                                        background: "#15589c",
                                        borderRadius: "5px",
                                        position: "absolute",
                                        top: "100%",
                                        zIndex: "1000",
                                      }}
                                    >
                                      <div className="texture-modal-content">
                                        {/* <span className="close" onClick={handleCloseModal} style={{cursor:'pointer'}}>&times;</span> */}
                                        <img
                                          src={require("../assets/imgs/diagnol-left.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("diagnolLeft", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/diagnol-right.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("diagnolRight", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/dash.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("dash", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/dots.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("dots", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/cross.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("cross", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/steric.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("steric", index)
                                          }
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )):
                              selectedLabels.length>2 && (graphName==="Pie" ||graphName==="Doghnut") ?barColors.map((color, index) => (
                                <div
                                  key={index}
                                  className="color-theme-div d-flex flex-column align-items-center my-3 mx-2"
                                  style={{ position: "relative" }}
                                >
                                  <p>{parameters.labels.x[index]}</p>
                                  <div className="">
                                    <img
                                      src={require("../assets/imgs/diagnol-left.png")}
                                      alt=""
                                      style={{
                                        width: "50px",
                                        height: "30px",
                                        cursor: "pointer",
                                        border: "2px solid gray",
                                        borderRadius: "3px",
                                      }}
                                      onClick={() => handleImageClick(index)}
                                    />
                                  </div>
                                  {showModal && clickedImageIndex === index && (
                                    <div
                                      className="textures-options mt-2 p-2"
                                      style={{
                                        background: "#15589c",
                                        borderRadius: "5px",
                                        position: "absolute",
                                        top: "100%",
                                        zIndex: "1000",
                                      }}
                                    >
                                      <div className="texture-modal-content">
                                        {/* <span className="close" onClick={handleCloseModal} style={{cursor:'pointer'}}>&times;</span> */}
                                        <img
                                          src={require("../assets/imgs/diagnol-left.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("diagnolLeft", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/diagnol-right.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("diagnolRight", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/dash.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("dash", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/dots.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("dots", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/cross.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("cross", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/steric.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("steric", index)
                                          }
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )):
                              selectedLabels.slice(1).map((label, index) => (
                                <div
                                  key={index}
                                  className="color-theme-div d-flex flex-column align-items-center my-3 mx-2"
                                  style={{ position: "relative" }}
                                >
                                  <p>{selectedLabels[index+1]}</p>
                                  <div className="">
                                    <img
                                      src={require("../assets/imgs/diagnol-left.png")}
                                      alt=""
                                      style={{
                                        width: "50px",
                                        height: "30px",
                                        cursor: "pointer",
                                        border: "2px solid gray",
                                        borderRadius: "3px",
                                      }}
                                      onClick={() => handleImageClick(index)}
                                    />
                                  </div>
                                  {showModal && clickedImageIndex === index && (
                                    <div
                                      className="textures-options mt-2 p-2"
                                      style={{
                                        background: "#15589c",
                                        borderRadius: "5px",
                                        position: "absolute",
                                        top: "100%",
                                        zIndex: "1000",
                                      }}
                                    >
                                      <div className="texture-modal-content">
                                        {/* <span className="close" onClick={handleCloseModal} style={{cursor:'pointer'}}>&times;</span> */}
                                        <img
                                          src={require("../assets/imgs/diagnol-left.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("diagnolLeft", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/diagnol-right.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("diagnolRight", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/dash.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("dash", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/dots.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("dots", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/cross.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("cross", index)
                                          }
                                        />
                                        <img
                                          src={require("../assets/imgs/steric.png")}
                                          className="my-1"
                                          alt=""
                                          style={{
                                            width: "60px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleTextureChange("steric", index)
                                          }
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))
                              }
                            </div>
                          </div>
                        </div>
                      )}
                      {modalOption === "textureStyles" && (
                        <div className="modal-right d-flex flex-column justify-content-between align-items-start p-3 w-100">
                          <div
                            className="d-flex flex-row flex-wrap w-100 justify-content-start"
                            style={{ height: "470px", overflowY: "auto" }}
                          >
                            <div className="color-theme-div d-flex flex-column align-items-center my-3 w-100">
                              <h5 className="mb-2">Texture Styles</h5>
                              {/* <div className="d-flex flex-row flex-wrap justify-content-around w-100"> */}
                              {Object.entries(dictionaryState).map(
                                ([index, value]) => (
                                  <div
                                    key={index}
                                    className="d-flex flex-row flex-wrap justify-content-around align-items-center w-100"
                                  >
                                    <p
                                      style={{
                                        color: "rgb(68,68,68)",
                                        fontSize: "0.9rem",
                                      }}
                                    >
                                      {parameters.labels.x[index]}
                                    </p>
                                    <div className="d-flex flex-column align-items-center my-1">
                                      <p style={{ fontSize: "0.9rem" }}>Color</p>
                                      <input
                                        type="color"
                                        name=""
                                        id=""
                                        value={
                                          colorStatesTexture[index]
                                            ? colorStatesTexture[index]
                                            : "#0000000"
                                        }
                                        onChange={(e) =>
                                          handleTextureChange(
                                            value,
                                            index,
                                            1,
                                            e.target.value,
                                            colorStatesBgTexture[index]
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="d-flex flex-column align-items-center my-1">
                                      <p style={{ fontSize: "0.9rem" }}>
                                        Background Color
                                      </p>
                                      <input
                                        type="color"
                                        name=""
                                        id=""
                                        value={
                                          colorStatesBgTexture[index]
                                            ? colorStatesBgTexture[index]
                                            : "#ffffff"
                                        }
                                        onChange={(e) =>
                                          handleTextureChange(
                                            value,
                                            index,
                                            2,
                                            colorStatesTexture[index],
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                )
                              )}
                              {/* </div> */}
                            </div>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={closeModal}
                        style={{
                          border: "none",
                          background: "transparent",
                          fontSize: "1.2rem",
                          borderRadius: "0 10px 0 10px",
                        }}
                        className="modal-close-button px-2"
                      >
                        x
                      </button>
                    </div>
                  </div>
                </Draggable>
                <div id="overlay" class="overlay"></div>
              </>
            )}
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
                      <div className="custom-dropdown-list-user-panel data-dropdown-list">
                        {columns.map((option, index) => (
                          <div
                            className="d-flex flex-row align-items-center"
                            id={`checkbox-${index}`}
                            key={index}
                          >
                            <input
                              type="checkbox"
                              name={option}
                              id={`checkbox-${index}`}
                              value={option}
                              onClick={(e) => setLabels(e)}
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



                    {
                      xAxis ?
                        <div className="d-flex flex-column mt-3">
                          <div className="d-flex flex-row" style={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray' }}>
                            <p style={{ color: 'gray', fontSize: '0.9rem', fontWeight: 'bold' }}>X-Axis: <span style={{ fontSize: '0.7rem', fontStyle: 'italic', fontWeight: 'normal' }}>(You can select only one)</span></p>
                          </div>
                          <div className="d-flex flex-row justify-content-center w-100" style={{ borderBottom: '1px solid lightgray' }}>
                            <p style={{ fontSize: '0.9rem' }}>{xAxis}</p>
                          </div>
                        </div>
                        : ""
                    }
                    {
                      yAxis && selectedLabels.length > 1 ?
                        <div className="d-flex flex-column mt-4">
                          <div className="d-flex flex-row" style={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray' }}>
                            <p style={{ color: 'gray', fontSize: '0.9rem', fontWeight: 'bold' }}>Y-Axis: <span style={{ fontSize: '0.7rem', fontStyle: 'italic', fontWeight: 'normal' }}>(You can select multiple fields)</span></p>
                          </div>
                          {
                            selectedLabels.slice(1).map((label, index) => (
                              <div className="d-flex flex-row justify-content-center w-100" style={{ borderBottom: index === selectedLabels.length - 2 ? '1px solid lightgray' : 'none' }}>
                                <p style={{
                                  fontSize: '0.9rem',
                                }}>
                                  {label}
                                </p>
                              </div>
                            ))
                          }
                        </div>
                        : ""
                    }


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
                        <div className={`custom-dropdown-list-user-panel ${selectedLabels.length > 2 ? "disabled-component" : ""}`}>
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
                    <div className="d-flex flex-row my-1 data-labels-config align-items-center mt-3">
                      <label htmlFor="" className="">
                        Step Size
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        value={stepSize}
                        className="mx-2 step-size-input"
                        onChange={(e) => setStepSize(e.target.value)}
                      />
                    </div>
                    <div className="d-flex flex-row my-1 data-labels-config align-items-center mt-3">
                      <label htmlFor="" className="">
                        Legend Position
                      </label>
                      <select
                        className="mx-2 step-size-input"
                        onChange={(e) => setLegendPosition(e.target.value)}
                      >
                        <option value="left">Left</option>
                        <option value="right" selected>Right</option>
                        <option value="top">
                          Top
                        </option>
                        <option value="bottom">Bottom</option>
                      </select>
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
                        <div className="d-flex flex-row my-1 data-labels-config align-items-center">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            onChange={() => generateGreyShadeColors(!greyShadeCheck)}
                            checked={greyShadeCheck}
                          />
                          <label htmlFor="" className="mx-2">
                            Grey Shade Color
                          </label>
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
                        X-Axis ({xAxis})
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
                        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        Y-Axis
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
            {/* {xAxis && !graphName ? (
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
                PlotAnt - Visualize Your Data
              </h2>
            )} */}

            {xAxis && yAxis && !graphName ? (
              parameters ? (
                <LabelTable
                  jsonData={parameters ? parameters : uniqueValues}
                  selectedLabels={selectedLabels}
                />
              ) : (
                <h2 style={{ alignSelf: "center" }}>
                  PlotAnt - Visualize Your Data
                </h2>
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
                  stepSize={stepSize}
                  legendPosition={legendPosition}
                  selectedLabels={selectedLabels}
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
                  stepSize={stepSize}
                  legendPosition={legendPosition}
                  selectedLabels={selectedLabels}
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
                <div
                  onClick={() => handlePreviousGraph(index, history[37])}
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
                    selectedLabels={history[5]}
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
                  className={`${accessType==="read"? "disabled-component":""}`}
                  style={{ width: "20px", cursor: "pointer" }}
                  onClick={() => deleteGraph(history[37])}
                  alt=""
                />
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        {
          jsonData && <div
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
                accessType={accessType}
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
