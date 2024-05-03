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
}) {
  const { labels, barData, lineData } = chartData;
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
  const data = {
    labels: labels,
    datasets: [
      {
        type: "line",
        label: "Line Dataset",
        borderColor: "rgba(255, 99, 132, 0.2)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: barBorders,
        fill: true,
        data: chartData.datasets[0].data,
      },
      {
        type: "bar",
        label: "Bar Dataset",
        backgroundColor: barColors,
        borderColor: barColors,
        borderWidth: barBorders,
        data: chartData.datasets[0].data,
      },

      //   {
      //     type: 'pie',
      //     label: 'Line Dataset',
      //     borderColor: barColors,
      //     backgroundColor: barColors,
      //     borderWidth: barBorders,
      //     fill: false,
      //     data: chartData.datasets[0].data
      //   }
    ],
  };

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
    const numDataPoints = labels.length;
    const desiredDistance = 15; // Set the desired distance between x labels

    let barPlot = `
      \\addplot[
        ybar,
        fill=orange!80,
        draw=none,
        bar width=15, % Set the width of the bars
      ] coordinates {
    `;

    let linePlot = `
      \\addplot[
        % color=green!50,
        fill=blue!60, % Set the fill color for the shaded area
        fill opacity=0.5, % Set the opacity for the shaded area
        draw=none
      ] coordinates {
    `;

    labels.forEach((label, labelIndex) => {
      const barDataPoint = data.datasets[0].data[labelIndex];
      const lineDataPoint = data.datasets[0].data[labelIndex];

      barPlot += `(${label}, ${barDataPoint}) `;
      linePlot += `(${label}, ${lineDataPoint}) `;
    });

    barPlot += `};`;
    linePlot += `};`;

    const latexCode = `
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
            width=${numDataPoints + 7}cm, % Set the width of the chart
            grid=both,
          ]
        ${barPlot}
        ${linePlot}
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
        link.download = `${graphHeading}_AreaBar.tex`;
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
              display: legendCheck,
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
