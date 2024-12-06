"use client";
import { useRouter } from "next/navigation";
import MyButton from "../carrier/myButton";
import DataTable from "../common/table/dataTable";
import { Admin } from "@/types/admin";
import { useEffect, useState } from "react";
import { getAllAdmins } from "@/services/adminService";

const AdminsTable = () => {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdmins = async () => {
    try {
      const data = await getAllAdmins();
      setAdmins(data);
    } catch (err) {
      console.error('Error fetching admins:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

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
      path: "role",
      label: "Role",
      content: () => "Admin",
      disableSorting: true,
    },
    {
      path: "email",
      label: "Email",
      content: (admin: Admin) => admin.email,
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
        items={admins}
        keyPath={"_id"}
        itemsPerPage={4}
      />
    </div>
  );
};

export default AdminsTable;