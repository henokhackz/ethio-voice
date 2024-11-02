"use client";
import { BellRing, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import {
  getNotificationsByUserId,
  updateNotificationStatus,
} from "@/lib/actions/notification.actions";
import { useAuth } from "@clerk/nextjs";

interface NotificationProps {
  message: string;
  type: string;
  userId: string;
  isRead: boolean;
}

function FeedbackNotifications() {
  const { userId } = useAuth();
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      if (userId) {
        try {
          const { notifications } = await getNotificationsByUserId(userId);
          setNotifications(notifications || []);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchNotifications();
  }, [userId]);

  // Handle marking all notifications as read
  const handleMarkAllAsRead = async () => {
    if (userId) {
      try {
        await updateNotificationStatus(userId); // Mark all as read
        const updatedNotifications = notifications.map((n) => ({
          ...n,
          isRead: true,
        }));
        setNotifications(updatedNotifications); // Update local state
      } catch (error) {
        console.error("Error marking notifications as read:", error);
      }
    }
  };

  return (
    <div className="flex items-start w-full bg-gray-50 p-5 h-full">
      <Card className="w-[200px] md:w-[600px] h-full bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            You have {notifications.filter((n) => !n.isRead).length} unread
            messages.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Send notifications to device.
              </p>
            </div>
            <Switch className="border border-gray-800/10" />
          </div>
          <div>
            {loading ? (
              <p>Loading notifications...</p>
            ) : (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span
                    className={`flex h-2 w-2 translate-y-1 rounded-full ${
                      notification?.isRead ? "bg-gray-400" : "bg-sky-500"
                    }`}
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification?.type}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-primary text-white"
            onClick={handleMarkAllAsRead}
            disabled={notifications.every((n) => n.isRead)}
          >
            <Check className="mr-2" /> Mark all as read
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default FeedbackNotifications;
