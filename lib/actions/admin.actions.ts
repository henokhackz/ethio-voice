"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import { getUserById } from "./user.actions";
import { createUserNotification } from "./notification.actions";

export async function updateFeedback(
  feedbackId: string,
  userId: string,
  state: string
) {
  if (!feedbackId || !userId || !state) {
    return {
      state: "error",
      message: "please sign in before updating feedback",
    };
  }

  const { user } = await getUserById(userId);

  if (user?.role !== "admin") {
    return { state: "error", message: "only admins can update feedback" };
  }

  try {
    const updatedFeedback = await prisma.feedback.update({
      where: {
        id: feedbackId,
      },
      data: {
        state,
      },
    });
    console.log(updatedFeedback.state, "state i just updated");

    // notify a user

    await createUserNotification(feedbackId, state);

    revalidatePath("/admin-dashboard");
    revalidatePath("/");

    return { state: "success", updatedFeedback };
  } catch (error) {
    console.log(error);
    return { state: "error", message: "error updating feedback" };
  }
}

export async function deleteuserFeedback(feedbackId: string, userId: string) {
  if (!feedbackId || !userId) {
    return {
      state: "error",
      message: "please sign in before deleting feedback",
    };
  }

  const { user } = await getUserById(userId);

  if (!user) {
    return { state: "error", message: "user not found" };
  }

  if (user.role !== "admin") {
    return { state: "error", message: "only admins can delete feedback" };
  }

  try {
    const deletedFeedback = await prisma.feedback.delete({
      where: {
        id: feedbackId,
      },
    });
    revalidatePath("/");

    return { state: "success", deletedFeedback };
  } catch (error) {
    console.log(error);
    return { state: "error", message: "error deleting feedback" };
  }
}

export async function getFeedbacks() {
  try {
    const feedbacks = await prisma.feedback.findMany();
    return { state: "success", feedbacks };
  } catch (error) {
    console.log(error);
    return { state: "error", message: "error fetching feedbacks" };
  }
}
