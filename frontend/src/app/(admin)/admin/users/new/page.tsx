import NewUserForm from "@/components/admin/newUserForm";
import Link from "next/link";

const NewUserPage = () => {
  return (
    <div className="h-full w-full flex flex-col justify-start items-start bg-neutral-100 px-8 py-8 gap-5 mb-7">
      <h1 className="font-bold text-4xl text-neutral-600">New Carrier/Admin</h1>
      <Link
        href="/admin/users"
        className="bg-primary hover:bg-primaryDark px-4 py-3 rounded-xl text-white"
      >
        Back
      </Link>
      <div className="bg-white rounded-2xl shadow-2xl p-5 w-full">
        <NewUserForm />
      </div>
    </div>
  );
};

export default NewUserPage;
