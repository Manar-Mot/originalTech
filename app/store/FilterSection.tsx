import React, { useEffect, useState, useMemo } from "react";
import { Category, Color, categories } from "../utils/categories";
import { colors } from "../utils/colors";
import RangeSlider from "./RangeSlider";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import { FilterSectionProps } from "./types";
import { formatPrice } from "../utils";

const FilterSection: React.FC<FilterSectionProps> = ({
  handlePriceFilter,
  priceFilter,
  handleQueryString,
  searchParams,
}) => {
  
  const readParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(readParams?.toString());
  const categoryParam = readParams?.get("category") || "";
  const colorParam = readParams?.get("color") || "";
  const selectedCategory = useMemo(
    () =>
      categories.find(
        (cat) => cat.label.toLowerCase() === categoryParam.toLowerCase()
      ) || null,
    [categoryParam]
  );

  const selectedColor = useMemo(
    () =>
      colors.find(
        (col) => col.color.toLowerCase() === colorParam.toLowerCase()
      ) || null,
    [colorParam]
  );
  const [category, setCategory] = useState<Category | null>(selectedCategory);
  const [color, setColor] = useState<Color | null>(selectedColor);
  const [filterApplied, setFilterApplied] = useState<
    { name: string; value: string }[]
  >([]);

  const handleSelectCategory = (category: Category) => {
    setCategory(category);
    handleQueryString({ category: category.label });
  };

  const handleSelectColor = (color: Color) => {
    setColor(color);
    handleQueryString({ color: color.color });
  };

  useEffect(() => {
    const chips = [];
    const categoryFilter = readParams?.get("category");
    const colorFilter = readParams?.get("color");
    const maxPrice = readParams?.get("maxPrice");
    const minPrice = readParams?.get("minPrice");
    if (colorFilter) chips.push({ name: "color", value: colorFilter });
    if (maxPrice && minPrice) {
      chips.push({
        name: "price",
        value: `${formatPrice(+minPrice)} - ${formatPrice(+maxPrice)}`,
      });
    }
    if (categoryFilter) chips.push({ name: "category", value: categoryFilter });
    setFilterApplied(chips);
  }, [readParams]);

  const clearSpecificFilter = (name: string) => {
    if (name === "price") {
      params.delete("maxPrice");
      params.delete("minPrice");
    } else if (name === "category") {
      params.delete("category");
      setCategory(null);
    } else if (name === "color") {
      params.delete("color");
      setColor(null);
    }
    router.push("/store?" + params.toString());
  };

  const clearFilterAll = () => {
    params.delete("category");
    params.delete("color");
    params.delete("maxPrice");
    params.delete("minPrice");
    setCategory(null);
    setColor(null);
    router.push("/store");
  };

  return (
    <div className="col-span-8 order-2 md:order-1 md:col-span-3 lg:col-span-2 flex flex-col items-center gap-4">
      <div className="w-full bg-white flex items-center justify-between px-6 py-4">
        <div className="px-2 flex items-center gap-2 transition-all duration-75 text-slate-600 font-semibold">
          <HiOutlineAdjustmentsHorizontal size={20} />
          <div>Filters</div>
        </div>
        <div className="text-slate-400 text-xs flex items-center gap-1">
          <div>Clear Filters</div>
          <span
            className="cursor-pointer transition-all duration-75 hover:bg-purple-400 hover:text-white p-1 rounded-full"
            onClick={clearFilterAll}
          >
            <MdClose size={15} />
          </span>
        </div>
      </div>
      <div className="bg-white w-full rounded-md shadow-lg py-4 px-6">
        <div className="mx-2 flex items-center gap-2 mb-2 py-2 border-b border-slate-300 transition-all duration-75 text-slate-600 font-semibold">
          <div>Applied Filters</div>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          {filterApplied.length===0&&<div className=" text-sm text-slate-500 font-thin px-2 ">No filter Applied Yet</div>}
          {filterApplied.map((filter, index) => (
            <div
              key={index}
              className="border border-slate-100 flex items-center gap-1 w-fit bg-slate-100 rounded-full text-sm py-2 px-3 font-light"
              onClick={() => clearSpecificFilter(filter.name)}
            >
              <div>{filter.value}</div>
              <span className="cursor-pointer transition-all duration-75 hover:bg-purple-400 hover:text-white p-1 rounded-full">
                <MdClose size={15} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white w-full rounded-md shadow-lg py-4 px-6">
        <div className=" mx-2 mb-2 py-2 border-b border-slate-300 transition-all duration-75 text-slate-600 font-semibold">
          Categories
        </div>
        <div>
          {categories.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-slate-200 ${
                category?.label === item.label &&
                "border border-purple-400 rounded-md pointer-events-none"
              }`}
              onClick={() => handleSelectCategory(item)}
            >
              <item.Icon size={20} />
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-md shadow-lg w-full py-4 px-6">
        <div className="mx-2 py-2 border-b border-slate-300 text-slate-600 font-semibold">
          COLOR
        </div>
        <div>
          {colors.map((item, index) => (
            <div
              className={`flex items-center gap-2 px-2 py-2 transition-all duration-75 hover:bg-slate-200 cursor-pointer ${
                color?.color === item?.color &&
                "border border-purple-400 rounded-md pointer-events-none"
              }`}
              key={index}
              onClick={() => handleSelectColor(item)}
            >
              <div
                className="w-6 h-6 border border-slate-500"
                style={{ background: item.colorCode }}
              ></div>
              <div>{item.color}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-md shadow-lg w-full py-4 px-6 mb-3">
        <div className="mx-2 py-2 border-b border-slate-300 text-slate-600 font-semibold">
          Price
        </div>
        <RangeSlider
          handlePriceFilter={handlePriceFilter}
          priceFilter={priceFilter}
          handleQueryString={handleQueryString}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};

export default FilterSection;
