import {OrdersContext} from "@/app/contexts/ordersContext";
import {CustomerOrder} from "@/types/order";
import {useContext} from "react";

type Props = {
  order: CustomerOrder;
};
const OrderCard = ({order}: Props) => {
  const {selectedOrder, setSelectedOrder} = useContext(OrdersContext);
  const selected = selectedOrder?._id === order._id;

  const handleOrderSelect = () => {
    setSelectedOrder(order);
  };

  return (
    <button
      type="button"
      onClick={handleOrderSelect}
      className={`${
        selected && "border-2 border-primary"
      } w-full p-2 cursor-pointer bg-gray-100 shadow hover:shadow-xl transition-all duration-300 ease-in rounded-lg border-gray-100 h-full flex flex-col justify-center items-center`}
    >
      <div className="text-primaryDark px-2.5 py-2 rounded-lg">
        {`${order.country} - ${order.planSize} GB`}
      </div>
    </button>
  );
};

export default OrderCard;
