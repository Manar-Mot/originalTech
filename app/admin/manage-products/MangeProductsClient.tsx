"use client";
import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/app/utils";
import Heading from "@/app/components/sharedComponent/Header";
import Status from "@/app/components/sharedComponent/Status";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/Admin/ActionBtn";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
interface ManageProductsClientProps {
  products: Product[];
}

const MangeProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  let rows: any = [];
  if (products) {
    rows = products?.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "InStock",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center h-full   w-full mx-auto">
            {params.row.inStock === true ? (
              <Status
                text="In Stock"
                icon={MdDone}
                color="text-teal-700"
                bg="bg-teal-200"
                borderColor="border-teal-500"
              />
            ) : (
              <Status
                text="Out of  Stock"
                icon={MdClose}
                color="text-rose-700"
                bg="bg-rose-200"
                borderColor="border-rose-500"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="h-full flex justify-between  items-center gap-4 w-full   ">
            <ActionBtn
              icon={MdCached}
              title="change instock status"
              onClick={() => {
                handleToggleStock(params.row.id, params.row.inStock);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              title="delete"
              onClick={() => {
                handleDelete(params.row.id, params.row.images);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              title="preview product"
              onClick={() => {
                router.push(`/product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];
  const handleToggleStock = useCallback(
    async (id: string, inStock: boolean) => {
      await axios
        .put("/api/product", {
          id,
          inStock: !inStock,
        })
        .then((response) => {
          toast.success("Product status changed");
          router.refresh();
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred while updating product status");
        });
    },
    [router]
  );
  const handleDelete = useCallback(async (id: string, images: any[]) => {
    toast("Deleting product please wait...");
    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.url) {
            const imageRef = ref(storage, item.url);
            await deleteObject(imageRef);
            console.log("deleting image successfully" + item.url);
          }
        }
      } catch (error) {
        console.log("Deleting images error " + error);
      }
    };
    await handleImageDelete();
    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Product deleted");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Error deleting");
        console.log("Error deleting");
      });
  }, [router]);

  return (
    <div className="my-8 bg-red-500 ">
      <div>
        <Heading title="Manage Products" customStyles="text-center" />
      </div>
      <div className="mx-auto bg-white w-[85%]">
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

export default MangeProductsClient;
