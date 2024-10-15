"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function Testmony() {
  const images = ["/Picture-4-3.png", "/Picture-7-3.jpg", "/Picture-10-3.png"];

  return (
    <div className="flex flex-col gap-8 items-center justify-center py-12 -z-10 ">
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-white bg-primary rounded-lg px-4 py-2 text-center shadow-lg">
        Customer Testimonials
      </h2>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full max-w-7xl p-4 relative"
      >
        <CarouselContent className="flex w-full gap-4">
          {images.map((image, index) => (
            <CarouselItem key={index} className="md:w-1/2 lg:w-1/3 p-4">
              <Card className="transition-transform transform hover:scale-105 shadow-xl rounded-lg overflow-hidden">
                <CardContent className="flex items-center justify-center p-4">
                  <Image
                    src={image}
                    height={200}
                    width={400}
                    alt={`Testimony ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg -z-10"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous Arrow */}
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark">
          Prev
        </CarouselPrevious>

        {/* Next Arrow */}
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark">
          Next
        </CarouselNext>
      </Carousel>
    </div>
  );
}
