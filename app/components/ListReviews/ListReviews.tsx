import React from "react";
import { Product, Review } from "../ProductsSection/types";
import moment from "moment";
import ReviewsComp from "../sharedComponent/ReviewsComp";
import Avatar from "../sharedComponent/Avatar";
import AddRating from "@/app/components/product/AddRating";
import { safeUser } from "@/types";
interface ListReviewsProps {
  reviews: any;
  product: any;
  user: safeUser | null;
}
const ListReviews: React.FC<ListReviewsProps> = ({
  reviews,
  product,
  user,
}) => {
  if (reviews?.length === 0)
    return (
      <div className="w-full h-full grid place-items-center ">
        No Reviews Add Yet
      </div>
    );
  return (
    <div className=" py-6 ">
      <h1 className="font-weight text-2xl mb-2 ">Product Review</h1>
      <div className=" w-20 h-[2px] bg-purple-500 rounded-lg"></div>

      <AddRating product={product} user={user} />
      <ul className="mt-2 text-sm py-4 px-2">
        {reviews?.map((review: Review) => (
          <li
            key={review.id}
            className=" relative max-w-[94%] border-b  border-slate-200  flex  gap-2  py-3  "
          >
            <Avatar
              src={review.user.image}
              customStyles=" w-10 h-10 md:w-[70px] md:h-[70px] border border-slate-300 rounded-md"
            />

            <div className=" w-full flex flex-col ">
              <div className="flex items-center justify-between w-full ">
                <div className="font-semibold capitalize">
                  {review?.user.name}
                </div>
                <div className=" ">
                  <ReviewsComp reviews={reviews} />
                </div>
              </div>
              <div className="text-sm text-justify md:w-[70%] mb-auto">
                {review.comment}
              </div>
              <div className=" mt-1 ml-auto justify-end self-end text-slate-400 text-xs  ">
                {moment(review?.createdAt).fromNow()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListReviews;
