import {User} from "@/types/user";
import httpService from "./httpService";

type LoginProps = {
  email: string;
  password: string;
};

export const login = async ({email, password}: LoginProps) => {
  try {
    const response = await httpService.post<User>("/api/auth", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
