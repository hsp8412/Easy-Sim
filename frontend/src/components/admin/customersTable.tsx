"use client";
import {User} from "@/types/user";
import {useRouter} from "next/navigation";
import MyButton from "../carrier/myButton";
import DataTable from "../common/table/dataTable";
import {users} from "@/app/(carrier)/data";

const CustomersTable = () => {
  const router = useRouter();
  const columns = [
    {
      path: "_id",
      label: "ID",
      content: (customer: User) => customer._id,
    },
    {
      path: "firstName",
      label: "First Name",
      content: (customer: User) => customer.firstName,
    },
    {
      path: "lastName",
      label: "Last Name",
      content: (customer: User) => customer.lastName,
    },
    {
      path: "123",
      label: "Role",
      content: (customer: User) => "User",
      disableSorting: true,
    },
    {
      path: "email",
      label: "Email",
      content: (customer: User) => customer.email,
    },
    {
      path: "",
      label: "Details",
      isButton: true,
      content: (customer: User) => (
        <div className="flex justify-center">
          <MyButton
            onClick={() => {
              router.push(`/admin/users/customers/${customer._id}`);
            }}
          >
            Details
          </MyButton>
        </div>
      ),
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

export default CustomersTable;
