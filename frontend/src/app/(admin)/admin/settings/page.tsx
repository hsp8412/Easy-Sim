import EditContactEmailForm from "@/components/admin/editContactEmailForm";

const AdminSettingsPage = () => {
  const email = "easy-sim@gmail.com";
  return (
    <div className="h-full w-full flex flex-col justify-start items-start bg-neutral-100 px-8 py-8 gap-10">
      <h1 className="font-bold text-4xl text-neutral-600">Settings</h1>
      <div className="w-full bg-white shadow-xl px-6 py-6">
        <EditContactEmailForm />
      </div>
    </div>
  );
};

export default AdminSettingsPage;
