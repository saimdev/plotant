import React from "react";
import '../../assets/css/Table.css';

export function LabelTable({ jsonData, selectedLabels }) {
  console.log(selectedLabels);
  console.log(jsonData);

  // Extract the data keys dynamically from jsonData
  const dataKeys = Object.keys(jsonData.labels);

  // Create a mapping from selected labels to jsonData keys
  const labelToDataKey = selectedLabels.reduce((acc, label, index) => {
    if (dataKeys[index]) {
      acc[label] = dataKeys[index];
    }
    return acc;
  }, {});

  // Extract data rows based on the selected labels
  const dataRows = jsonData.labels.x.map((_, index) => {
    let rowData = {};
    selectedLabels.forEach((label) => {
      const key = labelToDataKey[label];
      if (key) {
        rowData[label] = jsonData.labels[key][index];
      }
    });
    return rowData;
  });

  return (
    <div className="home-data-table label-table">
      <table className="w-100">
        <thead>
          <tr>
            {selectedLabels.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {selectedLabels.map((label) => (
                <td key={label}>{row[label]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LabelTable;
