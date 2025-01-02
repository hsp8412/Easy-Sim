import {User} from "@/types/user";
import httpService from "./httpService";
import {Carrier} from "@/types/carrier";
import {Admin} from "@/types/admin";

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

export const googleLogin = async () => {
  try {
    await httpService.get("/api/auth/google");
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await httpService.delete("/api/auth");
  } catch (error) {
    throw error;
  }
};

export const updateMyEmail = async ({
  currentEmail,
  updatedEmail,
}: {
  currentEmail: string;
  updatedEmail: string;
}) => {
  try {
    await httpService.post("/api/users/update-my-email", {
      currentEmail,
      updatedEmail,
    });
  } catch (error) {
    throw error;
  }
};

export const updateMyPassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    await httpService.post("/api/users/update-my-password", {
      currentPassword,
      newPassword,
    });
  } catch (error) {
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await httpService.get<User>("/api/users/me");
    return response.data;
  } catch (error: any) {
    return null;
  }
};

export const adminLogin = async ({email, password}: LoginProps) => {
  try {
    const response = await httpService.post<Admin>("/api/admin", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminLogout = async () => {
  try {
    await httpService.delete("/api/admin");
  } catch (error) {
    throw error;
  }
};

export const adminGetMe = async () => {
  try {
    const response = await httpService.get<Admin>("/api/admin/me");
    return response.data;
  } catch (error: any) {
    return null;
  }
};

export const carrierLogin = async ({email, password}: LoginProps) => {
  try {
    const response = await httpService.post<Carrier>("/api/carrier/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const carrierLogout = async () => {
  try {
    await httpService.delete("/api/carrier/logout");
  } catch (error) {
    throw error;
  }
};

export const carrierGetMe = async () => {
  try {
    const response = await httpService.get<Carrier>("/api/carrier/me");
    return response.data;
  } catch (error: any) {
    return null;
  }
};

export const passwordResetRequets = async (email: string) => {
  try {
    await httpService.post("/api/auth/password-reset", {email});
  } catch (error) {
    throw error;
  }
};

export const validatePasswordResetToken = async (token: string) => {
  try {
    await httpService.get(`/api/auth/validate-token/${token}`);
  } catch (error) {
    throw error;
  }
};

export const resetPasswordWithToken = async (
  token: string,
  password: string
) => {
  try {
    await httpService.post(`/api/auth/consume-token`, {token, password});
  } catch (error) {
    throw error;
  }
};

export const validateToken = async (token: string) => {
  try {
    await httpService.get(`/api/auth/validate-token/${token}`);
  } catch (error) {
    throw error;
  }
};
