import React, { useState, useEffect } from "react";
import "../../../assets/css/Table.css";

export function UserTableVisitor({ jsonData, xLabel, yLabel, onResponse, projectId, fileId, accessType }) {
    useEffect(()=>{
        setTableData(jsonData);
    },[jsonData]);
    const [tableData, setTableData] = useState(jsonData); 
    const [selectedCell, setSelectedCell] = useState({ row: -1, column: -1 });

    const handleCellChange = async (newValue, rowIndex, columnIndex) => {
        const columnKey = Object.keys(jsonData[0])[columnIsndex];

        const updatedData = tableData.map((row, index) => {
            if (index === rowIndex) {
                return {
                    ...row,
                    [Object.keys(row)[columnIndex]]: newValue,
                };
            }
            return row;
        });
        setTableData(updatedData);
        console.log(rowIndex, columnIndex, projectId, fileId, columnKey);
        const data = await fetch("/analysis/usereditable", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rowIndex: rowIndex,
                columnIndex: columnIndex,
                value: newValue,
                xLabel: xLabel,
                yLabel: yLabel,
                fileId: fileId,
                projectId: projectId,
                columnKey: columnKey,
            }),
            credentials: "include"
        });

        const response = await data.json();
        console.log(response);
        onResponse(response);
    };

    const handleCellClick = (rowIndex, columnIndex) => {
        setSelectedCell({ row: rowIndex, column: columnIndex });
    };

    const handleKeyPress = (e, rowIndex, columnIndex) => {
        if (e.key === "Enter") {
            handleCellChange(e.target.value, rowIndex, columnIndex);
        }
    };

    return (
        <div className="home-data-table">
            <h4 className="my-3 text-center">Extracted Data</h4>
            <table className={`w-100 ${accessType==="read"? "disabled-component-table":""}`}>
                <thead>
                    <tr>
                        {Object.keys(jsonData[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.values(row).map((value, columnIndex) => (
                                <td
                                    key={columnIndex}
                                    style={{
                                        border:
                                            selectedCell.row === rowIndex &&
                                                selectedCell.column === columnIndex
                                                ? "2px solid #15589c"
                                                : "",
                                        backgroundColor:
                                            selectedCell.row === rowIndex &&
                                                selectedCell.column === columnIndex
                                                ? "lightyellow"
                                                : "#a1bcd7",
                                    }}
                                    onClick={() => handleCellClick(rowIndex, columnIndex)}
                                >
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) =>
                                            setTableData((prevTableData) => {
                                                const newData = [...prevTableData];
                                                newData[rowIndex][Object.keys(row)[columnIndex]] =
                                                    e.target.value;
                                                return newData;
                                            })
                                        }
                                        onKeyPress={(e) =>
                                            handleKeyPress(e, rowIndex, columnIndex)
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTableVisitor;