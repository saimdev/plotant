import React, { useState, useEffect} from "react";
import '../../assets/css/Table.css';

export function LabelTableSummition({jsonData, xLabel, yLabel}) {

  const [attr, setAttr] = useState();
  
  // console.log(jsonData);
    // console.log(jsonData.Month);
    // console.log(label);
    
  // const isSummition = label.includes('£');
  // if(isSummition){
  //   label=label.replace('£', '')
  //   label=label.replace(' ','');
  // }
  // console.log(label);
  // console.log(jsonData[label]);
//   var Data = [];
//   console.log(jsonData);
//   if (jsonData.y){
//     Data = jsonData.y || [];
//   }
  // if(jsonData.x){
  //   Data = jsonData || [];
  // }
//   if(jsonData[label]){
//     Data = jsonData[label];
//   }
  const xData = jsonData.y || [];
  const yData = jsonData.y || [];
  return (
        <div className="home-data-table label-table">
           <table className="w-100">
            <thead>
              <tr>
                <th>{xLabel}</th>
                <th>{yLabel}</th>
              </tr>
            </thead>
            <tbody>
                {
                xData.map((xValue, index) => (
                  <tr key={index}>
                      <td key={index}><input type="text" name="" id="" value={xValue} onChange={(e)=>setAttr(e.target.value)}/></td>
                      {/* <td>{xValue}</td> */}
                      <td>{yData[index]}</td>
                  </tr>
              )) 
              }
            </tbody>
          </table>
        </div>
        // <p>Checking</p>

  );
}

export default LabelTableSummition;