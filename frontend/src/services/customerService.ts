import { User } from "@/types/user";
import httpService from "./httpService";
import { CustomerOrder } from "@/types/order";

// Need to add update methods in backend @ routes/users first
export const updateEmail = async (
  currentEmail: string,
  updatedEmail: string
) => {
  try {
    const response = await httpService.post<User>(
      "/api/users/update-my-email",
      {
        currentEmail,
        updatedEmail,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const response = await httpService.post<User>(
      "/api/users/update-my-password",
      {
        currentPassword,
        newPassword,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAcount = async () => {
  try {
    await httpService.delete<User>("/api/users/delete-my-account");
  } catch (error) {
    throw error;
  }
};

export const getCurrentOrder = async () => {
  try {
    const response = await httpService.get<CustomerOrder[]>(
      "api/order/get-my-current-order"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPrevOrders = async () => {
  try {
    const response = await httpService.get<CustomerOrder[]>(
      "api/order/get-my-prev-orders"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
