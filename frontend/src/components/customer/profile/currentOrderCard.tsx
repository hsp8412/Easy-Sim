import {useContext, useState} from "react";
import {OrdersContext} from "@/app/contexts/ordersContext";
import DataUsageDisplay from "./dataUsageDisplay";
import PaymentStatusDisplay from "./paymentStatusDisplay";

const CurrentOrderCard = () => {
  const {selectedOrder, loading} = useContext(OrdersContext);
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const datePurchase = selectedOrder?.createdDate
    ? new Date(selectedOrder.createdDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  console.log(selectedOrder?.usage);
  console.log(selectedOrder?.planSize);
  return (
    <div className="bg-white rounded-2xl p-4 w-full h-full flex flex-col justify-start items-center gap-4 max-w-[555px]">
      {/* <p className="font-bold text-2xl">Current Data Plan</p> */}
      <div className="border rounded-lg p-4 shadow-lg bg-gray-100 w-full">
        <div className="flex justify-center items-center">
          <img
            src={selectedOrder?.flag}
            alt="flag"
            className="h-10 shadow-lg"
          />
        </div>
        <div className="mt-3">
          <p className="flex font-semibold justify-center text-2xl text-white-700">{`${selectedOrder?.country} - ${selectedOrder?.planSize} GB by`}</p>
        </div>
        <div className="flex mt-3 justify-center items-center">
          <img
            src={selectedOrder?.carrierLogo}
            alt="logo"
            className="h-10 rounded-sm"
          />
        </div>
        <p className="mt-3 font-light text-lg">{selectedOrder?.speed}</p>
        <p className="mt-2 font-light text-xs">Purchased at: {datePurchase}</p>
      </div>
      {selectedOrder?.paymentStatus.toLowerCase() === "pending" ? (
        <PaymentStatusDisplay />
      ) : (
        <DataUsageDisplay currentOrder={selectedOrder} />
      )}
    </div>
  );
};

export default CurrentOrderCard;
