"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateFeedback } from "@/lib/actions/admin.actions";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getFeedbackById } from "@/lib/actions/feedback.actions";

const State = ({ feedbackId }: { feedbackId: string }) => {
  const { toast } = useToast();
  const [state, setNewState] = useState("");
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();

  const [currentState, setCurrentState] = useState<any | null>(null); // You can replace `any` with `Feedback` if it's defined

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const fetchedFeedback = await getFeedbackById(feedbackId);
        setCurrentState(fetchedFeedback.feedback?.state);
      } catch (error) {
        console.error(error);
        toast({
          description: "Failed to fetch state .",
          variant: "destructive",
        });
      }
    };
    if (feedbackId) fetchFeedback();
  }, [feedbackId, toast]);

  if (!userId || !feedbackId) {
    toast({
      description: "You need to be logged in to view this page.",
      variant: "destructive",
    });
    router.push("/login");
    return null;
  }

  const handleUpdate = async () => {
    if (!state) {
      toast({
        description: "Please select a state before updating.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await updateFeedback(feedbackId, userId, state);

      if (result.state === "success") {
        toast({
          description: "Feedback state updated successfully.",
          className: "text-white bg-primary mb-12",
        });
      } else {
        toast({
          description: "Feedback state  update failed",
          variant: "destructive",
          className: "text-white bg-red-300 mb-12",
        });
      }
      console.log(feedbackId, userId, state, "update");
      setLoading(false);
      router.push("/admin-dashboard");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({
        description: "Failed to update feedback state.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full space-y-4 ">
      <Select
        onValueChange={(value) => {
          setNewState(value);
          console.log(value, "this is value");
        }}
      >
        <SelectTrigger className="w-full bg-white border border-gray-300 hover:border-gray-400 focus:ring-primary focus:ring-2 rounded-lg text-gray-800">
          <SelectValue placeholder={currentState || state} />
        </SelectTrigger>
        <SelectContent className="w-full bg-white shadow-lg rounded-lg mt-1">
          <SelectItem
            value="pending"
            className="hover:bg-blue-100 transition-colors"
          >
            Pending
          </SelectItem>
          <SelectItem
            value="in progress"
            className="hover:bg-blue-100 transition-colors"
          >
            In Progress
          </SelectItem>
          <SelectItem
            value="resolved"
            className="hover:bg-blue-100 transition-colors"
          >
            Resolved
          </SelectItem>
        </SelectContent>
      </Select>
      <Button
        className="w-full bg-primary text-white hover:bg-primary-dark transition-all"
        onClick={handleUpdate}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update"}
      </Button>
    </div>
  );
};

export default State;
