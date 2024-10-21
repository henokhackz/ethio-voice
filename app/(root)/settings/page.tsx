"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="w-full mx-auto  space-y-10 ">
      <div className="max-w-5xl mx-auto space-y-5 py-12">
        {/* Profile & Notification Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <Card className="">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <Label htmlFor="name" className="text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="rounded-lg border-gray-300"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="email" className="text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  className="rounded-lg border-gray-300"
                />
              </div>
              <Button className="w-full mt-6 bg-primary text-white rounded-lg py-2">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className=" ">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-800">
                    Receive updates via email.
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-500">
                    Receive updates via SMS.
                  </p>
                </div>
                <Switch
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>

              <Button className="w-full mt-6 bg-primary text-white rounded-lg py-2">
                Update Preferences
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Account Preferences */}
        <Card className="">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Account Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-sm text-gray-800">
                  Enable dark theme for your account.
                </p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <Button className="w-full mt-6 bg-primary text-white rounded-lg py-2">
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
