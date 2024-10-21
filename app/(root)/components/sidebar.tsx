"use client";

import { SignedIn, useAuth } from "@clerk/nextjs";
import { Home, Settings, MessageSquare, LogOut, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const { userId } = useAuth();

  const handleLogout = () => {
    router.push("/");
  };

  if (!userId) {
    return null;
  }

  return (
    <SignedIn>
      <aside className="w-64 h-screen bg-white text-gray-800 flex flex-col justify-between border-r border-gray-200 shadow-lg">
        {/* Logo Section */}
        <div className="flex items-center justify-center py-8 bg-gray-100 shadow-sm">
          <Image
            src={"/logo.png"}
            alt="logo"
            height={100}
            width={150}
            className="object-contain"
          />
        </div>

        {/* Navigation Links */}
        <nav className="px-4 w-full flex-1 py-6">
          <ul className="space-y-3">
            <li>
              <Link
                href="/"
                className="flex items-center gap-4 py-3 px-4 rounded-lg text-md font-medium text-gray-800 hover:bg-primary hover:text-white transition-all duration-200"
              >
                <Home size={20} /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/notifications"
                className="flex items-center gap-4 py-3 px-4 rounded-lg text-md font-medium text-gray-700 hover:bg-primary hover:text-white transition-all duration-200"
              >
                <Bell size={20} /> Notifications
              </Link>
            </li>
            <li>
              <Link
                href="/feedback"
                className="flex items-center gap-4 py-3 px-4 rounded-lg text-md font-medium text-gray-700 hover:bg-primary hover:text-white transition-all duration-200"
              >
                <MessageSquare size={20} /> Feedback
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-4 py-3 px-4 rounded-lg text-md font-medium text-gray-700 hover:bg-primary hover:text-white transition-all duration-200"
              >
                <Settings size={20} /> Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="px-4 py-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 py-3 px-4 w-full text-md font-medium text-gray-600 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
    </SignedIn>
  );
}