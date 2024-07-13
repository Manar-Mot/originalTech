import React from "react";
import { CartProduct } from "../ProductDetails/types";
import { formatPrice, truncateText } from "../../utils";
import Link from "next/link";
import Image from "next/image";
import SetQuantity from "../ProductDetails/SetQuantity";
import { useCart } from "../../hooks/useCart";
interface ItemContentProps {
  item: CartProduct;
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const { handleRemoveProduct, handleQtyIncrease ,handleQtyDecrease} = useCart();
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4 ">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImage.url}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImage.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => {
                handleRemoveProduct(item.id);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          isCartCounter={true}
          cartProduct={item}
          handleQtyDec={() => {handleQtyDecrease(item)}}
          handleQtyInc={() => {
            handleQtyIncrease(item);
          }}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.quantity * item.price)}
      </div>
    </div>
  );
};

export default ItemContent;
