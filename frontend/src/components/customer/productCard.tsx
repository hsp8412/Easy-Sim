import {ProductDisplayContext} from "@/app/contexts/productListingContext";
import {ProductFromServer} from "@/types/product";
import {faCalendar, faGauge, faTag} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useContext} from "react";

type Props = {
  product: ProductFromServer;
};
const ProductCard = ({product}: Props) => {
  const {setOpenModal, setSelectedProduct} = useContext(ProductDisplayContext);
  const handleOpenModal = () => {
    setSelectedProduct(product);
    setOpenModal(true);
  };
  return (
    <div className="shadow-xl bg-white p-5 rounded-lg cursor-pointer w-[380px]">
      <div className="flex justify-between items-center">
        <img src={product.carrierLogo} alt="" className="h-10" />
        <p className="font-bold text-3xl">{product.size} GB</p>
      </div>
      <div className="w-full h-0.5 bg-neutral-400 my-3"></div>
      <div className="flex justify-between items-center my-2">
        <p className="flex items-center gap-1">
          <FontAwesomeIcon icon={faCalendar} className="text-primary" />
          Duration
        </p>
        <p className="font-light">{product.duration} days</p>
      </div>
      <div className="flex justify-between items-center my-2">
        <p className="flex items-center gap-1">
          <FontAwesomeIcon icon={faGauge} className="text-primary" />
          Speed
        </p>
        <p className="font-light">{product.speed}</p>
      </div>
      <div className="flex justify-between items-center my-2">
        <p className="flex items-center gap-1">
          <FontAwesomeIcon icon={faTag} className="text-primary" />
          Price
        </p>
        <p className="font-light">{product.price} USD</p>
      </div>
      <div className="w-full h-0.5 bg-neutral-400 my-3"></div>
      <div className="flex justify-center items-center">
        <button
          className="bg-primary text-white px-2.5 py-2 rounded-lg hover:bg-primaryDark transition-all duration-300 ease-in"
          onClick={handleOpenModal}
        >
          Purchase
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
