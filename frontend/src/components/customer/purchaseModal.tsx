import {ProductDisplayContext} from "@/app/contexts/productListingContext";
import {useContext, useState} from "react";
import MyModal from "../common/myModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCartShopping,
  faGauge,
  faIdCard,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import {UserContext} from "@/app/contexts/userContext";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {loadStripe} from "@stripe/stripe-js";
import {createNewOrder} from "@/services/orderService";
import Image from "next/image";

const PurchaseModal = () => {
  const {openModal, setOpenModal, selectedProduct, setSelectedProduct} =
    useContext(ProductDisplayContext);
  const {user, loading: loadingUser} = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
  );

  const handlePurchase = async () => {
    if (loadingUser) {
      return;
    }
    if (!selectedProduct) {
      toast.error("Product not found");
      return;
    }
    if (!user) {
      toast.info("Please login first to purchase");
      router.push("/login");
      return;
    }
    setSubmitted(true);
    try {
      const res = await createNewOrder(selectedProduct._id);
      const sessionId = res.sessionId;
      const stripe = await stripePromise;
      if (!stripe) {
        return;
      }
      const result = await stripe.redirectToCheckout({
        sessionId,
      });
      if (result.error) {
        toast.error("Failed to checkout. Please try again");
        return;
      }
    } catch (e: any) {
      console.log(e);
      toast.error("Failed to checkout. Please try again");
    }
    setSubmitted(false);
    setOpenModal(false);
  };
  return (
    <MyModal open={openModal} setOpen={setOpenModal}>
      <div className="flex justify-between items-center">
        <Image
          src={selectedProduct?.carrierLogo || ""}
          alt=""
          className="h-10"
          width={1920}
          height={1080}
        />
        <p className="font-bold text-3xl">{selectedProduct?.size} GB</p>
      </div>
      <div className="w-full h-0.5 bg-neutral-400 my-3"></div>
      <p className="font-bold text-lg text-neutral-700">Plan Details</p>
      <div className="flex justify-between items-center my-2">
        <p className="flex items-center gap-1">
          <FontAwesomeIcon icon={faCalendar} className="text-primary" />
          Duration
        </p>
        <p className="font-light">{selectedProduct?.duration} days</p>
      </div>
      <div className="flex justify-between items-center my-2">
        <p className="flex items-center gap-1">
          <FontAwesomeIcon icon={faGauge} className="text-primary" />
          Speed
        </p>
        <p className="font-light">{selectedProduct?.speed}</p>
      </div>
      <div className="flex justify-between items-center my-2">
        <p className="flex items-center gap-1">
          <FontAwesomeIcon icon={faTag} className="text-primary" />
          Price
        </p>
        <p className="font-light">{selectedProduct?.price} USD</p>
      </div>
      <div className="w-full h-0.5 bg-neutral-400 my-3"></div>
      <p className="font-bold text-lg text-neutral-700">Other Details</p>
      <div className="flex justify-between items-center my-2">
        <p className="flex items-center gap-1">
          <FontAwesomeIcon icon={faIdCard} className="text-primary" />
          Identity Verification
        </p>
        <p className="font-light">
          {selectedProduct?.identityVerification ? "Required" : "Not Required"}
        </p>
      </div>
      <div className="flex justify-between items-center my-2">
        <p className="flex items-center gap-1">
          <FontAwesomeIcon icon={faCartShopping} className="text-primary" />
          Top-up
        </p>
        <p className="font-light">
          {selectedProduct?.topUp ? "Available" : "Unavailable"}
        </p>
      </div>
      <div className="w-full h-0.5 bg-neutral-400 my-3"></div>
      <div className="flex justify-between items-center">
        <p className="font-bold text-3xl text-neutral-700">
          ${selectedProduct?.price}
        </p>
        <button
          className="bg-primary text-white px-2.5 py-2 rounded-lg hover:bg-primaryDark transition-all duration-300 ease-in"
          onClick={handlePurchase}
        >
          {submitted ? "Processing..." : "Buy Now"}
        </button>
      </div>
    </MyModal>
  );
};

export default PurchaseModal;
