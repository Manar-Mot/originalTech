"use client"
import React, { useState } from "react";
import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
import Image from "next/image";
import { formatPrice, truncateText } from "@/app/utils";
import { ProductCardProps } from "./types";
import { useRouter } from "next/navigation";
import { generateStars } from "@/app/utils/clientUtils";
import { useCart } from "@/app/hooks/useCart";

const ProductCard: React.FC<ProductCardProps> = ({ productItem }) => {
  const router = useRouter();
  const { handleAddProduct } = useCart();
  const [hoverCard, setHoverCard] = useState(false);

  return (
    <div
      key={productItem.id}
      className="cursor-pointer border border-slate-200 flex flex-col items-center 
      justify-between mx-auto w-[180px] md:w-[210px] h-72  relative px-4 py-8 bg-white rounded-md shadow-lg transform
       transition-all duration-300 hover:scale-90"
      onClick={() => router.push(`/product/${productItem.id}`)}
      onMouseEnter={() => setHoverCard(true)}
      onMouseLeave={() => setHoverCard(false)}
    >
      <div
        className={`absolute top-4 left-4 h-fit bg-transparent ${
          hoverCard ? "block" : "hidden"
        }`}
      >
        <HiOutlineShoppingCart
          className={
            "hover:text-accent-10 text-xl text-gray-700 mb-3 cursor-pointer "
          }
          onClick={(e) => {
            e.stopPropagation();
            handleAddProduct({
              id: productItem.id,
              brand: productItem.brand,
              description: productItem.description,
              name: productItem.name,
              selectedImage: productItem.images[0],
              category: productItem.category,
              price: productItem.price,
              quantity: 1,
            });
          }}
        />
        <HiOutlineHeart className="hover:text-accent-10 text-xl text-gray-700 mb-3 cursor-pointer" />
        <HiOutlineSquare3Stack3D className="hover:text-accent-10 text-xl text-gray-700 mb-3 cursor-pointer" />
      </div>
      <div
        className={`absolute top-4 right-4  text-xs p-2 h-fit text-white bg-accent-10 ${
          hoverCard ? "block" : "hidden"
        }`}
      >
        New Product
      </div>

      <Image
        src={productItem.images[0].url}
        alt={productItem.name}
        width={130}
        height={40}
        className=" mb-4 rounded-t-lg object-contain "
      />
      <h3 className=" max-w-[180px] text-center text-base text-gray-600">
        {truncateText(productItem.name,15)}
      </h3>

      {generateStars(productItem.reviews)}

      <div className="text-right font-semibold">
        Price: {formatPrice(productItem.price)}
      </div>
    </div>
  );
};

export default ProductCard;
