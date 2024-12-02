import httpService from "./httpService";

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
