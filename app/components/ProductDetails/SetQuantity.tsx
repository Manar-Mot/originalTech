"use client";
import { SetQuantityProps } from "./types";

const SetQuantity: React.FC<SetQuantityProps> = ({
  isCartCounter,
  cartProduct,
  handleQtyInc,
  handleQtyDec,
}) => {
  const btnStyle = `px-3 py-1  my-2 border  border-slate-300 rounded-lg `;
  return (
    <div className="flex gap-8 items-center py-2">
      {!isCartCounter && (
        <span className="text-md font-semibold"> QUANTITY:</span>
      )}
      <div className="flex items-center gap-2">
        <button
          className={`${
            cartProduct.quantity <= 1 && "cursor-not-allowed"
          } ${btnStyle}`}
          onClick={() => handleQtyDec()}
        >
          -
        </button>
        <div className=" px-2 py-2">{cartProduct.quantity}</div>
        <button
          className={`${
            cartProduct.quantity >= 99 && "cursor-not-allowed"
          } ${btnStyle}`}
          onClick={() => handleQtyInc()}
          disabled={cartProduct.quantity >= 99}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
