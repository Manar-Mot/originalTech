"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import {
  comp2,
  comp7,
  comp8,
  comp9,
  comp10,
} from "../../../public/assets";
import { SliderSettings } from "../ProductsSection/types";

const logos = [comp2, comp7, comp8, comp9, comp10];

const Brands = () => {
  const settings: SliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed:40,
    centerMode: true,
    responsive: [
      {
        breakpoint: 810,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="border-y bg-white  border-slate-300   px-8">
      <Slider {...settings } arrows={false}>
        {logos.map((logo, index) => (
          <div key={index}>
            <Image
              src={logo}
              alt={`companyBrand${index + 1}`}
              width={96} 
              height={20} 
              className=" w-20 h-20 object-contain my-auto"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Brands;
