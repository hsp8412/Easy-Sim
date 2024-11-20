"use client";
import {useState} from "react";
import CarrierLogo from "../carrier/carrierLogo";
import EditCarrierForm from "./editCarrierForm";
import {Carrier} from "@/types/carrier";
import {carriers} from "@/app/(carrier)/data";

type Props = {
  id: string;
};

const EditCarrierLayout = ({id}: Props) => {
  const [carrier, setCarrier] = useState<Carrier | null>(carriers[0]);
  return (
    <div className="w-full grid grid-cols-3 gap-10">
      <div className="col-span-2">
        <div className="w-full bg-white shadow-xl px-6 py-6">
          <EditCarrierForm id={id} />
        </div>
      </div>
      <div className="col-span-1">
        <CarrierLogo carrier={carrier || null} />
      </div>
    </div>
  );
};

export default EditCarrierLayout;
