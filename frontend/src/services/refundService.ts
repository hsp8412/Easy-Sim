import {Refund} from "@/types/refund";
import httpService from "./httpService";

export const getMyRefunds = async () => {
  try {
    const res = await httpService.get<Refund[]>("api/refund/get-my-refunds");
    return res.data;
  } catch (error) {
    throw error;
  }
};
