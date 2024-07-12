"use client"
import React from "react";
import CircleCounter from "./CircleCounter";
import {
  HiMagnifyingGlass,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
import { useCart } from "@/app/hooks/useCart";
import { useRouter } from "next/navigation";
const LinkList = ({handleOpenSearchModal,scrolled}:{handleOpenSearchModal:()=>void,scrolled:boolean}) => {
  const { cartTotalAmount } = useCart();
  const router = useRouter();
  return (
    <div className={`flex align-middle cursor-pointer gap-2 ${scrolled?"text-white":"text-slate-900"}`}>
       <button
       onClick={handleOpenSearchModal}
     
      >
        <HiMagnifyingGlass size={24} className="    cursor-pointer"/>
      </button>
      <CircleCounter
        title="loves "
        count={0}
        icon={
          <HiOutlineHeart size={24}  className="   cursor-pointer" />
        }
        navigate={() => router.push(`/cart`)}
      />
      <CircleCounter
        title="compare "
        count={0}
        icon={
          <HiOutlineSquare3Stack3D  size={24} className="   cursor-pointer" />
        }
        navigate={() => router.push(`/cart`)}
      />

      <CircleCounter
        title="cart "
        count={cartTotalAmount}
        icon={
          <HiOutlineShoppingCart size={24}  className="   cursor-pointer" />
        }
        navigate={() => router.push(`/cart`)}
      />
     
    </div>
  );
};

export default LinkList;
