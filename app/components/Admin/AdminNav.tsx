"use client";
import Container from "../sharedComponent/Container";
import AdminNavItem from "./AdminNavItem";
import Link from "next/link";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { usePathname } from "next/navigation";

const AdminNav = ({ open }: { open: boolean }) => {
  const pathName = usePathname();
  return (
    <div
      className=" flex flex-col 
          py-4
          px-[6px]
          gap-4
          font-normal
          "
    >
      <Link href="/admin">
        <AdminNavItem
          open={open}
          label="Summary"
          icon={MdDashboard}
          selected={pathName === "/admin"}
        />
      </Link>
      <Link href="/admin/add-products">
        <AdminNavItem
          open={open}
          label="Add Products"
          icon={MdLibraryAdd}
          selected={pathName === "/admin/add-products"}
        />
      </Link>
      <Link href="/admin/manage-products">
        <AdminNavItem
          open={open}
          label="Manage Products"
          icon={MdDns}
          selected={pathName === "/admin/manage-products"}
        />
      </Link>
      <Link href="/admin/manage-orders">
        <AdminNavItem
          open={open}
          label="Manage Orders"
          icon={MdFormatListBulleted}
          selected={pathName === "/admin/manage-orders"}
        />
      </Link>
    </div>
  );
};

export default AdminNav;
