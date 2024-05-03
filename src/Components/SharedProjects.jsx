import React from "react";
import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

const SharedProjects = ({ heading, myProjectsGraphCount }) => {
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
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Projects",
        data: projectData,
        backgroundColor: [
          "#fd7f6f", // January
          "#7eb0d5", // February
          "#b2e061", // March
          "#bd7ebe", // April
          "#ffb55a", // May
          "#ffee65", // June
          "#beb9db", // July
          "#fdcce5", // August
          "#8bd3c7", // September
          "#df8879", // October
          "#a4a2a8", // November
          "#ff80ff", // December
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <h6 className="mb-2">
        {heading} in {currentYear}
      </h6>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default SharedProjects;
