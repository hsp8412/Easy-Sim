import { RefundDisplayContext } from "@/app/contexts/refundContext";
import { CustomerOrder } from "@/types/order";
import { useContext } from "react";

type Props = {
  order: CustomerOrder;
};
const RefundCard = ({ order }: Props) => {
  const { setOpenModal, setSelectedOrder } = useContext(RefundDisplayContext);
  const handleOpenModal = () => {
    setSelectedOrder(order);
    setOpenModal(true);
  };
  return (
    <div className="p-2 rounded-lg cursor-pointer">
      <div className="flex justify-center items-center">
        <button
          className="text-blue-400 px-2.5 py-2 rounded-lg hover:bg-primaryDark transition-all duration-300 ease-in"
          onClick={handleOpenModal}
        >
          {`${order.country} - ${order.planSize} GB`}
        </button>
      </div>
    </div>
  );
};

export default RefundCard;
