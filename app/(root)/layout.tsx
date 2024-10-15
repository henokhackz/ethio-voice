import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col justify-start items-center min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
