"use client";
import { Carrier } from "@/types/carrier";
import { useRouter } from "next/navigation";
import MyButton from "../carrier/myButton";
import DataTable from "../common/table/dataTable";
import { useEffect, useState } from "react";
import { getAllCarriers } from "@/services/carrierService";

const CarriersTable = () => {
 const router = useRouter();
 const [carriers, setCarriers] = useState<Carrier[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const fetchCarriers = async () => {
   try {
     const data = await getAllCarriers();
     setCarriers(data);
   } catch (err) {
     console.error('Error fetching carriers:', err);
     setError(err instanceof Error ? err.message : 'Failed to fetch carriers');
   } finally {
     setLoading(false);
   }
 };

 useEffect(() => {
   fetchCarriers();
 }, []);

 const columns = [
   {
     path: "logoUrl",
     label: "Logo",
     content: (carrier: Carrier) => (
       <div className="flex justify-center">
         <img src={carrier.logoUrl} alt="logo" className="h-8" />
       </div>
     ),
   },
   {
     path: "_id",
     label: "ID",
     content: (carrier: Carrier) => carrier._id,
   },
   {
     path: "name",
     label: "Carrier Name",
     content: (carrier: Carrier) => carrier.name,
   },
   {
     path: "role",
     label: "Role",
     content: () => "Carrier",
     disableSorting: true,
   },
   {
     path: "email",
     label: "Email",
     content: (carrier: Carrier) => carrier.email,
   },
   {
     path: "",
     label: "Details",
     isButton: true,
     content: (carrier: Carrier) => (
       <div className="flex justify-center">
         <MyButton
           onClick={() => {
             router.push(`/admin/users/carriers/${carrier._id}`);
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
       items={carriers}
       keyPath={"_id"}
       itemsPerPage={4}
     />
   </div>
 );
};

export default CarriersTable;