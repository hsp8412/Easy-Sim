"use client";
import {Country} from "@/types/country";
import {ProductFromServer} from "@/types/product";
import {init} from "next/dist/compiled/webpack/webpack";
import {useEffect, useState} from "react";
import {createContext} from "react";

type Props = {
  allProducts: ProductFromServer[];
  country: Country;
  children: React.ReactNode;
};

type ProductDisplayContext = {
  products: ProductFromServer[];
  country: Country;
  min: number;
  max: number;
  currentPriceRange: number;
  setProducts: (products: ProductFromServer[]) => void;
  setCurrentPriceRange: (price: number) => void;
  loading: boolean;
};

export const ProductDisplayContext = createContext<ProductDisplayContext>({
  products: [],
  country: {} as Country,
  setProducts: () => {},
  min: 0,
  max: 0,
  currentPriceRange: 0,
  loading: true,
  setCurrentPriceRange: () => {},
});

export const ProductDisplayProvider = ({
  allProducts,
  country,
  children,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductFromServer[]>(allProducts);
  const [currentPriceRange, setCurrentPriceRange] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  useEffect(() => {
    const initializePriceRange = () => {
      const {min, max} = products.reduce(
        (acc, product) => {
          acc.min = Math.min(acc.min, product.price);
          acc.max = Math.max(acc.max, product.price);
          return acc;
        },
        {min: Infinity, max: -Infinity}
      );
      setMin(min);
      setMax(max);
      setCurrentPriceRange(min);
      setLoading(false);
    };
    initializePriceRange();
  }, []);

  return (
    <ProductDisplayContext.Provider
      value={{
        products,
        country,
        setProducts,
        min,
        max,
        currentPriceRange,
        setCurrentPriceRange,
        loading,
      }}
    >
      {children}
    </ProductDisplayContext.Provider>
  );
};
