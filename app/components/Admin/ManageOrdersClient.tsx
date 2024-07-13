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
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
type ExtededOrder = Order & {
  user: User;
};
interface ManageOrdersClientProps {
  orders: ExtededOrder[];
}

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
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
    { field: "customer", headerName: "Customer Name", width: 130 },
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
          <div className="flex items-center justify-center h-full  w-full">
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
      width: 200,
      renderCell: (params) => {
        return (
          <div className="h-full flex justify-between  items-center gap-4 w-full  ">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
              title="Dispatch delivery"
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDeliver(params.row.id);
              }}
              title=" Done delivery "


            />
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
  const handleDispatch = useCallback(async (id: string) => {
    await axios
      .put("/api/order", {
        id,
        deliveryStatus: "dispatched",
      })
      .then((response) => {
        toast.success("Order Dispatched");
        router.refresh();
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while updating product status");
      });
  }, [router]);

  const handleDeliver = useCallback(async (id: string) => {
    await axios
      .put("/api/order", {
        id,
        deliveryStatus: "delivered",
      })
      .then((response) => {
        toast.success("Order Deliverd");
        router.refresh();
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while updating product status");
      });
  }, [router]);

  return (
    <div className="my-8 min-h-[60vh] max-w-[1150px]">
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

export default ManageOrdersClient;
