"use client";
import { categories } from "@/app/utils/categories";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import Slider from "react-slick";
import { HiBars3BottomLeft } from "react-icons/hi2";

// تعريف نوع Category
type Category = {
  id: number;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const AllCategory: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectCategory = useCallback((category: Category) => {
    if (category.label === "All") {
      router.push("/store");
    } else {
      const params = new URLSearchParams(searchParams?.toString());
      params.set("category", category.label);
      console.log('/store' + '?' + params.toString());
      router.push('/store' + '?' + params.toString());
    }
  }, [searchParams, router]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7, 
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          autoplay: true, 
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          autoplay: true, 
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          autoplay: true, 
          autoplaySpeed: 2000,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="w-full md:px-10">
      {categories.map((category: Category) => (
        <div key={category.id} className="p-4">
          <div
            className="group text-slate-100 hover:text-accent-10 cursor-pointer"
            onClick={() => handleSelectCategory(category)}
          >
            <div className="flex items-center gap-2 hover-underline">
              <div className="transition-all duration-75 ease-linear group-hover:animate-flipAndBack">
                <category.Icon className="text-2xl cursor-pointer" />
              </div>
              <h2>{category.label}</h2>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default AllCategory;
