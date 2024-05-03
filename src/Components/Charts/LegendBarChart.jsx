import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "../../assets/css/Charts.css";
import { Chart } from "chart.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Canvg } from "canvg";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

function LegendBarChart({
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
  // console.log(chartData);

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

    let latexCode = `
  \\documentclass{article}
  \\usepackage{pgfplots}
  \\pgfplotsset{compat=1.17}
  
  \\begin{document}
  
  \\begin{figure}[ht]
  \\centering
  \\begin{tikzpicture}
  \\begin{axis}[
    width=15cm,
    height=9cm,
    title={${graphHeading.replace(/_/g, "\\_")}}, % Escape underscores in LaTeX
    xlabel={${xLabel.replace(/_/g, "\\_")}},
    ylabel={${yLabel.replace(/_/g, "\\_")}},
    symbolic x coords={${labels
      .map((label) => label.replace(/_/g, "\\_"))
      .join(", ")}},
    xtick=data,
    ybar stacked, % This enables stacking of bars
    bar width=0.8cm,
    ymin=0,
    legend style={at={(0.5,-0.15)},anchor=north,legend columns=-1}, % Adjust legend position
    cycle list name=colorbrewer1, % Define the color scheme to be used
  ]
  
  `;

    datasets.forEach((dataset, index) => {
      // Use predefined LaTeX color names or define your own
      const color = `color${index + 1}`;
      latexCode += `\\addplot+[ybar, fill=${color}] coordinates {`;
      labels.forEach((label, labelIndex) => {
        latexCode += `(${label.replace(/_/g, "\\_")}, ${
          dataset.data[labelIndex]
        }) `;
      });
      latexCode += `};\n\\addlegendentry{${dataset.label.replace(
        /_/g,
        "\\_"
      )}}\n`;
    });

    latexCode += `
  \\end{axis}
  \\end{tikzpicture}
  \\caption{${graphHeading.replace(/_/g, "\\_")}}
  \\end{figure}
  
  \\end{document}`;

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
      link.setAttribute("download", `${graphHeading}_BarChart.eps`);
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
        Bar Chart
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
              formatter: function (value, context) {
                if (value !== 0) {
                  return Math.round(value);
                } else {
                  return "";
                }
              },
            },
          },
          scales: {
            y: {
              stacked: true,
              title: {
                display: true,
                text: yLabel,
                font: {
                  family: fontFamily,
                  size: 13,
                },
              },
              beginAtZero: true,
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
              stacked: true,
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
      {/* <button onClick={downloadChart} className="download-chart-btn mt-3">Download Chart</button> */}
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
export default LegendBarChart;
