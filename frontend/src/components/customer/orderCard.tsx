import { OrderDisplayContext } from "@/app/contexts/orderListingContext";
import { CustomerOrder } from "@/types/order";
import { useContext } from "react";

type Props = {
  order: CustomerOrder;
};
const OrderCard = ({ order }: Props) => {
  const { setOpenModal, setSelectedOrder } = useContext(OrderDisplayContext);
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

export default OrderCard;
