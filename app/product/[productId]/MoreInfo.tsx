"use client";
import { safeUser } from "@/types";
import React, { useState } from "react";
import AddRating from "./AddRating";
import ListReviews from "@/app/components/ListReviews/ListReviews";
interface MoreInfoProps {
  product: any;
  user: safeUser | null;
}
const MoreInfo: React.FC<MoreInfoProps> = ({ product, user }) => {
  const [selectedTap, setSelectedTap] = useState("reviews");

  return (
    <div className="w-full md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-8 gap-2 ">
      <div className="w-full col-span-1 md:col-span-2 bg-white shadow-lg rounded-md h-fit">
        <div
          className={` cursor-pointer ${
            selectedTap === "reviews" && "border border-purple-600"
          }   rounded-md   py-4 border-b  text-center border-slate-200 `}
          onClick={()=>setSelectedTap("reviews")}
        >
          Product Reviews
        </div>
        <div
          className={` cursor-pointer ${
            selectedTap === "info" && "border border-purple-600"
          }   rounded-md   py-4 border-b  text-center border-slate-200 `}
          onClick={()=>setSelectedTap("info")}

        >
          Product Description
        </div>
        <div
          className={` cursor-pointer ${
            selectedTap === "privacy" && "border border-purple-600"
          }   rounded-md   py-4 border-b  text-center border-slate-200 `}
          onClick={()=>setSelectedTap("privacy")}

        >
          Product Privacy
        </div>
      </div>
      <div className="md:col-span-6 bg-white shadow-lg rounded-md p-6">
        {selectedTap === "reviews" ? (
          <ListReviews
            product={product}
            user={user}
            reviews={product?.Reviews}
          />
        ) : selectedTap === "info" ? (
          <>Info</>
        ) : selectedTap === "privacy" ? (
          <>Privacy</>
        ) : null}
      </div>
    </div>
  );
};

export default MoreInfo;
