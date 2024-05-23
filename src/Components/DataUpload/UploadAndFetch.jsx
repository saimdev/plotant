import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/UploadAndFetch.css";
import Parameters from "./Parameters";
import Table from "../SpreadSheet/Table";
import LabelTableVisitor from "../SpreadSheet/Visitor/LabelTableVisitor";
import SelectChartVisitor from "../Charts/Visitor/SelectChartVisitor";
import HeaderLogo from "../HeaderLogo";
import { Audio } from "react-loader-spinner";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { Link } from "react-router-dom";
import Draggable from "react-draggable";
import diagnolLeft from "../../assets/imgs/diagnol-left.png";
import TextureDropDown from "../DropDowns/TextureDropDown";

export function UploadAndFetch() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [stepSize, setStepSize] = useState(1);
  const [drag, setDrag] = useState(false);
  const [guestId, setGuestId] = useState("");
  const [types, setTypes] = useState(null);
  const [legendPosition, setLegendPosition] = useState("top");
  const [uniqueValues, setUniqueValues] = useState(null);
  const [greyShadeCheck, setGreyShadeCheck] = useState(false);
  // const [parentXAxis, setParentXAxis] = useState("");
  // const [parentYAxis, setParentYAxis] = useState("");
  const [graphName, setGraphName] = useState("");
  const [parameters, setParameters] = useState(null);
  const [loader, setLoader] = useState(false);
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
  const [color, setColor] = useColor("#561ecb");
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
  const [columnsData, setColumnsData] = useState(null);
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

  useEffect(() => {
    if (
      condition &&
      graphHistory[historyIndex] &&
      condition === graphHistory[historyIndex][16]
    ) {
      return;
    }
    if (yAxisConditions.length === 0) {
      setCondition([]);
    }
  }, [yAxisConditions, graphHistory, historyIndex]);

  function generateGreyShadeColors() {
    setGreyShadeCheck(!greyShadeCheck);
    if (!greyShadeCheck === true) {
      if (parameters) {
        let generatedColorPalette;
        if (Array.isArray(parameters.y)) {
          // Generate an array of random grey values (0-255)
          generatedColorPalette = parameters.y.map((_) => {
            const greyValue = Math.floor(Math.random() * 256);
            const hex = greyValue.toString(16).padStart(2, "0"); // Ensure two digits for each component
            return `#${hex}${hex}${hex}`; // Use the same value for R, G, and B components
          });
        } else {
          // Generate a single random grey value
          const greyValue = Math.floor(Math.random() * 256);
          const hex = greyValue.toString(16).padStart(2, "0");
          generatedColorPalette = [`#${hex}${hex}${hex}`]; // Use the same value for R, G, and B components
        }
        console.log(generatedColorPalette);
        // Ensure colors are not identical (loop until different)
        let unique = false;
        while (!unique) {
          unique = true;
          for (let i = 0; i < generatedColorPalette.length - 1; i++) {
            if (generatedColorPalette[i] === generatedColorPalette[i + 1]) {
              // Regenerate the duplicate color
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
    }
  }

  // useEffect(()=>{
  //   console.log(parameters);
  // },[parameters])

  // useEffect(() => {
  //   // Define a function to handle texture change
  //   const handleTextureChangeAndUpdateState = (value, index) => {
  //     const updatedBarColors = [...barColors];

  //     // Update the bar colors based on the texture value
  //     switch(value) {
  //       case 'steric':
  //         updatedBarColors[index] = createAsteriskPattern(textureColor, textureBg);
  //         break;
  //       case 'diagnolLeft':
  //         updatedBarColors[index] = createUpwardDiagonalPattern(textureColor, textureBg);
  //         break;
  //       case 'diagnolRight':
  //         updatedBarColors[index] = createDiagonalPattern(textureColor, textureBg);
  //         break;
  //       case 'dash':
  //         updatedBarColors[index] = createDashPattern(textureColor, textureBg);
  //         break;
  //       case 'dots':
  //         updatedBarColors[index] = createOPattern(textureColor, textureBg);
  //         break;
  //       case 'cross':
  //         updatedBarColors[index] = createStericsPattern(textureColor, textureBg);
  //         break;
  //       default:
  //         // Handle default case
  //     }

  //     // Update the state with the new values
  //     setBarColors(updatedBarColors);
  //     setDictionaryState(prevState => ({
  //       ...prevState,
  //       [index]: value
  //     }));
  //   };

  //   // Iterate over dictionaryState entries
  //   Object.entries(dictionaryState).forEach(([index, value]) => {
  //     // Call handleTextureChangeAndUpdateState for each entry
  //     handleTextureChangeAndUpdateState(value, index);
  //   });
  // }, [textureBg, textureColor]);

  const openModal = () => {
    setIsModalOpen(true);
    // console.log(barColors);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalOption("color");
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

  // const handleOptionClick = (option) => {
  //   setSelectedOption(option);
  //   setIsOpen(false);
  // };
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

  // useEffect(() => {
  //   // Generate color palette based on the selected labels
  //   const generatedColorPalette = selectedLabels.map(_ => `#${Math.floor(Math.random()*16777215).toString(16)}`);
  //   setColorPalette(generatedColorPalette);
  // }, [selectedLabels]);

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

  const getData = () => {
    setLoader(true);
    if (selectedFile) {
      setLoader(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      fetch("/analysis/getdata", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.data)) {
            console.log('jsonData',data.data);
            // console.log(data.columns);
            setJsonData(data.data);
            setColumns(data.columns);
            setGuestId(data.guest);
            setTypes(data.type);
            setColumnsData(data.columns_data);
            setUniqueValues(data.columns_unique_data);
          } else {
            console.error("Invalid data format");
            alert("Invalid data format");
          }
          // console.log(data);
          setLoader(false);
        })
        .catch((error) => {
          console.error(error);
          alert(error);
          setLoader(false);
        });
    }
    // console.log(loader);
  };

  // const handleXAxisChange = (value) => {
  //   setParentXAxis(value);
  // };

  // const handleYAxisChange = (value) => {
  //   setParentYAxis(value);
  // };

  // const handleParameters = (value) => {
  //   setParentParameters(value);
  // }

  const handleFileChange = (event) => {
    const fileInput = event.target.files[0];

    if (fileInput) {
      setSelectedFile(fileInput);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDrag(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDrag(false);
    const fileInput = event.dataTransfer.files[0];

    if (fileInput) {
      setSelectedFile(fileInput);
    }
  };

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
        fetch("/analysis/getlabels", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            x_label: xAxis,
            y_label: labelValue,
            guest: guestId,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data.x) && Array.isArray(data.y)) {
              setParameters(data);
              // console.log(data);
            } else {
              console.error("Invalid data format");
              alert("Invalid data format");
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

  const handleColorChange = (index, newColor) => {
    const updatedColors = [...barColors];
    updatedColors[index] = newColor;
    setBarColors(updatedColors);
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
        fetch("/analysis/getlegends", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            x_label: xAxis,
            y_label: yAxis,
            z: labelValue,
            guest: guestId,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data.x) && Array.isArray(data.y)) {
              setParameters(data);
              // console.log(data);
            } else {
              console.error("Invalid data format");
              alert("Invalid Data Format");
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
      fetch("/analysis/getlabels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          x_label: xAxis,
          y_label: yAxis,
          guest: guestId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.x) && Array.isArray(data.y)) {
            setParameters(data);
            // console.log(data);
          } else {
            console.error("Invalid data format");
            alert("Invalid data format");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
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

  const getFileNameWithoutExtension = (fileName) => {
    return fileName.split(".")[0];
  };

  const handleDragLeave = () => {
    setDrag(false);
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

  const deleteGraph = (index) => {
    const updatedHistory = [...graphHistory];
    updatedHistory.splice(index, 1);
    setGraphHistory(updatedHistory);
  };

  const nodeRef = useRef(null);

  const handleLinkHover = (linkName, event) => {
    // console.log('entered');
    setHoveredLink(linkName);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const handleLinkLeave = () => {
    // console.log('left');
    setHoveredLink(null);
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
      greyShadeCheck,
      legendPosition,
    ];
    setGraphHistory((prevHistory) => [newGraphState, ...prevHistory]);
    setGraphName("");
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
    setColumnsData(null);
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
    setLegendPosition("top");
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

  const newFile = () => {
    setSelectedFile(null);
    setParameters(null);
    setJsonData(null);
    setColumns(null);
    setGuestId("");
    setUniqueValues(null);
    setGraphName("");
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
    setColumnsData(null);
    setBarBoders(1);
    setCondition([]);
    setConditionalParameters([]);
    setGraphHistory([]);
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
  };

  const [showModal, setShowModal] = useState(false);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);

  const handleImageClick = (index) => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
      setClickedImageIndex(index);
    }
  };

  const setYAxisFilterValue = (e) => {
    setYAxisValue(e.target.value);
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

  return (
    <div className="mt-5 mx-2">
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
                        {barColors.map((color, index) => (
                          <div
                            key={index}
                            className="color-theme-div d-flex flex-column align-items-center my-3 mx-2"
                          >
                            <p>{parameters.x[index]}</p>
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
                        {barColors.map((color, index) => (
                          <div
                            key={index}
                            className="color-theme-div d-flex flex-column align-items-center my-3 mx-2"
                            style={{ position: "relative" }}
                          >
                            <p>{parameters.x[index]}</p>
                            <div className="">
                              <img
                                src={require("../../assets/imgs/diagnol-left.png")}
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
                                    src={require("../../assets/imgs/diagnol-left.png")}
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
                                    src={require("../../assets/imgs/diagnol-right.png")}
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
                                    src={require("../../assets/imgs/dash.png")}
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
                                    src={require("../../assets/imgs/dots.png")}
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
                                    src={require("../../assets/imgs/cross.png")}
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
                                    src={require("../../assets/imgs/steric.png")}
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
                        ))}
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
                                {parameters.x[index]}
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
      {selectedFile ? (
        <section className="data-upload-section my-5 data-upload-section-selected">
          {jsonData ? (
            <div className="results-home-container d-flex flex-column">
              <div className="upper-section-results-home d-flex flex-row">
                <div className="home-dashboard-col-header d-flex flex-column w-100">
                  <div
                    className={`d-flex flex-row align-items-center home-newFile-btn ${
                      isContainerDataOpen
                        ? "custom-home-dashboard-menu-btn-data"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-100 h-100 d-flex flex-row align-items-center py-1 ${
                        isContainerDataOpen
                          ? "custom-home-dashboard-menu-btn custom-home-dashboard-menu-btn-data"
                          : ""
                      }`}
                      style={{
                        borderRight: "1px solid rgb(167, 167, 167)",
                        borderBottom: "1px solid rgb(167, 167, 167)",
                      }}
                    >
                      <p
                        className="mx-1"
                        onClick={() => handleContainerToggle("data")}
                        style={{ cursor: "pointer" }}
                      >
                        Data
                      </p>
                      <button
                        className={`mx-1 ${
                          isContainerDataOpen ? "custom-home-menu-new-btn" : ""
                        }`}
                        onClick={newFile}
                      >
                        New
                      </button>
                    </div>
                    <div
                      className={`w-100 h-100 d-flex flex-row align-items-center py-1 justify-content-center ${
                        isContainerVisualOpen
                          ? "custom-home-dashboard-menu-btn"
                          : ""
                      }`}
                      style={{
                        borderRight: "1px solid rgb(167, 167, 167)",
                        borderBottom: "1px solid rgb(167, 167, 167)",
                      }}
                    >
                      <p
                        className=""
                        onClick={() => handleContainerToggle("visual")}
                        style={{ cursor: "pointer" }}
                      >
                        Visuals
                      </p>
                    </div>
                    <div
                      className={`w-100 h-100 d-flex flex-row align-items-center py-1 justify-content-center ${
                        isContainerFilterOpen
                          ? "custom-home-dashboard-menu-btn"
                          : ""
                      }`}
                      style={{ borderBottom: "1px solid rgb(167, 167, 167)" }}
                    >
                      <p
                        className=""
                        onClick={() => handleContainerToggle("filter")}
                        style={{ cursor: "pointer" }}
                      >
                        Filters
                      </p>
                    </div>
                  </div>
                  {isContainerDataOpen ? (
                    <div className="custom-dropdown w-100 px-2 py-1">
                      <button
                        onClick={toggleDropdown}
                        className="d-flex flex-row justify-content-between align-items-center"
                      >
                        {getFileNameWithoutExtension(selectedFile.name)}
                        {isOpen ? (
                          <img
                            src={require("../../assets/imgs/upload.png")}
                            alt=""
                            style={{ width: "12px" }}
                          />
                        ) : (
                          <img
                            src={require("../../assets/imgs/down-arrow.png")}
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
                                // onMouseEnter={(e) => handleLinkHover(option, e)}
                                // onMouseLeave={handleLinkLeave}
                                key={index}
                                src={require(`../../assets/imgs/${option}.png`)}
                                alt={option} // Set alt attribute to graph name for accessibility
                                onClick={
                                  parameters
                                    ? () => {
                                        if (option === "Stepped") {
                                          setGraphName(option);
                                          setStepped(true);
                                        } else {
                                          setGraphName(option);
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
                          src={require("../../assets/imgs/Table.png")}
                          alt=""
                          className="mt-1"
                          onClick={() => setGraphName("")}
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
                              src={require("../../assets/imgs/upload.png")}
                              alt=""
                              style={{ width: "12px" }}
                            />
                          ) : (
                            <img
                              src={require("../../assets/imgs/down-arrow.png")}
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
                          <option value="right">Right</option>
                          <option value="top" selected>
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
                          onChange={() =>
                            setDataLabelsConfig(!dataLabelsConfig)
                          }
                        />
                        <label htmlFor="" className="mx-2">
                          Display DataLabels
                        </label>
                      </div>
                      {graphName && xAxis && yAxis ? (
                        <>
                          <div className="color-pallettes-graphs d-flex flex-row flex-wrap justify-content-start align-items-center">
                            <img
                              src={require("../../assets/imgs/pallettes/pallette1.png")}
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
                              src={require("../../assets/imgs/pallettes/pallette2.png")}
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
                              src={require("../../assets/imgs/pallettes/pallette3.png")}
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
                              src={require("../../assets/imgs/pallettes/pallette4.png")}
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
                              src={require("../../assets/imgs/pallettes/pallette5.png")}
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
                              src={require("../../assets/imgs/pallettes/pallette6.png")}
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
                            <img
                              src={require("../../assets/imgs/pallettes/pallette7.png")}
                              alt=""
                              className="my-2 mx-1"
                              onClick={() =>
                                handleColorPaletteClick([
                                  "#202020",
                                  "#343434",
                                  "#565656",
                                  "#7D7D7D",
                                ])
                              }
                            />
                            <img
                              src={require("../../assets/imgs/pallettes/pallette8.png")}
                              alt=""
                              className="my-2 mx-1"
                              onClick={() =>
                                handleColorPaletteClick([
                                  "#39311D",
                                  "#7E7474",
                                  "#C4B6B6",
                                  "#FFDD93",
                                ])
                              }
                            />
                            <img
                              src={require("../../assets/imgs/pallettes/pallette9.png")}
                              alt=""
                              className="my-2 mx-1"
                              onClick={() =>
                                handleColorPaletteClick([
                                  "#362222",
                                  "#171010",
                                  "#423F3E",
                                  "#2B2B2B",
                                ])
                              }
                            />
                            <img
                              src={require("../../assets/imgs/pallettes/pallette10.png")}
                              alt=""
                              className="my-2 mx-1"
                              onClick={() =>
                                handleColorPaletteClick([
                                  "#525252",
                                  "#414141",
                                  "#313131",
                                  "#EC625F",
                                ])
                              }
                            />
                          </div>
                          <div className="d-flex flex-row my-1 data-labels-config align-items-center">
                            <input
                              type="checkbox"
                              name=""
                              id=""
                              onChange={() => generateGreyShadeColors()}
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
                          {xAxis}
                          {isOpenFilterX ? (
                            <img
                              src={require("../../assets/imgs/upload.png")}
                              alt=""
                              style={{ width: "12px" }}
                            />
                          ) : (
                            <img
                              src={require("../../assets/imgs/down-arrow.png")}
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
                                onClick={(e) =>
                                  handleConditionChange(e, option)
                                }
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
                              src={require("../../assets/imgs/upload.png")}
                              alt=""
                              style={{ width: "12px" }}
                            />
                          ) : (
                            <img
                              src={require("../../assets/imgs/down-arrow.png")}
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
                <div
                  className="graphs-home-container d-flex flex-row justify-content-center"
                  style={{ paddingRight: "14px" }}
                >
                  {/* {
                                  graphName && (
                                    <img src={require('../../assets/imgs/Table.png')} alt="" className="" onClick={()=>setGraphName('')}/>
                                  )
                                } */}
                  {xAxis && !graphName ? (
                    <LabelTableVisitor
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
                      <LabelTableVisitor
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
                      <SelectChartVisitor
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
                      <SelectChartVisitor
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
              {/* 0 graphName,
     1 parameters,
     2 barColors,
     3 xAxis,
     4 yAxis,
     5 selectedLabels,
     6 xLabelColor,
     7 yLabelColor,
     8 graphHeadSize,
     9 graphHeadWeight,
     10 xLabelSize,
     11 xLabelWeight,
     12 yLabelSize,
     13 yLabelWeight,
     14 graphHeading,
     15 barBorders,
     16 condition,
     17 conditionalParameters,
     18 yAxisConditions,
     19 yAxisValue */}
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
                        <SelectChartVisitor
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
                          legendCheck={true}
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
                        src={require("../../assets/imgs/delete.png")}
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

              <div
                className="row"
                style={{ borderTop: "1px solid rgb(167, 167, 167)" }}
              >
                <div className="col-12">
                  {
                    <Table
                    jsonData={jsonData}
                    xLabel={xAxis}
                    yLabel={yAxis}
                    onResponse={handleEditedResponse}
                    guestId={guestId}
                  />
                  }
                </div>
              </div>
            </div>
          ) : selectedFile ? (
            <div className="data-upload-container d-flex flex-column align-items-center justify-content-center">
              {loader ? (
                <HeaderLogo width={200} height={200} />
              ) : (
                <>
                  <h2 className="my-3">{selectedFile.name}</h2>
                  <button className="get-data-button" onClick={getData}>
                    Get Data
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="data-upload-container d-flex flex-column align-items-center justify-content-center">
              <h2 className="my-3">Drag or Upload CSV File</h2>
              <label htmlFor="fileInput" className="custom-file-upload">
                Upload File
              </label>
              <input
                type="file"
                name=""
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          )}
        </section>
      ) : (
        <section className="data-upload-section d-flex flex-column align-items-center justify-content-center my-5">
          <div
            className={`data-upload-container d-flex flex-column align-items-center justify-content-center container ${
              drag ? "drag-over" : ""
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
          >
            <h2 className="mt-3 mb-2">Drag or Upload CSV File</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="42"
              viewBox="0 0 18 20"
              fill="none"
              className="upload-svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.28977 11.27H6.28977C7.55075 11.2476 8.59243 12.2491 8.61977 13.51V17.51C8.61429 18.7724 7.59222 19.7945 6.32977 19.8H2.32977C1.06883 19.8167 0.0316818 18.8108 0.00976562 17.55V13.55C0.00976562 12.2908 1.03056 11.27 2.28977 11.27ZM6.28977 18.3C6.72607 18.3 7.07977 17.9463 7.07977 17.51V13.51C7.07978 13.3013 6.99623 13.1014 6.84778 12.9549C6.69934 12.8083 6.49836 12.7273 6.28977 12.73H2.28977C2.0829 12.73 1.8845 12.8121 1.73822 12.9584C1.59194 13.1047 1.50977 13.3031 1.50977 13.51V17.51C1.50973 17.9424 1.85737 18.2945 2.28977 18.3H6.28977Z"
                fill="gray"
              />
              <path
                d="M5.05977 14.78V14.21C5.05977 13.7957 4.72398 13.46 4.30977 13.46C3.89555 13.46 3.55977 13.7957 3.55977 14.21V14.78H2.99977C2.58555 14.78 2.24977 15.1157 2.24977 15.53C2.24977 15.9442 2.58555 16.28 2.99977 16.28H3.56977V16.86C3.56977 17.2742 3.90555 17.61 4.31977 17.61C4.73398 17.61 5.06977 17.2742 5.06977 16.86V16.28H5.64977C6.06398 16.28 6.39977 15.9442 6.39977 15.53C6.39977 15.1157 6.06398 14.78 5.64977 14.78H5.05977Z"
                fill="gray"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.0498 0.429961L17.0498 7.42996C17.1986 7.58149 17.2782 7.78775 17.2698 7.99996V15C17.2698 17.6233 15.1431 19.75 12.5198 19.75H9.64977C9.23555 19.75 8.89977 19.4142 8.89977 19C8.89977 18.5857 9.23555 18.25 9.64977 18.25H12.5198C14.3147 18.25 15.7698 16.7949 15.7698 15V8.74996H11.5198C10.001 8.74996 8.76977 7.51874 8.76977 5.99996V1.73996H6.51977C4.72322 1.74547 3.26976 3.20341 3.26977 4.99996V9.99996C3.26977 10.4142 2.93398 10.75 2.51977 10.75C2.10555 10.75 1.76977 10.4142 1.76977 9.99996V4.99996C1.7591 3.73327 2.25483 2.51478 3.14679 1.61532C4.03874 0.715848 5.25303 0.209916 6.51977 0.209961H9.51977C9.71861 0.210136 9.90925 0.289268 10.0498 0.429961ZM10.2698 2.76996V5.99996C10.2753 6.68641 10.8333 7.23998 11.5198 7.23996H14.7398L10.2698 2.76996Z"
                fill="gray"
              />
            </svg>
            <label htmlFor="fileInput" className="custom-file-upload mt-3">
              Upload File
            </label>
            <input
              type="file"
              name=""
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default UploadAndFetch;
