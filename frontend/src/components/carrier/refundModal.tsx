import {Refund} from "@/types/refund";
import MyModal from "../common/myModal";
import {products} from "@/app/(carrier)/data";
import {reviewRefund} from "@/services/refundService";
import {toast} from "react-toastify";
import {set} from "lodash";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedRefund: Refund | null;
  setSelectedRefund: (refund: Refund | null) => void;
  handleDecision: (approve: boolean, refund: Refund) => void;
};

const RefundModal = ({
  open,
  setOpen,
  selectedRefund,
  setSelectedRefund,
  handleDecision,
}: Props) => {
  const selectedRefundProduct = selectedRefund;
  if (selectedRefund) {
    return (
      <MyModal open={open} setOpen={setOpen}>
        <h1 className="text-2xl font-bold underline text-neutral-600">{`${selectedRefundProduct?.country} ${selectedRefundProduct?.size} GB - ${selectedRefundProduct?.duration} Days - \$${selectedRefundProduct?.price}`}</h1>
        <p className="text-lg font-semibold text-neutral-500 mt-2">
          Reason for request:{" "}
        </p>
        <textarea
          className="w-full h-32 border border-neutral-300 p-2 rounded-lg mt-2"
          value={selectedRefund.requestInformation}
          readOnly
        />
        <p className="text-md font-semibold text-neutral-500 mt-2">
          Refund Request Date Received:{" "}
          {new Date(selectedRefund.createdDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })}
        </p>
        {selectedRefund.status.toLowerCase() === "requested" ? (
          <div className="flex justify-start gap-4 mt-2 w-full">
            <button
              className="bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setSelectedRefund(null);
                setOpen(false);
                handleDecision(true, selectedRefund);
              }}
            >
              Approve
            </button>
            <button
              className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setSelectedRefund(null);
                setOpen(false);
                handleDecision(false, selectedRefund);
              }}
            >
              Reject
            </button>
          </div>
        ) : (
          <div className="mt-2 flex justify-start">
            <button
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setSelectedRefund(null);
                setOpen(false);
              }}
            >
              Close
            </button>
          </div>
        )}
      </MyModal>
    );
  }
};

export default RefundModal;
