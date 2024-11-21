import {Carrier} from "@/types/carrier";

type Props = {
  carrier: Carrier | null;
};

const CarrierLogo = ({carrier}: Props) => {
  return (
    <div className="bg-white flex flex-col justify-center items-center py-10 shadow-lg">
      <img src={carrier?.logoUrl} alt={carrier?.name} className="w-[130px]" />
      <button className="mt-5 bg-primary hover:bg-primaryDark text-white px-6 py-2 rounded-xl">
        Change logo
      </button>
    </div>
  );
};

export default CarrierLogo;
