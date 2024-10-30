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
import { addNewFeedback } from "@/lib/actions/feedback.actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import FileUpload from "../components/file-upload";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

interface Feedback {
  id: number;
  name: string;
  phoneNumber: string;
  title: string;
  feedback: string;
  category: string;
  isPublic: boolean;
  state: string;
}

const Feedback = () => {
  const { isLoaded, userId } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [newFeedback, setNewFeedback] = useState({
    name: "",
    phoneNumber: "",
    title: "",
    feedback: "",
    isPublic: true,
    category: "",
    state: "Pending",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null | unknown>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  if (!isLoaded)
    return (
      <div className="h-screen items-center justify-center w-full">
        <h3>loading</h3>
      </div>
    );

  const handleAddFeedback = async () => {
    if (!newFeedback.feedback) {
      toast({
        title: "Please provide feedback",
        className: "bg-yellow-300 text-white mb-12",
      });
      return;
    }

    const newFeedbackEntry: Feedback = {
      id: feedbacks.length + 1,
      name: newFeedback.name,
      phoneNumber: newFeedback.phoneNumber,
      title: newFeedback.title,
      feedback: newFeedback.feedback,
      isPublic: newFeedback.isPublic,
      category: newFeedback.category || "General",
      state: "Pending",
    };

    setLoading(true);

    try {
      const result = await addNewFeedback(
        newFeedbackEntry,
        userId as string,
        previewUrl as string
      );

      setFeedbacks([...feedbacks, newFeedbackEntry]);
      setNewFeedback({
        name: "",
        phoneNumber: "",
        title: "",
        feedback: "",
        isPublic: true,
        category: "",
        state: "Pending",
      });
      setPreviewUrl(null);
      if (result.state === "success") {
        toast({
          title: result.message,
          className: "bg-primary text-white mb-12",
        });
        router.push("/");
      } else {
        toast({
          title: result.message,
          variant: "destructive",
          className: "bg-red-300 text-white text-center mb-12",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error submitting feedback",
        variant: "destructive",
        className: "bg-red-300 text-white text-center mb-12",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full bg-gray-50 p-6 shadow-sm py-12">
      <div className="w-[400px] sm:w-[500px] md:w-[800px] p-6 rounded-lg bg-white mx-auto flex flex-col items-center border border-gray-200  ">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Submit New Feedback
        </h3>

        <div className="mb-4 w-full">
          <Label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </Label>
          <Input
            id="name"
            value={newFeedback.name}
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
              newFeedback.phoneNumber
                ? `+251${newFeedback.phoneNumber}`
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
        {/* Feedback Title */}
        <div className="mb-4 w-full">
          <Label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </Label>
          <Input
            id="title"
            value={newFeedback.title}
            placeholder="Enter feedback title"
            onChange={(e) =>
              setNewFeedback({ ...newFeedback, title: e.target.value })
            }
            className="w-full mt-1 border-gray-300 focus:ring-primary focus:border-primary"
          />
        </div>
        {/* Feedback Visibility */}
        <div className="mb-4 w-full flex items-center justify-between">
          <Label htmlFor="isPublic" className="text-sm font-medium">
            Make Feedback Public
          </Label>
          <Switch
            id="isPublic"
            checked={newFeedback.isPublic}
            onCheckedChange={(checked) =>
              setNewFeedback({ ...newFeedback, isPublic: checked })
            }
            className="ml-4"
          />
        </div>

        <div className="mb-4 w-full">
          <Label htmlFor="feedback" className="block text-sm font-medium mb-2">
            Feedback
          </Label>
          <Textarea
            id="feedback"
            value={newFeedback.feedback}
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
        <div className="mb-4 w-full ">
          <FileUpload setPreviewUrl={setPreviewUrl} />

          {(previewUrl as string) && (
            <div className="mt-4 w-full flex items-center justify-start  ">
              <Image
                src={previewUrl as string}
                alt="Preview"
                width={200}
                height={400}
                objectFit="cover"
                className="rounded-md object-contain h-[400px] w-[700px] "
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full flex items-center justify-between mt-6 space-x-2">
          {newFeedback.feedback && (
            <Button
              variant="ghost"
              onClick={() => {
                setNewFeedback({
                  name: "",
                  phoneNumber: "",
                  title: "",
                  feedback: "",
                  isPublic: true,
                  category: "",
                  state: "Pending",
                });
                setPreviewUrl(null);
              }}
              className="w-full border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
          )}
          <Button
            className="w-full bg-primary text-white"
            onClick={handleAddFeedback}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
