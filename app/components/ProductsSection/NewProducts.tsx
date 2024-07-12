import { useRouter } from "next/navigation";
import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { ProductsSectionProps } from "./types";
import ProductCard from "./ProductCard";
import Header from "../sharedComponent/Header";
const NewProducts: React.FC<ProductsSectionProps> = ({ products, title }) => {
  const router = useRouter();
  const tripledProducts = [...products, ...products, ...products];
  return (
    <section className="  w-[90%]    mx-auto   ">
      <div className="px-10">
        <Header title={title} />
      </div>
      <div className="  mx-auto relative py-6 w-[95%] gap-2 ">
        {tripledProducts.map((product, index: number) => (
          <ProductCard productItem={product} key={product.id} />
        ))}
      </div>
      <div className="w-full pr-4 ">
        <button
          className=" ml-auto w-fit  flex items-center gap-2 text-purple-700 underline  p-2 rounded-sm"
          onClick={() => router.push("/store")}
        >
          <div>View More Products</div>
          <FaAngleDoubleRight />
        </button>
      </div>
    </section>
  );
};

export default NewProducts;
