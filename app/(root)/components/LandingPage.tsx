import { SignedOut } from "@clerk/nextjs";
import React from "react";
import Hero from "./hero";
import STATISTICS from "./statistics";
import { Testmony } from "./testmony";

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <SignedOut>
        <Hero />
        <STATISTICS />
        <Testmony />
      </SignedOut>
    </div>
  );
};

export default LandingPage;
