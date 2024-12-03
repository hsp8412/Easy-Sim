import {ProductDisplayContext} from "@/app/contexts/productListingContext";
import {useContext} from "react";
import MyModal from "../common/myModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCartShopping,
  faGauge,
  faIdCard,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

const PurchaseModal = () => {
  const {openModal, setOpenModal, selectedProduct, setSelectedProduct} =
    useContext(ProductDisplayContext);

  const handlePurchase = () => {
    console.log("Purchased");
    setOpenModal(false);
  };
  return (
    <MyModal open={openModal} setOpen={setOpenModal}>
      <div className="flex justify-between items-center">
        <img src={selectedProduct?.carrierLogo} alt="" className="h-10" />
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
          Buy Now
        </button>
      </div>
    </MyModal>
  );
};

export default PurchaseModal;
