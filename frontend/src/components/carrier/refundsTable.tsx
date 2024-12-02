import {Refund} from "@/types/refund";
import DataTable, {Column} from "../common/table/dataTable";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useState} from "react";
import RefundModal from "./refundModal";

type Props = {
  refunds: Refund[];
  handleDecision: (approve: boolean, refund: Refund) => void;
};

const RefundsTable = ({refunds, handleDecision}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<Refund | null>(null);
  const router = useRouter();
  const columns: Column<Refund>[] = [
    {
      path: "userId",
      label: "User ID",
      content: (refund: Refund) => refund.userId,
    },
    {
      path: "userName",
      label: "User Name",
      content: (refund: Refund) => refund.userName,
    },
    {
      path: "userEmail",
      label: "User Email",
      content: (refund: Refund) => refund.userEmail,
    },
    {
      path: "productId",
      label: "Data Plan ID",
      content: (refund: Refund) => {
        return (
          <Link
            href={`/carrier/products/${refund.productId}`}
            className="underline text-primary"
          >
            {refund.productId}
          </Link>
        );
      },
    },
    {
      path: "statue",
      label: "Status",
      content: (refund: Refund) => {
        switch (refund.status.toLowerCase()) {
          case "approved":
            return (
              <span className=" bg-secondary text-white p-2 rounded-lg font-bold text-sm">
                Approved
              </span>
            );
          case "requested":
            return (
              <span className=" bg-yellow-600 text-white p-2 rounded-lg font-bold text-sm">
                Pending
              </span>
            );
          default:
            return (
              <span className=" bg-red-600 text-white p-2 rounded-lg font-bold text-sm">
                Rejected
              </span>
            );
        }
      },
    },
    {
      path: "createdDate",
      label: "Date Created",
      content: (refund: Refund) =>
        new Date(refund.createdDate).toLocaleString(),
    },
    {
      path: "",
      label: "Details",
      disableSorting: true,
      content: (refund: Refund) => {
        return (
          <button
            className="bg-primary hover:bg-primaryDark px-4 py-2 text-white rounded-xl"
            onClick={() => {
              console.log(refund);
              setSelectedRefund(refund);
              setOpenModal(true);
            }}
          >
            Details
          </button>
        );
      },
    },
  ];
  return (
    <>
      <DataTable
        columns={columns}
        items={refunds}
        keyPath={"_id"}
        itemsPerPage={4}
      />
      <RefundModal
        open={openModal}
        setOpen={setOpenModal}
        selectedRefund={selectedRefund}
        setSelectedRefund={setSelectedRefund}
        handleDecision={handleDecision}
      />
    </>
  );
};

export default RefundsTable;
