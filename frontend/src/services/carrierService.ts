import httpService from "./httpService";
import {Carrier, NewCarrier} from "@/types/carrier";

export const updateMyEmail = async (
  currentEmail: string,
  updatedEmail: string
) => {
  try {
    await httpService.post("/api/carrier/update-my-email", {
      currentEmail,
      updatedEmail,
    });
  } catch (e: any) {
    throw e;
  }
};

export const updateMyPassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    await httpService.post("/api/carrier/update-my-password", {
      currentPassword,
      newPassword,
    });
  } catch (e: any) {
    throw e;
  }
};

export const updateMyLogo = async (logo: File) => {
  try {
    const formData = new FormData();
    formData.append("image", logo);
    await httpService.post("/api/carrier/update-my-logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e: any) {
    throw e;
  }
};

export const updateCarrierLogoById = async (id: string, logo: File) => {
  try {
    const formData = new FormData();
    formData.append("logo", logo);
    formData.append("carrierId", id);
    await httpService.post("/api/carrier/update-carrier-logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e: any) {
    throw e;
  }
};

export const getAllCarriers = async () => {
  try {
    const response = await httpService.get<Carrier[]>("api/carrier/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Admin operations
export const updateCarrierEmailById = async (
  id: string,
  currentEmail: string,
  updatedEmail: string
) => {
  try {
    await httpService.post("/api/carrier/update-carrier-email", {
      id,
      currentEmail,
      updatedEmail,
    });
  } catch (e: any) {
    throw e;
  }
};

export const updateCarrierPasswordById = async (
  id: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    await httpService.post("/api/carrier/update-carrier-password", {
      id,
      currentPassword,
      newPassword,
    });
  } catch (e: any) {
    throw e;
  }
};

export const deleteCarrierById = async (id: string) => {
  try {
    await httpService.delete("/api/carrier/delete-carrier", {
      data: {id},
    });
  } catch (e: any) {
    throw e;
  }
};

export const createNewCarrier = async (carrier: NewCarrier) => {
  try {
    const formData = new FormData();

    formData.append("logo", carrier.logo);

    formData.append("name", carrier.name);
    formData.append("password", carrier.password);
    formData.append("email", carrier.email);

    await httpService.post("/api/carrier/create-carrier", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e: any) {
    throw e;
  }
};

export const getCarrierById = async (id: string) => {
  try {
    const res = await httpService.get<Carrier>(
      `/api/carrier/get-carrier/${id}`
    );
    return res.data;
  } catch (e: any) {
    throw e;
  }
};
