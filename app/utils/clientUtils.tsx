import { Rating } from "@mui/material";
import { Review } from "../components/ProductsSection/types";
export const calculateRating = (reviews: Review[]) => {
  if (!reviews || reviews.length === 0) {
    return 0; 
  }
  return reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
};

export const generateStars = (reviews: Review[]) => {
  const rating = calculateRating(reviews);
  return( <Rating name="half-rating" defaultValue={rating} precision={0.5}  readOnly size="small" />);
};
