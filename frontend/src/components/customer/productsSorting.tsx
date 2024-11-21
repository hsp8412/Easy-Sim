"use client";

import {useContext} from "react";
import SelectDropdown, {SelectDropDownItem} from "../common/selectDropdown";
import {ProductDisplayContext} from "@/app/contexts/productListingContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

export const sortingOptions: SelectDropDownItem[] = [
  {
    id: 1,
    label: "default",
    value: "default",
  },
  {
    id: 2,
    label: "price (low to high)",
    value: "priceAsc",
  },
  {
    id: 3,
    label: "price (high to low)",
    value: "priceDesc",
  },
  {
    id: 4,
    label: "size (small to large)",
    value: "sizeAsc",
  },
  {
    id: 5,
    label: "size (large to small)",
    value: "sizeDesc",
  },
];

const ProductsSorting = () => {
  const {sorting, setSorting, openOffcanvas, setOpenOffcanvas} = useContext(
    ProductDisplayContext
  );

  const handleFilterToggle = () => {
    console.log("123");
    setOpenOffcanvas(true);
  };
  return (
    <div className="flex flex-col md:flex-row md:justify-between w-full">
      <div className="flex justify-center mb-2">
        <button
          className="xl:hidden bg-secondary text-white px-2.5 py-2.5 flex justify-center items-center gap-2 rounded-lg hover:bg-secondaryDark transition-all duration-300 ease-in"
          onClick={handleFilterToggle}
        >
          <FontAwesomeIcon icon={faFilter} />
          Filter
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
        <p className="flex justify-center md:justify-start items-center gap-1">
          <FontAwesomeIcon icon={faArrowDownWideShort} /> Sort By
        </p>
        <SelectDropdown
          items={sortingOptions}
          selected={sorting}
          setSelected={setSorting}
        />
      </div>
    </div>
  );
};

export default ProductsSorting;
