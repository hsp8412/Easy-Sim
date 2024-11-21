import httpService from "./httpService";
import { Country } from "@/types/country";

export const getCountryByID = async () => {
  try {
    const response = await httpService.get<Country>(
      "api/order/get-countries-by-id"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
