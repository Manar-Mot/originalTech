import React from "react";
import { HiMapPin, HiMiniUser } from "react-icons/hi2";
import { MdMail } from "react-icons/md";
import Avatar from "../../sharedComponent/Avatar";
import Link from "next/link";
import { OrderProps } from "./OrderStatus";

const CustomerInfo: React.FC<OrderProps> = ({ order }) => {
  return (
    <div
      className="  bg-white  
  shadow-slate-300 shadow-xl rounded-md p-4 h-[220px]  w-full   "
    >
      <div className="text-slate-500 mb-4"> Customer Details</div>
      <div className="flex my-auto gap-4 justify-between items-center">
        <div>
          <div className="capitalize flex items-center gap-1  font-semibold">
            <HiMiniUser /> <span> {order.user.name}</span>
          </div>
          <Link
            href={`mailto:${order.user.email}`}
            className="text-slate-500 text-sm my-2 flex items-center gap-1 "
          >
            <MdMail size={15} />
            <span className="underline">{order.user.email}</span>
          </Link>
          <div className="text-slate-500 text-sm capitalize my-2  flex gap-1 items-center">
            <HiMapPin /> <span>idleb,idleb,syria</span>
          </div>
        </div>
        <Avatar
          src={order.user.image}
          height={60}
          width={60}
          customStyles="rounded-md bg-red-600"
        />
      </div>
    </div>
  );
};

export default CustomerInfo;
