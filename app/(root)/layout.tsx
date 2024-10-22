import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import Sidebar from "./components/sidebar";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import AdminSidebar from "./components/admin-sidebar";
const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  let user = null;

  if (userId) {
    const result = await getUserById(userId);

    user = result.user;
  }

  return (
    <div className="flex w-full flex-col justify-between items-center min-h-screen">
      <Navbar />
      <div className="flex items-start justify-between w-full">
        {user?.role === "admin" ? <AdminSidebar /> : <Sidebar />}
        {children}
        <Toaster />
      </div>
      <Footer />
    </div>
  );
};

export default layout;
