import { Admin } from "@/types/admin";
import httpService from "./httpService";

export const getAllAdmins = async () => {
  try {
    const response = await httpService.get<Admin[]>("api/admin/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};