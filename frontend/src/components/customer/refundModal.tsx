import {useContext, useState} from "react";
import MyModal from "../common/myModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyBillWave} from "@fortawesome/free-solid-svg-icons";
import {OrdersContext} from "@/app/contexts/ordersContext";
import {useFormik} from "formik";
import * as Yup from "yup";
import {refundRequest} from "@/services/refundService";
import {toast} from "react-toastify";
import Spinner from "../common/Spinner";

type Props = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

const RefundModal = ({openModal, setOpenModal}: Props) => {
  const {loading, selectedOrder} = useContext(OrdersContext);
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: Yup.object({
      reason: Yup.string().required("Reason is required"),
    }),
    onSubmit: async (values) => {
      setSubmitted(true);
      try {
        await refundRequest({
          orderId: selectedOrder?._id || "",
          reason: values.reason,
        });
        toast.success("Refund request sent successfully");
        setOpenModal(false);
      } catch (e: any) {
        toast.error(e.response.data || "Error sending refund request");
      }
      setSubmitted(false);
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values: {reason},
    errors,
    touched,
  } = formik;

  return (
    <div>
      <MyModal open={openModal} setOpen={setOpenModal}>
        {!loading && selectedOrder && (
          <>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faMoneyBillWave}
                  className="text-gray-400 font-bold text-3xl mb-4"
                />
                <p className="font-bold text-3xl mb-4">Refund Request</p>
              </div>
              <p className="flex text-lg text-white-700 font-semibold">
                {`Product: ${selectedOrder?.country} - ${selectedOrder?.planSize} GB by ${selectedOrder?.carrierName}`}
              </p>
            </div>
            <form
              className="flex flex-col mt-6 text-lg"
              onSubmit={handleSubmit}
            >
              <p className="font-bold">Reason for refund request</p>
              <textarea
                placeholder="Reason for request"
                className="border border-grey-500 text-sm text-black indent-1"
                value={reason}
                onChange={handleChange}
                onBlur={handleBlur}
                name="reason"
              />
              {errors.reason && touched.reason && (
                <p className="text-red-500 text-sm">{errors.reason}</p>
              )}
              <button
                className="mt-3 flex justify-center items-center gap-2 bg-[#00A2FF] text-white font-semibold py-1 px-4 rounded-full hover:bg-primaryDark hover:text-white transition-all duration-300 ease-in"
                type="submit"
                disabled={submitted}
              >
                <Spinner show={submitted} />
                Send Request
              </button>
            </form>
          </>
        )}
      </MyModal>
    </div>
  );
};

export default RefundModal;
