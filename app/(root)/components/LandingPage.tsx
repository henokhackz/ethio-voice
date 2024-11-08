import { ClerkLoaded, ClerkLoading, SignedOut } from "@clerk/nextjs";
import React from "react";
import Hero from "./hero";
import STATISTICS from "./statistics";
import { Testmony } from "./testmony";
import { Footer } from "@/components/shared/Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full min-h-screen">
      <ClerkLoading>
        <div className="text-primary ">loading...</div>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <Hero />
          <STATISTICS />
          <Testmony />
          <Footer />
        </SignedOut>
      </ClerkLoaded>
    </div>
  );
};

export default LandingPage;
