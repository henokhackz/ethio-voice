"use client";
import { Button } from "@/components/ui/button";
import { deleteuserFeedback } from "@/lib/actions/admin.actions";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const FeedbackDeleteButton = ({
  feedbackId,
  userId,
}: {
  feedbackId: string;
  userId: string;
}) => {
  const route = useRouter();
  return (
    <Button
      className="flex items-center gap-2 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
      variant="outline"
      onClick={() => {
        deleteuserFeedback(feedbackId, userId);
        route.push("/");
      }}
    >
      <Trash size={20} />
      <span>Delete</span>
    </Button>
  );
};

export default FeedbackDeleteButton;
