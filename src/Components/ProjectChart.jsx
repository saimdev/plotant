import React from "react";
import { Line } from "react-chartjs-2";

const ProjectChart = ({ myProjectsGraphCount }) => {
  const currentYear = new Date().getFullYear();

  // Data representing the number of projects in each month
  const projectData = Array.from({ length: 12 }, (_, index) => {
    const key = (index + 1).toString().padStart(2, "0"); // Convert index to padded string (e.g., "01")
    return myProjectsGraphCount[key]; // Get value corresponding to the key
  });
  // console.log(projectData);
  // Chart data
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Projects",
        data: projectData,
        borderColor: "#15589c",
        backgroundColor: "transparent",
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h2>All Projects in {currentYear}</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ProjectChart;
