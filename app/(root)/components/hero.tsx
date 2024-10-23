import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="h-screen w-full flex items-center justify-between p-5 flex-col md:flex-row mb-6">
      <div className="flex flex-col gap-2 md:w-1/2">
        <h1 className=" text-4xl  md:text-7xl text-primary font-bold pb-5">
          Your Voice, Our Commitment.
        </h1>
        <p className="text-md md:text-2xl text-gray-800 ">
          At Ethio Telecom, we value your feedback. Help us improve and serve
          you better by sharing your thoughts and experiences.
        </p>
      </div>
      <div className="">
        <Image
          src={"/customer-support.webp"}
          height={400}
          width={500}
          alt="customer-support person"
          className="rounded-lg "
        />
      </div>
    </div>
  );
};

export default Hero;
