import React from "react";
import { Bar } from "react-chartjs-2";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Chart } from "chart.js";

function HorizontalBarChart({
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
}) {
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

  const maxDataValue = Math.max(...chartData.datasets.flatMap(dataset => dataset.data));

  const maxYValue = Math.ceil(maxDataValue / stepSize) * stepSize;

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
        link.download = `${graphHeading}_HorizontalBarChart.${format}`;
        link.click();
        break;
      case "jpeg":
        image = tempCanvas.toDataURL("image/jpeg");
        link.href = image;
        link.download = `${graphHeading}_HorizontalBarChart.${format}`;
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

  const generateLatex = (format) => {
    const { datasets, labels } = chartData;
    const numDataPoints = labels.length;
    const desiredDistance = 15; // Set the desired distance between x labels
    const barHeight = desiredDistance / numDataPoints; // Changed from barWidth to barHeight

    const canvas = document.getElementById("barChartCanvas").getContext("2d").canvas;
    const chartInstance = Chart.getChart("barChartCanvas");
    const options = chartInstance.config.options;
    console.log(options);
    const stepSize = options.scales.x.ticks.stepSize;
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
  
    // Generate plot commands
    datasets.forEach((dataset, index) => {
      let color = `mycolor${index}`; // Use defined color for dataset
      const datasetLabel = dataset.label || `Dataset ${index + 1}`;
  
      dataset.data.forEach((value, labelIndex) => {
        plots += `
        \\addplot[
          xbar, % Changed from ybar to xbar
          fill=mycolor${labelIndex}, % Use defined color for dataset
          draw=black,
          bar width=${barWidth - 290},
        ] coordinates {(${value},${labels[labelIndex]})};\n`; // Changed coordinates order
      });
    });
  
    const latexCode = `
    \\documentclass{article}
    \\usepackage{pgfplots}
    \\usepackage{xcolor} % Add xcolor package for defining custom colors
  
    ${colorDefinitions} % Define colors
  
    \\begin{document}
    
    \\begin{figure*}
      \\centering
      \\begin{tikzpicture}
        \\begin{axis}[
          title={${graphHeading}},
          xlabel={Quantity}, % Changed from ylabel to xlabel
          ylabel={Date}, % Changed from xlabel to ylabel
          ytick={${labels.join(", ")}}, % Changed xtick to ytick
          symbolic y coords={${labels.join(", ")}}, % Changed symbolic x coords to symbolic y coords
          xmin=0, % Set minimum x value to 0
          legend style={at={(0.5,-0.15)}, anchor=north, legend columns=-1},
          height=14cm, % Set the height of the chart (changed from width to height)
          grid=both,
          bar height=${barHeight}, % Set the height of the bars (changed from bar width to bar height)
          enlarge y limits=0.1, % Enlarge y limits to avoid cropping bars
          y dir=reverse, % Reverse the direction of y-axis
          xmax=${maxYValue},
          xtick distance=${stepSize},
          reverse legend, % Reverse the order of legend entries
        ]
      
        ${plots} % Plot commands
  
        \\end{axis}
      \\end{tikzpicture}
      \\caption{}
    \\end{figure*}
    
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
      link.setAttribute("download", `${graphHeading}_HorizontalBarChart.eps`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="chart-container w-100 d-flex flex-column align-items-center">
      <h2 style={{ textAlign: "center" }} className="mt-3">
        Horizontal Bar Chart
      </h2>
      <Bar
        id="barChartCanvas"
        data={chartData}
        options={{
          indexAxis: "y",
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
              display: legendCheck,
              position: legendPosition,
            },
            datalabels: {
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
                stepSize: stepSize, 
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
    </div>
  );
}

export default HorizontalBarChart;
