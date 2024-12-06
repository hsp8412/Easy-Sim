import {getMyProducts} from "@/services/productService";
import {Product} from "@/types/product";
import {createContext, useEffect, useState} from "react";
import {toast} from "react-toastify";

interface ICarrierProductsContext {
  products: Product[];
  setProducts: (products: Product[]) => void;
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  priceRange: [number, number];
  priceValue: number;
  setPriceValue: (value: number) => void;
  durationFilter: string[];
  setDurationFilter: (duration: string[]) => void;
  sizeFilter: string[];
  setSizeFilter: (size: string[]) => void;
  statusFilter: string[];
  setStatusFilter: (statuses: string[]) => void;
  dateFilter: string | null;
  setDateFilter: (date: string | null) => void;
}

export const CarrierProductsContext = createContext<ICarrierProductsContext>({
  products: [],
  setProducts: () => {},
  filterOpen: false,
  setFilterOpen: () => {},
  priceRange: [0, 0],
  priceValue: 0,
  setPriceValue: () => {},
  durationFilter: [],
  setDurationFilter: () => {},
  sizeFilter: [],
  setSizeFilter: () => {},
  statusFilter: [],
  setStatusFilter: () => {},
  dateFilter: null,
  setDateFilter: () => {},
});

export const CarrierProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceValue, setPriceValue] = useState(0);
  const [durationFilter, setDurationFilter] = useState<string[]>([]);
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getMyProducts();
        setProducts(res);
        const prices = res.map((product) => product.price);
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
      } catch (error: any) {
        toast.error(error.response.data);
      }
    };
    getProducts();
  }, []);

  const handleApplyFilter = () => {
    
  };

  return (
    <CarrierProductsContext.Provider
      value={{
        products,
        setProducts,
        filterOpen,
        setFilterOpen,
        priceRange,
        priceValue,
        setPriceValue,
        durationFilter,
        setDurationFilter,
        sizeFilter,
        setSizeFilter,
        statusFilter,
        setStatusFilter,
        dateFilter,
        setDateFilter,
      }}
    >
      {children}
    </CarrierProductsContext.Provider>
  );
};
