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

  const datePurchase = selectedOrder?.createdDate
    ? new Date(selectedOrder.createdDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="">
        {orders.map((order) => (
          <div key={order._id} className="flex justify-center items-center">
            <OrderCard order={order} />
            <MyModal open={openModal} setOpen={setOpenModal}>
              <div className="flex gap-10 justify-center items-center">
                <img src={selectedOrder?.flag} alt="flag" className="h-20" />
                <img
                  src={selectedOrder?.carrierLogo}
                  alt="logo"
                  className="h-20"
                />
              </div>
              <div className="mt-5">
                <p className="flex font-bold justify-center text-white-700 text-3xl">{`${selectedOrder?.country}`}</p>
              </div>
              <div className="mt-3">
                <p className="flex font-bold justify-center text-xl text-white-700">{`${selectedOrder?.planSize} - GB by ${selectedOrder?.carrierName}`}</p>
                <p className="flex font-bold justify-center text-xl text-white-700">{`${datePurchase}`}</p>
              </div>
              <div className="mt-4">
                <p className="font-bold text-lg mb-2">Data Left (in GB)</p>
                <div className="flex items-center space-x-2">
                  <div className="text-center w-10">0</div>
                  <div className="flex-grow h-9 border-2 rounded-lg bg-[#00A2FF]"></div>
                  <div className="text-center w-10">{`${selectedOrder?.planSize}`}</div>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-bold text-lg mb-2">Days Left</p>
                <div className="flex items-center space-x-2">
                  <div className="text-center w-10">0</div>
                  <div className="flex-grow h-9 border-2 rounded-lg bg-white"></div>
                  <div className="text-center w-10">{`${selectedOrder?.duration}`}</div>
                </div>
              </div>
            </MyModal>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderList;
