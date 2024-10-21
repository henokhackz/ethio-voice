"use server";
import { revalidatePath } from "next/cache";
import prisma from "../db";
import { createAdminNotification } from "./notification.actions";

interface Feedback {
  name: string;
  phoneNumber: string;
  feedback: string;
  category: string;
  state: string;
}
export async function addNewFeedback(
  feedBack: Feedback,
  userId: string,
  url: string
) {
  if (!feedBack || !userId) {
    return {
      state: "error",
      message:
        "Invalid input: Please enter your feedback and ensure user is authenticated.",
    };
  }

  const { name, phoneNumber, feedback, category, state } = feedBack;

  try {
    // Create the feedback in the database
    const newFeedback = await prisma.feedback.create({
      data: {
        name,
        phoneNumber,
        feedback,
        category,
        state,
        attachment: url,
        userId,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin-dashboard");
    if (newFeedback.id) {
      await createAdminNotification(newFeedback.id);
    } else {
      throw new Error("Feedback creation failed");
    }

    return { state: "success", message: "Feedback added successfully!" };
  } catch (error) {
    console.error("Error adding feedback:", error);
    return {
      state: "error",
      message: "An error occurred while adding your feedback.",
    };
  }
}

export async function getFeedbacksByUserId(userId: string) {
  if (!userId) {
    return { state: "error", message: "Please login first " };
  }

  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        userId,
      },
    });

    return { message: "Feedback found", feedbacks };
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
}

export async function updateFeedback(
  feedbackId: string,
  userId: string,
  updatedFeedback: Feedback
) {
  if (!feedbackId || !userId || !updatedFeedback) {
    return {
      state: "error",
      message:
        "Invalid input: Please provide feedback ID, user ID, and updated feedback.",
    };
  }

  const { name, phoneNumber, feedback, category, state } = updatedFeedback;

  try {
    // First, make sure the feedback exists and belongs to the user
    const existingFeedback = await prisma.feedback.findFirst({
      where: {
        id: feedbackId,
        userId, // Ensures this feedback belongs to the given user
      },
    });

    if (!existingFeedback) {
      return {
        state: "error",
        message: "Feedback not found or unauthorized access.",
      };
    }

    // Now update the feedback
    await prisma.feedback.update({
      where: {
        id: feedbackId,
      },
      data: {
        name,
        phoneNumber,
        feedback,
        category,
        state,
      },
    });

    revalidatePath("/"); // Revalidate the home page

    return { state: "success", message: "Feedback updated successfully!" };
  } catch (error) {
    console.error("Error updating feedback:", error);
    return {
      state: "error",
      message: "An error occurred while updating your feedback.",
    };
  }
}

export async function getFeedbackById(feedbackId: string) {
  if (!feedbackId) {
    return { state: "error", message: "Please provide feedback ID." };
  }

  try {
    const feedback = await prisma.feedback.findUnique({
      where: {
        id: feedbackId,
      },
    });
    return { state: "success", feedback };
  } catch (error) {
    console.log(error);
    return { state: "error", message: "Feed feedback ID not found" };
  }
}
