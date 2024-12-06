import {CustomerOrder} from "@/types/order";
import RefundModal from "../refundModal";
import {useState} from "react";

type Props = {
  currentOrder?: CustomerOrder;
};
const DataUsageDisplay = ({currentOrder}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="border rounded-lg p-4 shadow-lg bg-gray-100 w-full">
      <p className="text-2xl font-semibold">Data Usage</p>
      <div className="h-[0.4px] w-full bg-neutral-700 my-2" />
      <div className="mt-2">
        <p className="font-semibold">Data Left (GB)</p>
        <div className="flex items-center space-x-2">
          <div className="text-center font-bold w-10">0</div>
          <div className="flex-grow h-9 border border-black rounded-lg bg-white relative">
            <div
              className="h-full inset-0 rounded-lg bg-blue-500 absolute"
              style={{
                width: `${
                  ((Number(currentOrder?.planSize) -
                    Number(currentOrder?.usage)) /
                    Number(currentOrder?.planSize)) *
                  100
                }%`,
              }}
            ></div>
          </div>
          <div className="text-center font-bold w-10">
            {currentOrder?.planSize}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Days Left</p>
        <div className="flex items-center space-x-2">
          <div className="text-center font-bold w-10">0</div>
          <div className="flex-grow h-9 border border-black rounded-lg bg-white relative">
            <div
              className="h-full inset-0 rounded-lg bg-blue-500 absolute"
              style={{
                width: `${
                  (Number(currentOrder?.remainingDays) /
                    Number(currentOrder?.duration)) *
                  100
                }%`,
              }}
            ></div>
          </div>
          <div className="text-center font-bold w-10">
            {currentOrder?.duration}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <button
          className="bg-primary text-white font-semibold py-1 px-4 rounded-full hover:bg-primaryDark transition-all duration-300 ease-in"
          onClick={() => setOpenModal(true)}
          type="button"
        >
          Request for Refund
        </button>
      </div>
      <RefundModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default DataUsageDisplay;
