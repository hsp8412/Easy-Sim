import { CurrOrderDisplayContext } from "@/app/contexts/currOrderListingContext";
import { useContext } from "react";
import { CustomerOrder } from "@/types/order";
import RefundModal from "./refundModal";
import { RefundDisplayProvider } from "@/app/contexts/refundContext";
import FilterOffcanvas from "./filterOffcanvas";

type Props = {
  orders: CustomerOrder[];
};
const CurrOrderList = ({ orders }: Props) => {
  const { loading } = useContext(CurrOrderDisplayContext);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <RefundDisplayProvider currentOrder={orders}>
        <div className="">
          {orders.map((order) => (
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
          ))}
        </div>
      </RefundDisplayProvider>
    </>
  );
};

export default CurrOrderList;
