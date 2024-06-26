import React from "react";
import { Line } from "react-chartjs-2";
import "../../assets/css/Charts.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Chart } from "chart.js";

function Spline({
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
  graphHeading,
  barColors,
  legendCheck,
  dlSize,
  dlWeight,
  dlColor,
  stepped,
  dataLabelsConfig,
  fontFamily,
  stepSize,
  legendPosition,
  barBorders,
  selectedLabels,
  smoothness
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
        link.download = `${graphHeading}_Spline.${format}`;
        link.click();
        break;
      case "jpeg":
        image = tempCanvas.toDataURL("image/jpeg");
        link.href = image;
        link.download = `${graphHeading}_Spline.${format}`;
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

  const maxDataValue = Math.max(...chartData.datasets.flatMap(dataset => dataset.data));

  const maxYValue = Math.ceil(maxDataValue / stepSize) * stepSize;

  const generateLatex = (format) => {
    const { datasets, labels } = chartData;
    const numDataPoints = labels.length;

    const canvas = document.getElementById("barChartCanvas").getContext("2d").canvas;
    const chartInstance = Chart.getChart("barChartCanvas");
    const options = chartInstance.config.options;
    console.log(options);
    const stepSize = options.scales.y.ticks.stepSize;
    const canvasWidth = canvas.width;
    const numBars = labels.length;

    const barWidth = (canvasWidth / numBars);

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
            ymax=${maxYValue},
          ytick distance=${stepSize},
            width=15cm, % Set the width of the chart
            grid=both,
          ]
        `;

    datasets.forEach((dataset, index) => {
      const datasetLabel = dataset.label || `Dataset ${index + 1}`;

      latexCode += `
            \\addplot[
              mark=*,
              ${stepped ? "const plot, no markers," : "smooth,"
        }, % Smooth the line if not stepped
              line width=1.5pt,
            ] coordinates {
          `;

      labels.forEach((label, labelIndex) => {
        latexCode += `(${label}, ${dataset.data[labelIndex]}) `;
      });

      latexCode += `};`;
    });

    latexCode += `
          \\end{axis}
        \\end{tikzpicture};
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
        link.download = `${graphHeading}_Spline.tex`;
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
      link.setAttribute("download", `${graphHeading}_Spline.eps`);
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
        {stepped ? "Stepped-Line Chart" : "Line Chart"}
      </h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          interaction: {
            intersect: false,
            axis: "x",
          },
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
              // position:'top'
            },
            datalabels: false,
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
              max:maxYValue
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
                // stepSize:20.5
              },
            },
          },
          elements: {
            line: {
              tension: smoothness?0.4:0.0,
            },
          },
        }}
        id="barChartCanvas"
      />
      <div className="d-flex">
        <select
          name=""
          id=""
          value="Download"
          className="download-chart-btn mt-3 mx-3"
          onChange={(e) => generateLatex(e.target.value, stepped)}
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
      {/* <div className="d-flex flex-column align-items-center w-100 chart-details-bottom mt-4">
        <div className="d-flex flex-row justify-content-around align-items-center w-100 flex-wrap h-100" style={{overflowY:'auto'}}>
          {chartData.labels.map((label, idx) => (
            <div className="d-flex flex-column align-items-center" key={idx}>
                  <p key={idx}>{label}</p>
                  <input type="color" name="" id="" value={barColors[idx]} disabled/>
            </div>
          ))}
        </div>
        <h5 className="my-2">{xLabel}</h5>
      </div> */}
    </div>
  );
}
export default Spline;
