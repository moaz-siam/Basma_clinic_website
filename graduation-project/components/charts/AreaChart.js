"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function AreaChart() {
  const [state, setState] = useState({
    series: [
      {
        name: "series1",
        data: [10, 20, 15, 30, 25, 40],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "string",
        categories: [
          "1  أبريل",
          "5 أبريل",
          "10 أبريل",
          "15 أبريل",
          "20 أبريل",
          "25 أبريل",
          "28 أريل",
        ],
      },
      tooltip: {
        x: {
          format: "string",
        },
      },
    },
  });
  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
