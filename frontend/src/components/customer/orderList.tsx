import { OrderDisplayContext } from "@/app/contexts/orderListingContext";
import { useContext } from "react";
import OrderCard from "./orderCard";
import { CustomerOrder } from "@/types/order";
import MyModal from "../common/myModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCartShopping,
  faGauge,
  faIdCard,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  orders: CustomerOrder[];
};
const OrderList = ({ orders }: Props) => {
  const { loading, openModal, setOpenModal, selectedOrder, setSelectedOrder } =
    useContext(OrderDisplayContext);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="">
        {orders.map((order) => (
          <div key={order._id} className="flex justify-center items-center">
            <OrderCard order={order} />
            <MyModal open={openModal} setOpen={setOpenModal}>
              <div className="flex justify-between items-center">
                <img src={selectedOrder?.flag} alt="" className="h-10" />
                <img src={selectedOrder?.carrierLogo} alt="" className="h-10" />
              </div>
              <div className="w-full h-0.5 bg-neutral-400 my-3"></div>
              <p className="font-bold text-lg text-white-700">{`${selectedOrder?.country}`}</p>
              <p className="font-bold text-lg text-white-700">{`${selectedOrder?.planSize} - GB by ${selectedOrder?.carrierName}`}</p>
            </MyModal>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderList;
