import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getFeedbacksByUserId } from "@/lib/actions/feedback.actions";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import LandingPage from "../components/LandingPage";
import { SignedIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { truncateText } from "@/lib/helpers";
import Chart from "@/components/shared/Chart";

const Dashboard = async () => {
  const { userId } = await auth();

  let feedbacks = null;
  let user = null;
  if (!userId) {
    return <LandingPage />;
  } else {
    const result = await getFeedbacksByUserId(userId);
    const userResult = await getUserById(userId);
    user = userResult.user;

    if (user?.role === "admin") {
      redirect("/admin-dashboard");
    }
    feedbacks = result.feedbacks;
  }

  let count = {
    feedbackCount: 0,
    inProgressCount: 0,
    pendingCount: 0,
    resolvedCount: 0,
  };

  if (feedbacks) {
    const feedbackCount = feedbacks?.length || 0;
    const inProgressCount = feedbacks?.filter(
      (feedback) => feedback.state === "in progress"
    ).length;
    const pendingCount = feedbacks?.filter(
      (feedback) => feedback.state === "pending"
    ).length;
    const resolvedCount = feedbacks?.filter(
      (feedback) => feedback.state === "resolved"
    ).length;

    count = {
      feedbackCount,
      inProgressCount,
      pendingCount,
      resolvedCount,
    };
  }

  const { feedbackCount, inProgressCount, resolvedCount, pendingCount } = count;

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4  justify-center ">
      <SignedIn>
        <div className="flex flex-col p-6 w-full max-w-6xl bg-gray-50 rounded-lg ">
          {/* Welcome Section */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome back,{" "}
              <span className="text-primary">{user?.firstName}</span>
            </h1>
            <p className="text-md text-gray-800 mt-2">
              Good to see you again! Here&apos;s what&apos;s new:
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mb-10">
            <div className="bg-white p-6 rounded-lg text-center shadow-sm border border-gray-800/10">
              <h2 className="text-xl font-semibold text-gray-800">
                Total Feedbacks
              </h2>
              <p className="text-2xl text-primary mt-2">{feedbackCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-sm  border border-gray-800/10">
              <h2 className="text-xl font-semibold text-gray-900">
                In Progress
              </h2>
              <p className="text-2xl text-yellow-500 mt-2">{inProgressCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-sm  border border-gray-800/10">
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

          {/* Feedback Table Section */}
          <div className="overflow-x-auto w-full ">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Previous Feedbacks
            </h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-3 text-left font-medium text-gray-700">
                    Feedback
                  </th>
                  <th className="py-3 px-3 text-left font-medium text-gray-700">
                    State
                  </th>
                  <th className="py-3 px-3 text-left font-medium text-gray-700">
                    Category
                  </th>
                  <th className="py-3 px-3 text-left font-medium text-gray-700">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {!feedbacks ||
                  (feedbacks.length === 0 && (
                    <tr>
                      <td
                        className="py-4 px-5 text-gray-800 text-center"
                        colSpan={4}
                      >
                        No feedbacks found.
                      </td>
                    </tr>
                  ))}
                {feedbacks?.map((feedback, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="py-4 px-3 text-gray-800 max-w-[150px] truncate">
                      {truncateText(feedback.title, 50)}
                    </td>
                    <td className="py-4 px-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
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
                    <td className="py-4 px-3 text-gray-800">
                      {feedback.category}
                    </td>
                    <td className="py-4 px-3">
                      <Link
                        href={`feedbacks/${feedback.id}`}
                        className="text-primary hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Feedback Actions */}
          <Link
            href={"/feedback"}
            className="flex justify-center md:justify-start gap-6 mb-10 my-6"
          >
            <Button variant={"primary"}>Add New Feedback</Button>
          </Link>
        </div>
      </SignedIn>
    </div>
  );
};

export default Dashboard;
