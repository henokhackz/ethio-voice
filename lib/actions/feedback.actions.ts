"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import { createAdminNotification } from "./notification.actions";

interface Feedback {
  name: string;
  phoneNumber: string;
  title: string;
  isPublic: boolean;
  feedback: string;
  category: string;
  state: string;
}

// Add New Feedback
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

  const { name, phoneNumber, title, isPublic, feedback, category, state } =
    feedBack;

  try {
    const newFeedback = await prisma.feedback.create({
      data: {
        name,
        phoneNumber,
        title,
        isPublic,
        feedback,
        category,
        state,
        attachment: url,
        userId,
      },
    });

    // Trigger revalidation for relevant paths
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

// Get Feedbacks by User ID
export async function getFeedbacksByUserId(userId: string) {
  if (!userId) {
    return { state: "error", message: "Please login first" };
  }

  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        userId,
      },
    });

    return { state: "success", message: "Feedback found", feedbacks };
  } catch (error) {
    console.error("Error fetching feedbacks by user ID:", error);
    return {
      state: "error",
      message: "Something went wrong while retrieving feedbacks.",
    };
  }
}

// Update Feedback
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
    // Ensure feedback exists and belongs to the user
    const existingFeedback = await prisma.feedback.findFirst({
      where: {
        id: feedbackId,
        userId,
      },
    });

    if (!existingFeedback) {
      return {
        state: "error",
        message: "Feedback not found or unauthorized access.",
      };
    }

    // Update feedback
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

    revalidatePath("/");

    return { state: "success", message: "Feedback updated successfully!" };
  } catch (error) {
    console.error("Error updating feedback:", error);
    return {
      state: "error",
      message: "An error occurred while updating your feedback.",
    };
  }
}

// Get Feedback by ID
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

    if (!feedback) {
      return { state: "error", message: "Feedback not found" };
    }

    return { state: "success", feedback };
  } catch (error) {
    console.error("Error fetching feedback by ID:", error);
    return {
      state: "error",
      message: "An error occurred while retrieving the feedback.",
    };
  }
}

export async function getPublicFeedbacks() {
  try {
    const publicFeedbacks = await prisma.feedback.findMany({
      where: {
        isPublic: true,
      },
    });

    return { state: "success", feedbacks: publicFeedbacks };
  } catch (error) {
    console.error("Error fetching public feedbacks:", error);
    return {
      state: "error",
      message: "An error occurred while fetching public feedbacks.",
    };
  }
}

export async function likeFeedback(userId: string, feedbackId: string) {
  if (!userId || !feedbackId) {
    return {
      state: "error",
      message: "Invalid input: Please provide user ID and feedback ID.",
    };
  }

  try {
    // Check if the user has already downvoted
    const existingDownvote = await prisma.downvote.findFirst({
      where: { userId, feedbackId },
    });

    // If downvoted, delete the downvote before creating an upvote
    if (existingDownvote) {
      await prisma.downvote.delete({ where: { id: existingDownvote.id } });
    }

    // Check if the user has already upvoted
    const existingUpvote = await prisma.upvote.findFirst({
      where: { userId, feedbackId },
    });

    if (existingUpvote) {
      // If upvote exists, delete it (toggle off)
      await prisma.upvote.delete({ where: { id: existingUpvote.id } });
      revalidatePath("/feeds");
      return { state: "success", message: "Upvote removed successfully" };
    } else {
      // Otherwise, create a new upvote
      await prisma.upvote.create({
        data: { userId, feedbackId },
      });
      revalidatePath("/feeds");
      return { state: "success", message: "Feedback upvoted successfully" };
    }
  } catch (error) {
    console.error("Error liking feedback:", error);
    return {
      state: "error",
      message: "An error occurred while liking feedback.",
    };
  }
}

export async function disLikeFeedback(userId: string, feedbackId: string) {
  if (!userId || !feedbackId) {
    return {
      state: "error",
      message: "Invalid input: Please provide user ID and feedback ID.",
    };
  }

  try {
    // Check if the user has already upvoted
    const existingUpvote = await prisma.upvote.findFirst({
      where: { userId, feedbackId },
    });

    // If upvoted, delete the upvote before creating a downvote
    if (existingUpvote) {
      await prisma.upvote.delete({ where: { id: existingUpvote.id } });
    }

    // Check if the user has already downvoted
    const existingDownvote = await prisma.downvote.findFirst({
      where: { userId, feedbackId },
    });

    if (existingDownvote) {
      // If downvote exists, delete it (toggle off)
      await prisma.downvote.delete({ where: { id: existingDownvote.id } });
      revalidatePath("/feeds");
      return { state: "success", message: "Downvote removed successfully" };
    } else {
      // Otherwise, create a new downvote
      if (existingUpvote) {
        await prisma.upvote.delete({ where: { id: existingUpvote.id } });
        revalidatePath("/feeds");
      }
      await prisma.downvote.create({
        data: { userId, feedbackId },
      });
      revalidatePath("/feeds");
      return { state: "success", message: "Feedback downvoted successfully" };
    }
  } catch (error) {
    console.error("Error disliking feedback:", error);
    return {
      state: "error",
      message: "An error occurred while disliking feedback.",
    };
  }
}

export async function searchFeedback(query: string) {
  if (!query) {
    return {
      state: "error",
      message: "Please provide a search query.",
      data: [],
    };
  }

  try {
    const feedbackResults = await prisma.feedback.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            feedback: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        feedback: true,
        createdAt: true,
        userId: true,
      },
    });

    return {
      state: "success",
      message: "Search completed successfully",
      data: feedbackResults,
    };
  } catch (error) {
    console.error("Error fetching search results:", error);
    return {
      state: "error",
      message: "An error occurred while searching.",
      data: [],
    };
  }
}
