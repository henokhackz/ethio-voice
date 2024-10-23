import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import LandingPage from "../components/LandingPage";

import Chart from "@/components/shared/Chart";
import { getFeedbacks } from "@/lib/actions/admin.actions";

const AdminDashboard = async () => {
  const { userId } = await auth();

  if (!userId) return <LandingPage />;

  const { feedbacks } = await getFeedbacks();
  const { user } = await getUserById(userId);

  const feedbackCount = feedbacks?.length || 0;
  const inProgressCount =
    feedbacks?.filter((feedback) => feedback.state === "in progress").length ||
    0;
  const resolvedCount =
    feedbacks?.filter((feedback) => feedback.state === "resolved").length || 0;
  const pendingCount =
    feedbacks?.filter((feedback) => feedback.state === "Pending").length || 0;

  return (
    <div className=" bg-gray-50 w-full p-5 hidden md:flex">
      {/* Main Content */}
      <main className="  w-full py-12">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome back,{" "}
            <span className="text-primary">{user?.firstName}</span>
          </h1>
          <p className="text-md text-gray-700 mt-2">
            Here are your admin insights:
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
          <div className="bg-white p-6 rounded-lg text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Total Feedbacks
            </h2>
            <p className="text-2xl text-primary mt-2">{feedbackCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">In Progress</h2>
            <p className="text-2xl text-yellow-500 mt-2">{inProgressCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Resolved</h2>
            <p className="text-2xl text-green-500 mt-2">{resolvedCount}</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Feedback Trends
          </h2>
          <Chart
            feedbackCount={feedbackCount}
            inProgressCount={inProgressCount}
            resolvedCount={resolvedCount}
            pendingCount={pendingCount}
          />
        </div>

        {/* Feedback Table */}
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Recent Feedbacks
          </h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-5 text-left font-medium text-gray-700">
                  Name
                </th>
                <th className="py-3 px-5 text-left font-medium text-gray-700">
                  State
                </th>
                <th className="py-3 px-5 text-left font-medium text-gray-700">
                  Category
                </th>
                <th className="py-3 px-5 text-left font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {feedbacks?.map((feedback, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-4 px-5 text-gray-800">{feedback.name}</td>
                  <td className="py-4 px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        feedback.state === "resolved"
                          ? "bg-green-100 text-green-700"
                          : feedback.state === "in progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {feedback.state}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-gray-800">
                    {feedback.category}
                  </td>
                  <td className="py-4 px-5">
                    <Link
                      href={`/admin/feedbacks/${feedback.id}`}
                      className="text-primary hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
