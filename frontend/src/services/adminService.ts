import {Admin, NewAdmin} from "@/types/admin";
import httpService from "./httpService";

export const getAllAdmins = async () => {
  try {
    const response = await httpService.get<Admin[]>("api/admin/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminLogout = async () => {
  try {
    await httpService.delete("api/admin");
  } catch (error) {
    throw error;
  }
};

export const createNewAdmin = async (admin: NewAdmin) => {
  try {
    await httpService.post("api/admin/register", admin);
  } catch (error) {
    throw error;
  }
};
