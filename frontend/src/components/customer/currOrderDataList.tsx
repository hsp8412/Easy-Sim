import { CurrOrderDisplayContext } from "@/app/contexts/currOrderListingContext";
import { useContext } from "react";
import { CustomerOrder } from "@/types/order";
import RefundModal from "./refundModal";
import { RefundDisplayProvider } from "@/app/contexts/refundContext";
import FilterOffcanvas from "./filterOffcanvas";

type Props = {
  order: CustomerOrder;
  orders: CustomerOrder[];
};

const CurrOrderDataList = ({ order, orders }: Props) => {
  const { loading } = useContext(CurrOrderDisplayContext);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="card border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
      {/* <h3 className="font-bold text-lg">{order.planName}</h3> */}
      <RefundDisplayProvider currentOrder={orders}>
        <div className="">
          <div key={order._id}>
            <div className="flex justify-center items-center">
              <img
                src={order?.flag}
                alt="flag"
                className="h-8 rounded-lg border-black border"
              />
            </div>
            <div className="mt-3">
              <p className="flex font-bold justify-center text-md text-white-700">{`${order?.country} - ${order?.planSize} GB by`}</p>
            </div>
            <div className="flex mt-3 justify-center items-center">
              <img
                src={order?.carrierLogo}
                alt="logo"
                className="h-8 rounded-sm"
              />
            </div>
            <div id="order-list" className="mt-2">
              <RefundModal order={order} />
            </div>
            <FilterOffcanvas />
          </div>
        </div>
      </RefundDisplayProvider>
      <div className="mt-2">
        <p className="font-bold">Data Left (GB)</p>
        <div className="flex items-center space-x-2">
          <div className="text-center font-bold w-10">0</div>
          <div className="flex-grow h-9 border border-black rounded-lg bg-white relative">
            <div
              className="h-full inset-0 rounded-lg bg-blue-500 absolute"
              style={{
                width: `${
                  ((Number(order.planSize) - Number(order.usage)) /
                    Number(order.planSize)) *
                  100
                }%`,
              }}
            ></div>
          </div>
          <div className="text-center font-bold w-10">{order.planSize}</div>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-bold">Days Left</p>
        <div className="flex items-center space-x-2">
          <div className="text-center font-bold w-10">0</div>
          <div className="flex-grow h-9 border border-black rounded-lg bg-white relative">
            <div
              className="h-full inset-0 rounded-lg bg-blue-500 absolute"
              style={{
                width: `${
                  (Number(order.remainingDays) / Number(order.duration)) * 100
                }%`,
              }}
            ></div>
          </div>
          <div className="text-center font-bold w-10">{order.duration}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrOrderDataList;
