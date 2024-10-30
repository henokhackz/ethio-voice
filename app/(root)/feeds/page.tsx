"use client";

import React, { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import Image from "next/image";
import {
  getPublicFeedbacks,
  likeFeedback,
  disLikeFeedback,
} from "@/lib/actions/feedback.actions";
import Comments from "@/components/shared/Comments";
import { useAuth } from "@clerk/nextjs";

interface Feedback {
  id: string;
  title: string;
  isPublic: boolean;
  feedback: string;
  attachment: string | null;
  upvotes?: number;
  downvotes?: number;
  comments?: number;
}

type Feedbacks = Feedback[] | undefined;

const FeedsPage = () => {
  const [feedbackList, setFeedbackList] = useState<Feedbacks>();
  const { userId } = useAuth();

  useEffect(() => {
    async function fetchPublicFeedbacks() {
      const { feedbacks } = await getPublicFeedbacks();
      setFeedbackList(feedbacks);
    }

    fetchPublicFeedbacks();
  }, []);

  const handleLike = async (feedbackId: string, isLiked: boolean) => {
    try {
      if (isLiked) {
        await disLikeFeedback(userId as string, feedbackId);
      } else {
        await likeFeedback(userId as string, feedbackId);
      }

      setFeedbackList((prevFeedbackList) =>
        prevFeedbackList?.map((feedback) =>
          feedback.id === feedbackId
            ? {
                ...feedback,
                upvotes: feedback.upvotes
                  ? isLiked
                    ? feedback.upvotes - 1
                    : feedback.upvotes + 1
                  : 1,
              }
            : feedback
        )
      );
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleDislike = async (feedbackId: string, isDisliked: boolean) => {
    try {
      if (isDisliked) {
        await disLikeFeedback(userId as string, feedbackId);
      } else {
        await likeFeedback(userId as string, feedbackId);
      }

      setFeedbackList((prevFeedbackList) =>
        prevFeedbackList?.map((feedback) =>
          feedback.id === feedbackId
            ? {
                ...feedback,
                downvotes: feedback.downvotes
                  ? isDisliked
                    ? feedback.downvotes - 1
                    : feedback.downvotes + 1
                  : 1,
              }
            : feedback
        )
      );
    } catch (error) {
      console.error("Error handling dislike:", error);
    }
  };

  return (
    <div className="container mx-auto p-5 h-screen">
      <h1 className="text-2xl font-semibold mb-4">User Feedback</h1>
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
        {feedbackList?.length === 0 && (
          <p className="text-red-300">No feedback available.</p>
        )}
        {feedbackList?.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium">{feedback.title}</h2>
                <p className="text-sm text-gray-600">
                  {feedback.feedback || "No description available"}
                </p>
              </div>
              <div className="text-gray-500">
                {feedback.isPublic ? (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-md">
                    Public
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-md">
                    Private
                  </span>
                )}
              </div>
            </div>

            {feedback.attachment && (
              <div className="mt-4">
                <Image
                  src={feedback.attachment}
                  alt={`Feedback ${feedback.id}`}
                  width={500}
                  height={300}
                  className="rounded-md object-cover"
                />
              </div>
            )}

            <div className="mt-4 flex items-center space-x-6">
              <button
                onClick={() =>
                  handleLike(feedback.id, feedback.upvotes ? true : false)
                }
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
              >
                <ThumbsUp className="w-5 h-5" />
                <span>{feedback.upvotes ?? 0}</span>
              </button>
              <button
                onClick={() =>
                  handleDislike(feedback.id, feedback.downvotes ? true : false)
                }
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
              >
                <ThumbsDown className="w-5 h-5" />
                <span>{feedback.downvotes ?? 0}</span>
              </button>

              <Comments feedbackId={feedback.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedsPage;
