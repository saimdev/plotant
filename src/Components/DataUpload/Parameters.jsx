import React, { useState, useEffect } from "react";
import "../../assets/css/Parameters.css";
// import Spline from "../Charts/Spline";
// import Pie from "../Charts/Pie";
// import Table, { LabelTable } from "../SpreadSheet/LabelTable";
// import SelectChart from "../Charts/SelectChart";
// import Table from "../SpreadSheet/Table";

export function Parameters({
  columns,
  guestId,
  type,
  onXAxisChange,
  onYAxisChange,
  parentParameters,
}) {
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  const [parameters, setParameters] = useState(null);

  // const sendParameters = () => {
  //   if(xAxis===yAxis){
  //     alert('Choose different attributes for X and Y Axis');
  //   } else{
  //     if (xAxis && yAxis && guestId) {
  //       console.log(guestId);
  //       fetch('/analysis/getlabels', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           x_label: xAxis,
  //           y_label: yAxis,
  //           guest: guestId,
  //         }),
  //       })
  //         .then(response => response.json())
  //         .then(data => {
  //           if (Array.isArray(data.x) && Array.isArray(data.y)) {
  //             setParameters(data);
  //             console.log(data);
  //           } else {
  //             console.error("Invalid data format");
  //           }

  //         })
  //         .catch(error => {
  //           alert(error);
  //         });
  //     } else {
  //       alert("Please select values for both X-axis and Y-axis.");
  //     }
  //   }
  // }

  const handleXAxisChange = (value) => {
    setXAxis(value);
    setYAxis("");
    onXAxisChange(value);
    onYAxisChange("");
  };
  const handleYAxisChange = (value) => {
    setYAxis(value);

    // console.log(xAxis);
    // console.log(value);
    // console.log(guestId);
    // const isSummition = yAxis.includes('£');
    // if(isSummition){
    //   yAxis=yAxis.replace('£', '')
    //   yAxis=yAxis.replace(' ','');
    // }

    fetch("https://esalwa.com/analysis/getlabels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        x_label: xAxis,
        y_label: value,
        condition: "Quantity",
        guest: guestId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.x) && Array.isArray(data.y)) {
          // setParameters(data);
          parentParameters(data);
          // console.log(data);
        } else {
          console.error("Invalid data format");
        }
        onYAxisChange(value);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="w-100">
      {columns ? (
        <div className="w-100">
          {/* <h3 className="text-center mb-4">Choose parameters and graphs</h3>          */}
          <div className="d-flex flex-row justify-content-around align-items-center">
            <div className="parameters">
              <div className="parameters-container mb-3">
                <p>Choose for X-Axis</p>
                <select onChange={(e) => handleXAxisChange(e.target.value)}>
                  <option>Please choose one option</option>
                  {columns.map((option, index) => {
                    const updatedOption = type.includes(option)
                      ? `${option} £`
                      : option;
                    return <option key={index}>{option}</option>;
                  })}
                </select>
              </div>

              {/* <span>You selected: {xAxis} </span> */}
              <div className="parameters-container mt-3">
                <p>Choose for Y-Axis</p>
                <select onChange={(e) => handleYAxisChange(e.target.value)}>
                  <option>Please choose one option</option>
                  {columns.map((option, index) => {
                    const updatedOption = type.includes(option)
                      ? `${option} £`
                      : option;
                    return <option key={index}>{option}</option>;
                  })}
                </select>
              </div>

              {/* <button onClick={sendParameters} className="send-param-btn mt-3">Set Parameters</button> */}
            </div>
            {/* <div className="d-flex flex-row align-items-center">
                  {
                    xAxis ?
                    
                      <LabelTable jsonData={uniqueValues} label={xAxis}/>
                    
                    :
                    ''
                  }
                  {
                    yAxis ?
                    // <div>
                      <LabelTable jsonData={uniqueValues} label={yAxis}/>
                    // </div>
                    :
                    ''
                  }
                  </div> */}
            {/* {
                    parameters ?
                    <div className="parameters">
                    <div className="parameters-container">
                        <p>Choose Graph</p>
                        <select onChange={(e) => setGraphName(e.target.value)}>
                            <option>Please choose one option</option>
                            {options.map((option, index) => {
                                return (
                                    <option key={index}>
                                        {option}
                                    </option>
                                );
                            })}
                        </select>
                    </div>                    
                  </div>:
                  ''
                  } */}
          </div>
          {/* {
                  parameters && graphName ?
                  // <Spline parameters = {parameters}/>
                  <SelectChart chartName={graphName} parameters={parameters}/>
                  :
                  ''
                } */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Parameters;
