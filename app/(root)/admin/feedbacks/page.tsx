import { getFeedbacks } from "@/lib/actions/admin.actions";
import Link from "next/link";

const FeedbacksViewer = async () => {
  const { feedbacks } = await getFeedbacks();
  return (
    <div className="w-full flex flex-col h-screen p-6 bg-gray-50">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
            <tr>
              <th className="py-4 px-6 text-left font-semibold text-gray-700 tracking-wider uppercase">
                Name
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700 tracking-wider uppercase">
                State
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700 tracking-wider uppercase">
                Category
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700 tracking-wider uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {(!feedbacks || feedbacks.length === 0) && (
              <tr>
                <td className="py-6 text-center text-gray-500">
                  No feedbacks found.
                </td>
              </tr>
            )}
            {feedbacks?.map((feedback, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6 text-gray-800">{feedback.name}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${
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
                <td className="py-4 px-6 text-gray-800">{feedback.category}</td>
                <td className="py-4 px-6">
                  <Link
                    href={`/admin/feedbacks/${feedback.id}`}
                    className="text-primary hover:text-primary/80 font-semibold hover:underline transition-all"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbacksViewer;
