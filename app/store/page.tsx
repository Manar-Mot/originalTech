import React, { useCallback } from "react";
import NullData from "../components/sharedComponent/NullData";
import getProducts, { IProductParams } from "@/services/getProducts";
import StoreClient from "./StoreClient";
export interface IParams {
  searchParams: IProductParams;
}
const Shop: React.FC<IParams> = async ({ searchParams }) => {
  const { products, totalPages } = await getProducts(searchParams);

  function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const shuffledProducts = shuffle(products);
  return (
    <>
     

      <StoreClient
        products={shuffledProducts}
        searchParams={searchParams}
        totalPages={totalPages}
      />
    </>
  );
};

export default Shop;
