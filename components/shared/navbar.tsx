"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  getNofitications,
  getNotificationsByUserId,
  updateNotificationStatus,
} from "@/lib/actions/notification.actions";
import { checkUserAdminOrNot } from "@/lib/actions/user.actions";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import MobileNavbar from "./mobile-navbar";
import SearchBar from "./search-bar";
import Link from "next/link";

interface NotificationProps {
  message: string;
  type: string;
  userId: string;
  isRead: boolean;
}
interface Notification {
  userId: string;
  id: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
}

type UnreadNotifications = Notification[] | undefined;

const Navbar = () => {
  const { userId } = useAuth();

  const [notifications, setNotifications] = useState<
    NotificationProps[] | UnreadNotifications
  >([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState<number | undefined>(0);
  const [isAdmin, setIsAdmin] = useState<
    boolean | { state: string; message: string }
  >(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (userId) {
          // Check if the user is an admin
          const isAdminORnot = await checkUserAdminOrNot(userId);
          setIsAdmin(isAdminORnot);

          let unreadNotifications;

          if (isAdmin) {
            const { notifications } = await getNofitications();
            unreadNotifications = notifications?.filter(
              (notification) => notification.isRead === false
            );
            setNotifications(unreadNotifications);
          } else {
            const { notifications } = await getNotificationsByUserId(userId);
            setNotifications(notifications || []);
            const unreadNotificationsCount = notifications?.filter(
              (notification) => !notification.isRead
            ).length;
            setUnreadCount(unreadNotificationsCount);
          }
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId, isAdmin]);

  const handleNotificationClick = async () => {
    if (userId) {
      try {
        await updateNotificationStatus(userId);

        // Refetch notifications after updating status
        const { notifications } = await getNotificationsByUserId(userId);
        setNotifications(notifications || []);

        // Recalculate unread count
        const unreadNotifications = notifications?.filter(
          (notification) => !notification.isRead
        ).length;
        setUnreadCount(unreadNotifications || 0);
      } catch (error) {
        console.error("Error updating notifications:", error);
      }
    }
  };

  return (
    <nav className="w-full flex items-center justify-between h-[80px] bg-white px-5 top-0 left-0 right-0  z-50 border-b border-gray-800/10 fixed ">
      {/* App Name */}
      <div className="flex items-center space-x-4 md:hidden">
        <MobileNavbar />
      </div>
      <Link href={"#"}>
        <div className="text-2xl font-bold text-primary hidden md:block">
          Ethio-Voice
        </div>
      </Link>

      {/* Search Bar */}
      <SignedIn>
        <div className="hidden md:flex w-[600px]">
          <SearchBar />
        </div>
      </SignedIn>
      <div className="flex items-center space-x-4  justify-end">
        <SignedIn>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="relative p-2 text-gray-500 hover:text-primary transition-all"
                aria-label="Notifications"
                disabled={loading}
                onClick={handleNotificationClick}
              >
                <Bell className="w-6 h-6" />
                {unreadCount !== undefined && unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-4 mt-2 shadow-lg border border-gray-200 bg-white rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Notifications</h3>
              {loading ? (
                <div className="text-gray-600 text-sm">
                  Loading notifications...
                </div>
              ) : (
                <ul className="space-y-2">
                  {notifications !== undefined && notifications?.length > 0 ? (
                    notifications?.map((notification, index) => (
                      <li
                        key={index}
                        className={`p-2 ${
                          notification.isRead ? "bg-gray-50" : "bg-gray-100"
                        } rounded-md text-sm text-gray-800`}
                      >
                        {notification.message}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600 text-sm">No notifications</li>
                  )}
                </ul>
              )}
            </PopoverContent>
          </Popover>
        </SignedIn>

        {/* Authentication Section */}
        <ClerkLoaded>
          <SignedOut>
            <SignInButton>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ClerkLoaded>
        <ClerkLoading>
          <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse"></div>
        </ClerkLoading>
      </div>
    </nav>
  );
};

export default Navbar;
