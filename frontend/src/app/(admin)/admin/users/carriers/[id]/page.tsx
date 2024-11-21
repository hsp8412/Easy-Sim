import EditCarrierForm from "@/components/admin/editCarrierForm";
import EditCarrierLayout from "@/components/admin/editCarrierLayout";
import EditUserInfoForm from "@/components/admin/editUserInfoForm";
import CarrierLogo from "@/components/carrier/carrierLogo";
import Link from "next/link";

type Props = {
  params: Promise<{id: string}>;
};

const CarrierEditPage = async ({params}: Props) => {
  const {id} = await params;
  return (
    <div className="h-full w-full flex flex-col justify-start items-start bg-neutral-100 px-8 py-8 gap-4">
      <h1 className="font-bold text-4xl text-neutral-600">Edit Carrier</h1>
      <Link
        href="/admin/users"
        className="bg-primary hover:bg-primaryDark px-4 py-3 rounded-xl text-white"
      >
        Back
      </Link>
      <EditCarrierLayout id={id} />
    </div>
  );
};

export default CarrierEditPage;
