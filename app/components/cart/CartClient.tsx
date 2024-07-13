"use client";
import React from "react";
import { useCart } from "../../hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Header from "../sharedComponent/Header";
import ButtonComp from "../sharedComponent/ButtonComp";

import ItemContent from "./ItemContent";
import { CurrentUserProps } from "@/types";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/app/utils";

const CartClient: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCard, cartTotalQty } = useCart();
  const router = useRouter();
  if (!cartProducts || cartProducts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center w-full py-20">
        <div className="text-2xl">Your Cart is Empty</div>
        <div>
          <Link
            href={"/"}
            className="flex items-center gap-1 text-slate-500 mt-4"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  return (
    <div className="px-20 py-10">
      <Header title="Shopping Cart" customStyles=" text-center" />{" "}
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-2">
        <div className=" col-span-2 justify-self-start">PRODUCT</div>
        <div className=" justify-self-center">PRICE</div>
        <div className=" justify-self-center">QUANTITY</div>
        <div className=" justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts?.map((item) => (
          <ItemContent item={item} key={item.id} />
        ))}
        <div className=" border-t-[1.5px] border-slate-200 flex items-center justify-between gap-4">
          <div className="w-[90px]">
            <ButtonComp
              small
              outLine
              label="clear card"
              onClick={() => {
                handleClearCard();
              }}
            />
          </div>

          <div className="text-sm flex flex-col items-start gap-1">
            <div className="flex justify-between font-semibold text-base w-full">
              <span>SubTotal</span>
              <span>{formatPrice(cartTotalQty)}</span>
            </div>
            <p className="text-slate-500">
              Taxes and shipping calculate and checking up
            </p>
            <ButtonComp
              label={currentUser ? "CheckOut" : "Login to CheckOut"}
              onClick={() => {
                currentUser
                  ? router.push("/checkOut")
                  : router.push("/auth/login");
              }}
              outLine={currentUser ? false : true}
            />
            <Link
              href={"/"}
              className="flex items-center  gap-1 text-slate-500 mt-2"
            >
              <MdArrowBack />
              <span>Containue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
