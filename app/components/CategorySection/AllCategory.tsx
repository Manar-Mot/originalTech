"use client";
import { Category, categories } from "@/app/utils/categories";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { HiBars3BottomLeft } from "react-icons/hi2";
const AllCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectCategory = useCallback((category:Category) => {
    if (category.label === "All") {
      router.push("/store");
    } else {
      const params = new URLSearchParams(searchParams?.toString())
      params.set("category", category.label)
      console.log('/store' + '?' + params.toString())
      router.push('/store' + '?' + params.toString())
    }
  }, [searchParams,router]);
  return (

      <ul
        className={`  transition-all ease-in-out duration-300 flex items-center  justify-center gap-4
      
          w-full rounded-lg  text-lg  `}
      >
        {categories.map((category) => (
          <li
            key={category.id}
            className={`p-4 group text-slate-100 hover:text-accent-10 cursor-pointer`}
            onClick={() => handleSelectCategory(category)}
          >
            <div
              className="flex items-center gap-2   hover-underline"
            >
              <div
                className={`transition-all duration-75 ease-linear group-hover:animate-flipAndBack `}
              >
                <category.Icon className="text-2xl   cursor-pointer" />
              </div>
              <h2 className={``}>
                {category.label}
              </h2>
            </div>
          </li>
        ))}
      </ul>
   
  );
};

export default AllCategory;
