"use client";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { getSummary } from "@/services/getSummary";
import { getCurrentUser } from "@/services/getCurrentUser";
import TotalStatics from "./TotalStatics";
import OrderStatusChart from "./OrderStatusChart";
import { Product } from "@prisma/client";

type DashboardData = {
  totalSales: { _sum: { amount: number | null } };
  dailySales: { createdAt: Date; _sum: { amount: number | null } }[];
  productSales: { id: string; name: string; price: number; createdAt: Date }[];
};

const Summary = ({ data }: { data: any }) => {
  console.log("data");
  console.log(data);
  const dailySalesData = {
    labels: data?.dailySales.map((sale: any) =>
      sale.createdAt.toLocaleDateString()
    ),
    datasets: [
      {
        label: "Daily Sales",
        data: data?.dailySales.map((sale: any) => sale._sum.amount),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  // const productSalesData = {
  //   labels: .map((product: any) => product.name),
  //   datasets: [
  //     {
  //       label: "Product Sales",
  //       data: data?.productSales.map((product: any) => product.price),
  //       backgroundColor: "rgba(153, 102, 255, 0.2)",
  //       borderColor: "rgba(153, 102, 255, 1)",
  //     },
  //   ],
  // };

  return (
    <div className="grid grid-cols-12 gap-3">
      {/* <h1>Dashboard</h1> */}

      <div className="col-span-9">
        <TotalStatics data={data} />
        <div>

        <div className="bg-white p-10 my-6 rounded-md">
          <h2>Daily Sales</h2>
          <Line data={dailySalesData} />
        </div>
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-white p-10 my-6 rounded-md">
            <OrderStatusChart
              pending={data.pendingOrders}
              paid={data.paidOrders}
            />
          </div>
        </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        </div> */}
      </div>
      <div className="col-span-3 grid grid-cols-12 gap-3 h-fit">
        <div className="bg-white p-10 rounded-md col-span-12">
          <h2>Top 5 Products</h2>
          {data?.productSales.map((pro: Product,index:number) => (
            <div className="flex " key={index}>
              <h3>{pro.name}</h3> <span>{pro.price}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
