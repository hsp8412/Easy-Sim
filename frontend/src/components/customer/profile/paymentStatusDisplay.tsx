import {OrdersContext} from "@/app/contexts/ordersContext";
import {continuePayment} from "@/services/orderService";
import {loadStripe} from "@stripe/stripe-js";
import {useContext, useState} from "react";
import {toast} from "react-toastify";

const PaymentStatusDisplay = () => {
  const [submitted, setSubmitted] = useState(false);
  const {selectedOrder} = useContext(OrdersContext);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
  );

  const handlePayment = async () => {
    setSubmitted(true);
    try {
      const data = await continuePayment(selectedOrder?._id || "");
      const stripe = await stripePromise;
      if (!stripe) {
        return;
      }
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
      if (result.error) {
        toast.error("Failed to checkout. Please try again");
        return;
      }
    } catch (e) {
      toast.error("Failed to create payment session. Please try again");
    }
    setSubmitted(false);
  };
  return (
    <div className="border rounded-lg p-4 shadow-lg bg-gray-100 w-full">
      <div>
        <p className="font-semibold text-lg">
          You haven&apos;t complete the payment.
        </p>
        <p className="text-sm">
          Please complete the payment to start using the service.
        </p>
        <button
          className="mt-4 bg-primary hover:bg-primaryDark transition-all duration-300 ease-in text-white rounded-lg px-4 py-2"
          onClick={handlePayment}
          disabled={submitted}
        >
          {submitted ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentStatusDisplay;
