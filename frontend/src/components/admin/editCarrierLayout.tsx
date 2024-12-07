"use client";
import {useEffect, useState} from "react";
import EditCarrierForm from "./editCarrierForm";
import {Carrier} from "@/types/carrier";
import {carriers} from "@/app/(carrier)/data";
import CarrierLogo from "./carrierLogo";
import {getCarrierById} from "@/services/carrierService";
import {toast} from "react-toastify";

type Props = {
  id: string;
};

const EditCarrierLayout = ({id}: Props) => {
  const [carrier, setCarrier] = useState<Carrier>();
  useEffect(() => {
    const fetchCarrier = async () => {
      try {
        const data = await getCarrierById(id);
        setCarrier(data);
      } catch (e: any) {
        toast.error("Failed to fetch carrier");
        console.error(e.response.data);
      }
    };
    fetchCarrier();
  }, []);
  return (
    <div className="w-full grid grid-cols-3 gap-10">
      <div className="col-span-2">
        <div className="w-full bg-white shadow-xl px-6 py-6">
          <EditCarrierForm id={id} />
        </div>
      </div>
      <div className="col-span-1">
        <CarrierLogo carrier={carrier} />
      </div>
    </div>
  );
};

export default EditCarrierLayout;
