"use client";

import {ProductDisplayContext} from "@/app/contexts/productListingContext";
import {useContext} from "react";
import ProductCard from "./productCard";
import PurchaseModal from "./purchaseModal";

const ProductList = () => {
  const {products, loading} = useContext(ProductDisplayContext);
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="flex justify-center items-center">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <PurchaseModal />
    </>
  );
};

export default ProductList;
