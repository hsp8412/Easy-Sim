import { RefundDisplayContext } from "@/app/contexts/refundContext";
import { useContext } from "react";
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
import RefundCard from "./refundCard";

type Props = {
  orders: CustomerOrder[];
};
const RefundModal = ({ orders }: Props) => {
  const { loading, openModal, setOpenModal, selectedOrder } =
    useContext(RefundDisplayContext);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {orders.map((order) => (
        <div key={order._id} className="flex justify-center items-center">
          <RefundCard order={order} />
          <MyModal open={openModal} setOpen={setOpenModal}>
            {selectedOrder && (
              <>
                <div className="flex flex-col">
                  <p className="font-bold text-3xl mb-4">Refund Request</p>
                  <p className="flex text-xl text-white-700">
                    {`Product: ${selectedOrder.country} - ${selectedOrder.planSize} GB by ${selectedOrder.carrierName}`}
                  </p>
                </div>
                <div className="flex flex-col mt-6 text-lg">
                  <p className="font-bold">Reason for refund request</p>
                  <textarea
                    name=""
                    placeholder="Reason for request"
                    className="border border-grey-500 text-sm text-black indent-1"
                  />
                </div>
                <div className="mt-5 flex items-center justify-center gap-20">
                  <button className="bg-gray-500 text-white font-semibold py-1 px-4 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 ease-in">
                    Cancel
                  </button>
                  <button className="bg-[#00A2FF] text-white font-semibold py-1 px-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in">
                    Send Request
                  </button>
                </div>
              </>
            )}
          </MyModal>
        </div>
      ))}
    </div>
  );
};

export default RefundModal;
