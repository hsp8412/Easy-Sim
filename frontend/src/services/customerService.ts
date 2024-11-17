import { User } from "@/types/user";
import httpService from "./httpService";

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
