import React, { useState, useEffect} from "react";
import '../../assets/css/Table.css';

export function LabelTable({jsonData, label, column}) {

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
  var Data = [];
  // console.log(jsonData);
  if (jsonData.y && column==='y'){
    Data = jsonData.y || [];
  }

  // if (jsonData.x){
  //   Data = jsonData.x || [];
  // }
  if(jsonData.x && column==='x'){
    Data = jsonData.x || [];
  }
  if(jsonData[label]){
    Data = jsonData[label];
    // console.log(Data);
  }
  
  // const yData = jsonData.y || [];
  return (
        <div className="home-data-table label-table">
           <table className="w-100">
            <thead>
              <tr>
                <th>{label}</th>
              </tr>
            </thead>
            <tbody>
                {
                Data.map((xValue, index) => (
                  <tr key={index}>
                      <td key={index}><input type="text" name="" id="" value={xValue} onChange={(e)=>setAttr(e.target.value)}/></td>
                      {/* <td>{xValue}</td>
                      <td>{yData[index]}</td> */}
                  </tr>
              )) 
              }
            </tbody>
          </table>
        </div>
        // <p>Checking</p>

  );
}

export default LabelTable;