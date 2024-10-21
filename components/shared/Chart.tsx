"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({
  inProgressCount,
  resolvedCount,
  feedbackCount,
  pendingCount,
}: {
  feedbackCount: number;
  inProgressCount: number;
  resolvedCount: number;
  pendingCount: number;
}) => {
  console.log(pendingCount, "pending count");
  // Check for undefined or null instead of checking for falsy values
  if (
    feedbackCount === undefined ||
    feedbackCount === null ||
    inProgressCount === undefined ||
    inProgressCount === null ||
    resolvedCount === undefined ||
    resolvedCount === null ||
    pendingCount === undefined || // <-- Corrected this line
    pendingCount === null
  ) {
    return (
      <div className="text-center text-gray-600">
        No data available to display.
      </div>
    );
  }

  const data = {
    labels: [
      "Feedbacks In Progress",
      "Feedbacks Resolved",
      "Total Feedbacks",
      "Pending Feedbacks",
    ],
    datasets: [
      {
        label: "Feedback Status",
        data: [inProgressCount, resolvedCount, feedbackCount, pendingCount],
        backgroundColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure it can fill the container
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Feedback Overview",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full" style={{ height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
