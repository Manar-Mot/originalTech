"use client";
import React, { useEffect, useState, Suspense } from "react";
import NullData from "../components/sharedComponent/NullData";
import { IProductParams } from "@/services/getProducts";
import axios from "axios";
import StoreClient from "../components/store/StoreClient";

interface IParams {
  searchParams: IProductParams;
}

const Shop: React.FC<IParams> = ({ searchParams }) => {
  return (
    <>
      <Suspense>
        <StoreClient searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default Shop;
