"use client";
import {carrier} from "@/app/(carrier)/data";
import CarrierInfoCard from "./carrierInfoCard";
import CarrierLogo from "./carrierLogo";

const CarrierInfoLayout = () => {
  const me = carrier;
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2">
        <CarrierInfoCard carrier={me} />
      </div>
      <div className="col-span-1">
        <CarrierLogo carrier={me} />
      </div>
    </div>
  );
};

export default CarrierInfoLayout;
