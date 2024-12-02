"use client";

import {Product} from "@/types/product";
import DataTable from "../common/table/dataTable";
import MyButton from "./myButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {getMyProducts} from "@/services/productService";
import {toast} from "react-toastify";

const ProductsCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getMyProducts();
        setProducts(res);
      } catch (error: any) {
        toast.error(error.response.data);
      }
    };
    getProducts();
  }, []);

  const router = useRouter();
  const columns = [
    {
      path: "country",
      label: "Country",
      content: (product: Product) => product.country,
    },
    {
      path: "size",
      label: "Size(GB)",
      content: (product: Product) => product.size,
    },
    {
      path: "duration",
      narrow: true,
      label: "Duration(Days)",
      content: (product: Product) => product.duration,
    },
    {
      path: "price",
      label: "Price(USD)",
      content: (product: Product) => product.price,
    },
    {
      path: "created",
      label: "Date",
      content: (product: Product) =>
        new Date(product.createdDate).toLocaleDateString(),
    },
    {
      path: "status",
      label: "Status",
      content: (product: Product) =>
        product.status.toLocaleLowerCase() == "active" ? (
          <p className="text-green-600">Active</p>
        ) : (
          <p className="text-red-600">Inactive</p>
        ),
    },
    {
      path: "",
      label: "Details",
      isButton: true,
      content: (product: Product) => (
        <button
          className="bg-primary hover:bg-primaryDark px-4 py-2 text-white rounded-xl"
          onClick={() => {
            router.push(`/carrier/products/${product._id}`);
          }}
        >
          Details
        </button>
      ),
    },
  ];
  return (
    <div className="bg-white px-10 py-5 w-full shadow-2xl">
      <div className="mb-4">
        <MyButton>
          <FontAwesomeIcon icon={faFilter} size="lg" />
          Filter
        </MyButton>
      </div>
      <DataTable
        columns={columns}
        items={products}
        keyPath={"_id"}
        itemsPerPage={3}
      />
    </div>
  );
};

export default ProductsCard;
