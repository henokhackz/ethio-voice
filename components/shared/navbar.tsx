import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between h-[80px] bg-white px-5 shadow-md top-0 left-0 sticky z-50">
      <div className="flex items-center">
        <Image src={"/logo.png"} height={50} width={150} alt="logo" />
        <span className="ml-2 text-white text-2xl font-bold">
          Ethio Telecom
        </span>
      </div>
      <div className="hidden flex-col md:flex">
        <ul className="flex items-center gap-4 text-gray-950">
          <li>
            <Link href={"/"} className="hover:text-secondary">
              Home
            </Link>
          </li>
          <li>
            <Link href={"/about"} className="hover:text-secondary">
              About Us
            </Link>
          </li>
          <li>
            <Link href={"/services"} className="hover:text-secondary">
              Services
            </Link>
          </li>
          <li>
            <Link href={"/services"} className="hover:text-secondary">
              Feedback
            </Link>
          </li>
          <li>
            <Link href={"/contact"} className="hover:text-secondary">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <SignedOut>
          <SignInButton>
            <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition ">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
