import React from "react";
import Hero from "../components/hero";
import STATISTICS from "../components/statistics";
import { Testmony } from "../components/testmony";
import { SignedOut } from "@clerk/nextjs";

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <SignedOut>
        <Hero />
        <STATISTICS />
        <Testmony />
      </SignedOut>
    </div>
  );
};

export default Home;
