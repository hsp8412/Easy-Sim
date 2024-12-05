import { PrevOrderDisplayContext } from "@/app/contexts/prevOrderListingContext";
import { CustomerOrder } from "@/types/order";
import { useContext } from "react";

type Props = {
  order: CustomerOrder;
};
const OrderCard = ({ order }: Props) => {
  const { setOpenModal, setSelectedOrder } = useContext(
    PrevOrderDisplayContext
  );
  const handleOpenModal = () => {
    setSelectedOrder(order);
    setOpenModal(true);
  };
  return (
    <div className="p-2 cursor-pointer border-black border-y h-full flex flex-col justify-center items-center">
      <button
        className="text-[#00A2FF] px-2.5 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in"
        onClick={handleOpenModal}
      >
        {`${order.country} - ${order.planSize} GB`}
      </button>
    </div>
  );
};

export default OrderCard;
