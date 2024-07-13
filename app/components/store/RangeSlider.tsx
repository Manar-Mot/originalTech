import { Slider } from "@mui/material";
import React from "react";

import { FilterSectionProps } from "./types";
import { formatPrice } from "@/app/utils";
import ButtonComp from "../sharedComponent/ButtonComp";

const RangeSlider: React.FC<FilterSectionProps> = ({
  handlePriceFilter,
  priceFilter,
  handleQueryString,
  searchParams,
}) => {
  const { min, max } = priceFilter;
  const setPriceFilter = () => {
    handleQueryString({ minPrice: `${min}`, maxPrice: `${max}` });
  };
  return (
    <div className="py-3 px-2">
      <div className="text-slate-800 font-semibold mb-2 text-sm">
        Your Range :
        <span className="text-slate-500">
          {`${formatPrice(min)}-${formatPrice(max)}`}
        </span>
      </div>

      <Slider
        getAriaLabel={() => "Price"}
        value={[min, max]}
        onChange={handlePriceFilter}
        valueLabelDisplay="auto"
        color="secondary"
      />
      <div className="w-fit ml-auto">
        <ButtonComp
          label="Filter"
          onClick={() => {
            setPriceFilter();
          }}
          small
        />
      </div>
    </div>
  );
};

export default RangeSlider;
