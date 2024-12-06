"use client";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import MyButton from "../carrier/myButton";
import DataTable from "../common/table/dataTable";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/customerService";

const CustomersTable = () => {
 const router = useRouter();
 const [users, setUsers] = useState<User[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const fetchUsers = async () => {
   try {
     const data = await getAllUsers();
     setUsers(data);
   } catch (err) {
     console.error('Error fetching users:', err);
     setError(err instanceof Error ? err.message : 'Failed to fetch users');
   } finally {
     setLoading(false);
   }
 };

 useEffect(() => {
   fetchUsers();
 }, []);

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
     path: "role",
     label: "Role",
     content: () => "User",
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

 if (loading) {
   return <div className="bg-white w-full px-6 py-6">Loading...</div>;
 }

 if (error) {
   return <div className="bg-white w-full px-6 py-6 text-red-500">Error: {error}</div>;
 }

 return (
   <div className="bg-white w-full px-6 py-6">
     <DataTable
       columns={columns}
       items={users}
       keyPath={"_id"}
       itemsPerPage={4}
     />
   </div>
 );
};

export default CustomersTable;