"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LinkButton from "./LinkButton";
import Container from "../sharedComponent/Container";
import {
  banner1,
  laptopBanner,
  lines,
  mobileBanner,
  tabletBanner,
} from "@/public/assets";

const Banner = () => {
  const slides = [
    {
      url: laptopBanner,
      name: "Laptops",
      description:
        "Discover High-Performance Laptops for Work and Entertainment. Whether you need it for work, study, or play, our laptops are designed with speed and efficiency.",
      colors: ["from-purple-300", "to-purple-900"],
    },
    {
      url: tabletBanner,
      name: "Tablets",
      description:
        "Explore a Wide Range of Tablets for Every Need. From entertainment to productivity, our tablets offer the versatility ",
      colors: ["from-purple-300", "to-purple-900"],
    },
    {
      url: mobileBanner,
      name: "Mobile Phones",
      description:
        "Stay Connected with the Latest Mobile Phones. Our smartphones combine cutting-edge technology with sleek design .",
      colors: ["from-purple-300", "to-purple-900"],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  return (
    <div className="relative py-10 group flex justify-center items-center duration-500 w-full h-auto mx-auto overflow-hidden">
      <div className="w-[90%] relative h-[500px] sm:h-[400px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            } flex flex-col md:flex-row 
              justify-center md:justify-between items-center px-4  sm:px-14 bg-gradient-to-tr from-secondary-30 to-[rgba(20,25,54,0.7)] rounded-md`}
          >
            <div className="text-center sm:text-left p-4 z-20  max-w-[450px] md:max-w-[300px] lg:max-w-[450px]">
              <h2 className="text-slate-100 font-semibold uppercase  leading-[1] text-[24px] sm:text-[36px] md:text-[48px] lg:text-[52px]">
                {slide.name}
              </h2>
              <p className="text-[16px] mt-6 sm:text-[18px] text-slate-300 mb-4">
                {slide.description}
              </p>
              <div>
                <LinkButton />
              </div>
            </div>
            <div className="relative z-10 mt-4 md:mt-0">
              <Image
                src={slide.url}
                alt="Banner"
                className="w-[250px] sm:w-[300px] lg:w-[400px] h-auto object-cover rounded-md mx-auto"
                priority={index === 0}
              />
            </div>
            <Image
              src={lines}
              alt="lines"
              className="absolute top-0 right-0 w-auto h-2/3 md:h-full object-cover rounded-md opacity-40 z-0"
            />
          </div>
        ))}
        <div className="absolute bottom-4 flex justify-center w-full space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-accent-10" : "bg-gray-100"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
