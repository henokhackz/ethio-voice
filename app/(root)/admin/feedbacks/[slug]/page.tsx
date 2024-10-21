import { getFeedbackById } from "@/lib/actions/feedback.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import State from "../../../components/state"; // Assuming this handles feedback state changes
import FeedbackDeleteButton from "@/app/(root)/components/feedback-delete-button";

const FeedbackStatusViewer = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const feedbackId = params.slug;
  const { userId } = await auth();

  const { feedback } = await getFeedbackById(feedbackId);

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-700">
        You need to be logged in to view this feedback
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="flex items-center justify-center h-full text-gray-700">
        Feedback not found
      </div>
    );
  }

  return (
    <div className="h-screen w-full p-5 flex flex-col space-y-6 bg-gray-50 py-12 max-h-screen overflow-y-scroll">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900">Feedback Details</h1>

      {/* Feedback Info */}
      <div className="p-6 bg-white rounded-lg shadow-sm space-y-4 border-r border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-primary">
            {feedback.name}
          </h3>
          <FeedbackDeleteButton feedbackId={feedbackId} userId={userId} />
        </div>

        <p className="text-lg text-gray-700">{feedback.feedback}</p>

        {/* Display Image if exists */}
        {feedback.attachment && (
          <div className="my-4">
            <Image
              src={feedback.attachment as string}
              alt="feedback attachment"
              height={100}
              width={200}
              className="rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Created Date */}
        <p className="text-sm text-gray-500">
          Created on: {new Date(feedback.createdAt).toLocaleString()}
        </p>

        {/* State Update Component */}
        <State feedbackId={feedbackId} />
      </div>
    </div>
  );
};

export default FeedbackStatusViewer;
