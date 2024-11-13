"use client";

import {Product} from "@/types/product";
import Toggle from "../common/toggle";
import {useState} from "react";

type Props = {
  product: Product;
};

const ProductInfoCard = ({product}: Props) => {
  const [active, setActive] = useState(product.active);
  const handleToggleActive = (_: any, value: boolean) => {
    setActive(value);
  };
  return (
    <div className="bg-white shadow-2xl w-full px-6 py-6 rounded-2xl">
      <div className="grid grid-cols-2 gap-3">
        <p className="text-md  text-neutral-900">
          <span className="font-bold">ID:</span> {product._id}
        </p>
        <p className="text-md  text-neutral-900">
          <span className="font-bold">Country:</span> {product.country}
        </p>
        <p className="text-md  text-neutral-900">
          <span className="font-bold">Size in GB:</span> {product.size}GB
        </p>
        <p className="text-md  text-neutral-900">
          <span className="font-bold">Duration of days:</span>{" "}
          {product.duration}
        </p>
        <p className="text-md  text-neutral-900">
          <span className="font-bold">Price(USD):</span> {product.price}
        </p>
        <p className="text-md  text-neutral-900">
          <span className="font-bold">Created Date:</span>{" "}
          {product.created.toLocaleDateString()}
        </p>
        <div className="text-md  text-neutral-900 flex justify-start items-center gap-2">
          <p className="font-bold">
            Status:{" "}
            <span className={`${active ? "text-green-500" : "text-red-500"}`}>
              {active ? "active" : "inactive"}
            </span>
          </p>
          <Toggle
            value={active}
            name={"active"}
            setValue={handleToggleActive}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfoCard;
