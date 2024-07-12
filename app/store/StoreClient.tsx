"use client";
import React, { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterSection from "./FilterSection";
import ProductCard from "../components/ProductsSection/ProductCard";
import ProductCardHorizontal from "../components/ProductsSection/ProductCardHorizontal";
import { HiOutlineViewBoards, HiOutlineViewList } from "react-icons/hi";
import DisplayPages from "../components/sharedComponent/DisplayPages";
import { StoreClientProps } from "./types";
import { IProductParams } from "@/services/getProducts";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { storeBanner } from "@/public/assets";
import { formatPath } from "../utils";

const StoreClient: React.FC<StoreClientProps> = ({
  products,
  searchParams,
  totalPages,
}) => {
  const readParams = useSearchParams();
  const minPrice = readParams?.get("minPrice");
  const maxPrice = readParams?.get("maxPrice");
  const [direction, setDirection] = useState("vertical");
  const [priceFilter, setPriceFilter] = useState({
    min: minPrice ? +minPrice : 10,
    max: maxPrice ? +maxPrice : 2000,
  });
  const router = useRouter();
  const pathname = usePathname();
  const handleQueryString = useCallback(
    (newParams: IProductParams) => {
      const params = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              params.append(`${key}[]`, item.toString());
            });
          } else {
            params.append(key, value.toString());
          }
        }
      });

      Object.entries(newParams).forEach(([key, value]) => {
        params.set(key, value);
      });

      router.push("/store" + "?" + params.toString());
    },
    [router, searchParams]
  );

  const handlePriceFilterChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      setPriceFilter({
        min: newValue[0],
        max: newValue[1],
      });
    }
    console.log(priceFilter);
  };

  const handleSetDirection = (dir: string) => {
    setDirection(dir);
  };

  return (
    <>
      <div className="bg-green-300 mb-10 relative w-full ">
        <Image
          src={storeBanner}
          alt="banner"
          className="w-full h-80  object-cover "
        />

        <div
          className="absolute top-0 left-0 w-full h-full bg-purple-700 bg-opacity-35
          py-10 px-20 text-white  text-[32px] flex items-end capitalize"
        >
          {pathname&&formatPath(pathname)}
        </div>
      </div>
      <div className="w-[90%] mx-auto  max-w-[1200px] ">
        <div className="grid grid-cols-8 gap-4 ">
          <FilterSection
            handlePriceFilter={handlePriceFilterChange}
            priceFilter={priceFilter}
            handleQueryString={handleQueryString}
            searchParams={searchParams}
          />
          <div className="col-span-8 order-1 md:order-2 md:col-span-5 lg:col-span-6 relative pb-28">
            <div className="mb-4 p-4 bg-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <HiOutlineViewBoards
                  className=" cursor-pointer transition-all duration-75 hover:text-slate-800"
                  size={20}
                  onClick={() => handleSetDirection("vertical")}
                />
                <HiOutlineViewList
                  className=" cursor-pointer transition-all duration-75 hover:text-slate-800"
                  size={20}
                  onClick={() => handleSetDirection("horizontal")}
                />
              </div>
              <div>Showing 9/12 Item</div>
            </div>
            {products.length === 0 ? (
              <div className="text-2xl w-full h-full grid place-items-center">
                <div>
                  <div className="text-center mb-8">Oops !</div>
                  <div>No products found, click All to clear filters</div>
                </div>
              </div>
            ) : (
              <div
                className={` grid ${
                  direction === "horizontal"
                    ? "grid-cols-1 gap-3 "
                    : "grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {products.map((item, index) => (
                  <div
                    key={index}
                    className={` ${
                      direction === "horizontal"
                        ? "col-span-1 w-full"
                        : "col-span-1 md:col-span-1"
                    } mx-auto`}
                  >
                    {direction === "vertical" ? (
                      <ProductCard productItem={item} />
                    ) : direction === "horizontal" ? (
                      <ProductCardHorizontal productItem={item} />
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="mb-4 p-4 bg-white flex justify-between items-center absolute bottom-0 left-0 w-full">
              <div className="flex items-center gap-1 mx-auto text-sm">
                <DisplayPages
                  step={1}
                  pagesToShow={3}
                  totalPages={totalPages}
                  handleQueryString={handleQueryString}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreClient;
