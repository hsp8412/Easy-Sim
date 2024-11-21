import AdminProposalsTable from "@/components/admin/adminProposalsTable";

const AdminProposalsPage = () => {
  return (
    <div className="h-full w-full flex flex-col justify-start items-start bg-neutral-100 px-8 py-8 gap-10">
      <h1 className="font-bold text-4xl text-neutral-600">Proposals</h1>
      <AdminProposalsTable />
    </div>
  );
};

export default AdminProposalsPage;
