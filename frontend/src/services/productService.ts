import {Product} from "@/types/product";
import httpService from "./httpService";

export const getMyProducts = async () => {
  try {
    const response = await httpService.get<Product[]>(
      "/api/product/get-my-products"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await httpService.get<Product>(
      `/api/product/get-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProductStatus = async (id: string, status: string) => {
  try {
    const response = await httpService.post<Product>(
      `/api/product/update-product-status`,
      {
        productId: id,
        status: status,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
