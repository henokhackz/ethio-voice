import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Book, Home, MessageSquare, Users } from "lucide-react";

const AdminSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white text-gray-800 flex flex-col justify-between border-r border-gray-200 shadow-md pb-12 fixed top-20 bottom-0 left-0 ">
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

      {/* Navigation Section */}
      <nav className="px-4 w-full flex-1 py-6">
        <ul className="space-y-3">
          <li>
            <Link
              href="/admin-dashboard"
              className="flex items-center gap-4 py-3 px-4 rounded-lg text-md font-medium text-gray-800 hover:bg-primary hover:text-white transition-all duration-200"
            >
              <Home size={20} /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className="flex items-center gap-4 py-3 px-4 rounded-lg text-md font-medium text-gray-700 hover:bg-primary hover:text-white transition-all duration-200"
            >
              <Users size={20} /> Manage Users
            </Link>
          </li>
          <li>
            <Link
              href="/admin/feedbacks"
              className="flex items-center gap-4 py-3 px-4 rounded-lg text-md font-medium text-gray-700 hover:bg-primary hover:text-white transition-all duration-200"
            >
              <MessageSquare size={20} /> Feedbacks
            </Link>
          </li>
          <li>
            <Link
              href="/admin/reports"
              className="flex items-center gap-4 py-3 px-4 rounded-lg text-md font-medium text-gray-700 hover:bg-primary hover:text-white transition-all duration-200"
            >
              <Book /> Reports
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="px-4 py-6 border-t border-gray-200 bg-gray-50 text-center">
        <p className="text-xs text-gray-500">
          © 2024 YourCompany. All rights reserved.
        </p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
