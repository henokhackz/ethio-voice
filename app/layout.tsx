import type { Metadata } from "next";
import localFont from "next/font/local";
import Head from "next/head"; // Import Head for metadata
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Ethio-voice",
  description: "Customer feedback portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <title>{metadata.title as string}</title>
          <meta name="description" content={metadata.description as string} />
        </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
