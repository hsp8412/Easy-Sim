import {Carrier} from "@/types/carrier";
import CarrierEmailUpdateForm from "./carrierEmailUpdateForm";
import CarrierPasswordUpdateForm from "./carrierPasswordUpdateForm";

const CarrierInfoCard = () => {
  return (
    <div className="bg-white p-8 shadow-lg mb-10">
      <CarrierEmailUpdateForm />
      <CarrierPasswordUpdateForm />
    </div>
  );
};

export default CarrierInfoCard;
