"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import { getUserById } from "./user.actions";
import { getFeedbackById } from "./feedback.actions";
import { truncateText } from "../helpers";

interface NotificationProps {
  message: string;
  type: string;
  userId: string;
  isRead: boolean;
}

interface NotificationResponse {
  state: string;
  message: string;
  notifications?: NotificationProps[];
}

// Function to retrieve feedback and its userId
async function getFeedbackUserId(feedbackId: string): Promise<string | null> {
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
    });

    if (!feedback) {
      console.error("Feedback not found");
      return null;
    }

    return feedback.userId;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return null;
  }
}

// Function to create a notification
export async function createUserNotification(
  feedbackId: string,
  state: string
): Promise<NotificationResponse> {
  const userId = await getFeedbackUserId(feedbackId);

  if (!userId) {
    return {
      state: "error",
      message: "Feedback not found or no user associated",
    };
  }

  const { user } = await getUserById(userId);
  const { feedback } = await getFeedbackById(feedbackId);

  if (!user || !feedback) {
    return {
      state: "error",
      message: "User or feedback not found",
    };
  }

  const notification: NotificationProps = {
    type: "feedback_updated",
    message: `${user?.username}, Your ${truncateText(
      feedback?.feedback,
      20
    )} feedback is now marked as ${state}.`,
    userId,
    isRead: false,
  };

  try {
    await prisma.notification.create({
      data: notification,
    });

    return { state: "success", message: "Notification created successfully" };
  } catch (error) {
    console.error("Failed to create notification:", error);
    return { state: "error", message: "Failed to create notification" };
  }
}

// Function to get notifications by  userId

export async function getNotificationsByUserId(
  userId: string
): Promise<NotificationResponse> {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
    });

    return {
      state: "success",
      message: "Notifications retrieved successfully",
      notifications,
    };
  } catch (error) {
    console.error("Failed to retrieve notifications:", error);
    return { state: "error", message: "Failed to retrieve notifications" };
  }
}
// Function to update notification status (e.g., mark all as read)
export async function updateNotificationStatus(
  userId: string
): Promise<NotificationResponse> {
  try {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });

    revalidatePath("/");
    revalidatePath("/admin-dashboard");
    return {
      state: "success",
      message: "All notifications updated successfully",
    };
  } catch (error) {
    console.error("Failed to update notifications:", error);
    return {
      state: "error",
      message: "Failed to update notifications",
    };
  }
}

export async function getNofitications() {
  try {
    const notifications = await prisma.notification.findMany();
    return { state: "sucess", notifications };
  } catch (error) {
    console.log(error);
    return { state: "error", message: "Failed to fetch notifications" };
  }
}

export async function createAdminNotification(feedbackId: string) {
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
    });

    if (!feedback || !feedback.userId) {
      throw new Error("Feedback  not found");
    }

    const user = await prisma.user.findUnique({
      where: { id: feedback.userId },
    });

    const notificationMessage = `A new feedback has been submitted by user ${user?.username}.`;

    const getAdmins = await prisma.user.findMany({
      where: { role: "admin" },
    });

    const adminIds = getAdmins.map((admin) => admin.id);

    const adminNotifications = adminIds.map((adminId) => ({
      type: "admin_feedback_submitted",
      message: notificationMessage,
      userId: adminId,
      isRead: false,
    }));

    await prisma.notification.createMany({
      data: adminNotifications,
    });

    return {
      state: "success",
      message: "Notifications created for all admins successfully.",
    };
  } catch (error) {
    console.error("Error creating notifications for admins:", error);
    throw new Error("Failed to create admin notifications.");
  }
}

export async function getAllAdminNotificationsByUserId(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user?.role !== "admin") {
      throw new Error("You are not authorized to view this page.");
    }

    const adminNotifications = await prisma.notification.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { sate: "success", adminNotifications };
  } catch (error) {
    console.error("Error fetching admin notifications:", error);
    return { state: "error", message: "failed to fetch admin notifications " };
  }
}
