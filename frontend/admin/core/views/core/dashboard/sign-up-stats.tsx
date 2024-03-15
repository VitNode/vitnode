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

import type { SignUpStatsAdminMembers } from "@/graphql/hooks";

interface Props {
  data: SignUpStatsAdminMembers[];
}

export const SignUpStatsDashboardCoreAdmin = ({ data }: Props) => {
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
      const returnDate = date.toISOString().split("T")[0];

      return {
        label: returnDate,
        value:
          data.find(item => item.joined_date === returnDate)?.users_joined || 0
      };
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
        labels: labels.map(item => item.label),
        datasets: [
          {
            fill: true,
            label: "Dataset 2",
            data: labels.map(item => item.value),
            borderColor: `hsl(${primaryColor} )`,
            backgroundColor: `hsl(${primaryColor} / 20% )`
          }
        ]
      }}
    />
  );
};
