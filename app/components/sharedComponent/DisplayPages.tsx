"use client";
import { IProductParams } from "@/services/getProducts";
import { Pagination } from "@mui/material";
import React, { useCallback, useState } from "react";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

interface DisplayPagesProps {
  totalPages: number;
  step: number;
  pagesToShow: number;
  handleQueryString: (newParams: IProductParams) => void;
}

const DisplayPages: React.FC<DisplayPagesProps> = ({
  pagesToShow,
  step,
  totalPages,
  handleQueryString,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    handleQueryString({page:`${value}`});
  };

  return (
    <>
   <Pagination count={totalPages} variant="outlined" shape="rounded" onChange={handleChange} />
    </>
  );
};

export default DisplayPages;
