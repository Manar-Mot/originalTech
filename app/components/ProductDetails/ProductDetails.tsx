"use client";
import { products } from "@/app/utils/products";
import React, { useCallback, useEffect, useState } from "react";
import ReviewsComp from "../sharedComponent/ReviewsComp";
import { Product, ProductImage } from "../ProductsSection/types";
import { formatPrice } from "@/app/utils";
import { CartProduct, ProductDetailsProps } from "./types";
import SetColor from "./SetColor";
import SetQuantity from "./SetQuantity";
import ButtonComp from "../sharedComponent/ButtonComp";
import ProductGallery from "./ProductGallery";
import { useCart } from "@/app/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { cartProducts, handleAddProduct, cartTotalQty } = useCart();
  const router = useRouter();
  const [cart, setCart] = useState<CartProduct>({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    brand: product.brand,
    category: product.category,
    selectedImage: { ...product.images[0] },
    quantity: 2,
  });
  const [isProductInCart, setIsProductInCart] = useState(false);
  const handleColorSelect = useCallback(
    (value: ProductImage) => {
      setCart((prev) => {
        return { ...prev, selectedImage: value };
      });
    },
    []
  );
  const handleQtyDec = useCallback(() => {
    if (cart.quantity <= 1) return;
    setCart((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cart.quantity]);
  const handleQtyInc = useCallback(() => {
    if (cart.quantity >= 99) return;

    setCart((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cart.quantity]);
  useEffect(() => {
    if (cartProducts) {
      console.log("from productdetail" + cartProducts.length);
      const isInslude = cartProducts.filter((item) => item.id === product.id);
      isInslude && isInslude.length !== 0 && setIsProductInCart(true);
    }
  }, [cartProducts]);
  return (
    
      <div className=" md:w-[90%] gap-6  p-10 mx-auto flex   flex-col lg:flex-row bg-white shadow-lg rounded-md">
        <ProductGallery
          cartProduct={cart}
          product={product}
          handleColorSelect={handleColorSelect}
        />
        <div className=" mx-auto ">
            <h2 className=" max-w-[400px] capitalize text-xl font-semibold my-5">
              {product.name}
            </h2>

          <div className="  pb-4 max-w-[600px]  flex items-center justify-between">
          <div className=" font-semibold   text-purple-600 text-md">
            {formatPrice(product.price)}
          </div>
            <ReviewsComp reviews={product.reviews} key={product.id} showLabel />
          </div>
          <p className="text-slate-500 text-justify text-md max-w-[590px]">
            {product.description}
          </p>
          <div className=" text-md">
            <span className="font-semibold ">Category:</span>
            <span className="text-slate-500 text-md mx-2 ">
              {product.category}
            </span>
          </div>
          <div className=" text-md">
            <span className="font-semibold ">Brand:</span>
            <span className="text-slate-500 text-md mx-2 ">
              {product.brand}
            </span>
          </div>
          <div
            className={`${
              product.inStock ? "text-blue-400" : "text-red-400"
            } text-md capitalize`}
          >
            inStock
          </div>
          {isProductInCart ? (
            <div className="max-w-[300px]">
              <p className="mt-2 text-slate-500 text-sm flex items-center gap-1">
                <MdCheckCircle className="text-purple-600" size={20} />
                <span> Product Added to The Cart</span>
              </p>
              <ButtonComp
                custom=" mt-6"
                label="view Cart"
                outLine
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          ) : (
            <>
              <div>
                <SetColor
                  images={product.images}
                  cartProduct={cart}
                  handleColorSelect={handleColorSelect}
                />
              </div>
              <div>
                <SetQuantity
                  handleQtyDec={handleQtyDec}
                  handleQtyInc={handleQtyInc}
                  isCartCounter={false}
                  cartProduct={cart}
                />
              </div>
              <div className="max-w-[300px] my-6">
                <ButtonComp
                  small
                  label="add to cart"
                  onClick={(e) => {
                    handleAddProduct(cart);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
   
  );
};

export default ProductDetails;
