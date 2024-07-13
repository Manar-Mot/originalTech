"use client";
import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/app/utils";
import Heading from "@/app/components/sharedComponent/Header";
import Status from "@/app/components/sharedComponent/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/Admin/ActionBtn";
import { useRouter } from "next/navigation";
import moment from "moment";
type ExtededOrder = Order & {
  user: User;
};
interface OrderClientProps {
  orders: ExtededOrder[];
}

const OrderClient: React.FC<OrderClientProps> = ({ orders }) => {
  const router = useRouter();
  let rows: any = [];
  if (orders) {
    rows = orders?.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        ammount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createdAt).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "ammount",
      headerName: "Ammout(USD)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.ammount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center h-full  w-full">
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                color="text-slate-700"
                bg="bg-slate-200"
                borderColor="border-slate-500"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <>
                <Status
                  text="completed"
                  icon={MdDone}
                  color="text-green-700"
                  bg="bg-green-200"
                  borderColor="border-green-500"
                />
              </>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },

    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center h-full   w-full">
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                color="text-slate-700"
                bg="bg-slate-200"
                borderColor="border-slate-500"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="dispatched"
                icon={MdDeliveryDining}
                color="text-purple-700"
                bg="bg-purple-200"
                borderColor="border-purple-500"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <Status
                text="delivered"
                icon={MdDone}
                color="text-green-700"
                bg="bg-green-200"
                borderColor="border-green-500"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="h-full flex justify-start items-center  w-full   ">
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
              title="Preview order"

            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="my-8 min-h-[60vh] max-w-[68vw] mx-auto">
      <div>
        <Heading title="Manage Orders" customStyles="text-center" />
      </div>
      <div className="mx-auto ">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default OrderClient;

