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
    <div className="flex flex-col w-full min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      <div className="flex flex-1 w-full items-center justify-center">
        {/* Sidebar */}
        {userId && (
          <div className=" w-0 md:64 flex-shrink-0">
            {user?.role === "admin" ? <AdminSidebar /> : <Sidebar />}
          </div>
        )}

        {/* Main Content */}
        <div className="md:flex-1 Md:p-8 md:overflow-x-auto p-5 m-12 md:m-0">
          {children}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default layout;
