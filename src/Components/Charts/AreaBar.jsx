import React, { useRef, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import "../../assets/css/Charts.css";
import { Chart } from "chart.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Canvg } from "canvg";
import { generatePath } from "react-router-dom";

function AreaBar({
  chartData,
  yLabel,
  xLabel,
  xLabelColor,
  yLabelColor,
  xLabelSize,
  xLabelWeight,
  yLabelSize,
  yLabelWeight,
  graphHeadSize,
  graphHeadWeight,
  barColors,
  graphHeading,
  barBorders,
  legendCheck,
  dlSize,
  dlWeight,
  dlColor,
  dataLabelsConfig,
  fontFamily,
  stepSize,
  legendPosition,
  selectedLabels
}) {
  const { labels, datasets} = chartData;
  const maxDataValue = Math.max(...chartData.datasets.flatMap(dataset => dataset.data));
  console.log(barColors);
  const maxYValue = Math.ceil(maxDataValue / stepSize) * stepSize;
  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  console.log(chartData);

  const barData = datasets.map(dataset => dataset.data);
  const lineData = datasets.map(dataset => dataset.data);

  const barChartData = {
    labels: labels,
    datasets: barData.map((data, index) => ({
      type:'bar',
      label: `Bar ${selectedLabels[index + 1]}`,
      backgroundColor: selectedLabels.length>2 ? barColors[index % barColors.length]: barColors,
      borderColor: barColors[index % barColors.length],
      borderWidth: barBorders,
      data: data,
    })),
  };
  
  const lineChartData = {
    labels: labels,
    datasets: lineData.map((data, index) => ({
      label: `Area ${selectedLabels[index + 1]}`,
      borderColor: selectedLabels.length>2 ? `${barColors[index % barColors.length]}80`: `${barColors[0]}80`,
      backgroundColor: selectedLabels.length>2 ? `${barColors[index % barColors.length]}80`: `${barColors[0]}80`,
      borderWidth: barBorders,
      fill: true,
      data: data,
    })),
  };
  
  const data = {
    labels: labels,
    datasets: [
      ...barChartData.datasets, 
      ...lineChartData.datasets, 
      
    ],
  };

  console.log(lineChartData);

  const downloadChart = async (format) => {
    const canvas = document
      .getElementById("barChartCanvas")
      .getContext("2d").canvas;
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.fillStyle = "#FFFFFF";
    tempCtx.fillRect(0, 0, tempCanvas.width + 10, tempCanvas.height + 10);
    tempCtx.drawImage(canvas, 0, 0);

    let image;
    let mimeType;
    let link = document.createElement("a");
    switch (format) {
      case "png":
        image = tempCanvas.toDataURL("image/png");
        link.href = image;
        link.download = `${graphHeading}_AreaBar.${format}`;
        link.click();
        break;
      case "jpeg":
        image = tempCanvas.toDataURL("image/jpeg");
        link.href = image;
        link.download = `${graphHeading}_AreaBar.${format}`;
        link.click();
        break;
      case "pdf":
        image = tempCanvas.toDataURL("image/jpeg");
        let pdf = new jsPDF({
          orientation: "landscape",
        });
        pdf.setFontSize(40);
        pdf.addImage(image, "JPEG", 15, 15, 280, 150);
        pdf.save();
        break;
      case "eps":
        const blob = dataURLtoBlob(tempCanvas.toDataURL("image/jpeg"));
        const dummyFile = new File([blob], `${graphHeading}_BarChart.eps`, {
          type: "application/postscript",
        });

        handleFileUpload({ target: { files: [dummyFile] } });
        break;

      default:
        mimeType = "image/png";
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // No file selected

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/analysis/test", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.blob();
      // console.log('Entered');
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${graphHeading}_AreaBar.eps`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const generateLatex = (format) => {
    const { datasets, labels } = chartData;
    // const numDataPoints = labels.length;
    // const desiredDistance = 15; // Set the desired distance between x labels
    const canvas = document.getElementById("barChartCanvas").getContext("2d").canvas;
    const chartInstance = Chart.getChart("barChartCanvas");
    const options = chartInstance.config.options;
    console.log(options);
    const stepSize = options.scales.y.ticks.stepSize;
    const canvasWidth = canvas.width;
    const numBars = labels.length;

    const barWidth = (canvasWidth / numBars);
    let colorDefinitions = ""; // String to hold color definitions
    let plots = ""; // String to hold plot commands

    // Generate color definitions
    barColors.forEach((color, index) => {
      colorDefinitions += `\\definecolor{mycolor${index}}{HTML}{${color.substring(
        1
      )}}\n`; // Remove '#' from hex color
    });
    const areacolor="#FF6384";
    colorDefinitions += `\\definecolor{mycolor${(labels.length)+1}}{HTML}{${areacolor.substring(
      1
    )}}\n`;
    // Generate plot commands
    datasets.forEach((dataset, index) => {
      let color = `mycolor${index}`; // Use defined color for dataset
      const datasetLabel = dataset.label || `Dataset ${index + 1}`;

      labels.forEach((label, labelIndex) => {
        plots += `
        \\addplot[
          ybar,
          fill=mycolor${labelIndex}, % Use defined color for dataset
          draw=black,
          bar width=${barWidth - 290}, % Set the width of the bars
        ] coordinates {(${label}, ${dataset.data[labelIndex]}) };\n`;
      });
      
      // plots += `};`;
      plots += `
  \\addplot[
    fill=mycolor${(labels.length)+1},
    fill opacity=0.2,
    draw=none,
    closed,
  ] coordinates {
    ${labels.map((label, labelIndex) => `(${label}, ${dataset.data[labelIndex]})`).join(" ")}
    (${labels[labels.length - 1]}, 0)
    (${labels[0]}, 0)
  };`;
      console.log(color);
      console.log(plots);
    });

    const latexCode = `
    \\documentclass{article}
    \\usepackage{pgfplots}
    \\usepackage{xcolor} % Add xcolor package for defining custom colors
    \\usepackage{geometry}
\\geometry{
  a4paper, % or letterpaper (US)
  left=1in,
  right=1in,
  top=1in,
  bottom=1in,
}
    ${colorDefinitions} % Define colors

    \\begin{document}
    
    \\begin{figure}
      \\centering
      \\begin{tikzpicture}
        \\begin{axis}[
          title={${graphHeading}},
          xlabel={${xLabel}},
          ylabel={${yLabel}},
          xtick={${labels.join(", ")}},
          symbolic x coords={${labels.join(", ")}},
          ymin=0,
          ymax=${maxYValue},
          legend style={at={(0.5,-0.15)}, anchor=north, legend columns=-1},
          ytick distance=${stepSize},
          width=1.0\\textwidth, % Set the width of the chart
          grid=both,
        ]
      
      ${plots} % Plot commands

        \\end{axis}
      \\end{tikzpicture}
      \\caption{${graphHeading}}
    \\end{figure}
    
    \\end{document}
  `;
    switch (format) {
      case "tex":
        const blob = new Blob([latexCode], {
          type: "text/plain;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${graphHeading}_BarChart.tex`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      case "copycode":
        const textarea = document.createElement("textarea");
        textarea.value = latexCode;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("LaTeX code copied to clipboard!");
        break;
    }
  };

  return (
    <div className="chart-container w-100 d-flex flex-column align-items-center">
      <h2 style={{ textAlign: "center" }} className="mt-3">
        Area-Bar Chart
      </h2>
      <Line
        id="barChartCanvas"
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: graphHeading,
              font: {
                family: fontFamily,
                size: graphHeadSize,
                weight: graphHeadWeight,
              },
            },
            legend: {
              display: selectedLabels.length>2 ? legendCheck: false,
              position: legendPosition,
            },
            datalabels: {
              formatter: function (value, context) {
                if (context.dataset.type === "line") {
                  return "";
                } else {
                  return value;
                }
              },
              display: dataLabelsConfig,
              anchor: "center",
              align: "center",
              color: dlColor,
              font: {
                family: fontFamily,
                weight: dlWeight,
                size: dlSize,
              },
            },
          },
          scales: {
            y: {
              title: {
                display: true,
                text: yLabel,
                font: {
                  family: fontFamily,
                  size: 13,
                },
              },
              grid: {
                color: yLabelColor,
              },
              ticks: {
                font: {
                  family: fontFamily,
                  size: yLabelSize,
                  weight: yLabelWeight,
                },
                stepSize: stepSize,
              },
            },
            x: {
              title: {
                display: true,
                text: xLabel,
                font: {
                  family: fontFamily,
                  size: 13,
                },
              },
              beginAtZero: true,
              grid: {
                color: xLabelColor,
              },
              ticks: {
                font: {
                  family: fontFamily,
                  size: xLabelSize,
                  weight: xLabelWeight,
                },
              },
            },
          },
        }}
      />
      <div className="d-flex">
        <select
          name=""
          id=""
          value="Download"
          className="download-chart-btn mt-3 mx-3"
          onChange={(e) => generateLatex(e.target.value)}
        >
          <option style={{ display: "none" }}>Get LatexCode</option>
          <option value="tex">Get Tex File</option>
          <option value="copycode">Copy Code</option>
        </select>

        <select
          name=""
          id=""
          value="Download"
          className="download-chart-btn mt-3 px-2 mx-3"
          onChange={(e) => downloadChart(e.target.value)}
        >
          <option style={{ display: "none" }} value="">
            &nbsp;&nbsp;Download&nbsp;&nbsp;
          </option>
          <option value="png">png</option>
          <option value="jpeg">jpeg</option>
          <option value="pdf">pdf</option>
          <option value="eps">eps</option>
        </select>
        <input
          type="file"
          name="file"
          id="fileInput"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </div>
      {/* <Link to="#" onClick={generateLatex} className="customize-home-btn customize-home-btn-graph mt-1">Generate Latex</Link> */}
      {/* <div className="d-flex flex-column align-items-center w-100 chart-details-bottom" style={{height:'10vh', overflowY:'auto'}}>
            <div className="d-flex flex-row justify-content-around align-items-center w-100 flex-wrap h-100" style={{overflowY:'auto'}}>
              {chartData.labels.map((label, idx) => (
                <div className="d-flex flex-column align-items-center" key={idx}>
                      <p key={idx}>{label}</p>
                      <input type="color" name="" id="" value={barColors[idx]} disabled/>
                </div>
              ))}
            </div>
          </div> */}
    </div>
  );
}

export default AreaBar;
