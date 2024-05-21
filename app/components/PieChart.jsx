import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PieChart = () => {
  const options = {
    responsive:false,
    plugins:{
      legend:{
        position:'bottom',
      },
      // title:{
      //   display:true,
      //   text:'$HERB Distribution Chart',
      //   color:'lightgreen'
      // },
    }
  };
  const data = {
    // data: {
    labels: [
      "LP Reward",
      "Marketing and Promotion",
      "Project Development",
      "Treasure Fund",
      "LP and exchange",
      "Staking Reward",
      "Chat Mining Reward",
      "Team",
    ],
    // },
    datasets: [
      {
        label: "allocation percentage",
        data: [15, 20, 20, 10, 10, 10, 5, 10],
        backgroundColor: [
          "rgba(255, 182, 193, 0.8)",
          "rgba(135, 206, 250, 0.8)",
          "rgba(144, 238, 144, 0.8)",
          "rgba(255, 255, 224, 0.8)",
          "rgba(240, 128, 128, 0.8)",
          "rgba(255, 160, 122, 0.8)",
          "rgba(32, 178, 170, 0.8)",
          "rgba(250, 250, 210, 0.8)",

        ],
        // borderColor: "rgba(54,162,235,1)",
        hoverOffset: 4,
      },
    ],
  };

  return <Pie options={options} data={data} width={"400px"} height={"400px"} />;
};

export default PieChart;
