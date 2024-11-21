"use client";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RangeSlider from "../common/RangeSlider";
import {useContext} from "react";
import {ProductDisplayContext} from "@/app/contexts/productListingContext";
import Spinner from "../common/Spinner";

const Filter = () => {
  const {min, max, currentPriceRange, setCurrentPriceRange, loading, products} =
    useContext(ProductDisplayContext);

  // get unique carriers
  const carriers = Array.from(
    new Set(products.map((product) => product.carrierName))
  );

  if (loading) {
    return <Spinner show={true} />;
  }
  return (
    <div className="shadow-xl rounded-3xl bg-white p-5">
      <h1 className="text-3xl font-bold text-neutral-700 flex justify-center items-center gap-3">
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
          <button
            type="button"
            className="border-2 border-primary p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in"
          >
            1 Days
          </button>
          <button
            type="button"
            className="border-2 border-primary p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in"
          >
            3 Days
          </button>
          <button
            type="button"
            className="border-2 border-primary p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in"
          >
            5 Days
          </button>
          <button
            type="button"
            className="border-2 border-primary p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in"
          >
            1 Week
          </button>
          <button
            type="button"
            className="border-2 border-primary p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in"
          >
            2 Weeks
          </button>
          <button
            type="button"
            className="border-2 border-primary p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in"
          >
            3 Weeks
          </button>
        </div>
      </div>
      <div id="duration-filter-container" className="my-4">
        <p>Size</p>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <button className="border-2 border-primary p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in">
            1 GB
          </button>
          <button className="border-2 border-primary p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in">
            3 GB
          </button>
          <button className="border-2 border-primary p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in">
            5 GB
          </button>
          <button className="border-2 border-primary p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in">
            10 GB
          </button>
          <button className="border-2 border-primary p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in">
            15 GB
          </button>
          <button className="border-2 border-primary p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in">
            20 GB
          </button>
        </div>
      </div>
      <div id="carrier-filter" className="my-4">
        <p>Size</p>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {carriers.map((carrier, index) => (
            <button
              key={index}
              className="border-2 border-primary p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in"
            >
              {carrier}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
