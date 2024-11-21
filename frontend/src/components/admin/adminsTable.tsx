"use client";
import {useRouter} from "next/navigation";
import MyButton from "../carrier/myButton";
import DataTable from "../common/table/dataTable";
import {users} from "@/app/(carrier)/data";
import {Admin} from "@/types/admin";

const AdminsTable = () => {
  const router = useRouter();
  const columns = [
    {
      path: "_id",
      label: "ID",
      content: (admin: Admin) => admin._id,
    },
    {
      path: "firstName",
      label: "First Name",
      content: (admin: Admin) => admin.firstName,
    },
    {
      path: "lastName",
      label: "Last Name",
      content: (admin: Admin) => admin.lastName,
    },
    {
      path: "123",
      label: "Role",
      content: (admin: Admin) => "Admin",
      disableSorting: true,
    },
    {
      path: "email",
      label: "Email",
      content: (admin: Admin) => admin.email,
    },
  ];
  return (
    <>
      <DataTable
        columns={columns}
        items={users}
        keyPath={"_id"}
        itemsPerPage={4}
      />
    </>
  );
};

export default AdminsTable;
