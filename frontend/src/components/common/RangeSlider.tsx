import {ProductDisplayContext} from "@/app/contexts/productListingContext";
import React, {useContext, useState} from "react";

type Props = {
  min: number;
  max: number;
  value: number;
  setValue: (value: number) => void;
};

const RangeSlider = ({min, max, value, setValue}: Props) => {
  return (
    <div className="relative mb-6">
      <label htmlFor="range-slider" className="sr-only">
        Range Slider
      </label>
      <input
        id="range-slider"
        type="range"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          setValue(Number(e.target.value));
          console.log(e.target.value);
        }}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
        Min (${min})
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
        Max (${max})
      </span>
    </div>
  );
};

export default RangeSlider;
