"use client";
import {SelectDropDownItem} from "@/components/common/selectDropdown";
import {sortingOptions} from "@/components/customer/productsSorting";
import {Country} from "@/types/country";
import {ProductFromServer} from "@/types/product";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
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
  sorting: SelectDropDownItem;
  setSorting: Dispatch<SetStateAction<SelectDropDownItem>>;
  selectedProduct: ProductFromServer | null;
  setSelectedProduct: (product: ProductFromServer | null) => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  openOffcanvas: boolean;
  setOpenOffcanvas: (open: boolean) => void;
  durationFilters: number[];
  setDurationFilters: Dispatch<SetStateAction<number[]>>;
  sizeFilters: number[];
  setSizeFilters: Dispatch<SetStateAction<number[]>>;
  carrierFilters: string[];
  setCarrierFilters: Dispatch<SetStateAction<string[]>>;
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
  sorting: sortingOptions[0],
  setSorting: () => {},
  selectedProduct: null,
  setSelectedProduct: () => {},
  openModal: false,
  setOpenModal: () => {},
  openOffcanvas: false,
  setOpenOffcanvas: () => {},
  durationFilters: [],
  setDurationFilters: () => {},
  sizeFilters: [],
  setSizeFilters: () => {},
  carrierFilters: [],
  setCarrierFilters: () => {},
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
  const [sorting, setSorting] = useState<SelectDropDownItem>(sortingOptions[0]);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductFromServer | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openOffcanvas, setOpenOffcanvas] = useState<boolean>(false);

  const [durationFilters, setDurationFilters] = useState<number[]>([]);
  const [sizeFilters, setSizeFilters] = useState<number[]>([]);
  const [carrierFilters, setCarrierFilters] = useState<string[]>([]);

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
      setCurrentPriceRange(max);
      setLoading(false);
    };
    initializePriceRange();
  }, [products]);

  //filter by price
  const filteredByPrice = products.filter(
    (product) => product.price <= currentPriceRange
  );

  // filter by duration
  const filteredByDuration = durationFilters.length
    ? filteredByPrice.filter((product) =>
        durationFilters.includes(product.duration)
      )
    : filteredByPrice;

  //filter by size
  const filteredBySize = sizeFilters.length
    ? filteredByDuration.filter((product) => sizeFilters.includes(product.size))
    : filteredByDuration;

  //filter by carrier
  const filteredByCarrier = carrierFilters.length
    ? filteredBySize.filter((product) =>
        carrierFilters.includes(product.carrierName)
      )
    : filteredBySize;

  const sortedProducts = filteredByCarrier.sort((a, b) => {
    switch (sorting.value) {
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "sizeAsc":
        return a.size - b.size;
      case "sizeDesc":
        return b.size - a.size;
      default:
        return 0;
    }
  });

  return (
    <ProductDisplayContext.Provider
      value={{
        products: sortedProducts,
        country,
        setProducts,
        min,
        max,
        currentPriceRange,
        setCurrentPriceRange,
        loading,
        sorting,
        setSorting,
        selectedProduct,
        setSelectedProduct,
        openModal,
        setOpenModal,
        openOffcanvas,
        setOpenOffcanvas,
        durationFilters,
        setDurationFilters,
        sizeFilters,
        setSizeFilters,
        carrierFilters,
        setCarrierFilters,
      }}
    >
      {children}
    </ProductDisplayContext.Provider>
  );
};
