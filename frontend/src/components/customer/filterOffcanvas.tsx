"use client";
import {ProductDisplayContext} from "@/app/contexts/productListingContext";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useContext} from "react";
import RangeSlider from "../common/RangeSlider";
import {ProductFromServer} from "@/types/product";

type Props = {
  allProducts: ProductFromServer[];
};

const FilterOffcanvas = ({allProducts}: Props) => {
  const {
    openOffcanvas,
    setOpenOffcanvas,
    min,
    max,
    currentPriceRange,
    setCurrentPriceRange,
    durationFilters,
    setDurationFilters,
    sizeFilters,
    setSizeFilters,
    carrierFilters,
    setCarrierFilters,
  } = useContext(ProductDisplayContext);
  const toggleSidebar = () => {
    setOpenOffcanvas(!openOffcanvas);
  };

  if (!openOffcanvas) {
    return;
  }

  const carriers = Array.from(
    new Set(allProducts.map((product) => product.carrierName))
  );

  const durationOptions = [
    {label: "1 Days", value: 1},
    {label: "3 Days", value: 3},
    {label: "5 Days", value: 5},
    {label: "1 Week", value: 7},
    {label: "2 Weeks", value: 14},
    {label: "3 Weeks", value: 21},
  ];

  const sizeOptions = [
    {label: "1 GB", value: 1},
    {label: "3 GB", value: 3},
    {label: "5 GB", value: 5},
    {label: "10 GB", value: 10},
    {label: "15 GB", value: 15},
    {label: "20 GB", value: 20},
  ];

  const handleDurationFilter = (value: number) => {
    if (durationFilters.includes(value)) {
      setDurationFilters(
        durationFilters.filter((duration) => duration !== value)
      );
    } else {
      setDurationFilters([...durationFilters, value]);
    }
  };

  const handleSizeFilter = (value: number) => {
    if (sizeFilters.includes(value)) {
      setSizeFilters(sizeFilters.filter((size) => size !== value));
    } else {
      setSizeFilters([...sizeFilters, value]);
    }
  };

  const handleCarrierFilter = (value: string) => {
    if (carrierFilters.includes(value)) {
      setCarrierFilters(carrierFilters.filter((c) => c !== value));
    } else {
      setCarrierFilters([...carrierFilters, value]);
    }
  };

  return (
    <>
      <div
        id="sidebar"
        className="fixed inset-0 z-[60] w-64 bg-white border-e border-gray-200 shadow-lg transform transition-all duration-300 ease-in-out"
      >
        <div className="p-5">
          <h1 className="text-3xl font-bold text-neutral-700 flex justify-start items-center gap-3">
            <FontAwesomeIcon icon={faFilter} className="text-secondary" />
            Filter
          </h1>
          <div id="price-range-container" className="mt-2">
            <p>Price</p>
            <RangeSlider
              min={min}
              max={max}
              value={currentPriceRange}
              setValue={setCurrentPriceRange}
            />
          </div>
          <div id="duration-filter-container" className="mt-10">
            <p>Duration</p>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {durationOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleDurationFilter(option.value)}
                  type="button"
                  className={`${
                    durationFilters.includes(option.value) &&
                    "bg-primary text-white"
                  } py-1 w-[60px] text-xs border-2 border-primary rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div id="duration-filter-container" className="my-4">
            <p>Size</p>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {sizeOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSizeFilter(option.value)}
                  className={`${
                    sizeFilters.includes(option.value) &&
                    "bg-primary text-white"
                  } py-1 w-[60px] text-xs border-2 border-primary rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div id="carrier-filter" className="my-4">
            <p>Carriers</p>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {carriers.map((carrier, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleCarrierFilter(carrier)}
                  className={`${
                    carrierFilters.includes(carrier) && "bg-primary text-white"
                  } text-xs border-2 border-primary py-1 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in`}
                >
                  {carrier}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[50]"
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

export default FilterOffcanvas;
