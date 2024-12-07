import {Carrier} from "@/types/carrier";
import ImageUpload from "../common/imageUpload";
import {toast} from "react-toastify";
import {useState} from "react";
import {updateCarrierLogoById} from "@/services/carrierService";

type Props = {
  carrier?: Carrier;
};

const CarrierLogo = ({carrier}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (image: File | undefined) => {
    if (image && carrier) {
      setLoading(true);
      try {
        await updateCarrierLogoById(carrier?._id, image);
        toast.success("Logo updated successfully");
      } catch (e: any) {
        toast.error(e.response.data);
      }
    }
    setLoading(false);
  };

  if (!carrier) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white flex flex-col justify-center items-center py-10 shadow-lg">
      <ImageUpload
        defaultUrl={carrier?.logoUrl || "/default-image.png"}
        buttonText={"Change Logo"}
        loading={loading}
        handleImageChange={handleImageChange}
      />
    </div>
  );
};

export default CarrierLogo;
