"use client";
import CarrierLoginForm from "@/components/carrier-auth/carrierLoginForm";

export default function CarrierLogin() {
  return (
    <div
      id="card"
      className="w-[700px] bg-white bg-opacity-60 rounded-2xl shadow-lg py-10"
    >
      <div className="flex flex-row justify-center items-center">
        <CarrierLoginForm />
      </div>
    </div>
  );
}
