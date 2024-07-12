import { calculateRating, generateStars } from "@/app/utils/clientUtils";
import React from "react";
import { Product, Review } from "../ProductsSection/types";

interface ReviewsCompProps {
  reviews: Review[];
  showLabel?: boolean;
}
const ReviewsComp: React.FC<ReviewsCompProps> = ({ reviews, showLabel }) => {
  return (
    <div className="  flex justify-start items-start">
      <div className="rating rating-sm rating-half">
        {generateStars(reviews)}
      </div>
      {showLabel && (
        <div className="text-slate-400 text-sm">
          <span className="mx-1"> {calculateRating(reviews)}</span>
          reviews
        </div>
      )}
    </div>
  );
};

export default ReviewsComp;
