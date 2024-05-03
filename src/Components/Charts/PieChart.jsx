import React from "react";
import { Pie } from "react-chartjs-2";
import "../../assets/css/Charts.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
// import { Tooltip } from "chart.js";

function PieChart({
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
  dataLabelsConfig,
  fontFamily,
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
        link.download = `${graphHeading}_PieChart.${format}`;
        link.click();
        break;
      case "jpeg":
        image = tempCanvas.toDataURL("image/jpeg");
        link.href = image;
        link.download = `${graphHeading}_PieChart.${format}`;
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
    /// Check if chartData is defined
  if (!chartData) {
    console.error('chartData is undefined.');
    return;
  }

  // Check if chartData has required properties
  if (!chartData || !chartData.datasets || !chartData.labels) {
    console.error('chartData or its properties (datasets, labels) are undefined.');
    return;
  }

  const { datasets, labels } = chartData;

  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33FF', '#FFFF33'];

  let colorDefinitions = ""; // String to hold color definitions
  // Generate color definitions
  colors.forEach((color, index) => {
    colorDefinitions += `\\definecolor{mycolor${index}}{HTML}{${color.substring(
      1
    )}}\n`; 
  });

  let latexCode = `
      \\documentclass{article}
      \\usepackage{pgf-pie}
      \\usepackage{xcolor} % Add xcolor package for defining custom colors
      
      % Add more color definitions as needed
      ${colorDefinitions}
      
      \\begin{document}
      
      \\begin{figure}
        \\centering
        \\begin{tikzpicture}
        \\pie[rotate=180, 
          text=inside, 
          radius=5,
          color={mycolor0, mycolor1, mycolor2, mycolor3, mycolor4}, % Use defined colors
        ]
        {`;

  let totalSum = 0;

  datasets.forEach((dataset, index) => {
    labels.forEach((label, labelIndex) => {
      totalSum += dataset.data[labelIndex];
    });
  });

  datasets.forEach((dataset, index) => {
    labels.forEach((label, labelIndex) => {
      const dataValue = dataset.data[labelIndex];
      const percentage = (dataValue / totalSum) * 100;
      latexCode += `${percentage.toFixed(2)}/${label} (${dataValue}), `;
    });
  });

  // Remove the trailing comma and close the tikzpicture and figure environments
  latexCode = latexCode.slice(0, -2) + "}\n";
  latexCode += `
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
            link.download = `${graphHeading}_PieChart.tex`;
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
      link.setAttribute("download", `${graphHeading}_PieChart.eps`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="chart-container w-100 pie-chart d-flex flex-column align-items-center">
      <h2 style={{ textAlign: "center" }} className="mt-3">
        Pie Chart
      </h2>
      <Pie
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
            },
          },
          scales: false,
        }}
        id="barChartCanvas"
      />
      <div className="d-flex">
        <select
          name=""
          id=""
          value="Download"
          className="download-chart-btn mt-3 mx-3 "
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
          className="download-chart-btn mt-3 px-3 mx-3"
          onChange={(e) => downloadChart(e.target.value)}
        >
          <option style={{ display: "none" }} value="">
            Download
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
export default PieChart;
