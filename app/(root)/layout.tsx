import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import AdminSidebar from "./components/admin-sidebar";
import Sidebar from "./components/sidebar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  let user = null;

  if (userId) {
    const result = await getUserById(userId);

    user = result.user;
  }

  return (
    <div className="flex w-full flex-col justify-between items-center min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-start justify-between w-full">
        {userId && (
          <div className="w-64">
            {user?.role === "admin" ? <AdminSidebar /> : <Sidebar />}
          </div>
        )}

        <div className="flex-grow">{children}</div>

        <Toaster />
      </div>
    </div>
  );
};

export default layout;
