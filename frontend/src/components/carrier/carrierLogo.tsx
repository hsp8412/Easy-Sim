import {CarrierContext} from "@/app/contexts/carrierContext";
import {useContext, useState} from "react";
import ImageUpload from "../common/imageUpload";
import {updateMyLogo} from "@/services/carrierService";
import {toast} from "react-toastify";

const CarrierLogo = () => {
  const {carrier} = useContext(CarrierContext);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (image: File | undefined) => {
    if (image) {
      setLoading(true);
      try {
        await updateMyLogo(image);
        toast.success("Logo updated successfully");
      } catch (e: any) {
        toast.error(e.response.data);
      }
    }
    setLoading(false);
  };

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
