
import Container from "@/app/components/sharedComponent/Container";
import { getCurrentUser } from "@/services/getCurrentUser";
import NullData from "@/app/components/sharedComponent/NullData";
import ManageOrdersClient from "./ManageOrdersClient";
import getOrders from "@/services/getOrders";

const ManageOrders = async() => {
  const orders=await getOrders();
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied"/>
  }
  return (
    <Container>
      <ManageOrdersClient orders={orders} />
    </Container>
  );
};

export default ManageOrders;
