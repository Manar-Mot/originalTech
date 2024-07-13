import React from "react";
import { FaUser, FaCube, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import {
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
  HiOutlineTruck,
  HiOutlineXCircle,
} from "react-icons/hi";
import { formatPrice } from "@/app/utils";

const TotalStatics = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
            <FaUser className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-md font-semibold">Total Users</h3>
            <p className="text-gray-500">{data.totalUsers}</p>
          </div>
        </div>
      </div>
      {/* <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
            <FaUser className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-md font-semibold">Pending Orders</h3>
            <p className="text-gray-500">{data.pendingOrders}</p>
          </div>
        </div>
      </div> */}
      <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-yellow-500 text-white p-3 rounded-full mr-4">
            <FaCube className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-md font-semibold">Total Products</h3>
            <p className="text-gray-500">{data.totalProducts}</p>
          </div>
        </div>
      </div>
      {/* <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-yellow-500 text-white p-3 rounded-full mr-4">
            <FaCube className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-md font-semibold">Out of Stock</h3>
            <p className="text-gray-500">{data.outOfStockProducts} </p>
          </div>
        </div>
      </div> */}
      <div className="bg-white p-4 rounded-md shadow-md flex items-center ">
        <div className="bg-green-500 text-white p-3 rounded-full mr-4">
          <FaShoppingCart className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-md font-semibold">Total Orders</h3>
          <p className="text-gray-500">{data.totalOrders}</p>
        </div>
      </div>
      {/* <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
        <div className="bg-green-500 text-white p-3 rounded-full mr-4">
          <FaShoppingCart className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-md font-semibold">Paid Orders</h3>
          <p className="text-gray-500">{data.paidOrders} Paid</p>
        </div>
      </div> */}
      {/* <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
        <div className="bg-green-500 text-white p-3 rounded-full mr-4">
          <FaShoppingCart className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-md font-semibold"> Delivery Requested </h3>
          <p className="text-gray-500">{data.deliveryRequestedOrders}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
        <div className="bg-green-500 text-white p-3 rounded-full mr-4">
          <FaShoppingCart className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-md font-semibold">Delivered Orders</h3>
          <p className="text-gray-500">{data.deliveredOrders}</p>
        </div>
      </div> */}
      <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-purple-500 text-white p-3 rounded-full mr-4">
            <FaDollarSign className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-md font-semibold">Total Sales</h3>
            <p className="text-gray-500">
              {formatPrice(data.totalSales._sum.amount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalStatics;
