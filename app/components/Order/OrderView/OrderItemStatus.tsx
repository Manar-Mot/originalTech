import { IconType } from "react-icons";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";

interface OrderItemStatusProps {
  lable: string;
  IconLable: IconType;
  status: string;
  
}
const OrderItemStatus: React.FC<OrderItemStatusProps> = ({
  lable,
  IconLable,
  status,
}) => {
  return (
    <div className="flex items-center gap-2 w-full " >
      <div
        className={`text-purple-700 border border-slate-300  w-fit p-3 rounded-full`}
      >
        <IconLable size={25} />
      </div>
      <span>{status} </span>
      <span className="ml-auto mr-10" title={status}>
      {status === "delivered" || status === "complete" ? (
        <HiOutlineCheckCircle  size={20} className="text-green-400"/>
      ) : status === "dispatched" ? (
        <MdDeliveryDining size={20}  className="text-slate-600"/>
      ) : status === "pending" ? (
        <MdAccessTimeFilled size={20} className="text-slate-400" />
      ) : null}
      </span>
     
    </div>
  );
};

export default OrderItemStatus;
