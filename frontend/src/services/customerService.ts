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

export const getAllCustomers = async () => {
  try {
    const response = await httpService.get<User[]>("api/users/user-list");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomerById = async (id: string) => {
  try {
    const response = await httpService.get<User>(`api/users/get-user?id=${id}`);  // Updated to match your route
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCustomerEmail = async (userId: string, currentEmail: string, updatedEmail: string) => {
  try {
    const response = await httpService.post("api/users/update-user-email", {
      id: userId,
      currentEmail,
      updatedEmail
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCustomerPassword = async (userId: string, currentPassword: string, newPassword: string) => {
  try {
    const response = await httpService.post("api/users/update-user-password", {
      id: userId,
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCustomer = async (userId: string) => {
  try {
    const response = await httpService.delete("api/users/delete-user", {
      data: { id: userId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};