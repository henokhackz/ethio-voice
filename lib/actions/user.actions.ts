"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await prisma.user.create({
      data: user,
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return { state: "error", message: "User not found" };
    }

    return { state: "success", user };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { state: "error", message: "error fetching user " };
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: user, // Updating the user data
    });

    if (!updatedUser) throw new Error("User update failed");

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    const userToDelete = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    const deletedUser = await prisma.user.delete({
      where: { clerkId },
    });

    revalidatePath("/"); // Revalidate the path after deleting

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}

export async function checkUserAdminOrNot(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) {
      return { state: "error", message: "User not found" };
    }
    if (user.role === "admin") {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    throw new Error("Error while getting user information");
  }
}
