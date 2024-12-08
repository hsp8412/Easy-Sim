import {useContext, useState} from "react";
import OrderCard from "./orderCard";
import {CustomerOrder} from "@/types/order";
import MyModal from "../common/myModal";
import {OrdersContext} from "@/app/contexts/ordersContext";

const PrevOrderList = () => {
  const {loading, orders} = useContext(OrdersContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>();

  // const datePurchase = selectedOrder?.createdDate
  //   ? new Date(selectedOrder.createdDate).toLocaleDateString("en-US", {
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     })
  //   : "";

  if (loading) return <p className="text-center">Loading...</p>;

  if (!orders || orders.length === 0)
    return <p className="text-center">No orders to display</p>;

  return (
    <>
      <div className="overflow-y-auto max-h-96 h-96 flex flex-col w-full gap-1">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="flex-shrink-0 justify-center items-center"
          >
            <OrderCard order={order} />
          </div>
        ))}
      </div>
    </>
  );
};

export default PrevOrderList;
