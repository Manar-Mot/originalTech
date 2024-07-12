
import Container from "@/app/components/sharedComponent/Container";
import { getCurrentUser } from "@/services/getCurrentUser";
import NullData from "@/app/components/sharedComponent/NullData";

import OrderClient from "./OrderClient";
import getOrdersByUserId from "@/services/getOrdersByUserId";

const Orders = async() => {
    const currentUser = await getCurrentUser();
    if (!currentUser ) {
        return <NullData title="Oops! Access denied"/>
    }
    const orders=await getOrdersByUserId(currentUser.id);
    if (!orders ) {
        return <NullData title="No Orders Yet ..."/>
    }
  return (
    <Container>
      <OrderClient orders={orders} />
    </Container>
  );
};

export default Orders;
