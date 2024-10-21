"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  getFeedbackById,
  updateFeedback,
} from "@/lib/actions/feedback.actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useState, useEffect } from "react";
import FileUpload from "../../components/file-upload";
import { useRouter } from "next/navigation"; // Import useRouter

interface Feedback {
  feedback: string;
  id: string;
  name: string | null;
  phoneNumber: string | null;
  category: string;
  state: string;
  attachment: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string | null;
}

const UpdateFeedbackPage = ({ params }: { params: { slug: string } }) => {
  const { isLoaded, userId } = useAuth();
  const feedbackId = params.slug; // Get feedbackId from params
  const [feedbackData, setFeedbackData] = useState<Feedback | null | undefined>(
    null
  ); // Holds the existing feedback data
  const [newFeedback, setNewFeedback] = useState({
    name: "",
    phoneNumber: "",
    feedback: "",
    category: "",
    state: "Pending",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null | unknown>(null); // State for image preview
  const [loading, setLoading] = useState(false); // Loading state
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Fetch the existing feedback by ID
    const fetchFeedback = async () => {
      const result = await getFeedbackById(feedbackId);
      const feedback = result.feedback;
      if (result) {
        setFeedbackData(result?.feedback);
        // Populate the form with existing feedback data
        setNewFeedback({
          name: feedback?.name as string,
          phoneNumber: feedback?.phoneNumber as string,
          feedback: feedback?.feedback as string,
          category: feedback?.category as string,
          state: feedback?.state as string,
        });
      } else {
        toast({
          title: "Error fetching feedback",
          variant: "destructive",
        });
      }
    };
    fetchFeedback();
  }, [feedbackId, toast]);

  if (!isLoaded || !feedbackData) return "Loading...";

  const handleUpdateFeedback = async () => {
    if (!newFeedback.feedback) {
      toast({
        title: "Please provide feedback",
        className: "bg-yellow-300 text-white mb-12",
      });
      return;
    }

    setLoading(true); // Start loading

    try {
      const result = await updateFeedback(
        feedbackId,
        userId as string,
        newFeedback
      );

      if (result?.state === "success") {
        toast({
          title: result?.message,
          className: "bg-primary text-white mb-12",
        });
        router.push("/"); // Redirect to homepage
      } else {
        toast({
          title: result?.message,
          variant: "destructive",
          className: "bg-red-300 text-white text-center mb-12",
        });
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
      toast({
        title: "Error updating feedback",
        variant: "destructive",
        className: "bg-red-300 text-white text-center mb-12",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-50 p-6 shadow-lg py-12">
      <div className="w-[400px] sm:w-[500px] md:w-[800px] p-6 rounded-lg bg-white mx-auto flex flex-col items-center border border-gray-200 h-full overflow-y-scroll">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Update Feedback
        </h3>

        <div className="mb-4 w-full">
          <Label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </Label>
          <Input
            id="name"
            value={newFeedback?.name}
            placeholder="Enter your name"
            onChange={(e) =>
              setNewFeedback({ ...newFeedback, name: e.target.value })
            }
            className="w-full mt-1 border-gray-300 focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="mb-4 w-full">
          <Label
            htmlFor="phoneNumber"
            className="block text-sm font-medium mb-2"
          >
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            type="text"
            value={
              newFeedback?.phoneNumber
                ? `+251${newFeedback?.phoneNumber}`
                : "+251"
            }
            placeholder="Enter your phone number"
            onChange={(e) => {
              const inputValue = e.target.value;
              // Strip any non-digit characters and ensure we handle the prefix "+251"
              const digitsOnly = inputValue.replace(/\D/g, "");

              if (digitsOnly.startsWith("251")) {
                const phoneDigits = digitsOnly.slice(3);

                if (phoneDigits.length <= 9) {
                  setNewFeedback({
                    ...newFeedback,
                    phoneNumber: phoneDigits,
                  });
                }
              }
            }}
            className="w-full mt-1 border-gray-300 focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="mb-4 w-full">
          <Label htmlFor="feedback" className="block text-sm font-medium mb-2">
            Feedback
          </Label>
          <Textarea
            id="feedback"
            value={newFeedback?.feedback}
            onChange={(e) =>
              setNewFeedback({ ...newFeedback, feedback: e.target.value })
            }
            className="w-full mt-1 border-gray-300 focus:ring-primary focus:border-primary"
            rows={4}
            placeholder="Enter your feedback"
          />
        </div>

        <div className="mb-4 w-full">
          <Label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </Label>
          <Select
            value={newFeedback?.category}
            onValueChange={(value) =>
              setNewFeedback({ ...newFeedback, category: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="w-full bg-white hover:bg-gray-100">
              <SelectItem value="Billing">Billing</SelectItem>
              <SelectItem value="Technical">Technical</SelectItem>
              <SelectItem value="Support">Customer Support</SelectItem>
              <SelectItem value="General">General Feedback</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* File Upload */}
        <div className="mb-4 w-full">
          <FileUpload setPreviewUrl={setPreviewUrl} />
          {/* Preview of Uploaded Image */}
          {(previewUrl || feedbackData?.attachment) && (
            <div className="mt-4 w-full flex justify-center">
              <Image
                src={
                  (previewUrl as string) || (feedbackData?.attachment as string)
                }
                alt="Preview"
                width={200}
                height={200}
                objectFit="cover"
                className="rounded-md object-cover w-full h-[400px]"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full flex items-center justify-between mt-6 space-x-2">
          <Button
            variant="ghost"
            onClick={() => router.push("/")} // Go back to the home page
            className="w-full border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            className="w-full bg-primary text-white"
            onClick={handleUpdateFeedback}
            disabled={loading} // Disable button during loading
          >
            {loading ? "Updating..." : "Update"} {/* Show loading state */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateFeedbackPage;
