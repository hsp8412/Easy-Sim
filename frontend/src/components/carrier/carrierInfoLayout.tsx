"use client";
import {carrier} from "@/app/(carrier)/data";
import CarrierInfoCard from "./carrierInfoCard";
import CarrierLogo from "./carrierLogo";

const CarrierInfoLayout = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2">
        <CarrierInfoCard  />
      </div>
      <div className="col-span-1">
        <CarrierLogo  />
      </div>
    </div>
  );
};

export default CarrierInfoLayout;
