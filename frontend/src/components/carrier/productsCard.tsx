"use client";

import {Product} from "@/types/product";
import DataTable from "../common/table/dataTable";
import {products} from "@/app/(carrier)/data";
import MyButton from "./myButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";

const ProductsCard = () => {
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
      content: (product: Product) => product.created.toLocaleDateString(),
    },
    {
      path: "status",
      label: "Status",
      content: (product: Product) =>
        product.active ? (
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
    <div className="bg-white rounded-2xl px-10 py-5 w-full shadow-2xl">
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
