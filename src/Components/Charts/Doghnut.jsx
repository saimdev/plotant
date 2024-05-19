import React from "react";
import { Doughnut } from "react-chartjs-2";
import "../../assets/css/Charts.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
// import { Tooltip } from "chart.js";

function Doghnut({
  chartData,
  yLabel,
  xLabel,
  xLabelColor,
  dataValues,
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
        link.download = `${graphHeading}_Doughnut.${format}`;
        link.click();
        break;
      case "jpeg":
        image = tempCanvas.toDataURL("image/jpeg");
        link.href = image;
        link.download = `${graphHeading}_Doughnut.${format}`;
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
    let colorDefinitions = ""; // String to hold color definitions
  // Generate color definitions
  console.log(datasets[0].backgroundColor);
  barColors.forEach((color, index) => {
    colorDefinitions += `\\definecolor{mycolor${index}}{HTML}{${color.substring(
      1
    )}}\n`; // Remove '#' from hex color
  });
    let colorList = "";
    for (let i = 0; i < labels.length; i++) {
        colorList += `mycolor${i}, `;
    }
    // Remove the trailing comma
    colorList = colorList.slice(0, -2);
    let latexCode = `
      \\documentclass{article}
      \\usepackage{pgf-pie}
      \\usepackage{xcolor}
      
      ${colorDefinitions}
      \\begin{document}
      
      \\begin{figure*}
      \\centering
      \\begin{tikzpicture}
      % <--- \\pie is the only command that provided by pgf-pie. The argument is a list of number and text combination in the formate of number/text, i.e. 10/A, 20/B, 30/C, 40/D. --->
      \\pie[
         % <--- The center of chart can be set by pos, default is {0,0}. The chart can be rotated by setting rotate (in degrees). The size of chart can be set by radius, default is 3. --->
         % pos={8,0},
         rotate=90,
         radius=5,
         % explode={0.1},
         % <--- The value of sum indicates the sum of all data in the chart, it is 100 by default. It can be calculated automatically when auto is set. Then the angle of slices are determined by number value and sum. --->
         sum=auto,
         % <--- The slices order direction can be set to clockwise by setting change direction, default is counterclockwise. --->
         % change direction, 
         % <--- The number also can be hide by hide number --->
         hide number,
         % <--- The size of font in size pie can be scaled according to how big the part is automatically. --->
         % scale font,
         % <--- The value of text can be label (default), pin, inside or legend. --->
         text=legend,
         % text=inside,
         % text=pin,
         % <--- The polar area diagram is similar to a usual pie chart, except sectors are equal angles and differ rather in how far each sector extends from the center of the circle. Note: explode has no affects in square chart. --->
         % polar,
         % square,
         % cloud,
         % <--- Two parameters can be used to decorate number: before number and after number. Both are empty by default, but if sum=100, after number will be set to automatically if user doesn’t set it. --->
         before number = {pkr},
         after number = {},
         % <---- The color can be specified by color ---->
         color={${colorList}},]
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
        latexCode += `${dataValue*10}/${label}, `;
      });
    });

    // Remove the trailing comma and close the tikzpicture and figure environments
    latexCode = latexCode.slice(0, -2) + "}\n";

    // Draw a white-colored circle in the center to represent the hole (donut)
    latexCode += `
        \\draw [fill=white, draw=black] (0,0) circle [radius=2];
      \\end{tikzpicture}
      \\caption{${graphHeading}}
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
        link.download = `${graphHeading}_DonutChart.tex`;
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
      link.setAttribute("download", `${graphHeading}_Doughnut.eps`);
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
        Doughnut Chart
      </h2>
      <Doughnut
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
export default Doghnut;
