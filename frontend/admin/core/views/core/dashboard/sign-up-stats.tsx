"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

export const SignUpStatsDashboardCoreAdmin = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const labels = [...Array(7).keys()]
    .map(i => {
      const date = new Date();
      date.setDate(date.getDate() - i);

      return date.toISOString().split("T")[0];
    })
    .reverse();

  const primaryColor =
    typeof window !== "undefined"
      ? getComputedStyle(document.body).getPropertyValue("--primary")
      : "";

  return (
    <Line
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }}
      data={{
        labels,
        datasets: [
          {
            fill: true,
            label: "Dataset 2",
            data: labels.map(() => Math.random() * 100),
            borderColor: `hsl(${primaryColor} )`,
            backgroundColor: `hsl(${primaryColor} / 20% )`
          }
        ]
      }}
    />
  );
};
