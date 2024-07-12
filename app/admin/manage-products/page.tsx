import React from "react";
import MangeProductsClient from "./MangeProductsClient";
import Container from "@/app/components/sharedComponent/Container";
import getProducts, { IProductParams } from "@/services/getProducts";
import { getCurrentUser } from "@/services/getCurrentUser";
import NullData from "@/app/components/sharedComponent/NullData";
interface ManageProductsProps{
  params:IProductParams
}
const ManageProducts:React.FC<ManageProductsProps> = async({params}) => {
  const {products}=await getProducts(params);
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied"/>
  }
  return (
    <Container>
      <MangeProductsClient products={products} />
    </Container>
  );
};

export default ManageProducts;
