"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5">
        {/* Company Info */}
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4">Ethio Telecom</h3>
          <p className="text-gray-400">
            Simplifying the feedback process, improving customer satisfaction.
          </p>
          <div className="flex mt-4 gap-4">
            <Image
              src="/logo.png"
              alt="Ethio Telecom"
              width={100}
              height={200}
              className="rounded"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li>
              <span className="font-semibold">Email:</span>{" "}
              support@ethiotelecom.com
            </li>
            <li>
              <span className="font-semibold">Phone:</span> +251 123 456 789
            </li>
            <li>
              <span className="font-semibold">Address:</span> Addis Ababa,
              Ethiopia
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-primary">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-primary">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:text-primary">
              <Linkedin size={20} />
            </Link>
            <Link href="#" className="hover:text-primary">
              <Instagram size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Ethio Telecom. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
