

import moment from "moment";

import OrderStatus from "./OrderStatus";
import CustomerInfo from "./CustomerInfo";
import { DisplayProducts } from "./TableItems";


interface OrderDetailsProps {
  order: any;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  console.log(order);
  return (
    <div className=" w-[100%] md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 items-center my-10   gap-4 ">
      <div className="bg-white h-[460px] col-span-2 lg:col-span-4  shadow-slate-300 shadow-xl rounded-md p-4 flex flex-col gap-3">
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 px-10 py-6 l  rounded-md ">
          <div className="text-white text-lg drop-shadow">
            Order #{order.id}
          </div>
          <div className="text-slate-100 my-2 text-sm">
            {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </div>
        </div>
     <DisplayProducts products={order.products}/>
      </div>
      <div
        className=" col-span-2  flex  flex-col md:flex-row lg:flex-col items-center gap-3 h-auto
        "
      >
        <CustomerInfo order={order} />
        <OrderStatus order={order} />
      </div>
    </div>
  );
};

export default OrderDetails;
