import {Carrier} from "@/types/carrier";
import {useRouter} from "next/navigation";
import MyButton from "../carrier/myButton";
import DataTable from "../common/table/dataTable";
import {carriers} from "@/app/(carrier)/data";

const CarriersTable = () => {
  const router = useRouter();
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
      path: "123",
      label: "Role",
      content: (carrier: Carrier) => "Carrier",
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
  return (
    <>
      <DataTable
        columns={columns}
        items={carriers}
        keyPath={"_id"}
        itemsPerPage={4}
      />
    </>
  );
};

export default CarriersTable;
