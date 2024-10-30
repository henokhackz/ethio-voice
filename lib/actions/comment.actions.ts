"use server";

import prisma from "../db";

export async function createComment(
  userId: string,
  feedbackId: string,
  content: string
) {
  if (!userId || !feedbackId || !content) {
    throw new Error("Missing required parameters");
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        userId,
        feedbackId,
        content,
      },
    });

    return { state: "success", data: comment };
  } catch (error) {
    console.log(error);
    return { state: "error", message: "Error creating comment" };
  }
}

export async function getCommentsByFeedbackId(feedbackId: string) {
  if (!feedbackId) {
    throw new Error("Missing required parameters");
  }

  try {
    const comments = await prisma.comment.findMany({
      where: {
        feedbackId,
      },
    });
    return { state: "success", comments };
  } catch (error) {
    console.log(error);
    return { state: "error", message: "Error getting comments" };
  }
}
