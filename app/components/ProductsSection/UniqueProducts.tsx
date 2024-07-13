"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";
import { settings } from "../sharedComponent/sliderSettings";
import Header from "../sharedComponent/Header";
import {ProductsSectionProps } from "./types";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import NullData from "../sharedComponent/NullData";

const UniqueProducts: React.FC<ProductsSectionProps> = ({ products ,title}) => {
  const router = useRouter();
  if (products.length === 0) {
    return <NullData title="No products " />;
  }
  const tripledProducts = [...products, ...products, ...products];
  return (
   
    <section className="  w-[90%]    mx-auto py-10    ">
   
      <div className=" text-[28px] md:text-[36px] lg:text-[42px] text-secondary-30 mx-auto w-fit font-semibold mb-10">{title}</div>


      <div className="  mx-auto relative py-8 w-[90%] gap-4 px-2 ">
        <Slider {...settings}>
          {tripledProducts.map((product, index: number) => (
            <ProductCard productItem={product} key={product.id} />
          ))}
        </Slider>
      </div>
      <div className="w-full pr-4 ">
        <button
          className=" ml-auto w-fit  flex items-center gap-2 text-btn-color underline  p-2 rounded-sm"
          onClick={() => router.push("/store")}
        >
          <div>View More Products</div>
          <FaAngleDoubleRight />
        </button>
      </div>
    </section>
  );
};

export default UniqueProducts;
