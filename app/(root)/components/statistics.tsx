import React from "react";

const statsData = [
  { value: "78.6 M", label: "Mobile Voice Subscribers" },
  { value: "40.5 M", label: "Data Subscribers" },
  { value: "7.5 M", label: "Fixed Line Subscribers" },
  { value: "745.5K", label: "Fixed Broadband subscribers" },
  { value: "78.8M", label: "Total Customers (As of June 2024)" },
];

const STATISTICS = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-8 my-6">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 bg-primary rounded-lg px-5 py-2 my-12 md:my-6">
        Our Statistics
      </h2>
      <div className="w-full flex flex-wrap items-center justify-center gap-4 rounded flex-col md:flex-row">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="border border-secondary/10 p-4 rounded-md shadow-md w-[85%] md:w-[250px] h-[150px] text-center px-4 py-2"
          >
            <h3 className="text-secondary text-2xl md:text-3xl font-bold">
              {stat.value}
            </h3>
            <p className="text-gray-800 mt-2 text-md">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default STATISTICS;
