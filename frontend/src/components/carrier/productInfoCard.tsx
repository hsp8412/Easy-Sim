"use client";

import {Product} from "@/types/product";
import Toggle from "../common/toggle";
import {useEffect, useState} from "react";
import {getProductById, updateProductStatus} from "@/services/productService";
import {toast} from "react-toastify";
import Spinner from "../common/Spinner";
import {update} from "lodash";

type Props = {
  productId: string;
};

const ProductInfoCard = ({productId}: Props) => {
  const [product, setProduct] = useState<Product | null>();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await getProductById(productId);
        setProduct(res);
        setActive(res.status.toLowerCase() === "active");
      } catch (e: any) {
        toast.error(e.response.data);
      }
    };
    getProduct();
  }, [productId]);

  const handleToggleActive = async (_: any, value: boolean) => {
    setActive(value);
    try {
      const res = await updateProductStatus(
        productId,
        value ? "active" : "inactive"
      );
      toast.success("Product status updated successfully");
    } catch (e: any) {
      toast.error(e.response.data);
    }
  };

  if (!product) return <Spinner show={true} />;

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
          <span className="font-bold">Speed:</span> {product.speed}
        </p>
        <p className="text-md  text-neutral-900">
          <span className="font-bold">Duration of days:</span>{" "}
          {product.duration}
        </p>
        <p className="text-md  text-neutral-900">
          <span className="font-bold">Price(USD):</span> {product.price}
        </p>
        <p className="text-md  text-neutral-900">
          <span className="font-bold">Created Date:</span>
          {new Date(product.createdDate).toLocaleDateString()}
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
