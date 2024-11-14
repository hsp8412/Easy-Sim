import {Carrier} from "@/types/carrier";
import CarrierEmailUpdateForm from "./carrierEmailUpdateForm";
import CarrierPasswordUpdateForm from "./carrierPasswordUpdateForm";

type Props = {
  carrier: Carrier;
};
const CarrierInfoCard = ({carrier}: Props) => {
  return (
    <div className="bg-white p-8 shadow-lg mb-10">
      <CarrierEmailUpdateForm carrier={carrier} />
      <CarrierPasswordUpdateForm carrier={carrier} />
    </div>
  );
};

export default CarrierInfoCard;
