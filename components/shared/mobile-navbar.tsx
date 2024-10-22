"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ClerkLoaded } from "@clerk/nextjs";
import { Bell, Home, Menu, MessageSquare, Settings, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <ClerkLoaded>
        <SignedOut>
          <Link href={"#"}>
            <div className="text-2xl font-bold text-primary hidden md:block">
              Ethio-Voice
            </div>
          </Link>
        </SignedOut>
      </ClerkLoaded>
      <ClerkLoaded>
        <SignedIn>
          <header className="bg-white border-b border-gray-200 md:hidden">
            <div className="mx-auto flex justify-between items-center p-4">
              {/* Hamburger Button */}
              <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={handleToggle}
                      className="p-2 rounded-md hover:bg-gray-100"
                    >
                      {isOpen ? (
                        <X className="w-6 h-6" size={20} />
                      ) : (
                        <Menu className="w-6 h-6" size={20} />
                      )}
                    </Button>
                  </SheetTrigger>
                  {/* Menu content styled to slide from the right */}
                  <SheetContent
                    side="left"
                    className="p-4 w-[75%] max-w-xs bg-gray-50 rounded-tl-lg rounded-bl-lg shadow-lg"
                    style={{ top: "0", right: "0" }}
                  >
                    <SheetHeader>
                      <SheetTitle className="text-lg font-semibold text-pretty text-primary">
                        Ethio-Voice
                      </SheetTitle>
                    </SheetHeader>
                    <nav className="mt-4 w-full">
                      <ul className="space-y-4">
                        <li>
                          <Link
                            href="/"
                            className="flex items-center gap-3 p-3 rounded-lg transition-colors bg-white hover:bg-primary group"
                          >
                            <Home
                              size={20}
                              className="text-gray-800 group-hover:text-white"
                            />
                            <span className="text-gray-800 group-hover:text-white font-medium">
                              Home
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/notifications"
                            className="flex items-center gap-3 p-3 rounded-lg transition-colors bg-white hover:bg-primary group"
                          >
                            <Bell
                              size={20}
                              className="text-gray-800 group-hover:text-white"
                            />
                            <span className="text-gray-800 group-hover:text-white font-medium">
                              Notifications
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/feedback"
                            className="flex items-center gap-3 p-3 rounded-lg transition-colors bg-white hover:bg-primary group"
                          >
                            <MessageSquare
                              size={20}
                              className="text-gray-800 group-hover:text-white"
                            />
                            <span className="text-gray-800 group-hover:text-white font-medium">
                              Feedback
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/settings"
                            className="flex items-center gap-3 p-3 rounded-lg transition-colors bg-white hover:bg-primary group"
                          >
                            <Settings
                              size={20}
                              className="text-gray-800 group-hover:text-white"
                            />
                            <span className="text-gray-800 group-hover:text-white font-medium">
                              Settings
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </header>
        </SignedIn>
      </ClerkLoaded>
    </>
  );
};

export default MobileNavbar;
