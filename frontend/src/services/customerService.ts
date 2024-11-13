import { User } from "@/types/user";
import httpService from "./httpService";

// Need to add update methods in backend @ routes/users first
export const updateEmail = async (email: string) => {
  try {
    const response = await httpService.post<User>("/api/users/updateEmail", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (password: string) => {
  try {
    const response = await httpService.post<User>("/api/users/updatePassword", {
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
