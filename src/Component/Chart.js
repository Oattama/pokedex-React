import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const ChartStyle = styled.div`
  .chartPc {
    display: block;
  }

  .chartMobile {
    display: none;
  }

  @media only screen and (max-width: 750px) {
    .chartPc {
      display: none;
    }
    .chartMobile {
      display: block;
    }
  }
`;

export default function Chart(stat) {
  const loopStat = () => {
    let statBox = [];
    let temp = "";
    for (let i = 0; i < stat.stat.length; i++) {
      statBox.push(stat.stat[i].base_stat);
    }
    temp = statBox[3];
    statBox[3] = statBox[5];
    statBox[5] = temp;

    return statBox;
  };

  const series = [
    {
      name: "Stat",
      data: loopStat(),
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "radar",
    },
    stroke: {
      show: true,
    },
    fill: {
      opacity: 0.5,
      colors: "#0FCCFF",
    },
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        borderRadius: 3,
      },
    },
    xaxis: {
      categories: [
        "hp",
        "attack",
        "defense",
        "speed",
        "sp-defense",
        "sp-attack",
      ],
      labels: {
        show: true,
        style: {
          colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
          fontSize: "1.3em",
        },
      },
    },
    yaxis: {
      show: false,
    },
  };

  const optionsMobile = {
    chart: {
      height: 350,
      type: "radar",
    },
    stroke: {
      show: true,
    },
    fill: {
      opacity: 0.5,
      colors: "#0FCCFF",
    },
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        borderRadius: 3,
      },
    },
    xaxis: {
      categories: [
        "hp",
        "attack",
        "defense",
        "speed",
        "sp-defense",
        "sp-attack",
      ],
      labels: {
        show: true,
        style: {
          colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
          fontSize: "0.8em",
        },
      },
    },
    yaxis: {
      show: false,
    },
  };

  return (
    <ChartStyle>
      <div className="chartPc">
        <ReactApexChart
          options={options}
          series={series}
          type="radar"
          height={600}
        />
      </div>
      <div className="chartMobile">
        <ReactApexChart
          options={optionsMobile}
          series={series}
          type="radar"
          height={207}
        />
      </div>
    </ChartStyle>
  );
}
