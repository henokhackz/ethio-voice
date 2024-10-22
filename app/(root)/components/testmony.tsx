"use client";
import Autoplay from "embla-carousel-autoplay";
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
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const images = ["/Picture-4-3.png", "/Picture-7-3.jpg", "/Picture-10-3.png"];

  return (
    <div className="w-full items-center justify-center p-5 flex flex-col ">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 bg-primary rounded-lg px-5 py-2 my-12 md:my-6">
        Testmony
      </h2>
      <Carousel
        plugins={[plugin.current]}
        className="flex w-full  items-center justify-center"
        onMouseEnter={() => plugin.current?.stop()}
        onMouseLeave={() => plugin.current?.play()}
      >
        <CarouselContent className="flex gap-4">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4"
            >
              <Card className="overflow-hidden shadow-lg">
                <CardContent className="flex items-center justify-center p-6">
                  <Image
                    src={image}
                    alt={`Testimony ${index + 1}`}
                    height={200}
                    width={200}
                    objectFit="cover"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
