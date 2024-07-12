import ListReviews from "@/app/components/ListReviews/ListReviews";
import ProductDetails from "@/app/components/ProductDetails/ProductDetails";
import NullData from "@/app/components/sharedComponent/NullData";
import { products } from "@/app/utils/products";
import { getCurrentUser } from "@/services/getCurrentUser";
import getProductById from "@/services/getProductById";
import React from "react";
import AddRating from "./AddRating";
import MoreInfo from "./MoreInfo";
interface IParams {
  productId?: string;
}
const Product = async ({ params }: { params: IParams }) => {
  const product:any = await getProductById(params);
  const currentUser = await getCurrentUser();

  if (!product)
    return <NullData title="Oops! Product with the given id does not exist" />;
  return (
    <div className="w-full bg-[#f6f6f6] px-6 py-10 md:p-10 flex flex-col gap-8 ">
      {product && <ProductDetails product={product} />}
      <MoreInfo product={product} user={currentUser} />
    </div>
  );
};

export default Product;
