import {CustomerOrder, Order} from "@/types/order";
import httpService from "./httpService";

export const getOrders = async () => {
  try {
    const response = await httpService.get<CustomerOrder[]>(
      "/api/order/get-my-orders"
    );
    return response.data;
  } catch (e: any) {
    throw e;
  }
};

export const getOrdersByProductId = async (productId: string) => {
  try {
    const response = await httpService.get<Order[]>(
      `/api/order/get-by-product-id/${productId}`
    );
    return response.data;
  } catch (e: any) {
    throw e;
  }
};

export const updateOrderDelivered = async (
  orderId: string,
  delivered: boolean
) => {
  try {
    const response = await httpService.post(`/api/order/update-delivered`, {
      orderId,
      delivered,
    });
    return response.data;
  } catch (e: any) {
    throw e;
  }
};

export const createNewOrder = async (productId: string) => {
  try {
    const response = await httpService.post(`/api/order/create-new-order`, {
      productId,
    });
    return response.data;
  } catch (e: any) {
    throw e;
  }
};
