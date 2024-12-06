import { RefundDisplayContext } from "@/app/contexts/refundContext";
import { CustomerOrder } from "@/types/order";
import { useContext } from "react";

type Props = {
  order: CustomerOrder | null;
};
const RefundButton = ({ order }: Props) => {
  const { setOpenModal, setSelectedOrder } = useContext(RefundDisplayContext);
  const handleOpenModal = () => {
    setSelectedOrder(order);
    setOpenModal(true);
  };
  return (
    <div className="p-2 rounded-lg cursor-pointer">
      <div className="flex justify-center items-center">
        <button
          className="bg-[#00A2FF] text-white mt-2 py-1 px-4 rounded-full hover:bg-blue-600 transition-all duration-300 ease-in"
          onClick={handleOpenModal}
        >
          Request for Refund
        </button>
      </div>
    </div>
  );
};

export default RefundButton;
