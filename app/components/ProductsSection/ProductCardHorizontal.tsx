import React from "react";
import { ProductCardProps } from "./types";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/hooks/useCart";
import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
import Image from "next/image";
import { formatPrice, truncateText } from "@/app/utils";
import { calculateRating, generateStars } from "@/app/utils/clientUtils";

const ProductCardHorizontal: React.FC<ProductCardProps> = ({ productItem }) => {
  const router = useRouter();
  const { handleAddProduct } = useCart();

  const handleAddToCart = () => {
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
  };

  const handleViewDetails = () => {
    router.push(`/product/${productItem.id}`);
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-4 px-4  pb-8 md:p-8
     bg-white shadow-md rounded-md cursor-pointer"  onClick={() => router.push(`/product/${productItem.id}`)}>
      <div className="relative w-full h-52 md:w-40 md:h-40 ">
        <Image
          src={productItem.images[0].url}
          alt={productItem.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3
            className="text-lg font-semibold cursor-pointer hover:underline"
            onClick={handleViewDetails}
          >
            {truncateText(productItem.name)}
          </h3>
          <div className="flex items-center mt-1">
            {generateStars(productItem.reviews)}
            <span className="text-sm text-gray-600 ml-2">
              ({calculateRating(productItem.reviews)} reviews)
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1 max-w-[400px]">
            {truncateText(productItem.description, 100)}
          </p>
          <div className="text-sm text-gray-600 mt-1">
            <span className="font-semibold">Brand:</span> {productItem.brand}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            <span className="font-semibold">Category:</span>{" "}
            {productItem.category}
          </div>
        </div>
      </div>

      <div className="flex  w-full md:w-fit flex-col md:items-center gap-2 md:gap-4">
        <div className="mt-2 md:mt-0">
          <span className="text-xl font-bold">
            {formatPrice(productItem.price)}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <button
            onClick={handleAddToCart}
            className={
              "hover:text-[#a170f0] text-xl text-gray-700 cursor-pointer"
            }
          >
            <HiOutlineShoppingCart />
          </button>
          <button className="hover:text-[#a170f0] text-xl text-gray-700 cursor-pointer">
            <HiOutlineHeart />
          </button>
          <button className="hover:text-[#a170f0] text-xl text-gray-700 cursor-pointer">
            <HiOutlineSquare3Stack3D />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardHorizontal;
