import { HiOutlineTruck } from "react-icons/hi2";
import OrderItemStatus from "./OrderItemStatus";
import { BsCashStack } from "react-icons/bs";

export interface OrderProps {
  order: any;
}
const OrderStatus: React.FC<OrderProps> = ({ order }) => {
  return (
    <div className=" px-4 py-7 shadow-slate-300 shadow-xl rounded-md  h-[220px] bg-white  w-full">
      <div className="text-slate-800 mb-2 drop-shadow font-semibold">
        {" "}
        Order Status
      </div>

      <div className="flex flex-col justify-center  gap-1  w-full">
        <OrderItemStatus
          IconLable={HiOutlineTruck}
          status={order.deliveryStatus}
          lable="Delivery Status"
        />

        <div className=" h-8 border border-dashed  w-[1px] mx-6 border-purple-700"></div>
        <OrderItemStatus
          IconLable={BsCashStack}
          status={order.status}
          lable="Payment Status"
        />
      </div>
    </div>
  );
};

export default OrderStatus;
