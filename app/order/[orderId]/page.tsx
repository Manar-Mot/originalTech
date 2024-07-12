import Container from "@/app/components/sharedComponent/Container";
import getOrderById from "@/services/getOrderById";
import OrderDetails from "../../components/Order/OrderView/OrderDetails";

interface IParams {
  orderId?: string;
}
const Order = async({ params }: { params: IParams }) => {
    const order=await getOrderById(params)
  return (
    <Container>
      <OrderDetails order={order} />
    </Container>
  );
};

export default Order;
