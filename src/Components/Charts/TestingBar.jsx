import React, { useRef, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "../../assets/css/Charts.css";
import { Chart } from "chart.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Canvg } from "canvg";
import { generatePath } from "react-router-dom";
// import 'chartjs-plugin-export';

function BarChart({
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
}) {
  // console.
  const [file, setFile] = useState(null);
  useEffect(() => {
    console.log(file);
  }, [file]);
  const stepSize = chartData.datasets[0].data.some((value) =>
    Number.isInteger(value)
  )
    ? 1
    : 0.1;
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
        link.download = `${graphHeading}_BarChart.${format}`;
        link.click();
        break;
      case "jpeg":
        image = tempCanvas.toDataURL("image/jpeg");
        link.href = image;
        link.download = `${graphHeading}_BarChart.${format}`;
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
        const dummyFile = new File([blob], "dummy.eps", {
          type: "application/postscript",
        });

        // You can also trigger your file upload logic here with the formData
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
    const barWidth = desiredDistance / numDataPoints;

    let latexCode = `
    \\documentclass{article}
    \\usepackage{pgfplots}
    
    \\begin{document}
    
    \\begin{figure}
      \\centering
      \\begin{tikzpicture}
        \\begin{axis}[
          title={${graphHeading}},
          xlabel={${xLabel}},
          ylabel={${yLabel}},
          xtick=data,
          symbolic x coords={${labels.join(", ")}},
          ymin=0,
          legend style={at={(0.5,-0.15)}, anchor=north, legend columns=-1},
          width=12cm, % Set the width of the chart
          grid=both,
        ]
      `;

    datasets.forEach((dataset, index) => {
      const datasetLabel = dataset.label || `Dataset ${index + 1}`;
      const color = barColors[index] || "black";

      latexCode += `
          \\addplot[
            ybar,
            fill=${color},
            draw=${barBorders ? "black" : "none"},
            bar width=15, % Set the width of the bars
          ] coordinates {
        `;

      labels.forEach((label, labelIndex) => {
        latexCode += `(${label}, ${dataset.data[labelIndex]}) `;
      });

      latexCode += `};`;
    });

    latexCode += `
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
        navigator.clipboard
          .writeText(latexCode)
          .then(() => {
            alert("LaTeX code copied to clipboard!");
          })
          .catch((err) => {
            console.error("Unable to copy LaTeX code to clipboard", err);
          });
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

      const data = await response.json();
      console.log("File uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="chart-container w-100 d-flex flex-column align-items-center">
      <h2 style={{ textAlign: "center" }} className="mt-3">
        Bars Chart
      </h2>
      <Bar
        id="barChartCanvas"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: graphHeading,
              font: {
                size: graphHeadSize,
                weight: graphHeadWeight,
              },
            },
            legend: {
              display: legendCheck,
            },
            datalabels: {
              anchor: "center",
              align: "center",
              color: dlColor,
              font: {
                weight: dlWeight,
                size: dlSize,
              },
            },
          },
          scales: {
            y: {
              // stacked:true,
              title: {
                display: true,
                text: yLabel,
                font: {
                  size: 13,
                },
              },
              beginAtZero: true,
              grid: {
                color: yLabelColor,
              },
              ticks: {
                // display:legendCheck,
                font: {
                  size: yLabelSize,
                  weight: yLabelWeight,
                },
                stepSize: stepSize,
              },
            },
            x: {
              // stacked:true,
              title: {
                display: true,
                text: xLabel,
                font: {
                  size: 13,
                },
              },
              // stacked:true,
              beginAtZero: true,
              grid: {
                color: xLabelColor,
              },
              ticks: {
                // display:legendCheck,
                font: {
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
        />
        {/* <input type="file" name="file" onChange={(e)=>handleFileUpload(e.target.value)} /> */}
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
export default BarChart;
