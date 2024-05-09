import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import Spline from "./Spline";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LegendBarChart from "./LegendBarChart";
import HorizontalBarChart from "./Horizontal";
import Doghnut from "./Doghnut";
import AreaChart from "./AreaChart";
import LineBar from "./LineBar";
import AreaBar from "./AreaBar";

Chart.register(CategoryScale);

export function SelectChart({
  chartName,
  parameters,
  yLabel,
  xLabel,
  barColors,
  xLabelColor,
  yLabelColor,
  xLabelSize,
  xLabelWeight,
  yLabelSize,
  yLabelWeight,
  graphHeadSize,
  graphHeadWeight,
  graphHeading,
  barBorders,
  legends,
  legendCheck,
  borderColor,
  dlSize,
  dlWeight,
  dlColor,
  stepped,
  dataLabelsConfig,
  fontFamily,
  stepSize,
  legendPosition,
}) {
  console.log(chartName);
  let labels = Array.isArray(parameters.x)
    ? parameters.x.map((param) => param)
    : [parameters.x];
  let dataValues = Array.isArray(parameters.y)
    ? parameters.y.map((param) => param)
    : [parameters.y];
  if (Array.isArray(parameters.x)) {
    labels.sort((a, b) => a - b);
    const sortedIndices = parameters.x
      .map((_, index) => index)
      .sort((a, b) => parameters.x[a] - parameters.x[b]);
    dataValues = sortedIndices.map((index) => dataValues[index]);
  }

  let data;
  // console.log(legends);
  if (legends.length === 0 || !parameters.z || chartName !== "Bar") {
    data = {
      labels: labels,
      datasets: [
        {
          label: `${yLabel}`,
          data: dataValues,
          backgroundColor: barColors,
          borderWidth: barBorders,
          borderColor: borderColor,
          stepped: stepped,
        },
      ],
    };
  } else {
    const zValues = parameters.z;
    // console.log(zValues);

    const uniqueNames = [
      ...new Set(Object.values(zValues).flatMap((obj) => Object.keys(obj))),
    ].sort((a, b) => a.localeCompare(b));
    // console.log(uniqueNames);
    // console.log(uniqueNames);

    const quantitiesByUniqueNames = uniqueNames.map((name) => {
      const quantities = Object.values(zValues).map((obj) => obj[name] || 0);
      return { name, quantities };
    });

    // console.log(quantitiesByUniqueNames);
    const datasets = quantitiesByUniqueNames.map(
      ({ name, quantities }, index) => ({
        // console.log(name)
        label: name,
        data: quantities,
        backgroundColor: barColors[index % barColors.length],
        borderWidth: barBorders,
      })
    );

    // console.log(datasets);

    data = {
      labels: labels,
      datasets: datasets,
    };
  }
  switch (chartName) {
    case "Pie":
      return (
        <PieChart
          chartData={data}
          yLabel={yLabel}
          xLabel={xLabel}
          xLabelColor={xLabelColor}
          yLabelColor={yLabelColor}
          graphHeadSize={graphHeadSize}
          xLabelSize={xLabelSize}
          yLabelSize={yLabelSize}
          xLabelWeight={xLabelWeight}
          yLabelWeight={yLabelWeight}
          graphHeadWeight={graphHeadWeight}
          graphHeading={graphHeading}
          legendCheck={legendCheck}
          dlSize={dlSize}
          dlWeight={dlWeight}
          dlColor={dlColor}
          dataLabelsConfig={dataLabelsConfig}
          fontFamily={fontFamily}
          stepSize={stepSize}
          legendPosition={legendPosition}
          barColors={barColors}
        />
      );
    case "Doghnut":
      return (
        <Doghnut
          chartData={data}
          dataValues={dataValues}
          barColors={barColors}
          yLabel={yLabel}
          xLabel={xLabel}
          xLabelColor={xLabelColor}
          yLabelColor={yLabelColor}
          graphHeadSize={graphHeadSize}
          xLabelSize={xLabelSize}
          yLabelSize={yLabelSize}
          xLabelWeight={xLabelWeight}
          yLabelWeight={yLabelWeight}
          graphHeadWeight={graphHeadWeight}
          graphHeading={graphHeading}
          legendCheck={legendCheck}
          dlSize={dlSize}
          dlWeight={dlWeight}
          dlColor={dlColor}
          dataLabelsConfig={dataLabelsConfig}
          fontFamily={fontFamily}
          stepSize={stepSize}
          legendPosition={legendPosition}
        />
      );
    case "Bar":
      return legends ? (
        <LegendBarChart
          chartData={data}
          yLabel={yLabel}
          xLabel={xLabel}
          xLabelColor={xLabelColor}
          yLabelColor={yLabelColor}
          graphHeadSize={graphHeadSize}
          xLabelSize={xLabelSize}
          yLabelSize={yLabelSize}
          xLabelWeight={xLabelWeight}
          yLabelWeight={yLabelWeight}
          graphHeadWeight={graphHeadWeight}
          barColors={barColors}
          graphHeading={graphHeading}
          barBorders={barBorders}
          legendCheck={legendCheck}
          dlSize={dlSize}
          dlWeight={dlWeight}
          dlColor={dlColor}
          dataLabelsConfig={dataLabelsConfig}
          fontFamily={fontFamily}
          stepSize={stepSize}
          legendPosition={legendPosition}
        />
      ) : (
        <BarChart
          chartData={data}
          yLabel={yLabel}
          xLabel={xLabel}
          xLabelColor={xLabelColor}
          yLabelColor={yLabelColor}
          graphHeadSize={graphHeadSize}
          xLabelSize={xLabelSize}
          yLabelSize={yLabelSize}
          xLabelWeight={xLabelWeight}
          yLabelWeight={yLabelWeight}
          graphHeadWeight={graphHeadWeight}
          barColors={barColors}
          graphHeading={graphHeading}
          barBorders={barBorders}
          legendCheck={legendCheck}
          dlSize={dlSize}
          dlWeight={dlWeight}
          dlColor={dlColor}
          dataLabelsConfig={dataLabelsConfig}
          fontFamily={fontFamily}
          stepSize={stepSize}
          legendPosition={legendPosition}
        />
      );
    case "Line":
      return (
        <Spline
          chartData={data}
          yLabel={yLabel}
          xLabel={xLabel}
          xLabelColor={xLabelColor}
          yLabelColor={yLabelColor}
          graphHeadSize={graphHeadSize}
          xLabelSize={xLabelSize}
          yLabelSize={yLabelSize}
          xLabelWeight={xLabelWeight}
          yLabelWeight={yLabelWeight}
          graphHeadWeight={graphHeadWeight}
          graphHeading={graphHeading}
          legendCheck={legendCheck}
          dlSize={dlSize}
          dlWeight={dlWeight}
          dlColor={dlColor}
          dataLabelsConfig={dataLabelsConfig}
          fontFamily={fontFamily}
          stepSize={stepSize}
          legendPosition={legendPosition}
        />
      );
    case "Horizontal":
      return (
        <HorizontalBarChart
          chartData={data}
          yLabel={yLabel}
          xLabel={xLabel}
          xLabelColor={xLabelColor}
          yLabelColor={yLabelColor}
          graphHeadSize={graphHeadSize}
          xLabelSize={xLabelSize}
          yLabelSize={yLabelSize}
          xLabelWeight={xLabelWeight}
          yLabelWeight={yLabelWeight}
          graphHeadWeight={graphHeadWeight}
          graphHeading={graphHeading}
          legendCheck={legendCheck}
          dlSize={dlSize}
          dlWeight={dlWeight}
          dlColor={dlColor}
          barColors={barColors}
          dataLabelsConfig={dataLabelsConfig}
          fontFamily={fontFamily}
          stepSize={stepSize}
          legendPosition={legendPosition}
        />
      );
    case "Stepped":
      return (
        <Spline
          chartData={data}
          yLabel={yLabel}
          xLabel={xLabel}
          xLabelColor={xLabelColor}
          yLabelColor={yLabelColor}
          graphHeadSize={graphHeadSize}
          xLabelSize={xLabelSize}
          yLabelSize={yLabelSize}
          xLabelWeight={xLabelWeight}
          yLabelWeight={yLabelWeight}
          graphHeadWeight={graphHeadWeight}
          graphHeading={graphHeading}
          legendCheck={legendCheck}
          dlSize={dlSize}
          dlWeight={dlWeight}
          dlColor={dlColor}
          stepped={stepped}
          dataLabelsConfig={dataLabelsConfig}
          fontFamily={fontFamily}
          stepSize={stepSize}
          legendPosition={legendPosition}
        />
      );
    case "Area":
      return (
        <AreaChart
          chartData={data}
          yLabel={yLabel}
          xLabel={xLabel}
          xLabelColor={xLabelColor}
          yLabelColor={yLabelColor}
          graphHeadSize={graphHeadSize}
          xLabelSize={xLabelSize}
          yLabelSize={yLabelSize}
          xLabelWeight={xLabelWeight}
          yLabelWeight={yLabelWeight}
          graphHeadWeight={graphHeadWeight}
          graphHeading={graphHeading}
          legendCheck={legendCheck}
          dlSize={dlSize}
          dlWeight={dlWeight}
          dlColor={dlColor}
          dataLabelsConfig={dataLabelsConfig}
          barColors={barColors}
          fontFamily={fontFamily}
          stepSize={stepSize}
          legendPosition={legendPosition}
        />
      );
    case "Multiple":
      return (
        <LineBar
          chartData={data}
          yLabel={yLabel}
          xLabel={xLabel}
          xLabelColor={xLabelColor}
          yLabelColor={yLabelColor}
          graphHeadSize={graphHeadSize}
          xLabelSize={xLabelSize}
          yLabelSize={yLabelSize}
          xLabelWeight={xLabelWeight}
          yLabelWeight={yLabelWeight}
          graphHeadWeight={graphHeadWeight}
          graphHeading={graphHeading}
          legendCheck={legendCheck}
          dlSize={dlSize}
          dlWeight={dlWeight}
          dlColor={dlColor}
          dataLabelsConfig={dataLabelsConfig}
          barColors={barColors}
          fontFamily={fontFamily}
          stepSize={stepSize}
          legendPosition={legendPosition}
        />
      );
    case "AreaBar":
      return (
        <AreaBar
          chartData={data}
          yLabel={yLabel}
          xLabel={xLabel}
          xLabelColor={xLabelColor}
          yLabelColor={yLabelColor}
          graphHeadSize={graphHeadSize}
          xLabelSize={xLabelSize}
          yLabelSize={yLabelSize}
          xLabelWeight={xLabelWeight}
          yLabelWeight={yLabelWeight}
          graphHeadWeight={graphHeadWeight}
          graphHeading={graphHeading}
          legendCheck={legendCheck}
          dlSize={dlSize}
          dlWeight={dlWeight}
          dlColor={dlColor}
          dataLabelsConfig={dataLabelsConfig}
          barColors={barColors}
          fontFamily={fontFamily}
          stepSize={stepSize}
          legendPosition={legendPosition}
        />
      );
    default:
      return null;
  }
}

export default SelectChart;
