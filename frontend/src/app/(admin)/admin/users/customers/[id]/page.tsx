import EditUserInfoForm from "@/components/admin/editUserInfoForm";
import Link from "next/link";

type Props = {
  params: Promise<{id: string}>;
};

const EditCustomerInfoPage = async ({params}: Props) => {
  const {id} = await params;
  return (
    <div className="h-full w-full flex flex-col justify-start items-start bg-neutral-100 px-8 py-8 gap-4">
      <h1 className="font-bold text-4xl text-neutral-600">Edit User</h1>
      <Link
        href="/admin/users"
        className="bg-primary hover:bg-primaryDark px-4 py-3 rounded-xl text-white"
      >
        Back
      </Link>
      <div className="bg-white w-full shadow-xl px-6 py-6">
        <EditUserInfoForm id={id} />
      </div>
    </div>
  );
};

export default EditCustomerInfoPage;
