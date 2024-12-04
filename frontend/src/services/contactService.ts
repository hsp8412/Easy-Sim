import httpService from "./httpService";

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  helpRequest: string;
  token: string;
};

export const sendContactEmail = async (values: ContactFormValues) => {
  const {firstName, lastName, email, helpRequest, token} = values;
  try {
    await httpService.post("/api/message", {
      firstName,
      lastName,
      email,
      message: helpRequest,
      token,
    });
  } catch (e) {
    throw e;
  }
};
