"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
export default function ColumnChart() {
  const [state, setState] = useState({
    series: [
      {
        name: "sales",
        data: [
          {
            x: "السبت",
            y: 400,
          },
          {
            x: "الاحد",
            y: 430,
          },
          {
            x: "الاثنين",
            y: 448,
          },
          {
            x: "الثلاثاء",
            y: 470,
          },
          {
            x: "الاربعاء",
            y: 540,
          },
          {
            x: "الخميس",
            y: 580,
          },
          {
            x: "الجمعة",
            y: 690,
          },
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 380,
      },
      xaxis: {
        type: "category",
        group: {
          style: {
            fontSize: "10px",
            fontWeight: 700,
          },
          groups: [
            { title: "2019", cols: 4 },
            { title: "2020", cols: 4 },
          ],
        },
      },
      // tooltip: {
      //   x: {
      //     formatter: function (val) {
      //       return "Q" + dayjs(val).quarter() + " " + dayjs(val).format("YYYY");
      //     },
      //   },
      // },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={380}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
