import { RefundDisplayContext } from "@/app/contexts/refundContext";
import { useContext } from "react";
import RefundCard from "./refundCard";
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
const RefundModal = ({ orders }: Props) => {
  const { openModal, setOpenModal, selectedOrder } =
    useContext(RefundDisplayContext);

  if (!openModal) return null; // Return nothing if the modal is not open

  return (
    <MyModal open={openModal} setOpen={setOpenModal}>
      {selectedOrder && (
        <>
          <div className="flex gap-10 justify-center items-center">
            <img src={selectedOrder.flag} alt="flag" className="h-20" />
            <img src={selectedOrder.carrierLogo} alt="logo" className="h-20" />
          </div>
          <div className="mt-5">
            <p className="flex font-bold justify-center text-3xl text-white-700">
              {selectedOrder.country}
            </p>
          </div>
          {/* Other details */}
        </>
      )}
    </MyModal>
  );
};

export default RefundModal;
